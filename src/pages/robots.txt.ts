import type { APIRoute } from 'astro';

/** Everyone is welcome, including AI crawlers (listed explicitly for clarity). */
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Amazonbot', 'CCBot', 'DuckAssistBot',
  'meta-externalagent', 'Bytespider', 'cohere-ai', 'MistralAI-User',
];

export const GET: APIRoute = ({ site }) => {
  const base = site!.href.replace(/\/$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_BOTS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${base}/sitemap-index.xml`,
    '',
    `# Machine-readable summaries for LLMs: ${base}/llms.txt and ${base}/llms-full.txt`,
    `# Full CV as Markdown: ${base}/cv.md`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
