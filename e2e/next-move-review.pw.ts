import {expect,test} from '@playwright/test';
const url='http://127.0.0.1:4317/projects/cfg23';

for(const mode of ['context-only','stage-directions'])test(`advice becomes a durable proposal before ${mode}`,async({page})=>{
  await page.setViewportSize({width:mode==='context-only'?390:1440,height:1000});
  const requests:any[]=[];
  let proposal:any=null;
  await page.route('**/api/control?**',async route=>{
    const response=await route.fetch();const body=await response.json();
    for(const project of body.projects||[])if(project.id==='cfg23')project.externalInputs=proposal?[proposal]:[];
    await route.fulfill({response,json:body});
  });
  await page.route('**/api/codex/conversation?*',route=>route.fulfill({json:{thread:{id:'advice-thread'},turns:[{id:'advice-turn',status:'completed',messages:[{id:'advice-message',role:'assistant',text:'Audit the V4 case before claiming asymmetry.'}]}]}}));
  await page.route('**/api/actions',async route=>{
    const request=route.request().postDataJSON();requests.push(request);
    if(request.type==='campaign.redirect.submit'){
      proposal={id:'proposal-1',title:request.args.title,content:request.args.content,inputDigest:'sha256:frozen',status:'drafted',response:{summary:'Review the precise symmetry bound.',decision:'READY_FOR_GATE',newDirections:[{question:'Can V4 be ruled out?',rationale:'Would sharpen the checkpoint theorem.'}]}};
    }else if(request.type==='campaign.redirect.apply'){
      proposal={...proposal,status:'applied',applicationMode:request.args.mode};
    }else throw Error('Unexpected mutation: '+request.type);
    await route.fulfill({json:{id:'test-'+requests.length,status:'completed',result:{inputId:'proposal-1',insertedResearchRequests:mode==='stage-directions'?1:0}}});
  });
  await page.goto(url);
  await page.getByRole('button',{name:'Explore this move'}).click();
  await page.getByRole('button',{name:'Shape next moves'}).click();
  const dialog=page.getByRole('dialog',{name:'Shape the next moves.'});
  await expect(dialog).toBeVisible();
  expect(requests).toHaveLength(0);
  await page.getByLabel('Your direction').fill('Check whether V4 remains possible; do not assert full asymmetry.');
  await page.getByRole('button',{name:'Prepare a proposal',exact:true}).click();
  await expect(dialog.getByText('Ready for your decision')).toBeVisible();
  expect(await dialog.evaluate(node=>node.scrollWidth<=node.clientWidth)).toBe(true);
  await page.screenshot({path:`test-results/next-move-${mode}.png`});
  expect(requests).toHaveLength(1);
  expect(requests[0]).toMatchObject({projectId:'cfg23',type:'campaign.redirect.submit'});
  expect(requests[0].args.content).toContain('task advice-thread; turn advice-turn; message advice-message');
  expect(requests[0].args.content).toContain('Audit the V4 case before claiming asymmetry.');
  expect(requests[0].args.content).toContain('Check whether V4 remains possible');
  await page.getByRole('button',{name:'Close next moves',exact:true}).click();
  await page.getByRole('button',{name:/Review proposed moves/}).click();
  await expect(dialog.getByText('Can V4 be ruled out?',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:mode==='context-only'?'Keep as context':'Stage 1 questions for plan review',exact:true}).click();
  await expect(dialog.getByText('Decision recorded',{exact:true})).toBeVisible();
  expect(requests).toHaveLength(2);
  expect(requests[1]).toMatchObject({type:'campaign.redirect.apply',targetId:'proposal-1',args:{mode}});
  if(mode==='context-only')await expect(dialog.getByText('Retained as context; its questions were not staged.')).toBeVisible();
  else{
    await page.getByRole('button',{name:'Review the research plan'}).click();
    await expect(page.locator('#campaign-library')).toHaveAttribute('open','');
    await expect(page.locator('#process-history')).toHaveAttribute('open','');
  }
});

test('a failed submission preserves the operator draft and source',async({page})=>{
  await page.route('**/api/control?**',async route=>{
    const response=await route.fetch();const body=await response.json();
    for(const project of body.projects||[])if(project.id==='cfg23')project.externalInputs=[];
    await route.fulfill({response,json:body});
  });
  await page.route('**/api/actions',route=>route.fulfill({status:409,json:{error:'Coordinator temporarily unavailable'}}));
  await page.route('**/api/codex/conversation?*',route=>route.fulfill({json:{turns:[{id:'done',status:'completed',messages:[{role:'assistant',text:'Retain the exact symmetry scope.'}]}]}}));
  await page.goto(url);await page.getByRole('button',{name:'Explore this move'}).click();
  await page.getByRole('button',{name:'Shape next moves'}).click();
  await page.getByLabel('Your direction').fill('Preserve this draft for retry.');
  await page.getByRole('button',{name:'Prepare a proposal',exact:true}).click();
  await expect(page.getByRole('alert')).toHaveText('Coordinator temporarily unavailable');
  await expect(page.getByLabel('Your direction')).toHaveValue('Preserve this draft for retry.');
  await page.getByText('Advice included with this request',{exact:true}).click();
  await expect(page.getByText('Retain the exact symmetry scope.',{exact:true}).last()).toBeVisible();
});

test('an unfinished adviser reply cannot be promoted to a proposal',async({page})=>{
  await page.route('**/api/actions',()=>{throw Error('No mutation expected');});
  await page.route('**/api/codex/conversation?*',route=>route.fulfill({json:{turns:[{id:'active',status:'inProgress',messages:[{role:'assistant',text:'Still checking.'}]}]}}));
  await page.goto(url);await page.getByRole('button',{name:'Explore this move'}).click();
  await expect(page.getByText('Still checking.')).toBeVisible();
  await expect(page.getByRole('button',{name:'Shape next moves'})).toHaveCount(0);
});
