import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';

const input = path.join(process.cwd(), 'public', 'images', 'ChatGPT Image Apr 11, 2026, 01_32_26 PM.png');
const output = path.join(process.cwd(), 'public', 'images', 'hero.webp');

const image = sharp(input, { failOn: 'none' });
const meta = await image.metadata();

const targetWidth = Math.min(meta.width ?? 1536, 1536);

await image
  .resize({ width: targetWidth, withoutEnlargement: true })
  .webp({ quality: 76, effort: 4 })
  .toFile(output);

const inSize = fs.statSync(input).size;
const outSize = fs.statSync(output).size;

console.log(
  JSON.stringify(
    {
      input,
      output,
      inSize,
      outSize,
      savingsPct: Math.round(((inSize - outSize) / inSize) * 100),
      meta,
    },
    null,
    2
  )
);
