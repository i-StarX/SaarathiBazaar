
export default class Helpers {
    static async waitForStableURL(page) {
        await page.waitForFunction(() => {
            const url = window.location.href;
            return /\/#\/[\w-]+$/.test(url);
        }, { timeout: 60000 });
        await page.waitForTimeout(5000);
    }

    static async attachScreenshot(page, testInfo) {
        let screenshot = await page.screenshot();
        await testInfo.attach('Screenshot', {
            body: screenshot,
            contentType: "image/png"
        })
    }

    static async queryShadowSelector(page, hostSelector, innerSelector) {
        const hostHandle = await page.locator(hostSelector).elementHandle();
        const shadowRoot = await hostHandle.evaluateHandle(el => el.shadowRoot);
        await page.waitForTimeout(100);
        const elementHandle = await shadowRoot.asElement().waitForSelector(innerSelector, { timeout: 20000 });
        if (!elementHandle) {
            throw new Error(`Element '${innerSelector}' not found in shadow root of '${hostSelector}' after 20s`);
        }
        await page.waitForFunction(
            (el: HTMLElement) => el && el.offsetParent !== null,
            {},
            elementHandle
        );
        return elementHandle;
    }
}