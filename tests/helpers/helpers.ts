
export default class Helpers {
    static async waitForStableURL(page, timeout = 10000) {
        let lastURL = page.url();
        let stableCount = 0;

        for (let i = 0; i < timeout / 500; i++) {
            await page.waitForTimeout(1000);
            let currentURL = page.url();

            if (currentURL === lastURL) {
                stableCount++;
            } else {
                stableCount = 0; // Reset if URL changed
            }

            lastURL = currentURL;

            if (stableCount >= 20) {
                console.log("✅ Navigation has stabilized at:", currentURL);
                return;
            }
        }

        console.warn("⚠️ Navigation did not stabilize within timeout.");
    }
}