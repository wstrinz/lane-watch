import {test,expect} from '@playwright/test';
test('optional advice explains setup and renders planning JSON without a proposal loop',async({page})=>{
 await page.setViewportSize({width:390,height:900});let reads=0;
 await page.route('**/api/actions',()=>{throw Error('Guidance navigation must not dispatch');});
 await page.route('**/api/events?**',route=>route.fulfill({contentType:'text/event-stream',body:': fixture\n\n'}));
 await page.route('**/api/control?**',async route=>{
  const response=await route.fetch(),body=await response.json();
  for(const p of body.projects||[])if(p.id==='cfg23'){
   p.phase='RESEARCH_REVIEW';p.researchRequests=[];p.coordinator.status='idle';
   p.researchPlan={status:'drafted',response:{decision:'BLOCKED',quickChecks:[],lanes:[]}};
  }
  await route.fulfill({response,json:body});
 });
 await page.route('**/api/codex/conversation?*',route=>{
  reads++;
  return route.fulfill({json:{turns:[{status:'completed',messages:[{role:'assistant',text:JSON.stringify({summary:'The proof review is saved.',decision:'BLOCKED',newDirections:[]})}]}]}});
 });
 await page.goto('http://127.0.0.1:4317/projects/cfg23');
 await page.getByRole('button',{name:'Consult Sol, Terra or Astra'}).click();
 await expect(page.getByText('Optional advice',{exact:true})).toBeVisible();
 await expect(page.getByText('The proof review is saved.',{exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Shape next moves'})).toHaveCount(0);
 await expect(page.locator('.adviser-results pre')).toBeHidden();
 await page.waitForTimeout(5500);expect(reads).toBe(1);
 await page.screenshot({path:'test-results/adviser-guidance-mobile.png'});
 await page.getByRole('button',{name:'View execution setup'}).click();
 const dialog=page.getByRole('dialog',{name:'One decision-to-decision research loop.'});
 await expect(dialog.getByText('Implementation work — needed now.',{exact:true})).toBeVisible();
 await expect(dialog.getByText('Your decision — after verification.',{exact:true})).toBeVisible();
});
