const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const results = {};

  for (const [name, viewport] of Object.entries({
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
  })) {
    const page = await browser.newPage({ viewport });
    await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelector('[data-cinematic-hero]')?.classList.contains('is-ready'));
    for (const progress of [.2, .4, .92, 0]) {
      await page.evaluate(value => {
        document.documentElement.style.scrollBehavior = 'auto';
        const hero = document.querySelector('[data-cinematic-hero]');
        scrollTo(0, hero.offsetTop + (hero.offsetHeight - innerHeight) * value);
      }, progress);
      await page.waitForFunction(value => Math.abs(Number(document.querySelector('[data-cinematic-hero]').style.getPropertyValue('--sequence-progress')) - value) < .001, progress);
      const state = await page.evaluate(() => ({
        cyborg: Number(getComputedStyle(document.querySelector('[data-cyborg]')).opacity),
        magnifier: !!document.querySelector('[data-magnifier]'),
        film: Number(getComputedStyle(document.querySelector('.cinematic-film')).opacity),
        bullseye: Number(getComputedStyle(document.querySelector('[data-bullseye]')).opacity),
        loaded: [...document.querySelectorAll('.cinematic-enhancement')].every(image => image.naturalWidth > 0),
      }));
      assert(state.loaded);
      assert.equal(state.magnifier, false);
      if (progress === .2) assert(state.cyborg > .99 && state.film < .01);
      if (progress === .4) assert(state.film > .99 && state.cyborg < .01);
      if (progress === .92) assert(state.bullseye > .99);
      else assert(state.bullseye < .01);
      if (progress === 0) assert(state.cyborg < .01 && state.film < .01);
      if (progress) await page.screenshot({path: `.impeccable/review/cyborg-${name}-${progress}.png`});
    }
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      const hero = document.querySelector('[data-cinematic-hero]');
      scrollTo(0, hero.offsetTop + (hero.offsetHeight - innerHeight) * .5);
    });
    await page.waitForFunction(() => {
      const video = document.querySelector('.cinematic-film');
      return !video.seeking && Math.abs(video.currentTime - video.duration * .5) < .1;
    });
    results[name] = await page.evaluate(() => {
      const hero = document.querySelector('[data-cinematic-hero]');
      const video = document.querySelector('.cinematic-film');
      const active = document.querySelector('[data-cinematic-chapter][data-active]');
      const actions = document.querySelector('.cinematic-intro .actions');
      return {
        ready: hero.classList.contains('is-ready'),
        heroViewports: Number((hero.offsetHeight / innerHeight).toFixed(1)),
        videoTime: Number(video.currentTime.toFixed(2)),
        videoDuration: Number(video.duration.toFixed(2)),
        activeChapter: active?.textContent?.trim(),
        actionsInert: actions?.hasAttribute('inert'),
      };
    });
    await page.close();
  }

  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await reduced.emulateMedia({ reducedMotion: 'reduce' });
  await reduced.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  results.reducedMotion = await reduced.evaluate(() => {
    const hero = document.querySelector('[data-cinematic-hero]');
    const video = document.querySelector('.cinematic-film');
    return {
      ready: hero.classList.contains('is-ready'),
      heroViewports: Number((hero.offsetHeight / innerHeight).toFixed(1)),
      videoDisplay: getComputedStyle(video).display,
    };
  });
  await reduced.close();

  const skipPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await skipPage.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await skipPage.click('.cinematic-skip');
  await skipPage.waitForTimeout(100);
  results.skip = await skipPage.evaluate(() => ({
    hash: location.hash,
    activeElement: document.activeElement?.id,
    workTop: Math.round(document.querySelector('#work').getBoundingClientRect().top),
  }));
  await skipPage.close();

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
