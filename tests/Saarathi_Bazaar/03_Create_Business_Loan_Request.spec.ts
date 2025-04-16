
    import { Page, Locator, test, expect, } from '@playwright/test';
    import * as allure from "allure-js-commons";
    import Helpers from '../helpers/helpers';

    test('03 Create Business Loan Request', { tag: ["@regression_saarathi"] }, async ({ page }) => {

        
await allure.step("Navigate : https://myaccount.saarathibazaar.com/#/", async() =>{ await page.goto("https://myaccount.saarathibazaar.com/#/"); await page.waitForTimeout(40000); await Helpers.waitForStableURL(page); });

await allure.step("Fill Mobile number : 9600340349", async() =>{ await page.mouse.click(47, 427); await page.keyboard.type("9600340349");
         await page.waitForTimeout(1500); });

await allure.step("Click Login/Register : ", async() =>{ await page.mouse.click(46, 492); 
         await page.waitForTimeout(5000); });

await allure.step("Fill OTP : 7848", async() =>{ await page.mouse.click(100, 416.77); await page.keyboard.type("7848");
         await page.waitForTimeout(20000); });

await allure.step("Click Create Loan Request : ", async() =>{ await page.mouse.click(97.5, 749); 
         await page.waitForTimeout(1500); });

await allure.step("Click Business : ", async() =>{ await page.mouse.click(46, 163.6); 
         await page.waitForTimeout(1500); });

await allure.step("Select Loan Type : 3", async() =>{ await page.mouse.click(46, 223.6); 
for (let i = 1; i < 3; i++) {
                    await page.keyboard.press("ArrowDown");
                }
                await page.keyboard.press("Enter");
         await page.waitForTimeout(1500); });

await allure.step("Click Fresh Loan : ", async() =>{ await page.mouse.click(216.5, 324.72); 
         await page.waitForTimeout(1500); });

await allure.step("Fill Loan Amount : 50000", async() =>{ await page.mouse.click(16, 439.72); await page.keyboard.type("50000");
         await page.waitForTimeout(1500); });

await allure.step("Click Next button : ", async() =>{ await page.mouse.click(16, 756); 
         await page.waitForTimeout(1500); });


    });