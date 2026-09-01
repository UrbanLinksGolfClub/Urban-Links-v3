// Usage: npx playwright install chromium (one-time), then:
//   node screenshot.mjs http://localhost:3000 [label] [width] [height]
import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const [, , url, label, width, height] = process.argv;
if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label] [width] [height]');
  process.exit(1);
}

const dir = './temporary screenshots';
if (!existsSync(dir)) await mkdir(dir);

let n = 1;
while (existsSync(`${dir}/screenshot-${n}${label ? '-' + label : ''}.png`)) n++;
const outPath = `${dir}/screenshot-${n}${label ? '-' + label : ''}.png`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width) || 1440, height: Number(height) || 900 },
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved ${outPath}`);
