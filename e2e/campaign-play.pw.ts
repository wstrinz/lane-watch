import {expect,test} from '@playwright/test';
const url='http://127.0.0.1:4317/projects/cfg23';
for(const width of [1440,390])test(`campaign play is actionable without opening the machinery at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1000});const errors:string[]=[],mutations:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/actions',route=>{mutations.push(route.request().postData()||'');return route.abort();});
 await page.goto(url);await expect(page.getByRole('heading',{name:'Find the next breakthrough.'})).toBeVisible();
 await expect(page.locator('#campaign-library')).not.toHaveAttribute('open','');
 await expect(page.getByRole('heading',{name:'Ready when you are'})).toBeVisible();
 await page.getByRole('button',{name:'Explore this move'}).click();await expect(page.getByRole('dialog',{name:'Think through your next move.'})).toBeVisible();
 await page.getByLabel('Think with').selectOption('gpt-5.6-terra');await expect(page.getByRole('button',{name:'Ask Terra',exact:true})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Explore this move'})).toBeFocused();
 await page.getByRole('button',{name:/Autopilot.*Set up/}).click();await expect(page.getByText('Research execution needs preparation')).toBeVisible();
 await page.getByRole('button',{name:'Ask an adviser instead'}).click();await expect(page.getByRole('dialog',{name:'Think through your next move.'})).toBeVisible();await page.keyboard.press('Escape');
 await page.locator('.discoveries button').first().click();await expect(page.locator('.queue-result-dialog')).toBeVisible();await expect(page.getByText('Source details · file hash verified')).toBeVisible();await page.keyboard.press('Escape');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);expect(mutations).toEqual([]);
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.screenshot({path:`test-results/campaign-play-${width}.png`,fullPage:true});
});

test('selected adviser and question reach the guarded action endpoint without research dispatch',async({page})=>{
 const requests:any[]=[];
 await page.route('**/api/actions',async route=>{
  requests.push(route.request().postDataJSON());
  await route.fulfill({json:{id:'test-advice',status:'completed',type:'coordinator.message.send'}});
 });
 await page.route('**/api/codex/conversation?*',route=>route.fulfill({json:{turns:[{messages:[{role:'assistant',text:'Check the exact theorem scope before publication.'}]}]}}));
 await page.goto(url);
 await page.getByRole('button',{name:'Explore this move'}).click();
 await page.getByLabel('Think with').selectOption('gpt-5.6-terra');
 await page.getByLabel('Help me').selectOption('Challenge');
 await page.getByLabel('Anything to focus on?').fill('Is the symmetry claim too broad?');
 await page.getByRole('button',{name:'Ask Terra',exact:true}).click();
 await expect(page.getByRole('status').filter({hasText:'Terra is considering'})).toBeVisible();
 expect(requests).toHaveLength(1);
 expect(requests[0]).toMatchObject({projectId:'cfg23',type:'coordinator.message.send',args:{advice:true,model:'gpt-5.6-terra',role:'Challenge'}});
 expect(requests[0].args.message).toContain('Is the symmetry claim too broad?');
 await expect(page.getByText('Check the exact theorem scope before publication.')).toBeVisible();
});
