import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public/Images/Home page/before after done');

const files = (await readdir(dir)).filter(f => f.endsWith('.png'));
console.log(`Converting ${files.length} PNG files to WebP…`);

let saved = 0;
for (const file of files) {
  const src  = path.join(dir, file);
  const dest = path.join(dir, file.replace('.png', '.webp'));
  const info = await sharp(src).webp({ quality: 82 }).toFile(dest);
  const { size: srcSize } = await import('fs').then(m => m.promises.stat(src));
  saved += srcSize - info.size;
  process.stdout.write('.');
}
console.log(`\nDone. Saved ~${(saved / 1024 / 1024).toFixed(1)} MB`);
