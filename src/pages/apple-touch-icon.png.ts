import type { APIRoute } from 'astro';
import sharp from 'sharp';

/** 180×180 PNG rendered from the same mark as favicon.svg, with padding for iOS. */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0d0f0e"/>
  <circle cx="32" cy="30" r="7" fill="#7fd6a8"/>
  <rect x="30.75" y="37" width="2.5" height="18" fill="#7fd6a8"/>
</svg>`;

export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(SVG)).resize(180, 180).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
