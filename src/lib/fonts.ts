/** Font files for build-time image generation (satori needs TTF/WOFF, not WOFF2). */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export async function loadFont(pkg: string, file: string): Promise<ArrayBuffer> {
  const path = require.resolve(`${pkg}/files/${file}`);
  const buf = await readFile(path);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}
