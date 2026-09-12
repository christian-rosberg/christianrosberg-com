import type { APIRoute } from 'astro';
import { loadCV } from '../lib/cv';
import { llmsIndex } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) => {
  const cv = await loadCV();
  return new Response(llmsIndex(cv, site!.href), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
