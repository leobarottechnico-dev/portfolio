const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

  const captures = [
    { width: 1672, height: 941, path: '.impeccable/review/desktop.png' },
    { width: 390, height: 844, path: '.impeccable/review/mobile.png' },
  ];

  for (const capture of captures) {
    const page = await browser.newPage({ viewport: capture });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });
    await page.screenshot({ path: capture.path, fullPage: true });
  }

  await browser.close();
})();
