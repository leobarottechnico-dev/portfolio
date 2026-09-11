const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    const video = document.querySelector('.cinematic-film');
    return video && video.readyState >= 2 && Number.isFinite(video.duration);
  }, null, { timeout: 30000 });

  for (const [index, progress] of [0, .25, .5, .75, 1].entries()) {
    await page.evaluate((value) => {
      const hero = document.querySelector('[data-cinematic-hero]');
      const travel = hero.offsetHeight - innerHeight;
      scrollTo(0, hero.offsetTop + travel * value);
    }, progress);
    await page.waitForTimeout(700);
    await page.screenshot({
      path: `.impeccable/review/cinematic-${index + 1}.png`,
      fullPage: false,
    });
  }

  await browser.close();
})();
