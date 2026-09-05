import {test,expect} from '@playwright/test';
test('a held publication plan explains the real blocker without an obsolete gate',async({page})=>{
 await page.route('**/api/events?**',route=>route.fulfill({contentType:'text/event-stream',body:': fixture\n\n'}));
 await page.route('**/api/actions',()=>{throw Error('Reading holds must not mutate state');});
 await page.route('**/api/control?**',async route=>{
  const response=await route.fetch();const body=await response.json();
  for(const p of body.projects||[])if(p.id==='cfg23'){
   p.phase='RESEARCH_REVIEW';p.researchRequests=[];
   p.researchPlan={status:'drafted',response:{decision:'BLOCKED',summary:'Publication reviews retained.',quickChecks:[{status:'BLOCK',detail:'Runtime admission is held and the research envelope is exhausted.'}],lanes:[{question:'Audit the symmetry proof.',evidenceExpected:'Independent proof disposition.'}]}};
  }
  await route.fulfill({response,json:body});
 });
 await page.goto('http://127.0.0.1:4317/projects/cfg23');
 await expect(page.getByRole('heading',{name:'Reviews planned — execution setup needed'})).toBeVisible();
 await expect(page.getByRole('region',{name:'Campaign play'}).getByText('Runtime admission is held and the research envelope is exhausted.',{exact:true})).toBeVisible();
 await page.getByRole('region',{name:'Campaign play'}).getByText('Read the held review plan',{exact:true}).click();
 await expect(page.getByRole('heading',{name:'Audit the symmetry proof.'})).toBeVisible();
 await page.locator('#campaign-library').evaluate((n:HTMLDetailsElement)=>n.open=true);
 await page.locator('#process-history').evaluate((n:HTMLDetailsElement)=>n.open=true);
 await expect(page.getByRole('button',{name:'Open required operator gate',exact:true})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Read held plan and requirements',exact:true})).toBeVisible();
});
test('staged questions lead directly to read-only plan preparation on mobile',async({page})=>{
 await page.setViewportSize({width:390,height:1000});
 let started=false;const actions:any[]=[];
 await page.route('**/api/events?**',route=>route.fulfill({contentType:'text/event-stream',body:': fixture\n\n'}));
 await page.route('**/api/control?**',async route=>{
  const response=await route.fetch();const body=await response.json();
  for(const p of body.projects||[])if(p.id==='cfg23'){
   p.phase=started?'RESEARCH_REVIEW':'BLOCKED';p.coordinator.status='idle';
   p.researchRequests=[{id:'review',waveId:p.wave.id,status:started?'in_review':'proposed',question:'Check the exact symmetry theorem.'}];
   p.researchPlan={status:started?'drafting':'block'};
  }
  await route.fulfill({response,json:body});
 });
 await page.route('**/api/actions',async route=>{
  actions.push(route.request().postDataJSON());started=true;
  await route.fulfill({json:{id:'plan-action',status:'completed'}});
 });
 await page.goto('http://127.0.0.1:4317/projects/cfg23');
 await expect(page.getByRole('heading',{name:'Prepare the review plan'})).toBeVisible();
 await page.getByRole('button',{name:/Autopilot.*Set up/}).click();
 await expect(page.getByRole('dialog',{name:'One decision-to-decision research loop.'}).getByRole('button',{name:'Prepare review plan',exact:true})).toBeVisible();
 await page.keyboard.press('Escape');
 await page.screenshot({path:'test-results/prepare-review-plan-mobile.png',fullPage:true});
 await page.getByRole('button',{name:'Prepare review plan',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Your review plan is being prepared'})).toBeVisible();
 expect(actions).toHaveLength(1);expect(actions[0].type).toBe('research.review.start');
 await expect(page.locator('#campaign-library')).not.toHaveAttribute('open','');
});
