import type { APIRoute } from 'astro';
import { loadCV } from '../lib/cv';
import { cvToMarkdown } from '../lib/markdown';

export const GET: APIRoute = async ({ site }) => {
  const cv = await loadCV();
  return new Response(cvToMarkdown(cv, site!.href), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
