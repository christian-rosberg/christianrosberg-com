/**
 * Social share image (1200×630), generated at build from the same content as
 * the page. Dark hero look: eyebrow, name, headline, footer line.
 */
import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { loadCV } from '../lib/cv';
import { loadFont } from '../lib/fonts';

const W = 1200;
const H = 630;

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async ({ site }) => {
  const cv = await loadCV();
  const p = cv.profile.data;
  const domain = site!.host;

  const [sans700, sans400, mono400] = await Promise.all([
    loadFont('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff'),
    loadFont('@fontsource/space-grotesk', 'space-grotesk-latin-400-normal.woff'),
    loadFont('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'),
  ]);

  const tree = el(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 72px 52px',
      background: '#0d0f0e',
      color: '#e6e8e5',
      fontFamily: 'Space Grotesk',
    },
    [
      el(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'IBM Plex Mono',
          fontSize: 20,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#7d867f',
          paddingBottom: 28,
          borderBottom: '1px solid #232725',
        },
        [el('span', {}, p.status.left), el('span', {}, p.status.right)],
      ),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el(
          'div',
          {
            fontFamily: 'IBM Plex Mono',
            fontSize: 20,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#7fd6a8',
            marginBottom: 26,
          },
          p.title,
        ),
        el(
          'div',
          {
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
            marginBottom: 26,
          },
          p.name,
        ),
        el(
          'div',
          { fontSize: 32, lineHeight: 1.3, color: '#a7b0a9', maxWidth: 980 },
          p.headline,
        ),
      ]),
      el(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'IBM Plex Mono',
          fontSize: 20,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#7d867f',
        },
        [el('span', {}, domain), el('span', {}, p.company.name)],
      ),
    ],
  );

  const svg = await satori(tree as any, {
    width: W,
    height: H,
    fonts: [
      { name: 'Space Grotesk', data: sans700, weight: 700, style: 'normal' },
      { name: 'Space Grotesk', data: sans400, weight: 400, style: 'normal' },
      { name: 'IBM Plex Mono', data: mono400, weight: 400, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
