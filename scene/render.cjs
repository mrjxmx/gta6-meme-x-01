// Renders build-meme.html to ../meme.png (1200x800) and a shrunk preview
// (preview-480.png, 480x320) so the ghost's recognisability at judging size
// can be checked before the entry is committed.
// Usage: node render.cjs   (run from this directory; needs the puppeteer
// install in ~/workspace/makefun/radar-tools)
const puppeteer = require('/home/hatch/workspace/makefun/radar-tools/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const PAGE = 'file://' + path.join(HERE, 'build-meme.html');
const OUT = path.join(HERE, '..', 'meme.png');
const PREVIEW = path.join(HERE, 'preview-480.png');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });
    await page.goto(PAGE, { waitUntil: 'load', timeout: 90000 });
    await page.waitForFunction(
      () => Array.from(document.images).every(i => i.complete && i.naturalWidth > 0),
      { timeout: 60000 }
    );
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: OUT, type: 'png' });

    // Shrink check: show the finished meme at 480px wide, as the judge sees it small.
    await page.setViewport({ width: 480, height: 320, deviceScaleFactor: 1 });
    await page.goto('file://' + path.join(HERE, 'preview.html'), { waitUntil: 'load', timeout: 90000 });
    await page.waitForFunction(
      () => Array.from(document.images).every(i => i.complete && i.naturalWidth > 0),
      { timeout: 60000 }
    );
    await page.screenshot({ path: PREVIEW, type: 'png' });
  } finally {
    await browser.close();
  }
  for (const f of [OUT, PREVIEW]) {
    const buf = fs.readFileSync(f);
    console.log(JSON.stringify({
      path: f,
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
      bytes: buf.length,
    }));
  }
})().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
