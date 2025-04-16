
    import { Page, Locator, test, expect, } from '@playwright/test';
    import * as allure from "allure-js-commons";
    import Helpers from '../helpers/helpers';

    test('01 Login Pass', { tag: ["@regression_saarathi"] }, async ({ page }) => {

        
await allure.step("Navigate : https://myaccount.saarathibazaar.com/#/", async() =>{ await page.goto("https://myaccount.saarathibazaar.com/#/"); await page.waitForTimeout(40000); await Helpers.waitForStableURL(page); });

await allure.step("Fill Mobile number : 9600340349", async() =>{ await page.mouse.click(47, 427); await page.keyboard.type("9600340349");
         await page.waitForTimeout(1500); });

await allure.step("Click Login/Register : ", async() =>{ await page.mouse.click(46, 492); 
         await page.waitForTimeout(5000); });

await allure.step("Fill OTP : 7848", async() =>{ await page.mouse.click(100, 416.77); await page.keyboard.type("7848");
         await page.waitForTimeout(20000); });


    });