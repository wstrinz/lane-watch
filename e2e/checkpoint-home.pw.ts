import {test,expect} from '@playwright/test';
test('held campaign offers useful mobile actions before setup details',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.route('**/api/actions',()=>{throw Error('Exploring must not dispatch');});
 await page.goto('http://127.0.0.1:4317/projects/cfg23');
 const read=page.getByRole('button',{name:'Read the symmetry note',exact:false});
 await expect(read).toBeVisible();
 const bounds=await read.boundingBox();expect(bounds!.y+bounds!.height).toBeLessThan(844);
 await expect(page.locator('.execution-details')).not.toHaveAttribute('open','');
 await page.screenshot({path:'test-results/checkpoint-home-mobile.png',fullPage:true});
 await read.click();await expect(page.locator('.queue-result-dialog')).toBeVisible();
 await expect(page.getByText('Source details · file hash verified')).toBeVisible();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Explore the two reviews'}).click();
 await expect(page.getByRole('dialog',{name:'Shape the next moves.'})).toBeVisible();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Help me understand this'}).click();
 await expect(page.getByLabel('Anything to focus on?')).toHaveValue(/Explain the 1\/C2\/V4 symmetry checkpoint/);
 await expect(page.getByLabel('Help me')).toHaveValue('Explain');
});
