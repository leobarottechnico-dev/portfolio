const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      for (const route of ['/', '/services/', '/about/', '/services/business-automation/', '/services/basic-app-development/', '/contact/', '/audit/']) {
        const response = await page.goto('http://127.0.0.1:4321' + route);
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('h1').count(), 1);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Overflow: ${route} at ${width}`);
        if (route.includes('business-automation') || route.includes('basic-app-development')) {
          assert.equal(await page.locator('.faq details').count(), 6);
          await page.locator('.faq summary').first().click();
          assert(await page.locator('.faq details').first().getAttribute('open') !== null);
          await page.screenshot({ path: `.impeccable/review/${route.split('/')[2]}-${width}.png`, fullPage: true });
        }
        if (route === '/contact/' || route === '/audit/') {
          assert.equal(await page.locator('[name=website]').evaluate(el => el.required), route === '/audit/');
        }
      }
      await page.goto('http://127.0.0.1:4321/contact/');
      await page.locator('[name=name]').fill('Preview test');
      await page.locator('[name=email]').fill('preview@example.com');
      await page.locator('[name=message]').fill('A simple task tracker and enquiry automation.');
      await page.getByRole('button', { name: 'Prepare enquiry brief' }).click();
      assert(await page.locator('#brief-output').isVisible());
      console.log(`Passed routes, FAQs, layout and optional-website form at ${width}px`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
