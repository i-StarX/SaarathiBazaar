import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  page.on('requestfailed', (request) => {
    const errorDetails = `${request.url()} - ${request.failure()!.errorText}`;
    console.log(`Network failure: ${errorDetails}`);

    test.info().attachments.push({
      name: 'Network Failure',
      body: Buffer.from(errorDetails, 'utf-8'),
      contentType: 'text/plain',
    });
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const consoleError = msg.text();
      console.log(`Console error: ${consoleError}`);

      test.info().attachments.push({
        name: 'Console Error',
        body: Buffer.from(consoleError, 'utf-8'),
        contentType: 'text/plain',
      });
    }
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      const apiErrorDetails = `${response.url()} - Status: ${response.status()}`;
      console.log(`API error response: ${apiErrorDetails}`);

      test.info().attachments.push({
        name: 'API Error Response',
        body: Buffer.from(apiErrorDetails, 'utf-8'),
        contentType: 'text/plain',
      });
    }
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
})
