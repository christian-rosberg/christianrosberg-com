/**
 * Renders the CV as plain Markdown. Feeds /cv.md, /llms.txt and /llms-full.txt.
 */
import { formatShort } from './dates';
import { dateLineOf, subtitleOf, titleOf, type CV } from './cv';

function trimBody(body: string | undefined): string {
  return (body ?? '').trim();
}

export function cvToMarkdown(cv: CV, siteUrl: string): string {
  const p = cv.profile.data;
  const lines: string[] = [];

  lines.push(`# ${p.name}`);
  lines.push('');
  lines.push(`**${p.title}** — ${p.company.name}, ${p.location.city}, ${p.location.country}.`);
  lines.push('');
  lines.push(`## ${p.headline}`);
  lines.push('');
  lines.push(trimBody(cv.profile.body));
  lines.push('');

  lines.push('## Selected clients and employers');
  lines.push('');
  lines.push(p.clients.map((c) => c.name).join(', ') + '.');
  lines.push('');

  lines.push('## Experience');
  lines.push('');
  for (const e of cv.experience) {
    lines.push(`### ${titleOf(e)}`);
    lines.push('');
    const sub = subtitleOf(e);
    if (sub) lines.push(`${sub}  `);
    lines.push(`${dateLineOf(e)}${e.data.badge ? ` · ${e.data.badge}` : ''}`);
    lines.push('');
    const body = trimBody(e.body);
    if (body) {
      lines.push(body);
      lines.push('');
    }
    for (const pos of e.data.positions) {
      lines.push(`- **${pos.title}** (${formatShort(pos.start)} — ${formatShort(pos.end)}): ${pos.description}`);
    }
    if (e.data.positions.length) lines.push('');
  }

  lines.push('## Top skills');
  lines.push('');
  lines.push(p.topSkills.map((s) => `- ${s}`).join('\n'));
  lines.push('');
  lines.push('## Stack');
  lines.push('');
  lines.push(p.stack.map((s) => `- ${s}`).join('\n'));
  lines.push('');

  lines.push('## Languages');
  lines.push('');
  lines.push(p.languages.map((l) => `- ${l.name} — ${l.level}`).join('\n'));
  lines.push('');

  lines.push('## Education');
  lines.push('');
  for (const ed of cv.education) {
    lines.push(`### ${ed.data.title}`);
    lines.push('');
    lines.push(`${ed.data.institution} · ${ed.data.start}${ed.data.end !== ed.data.start ? ` — ${ed.data.end}` : ''}`);
    lines.push('');
    const body = trimBody(ed.body);
    if (body) {
      lines.push(body);
      lines.push('');
    }
  }

  lines.push('## Certifications');
  lines.push('');
  for (const c of cv.certifications) {
    lines.push(`### ${c.data.title}`);
    lines.push('');
    lines.push(c.data.year ? `${c.data.issuer} · ${c.data.year}` : c.data.issuer);
    lines.push('');
    const body = trimBody(c.body);
    if (body) {
      lines.push(body);
      lines.push('');
    }
  }

  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${p.contact.email}`);
  lines.push(`- Phone: ${p.contact.phone}`);
  lines.push(`- Website: ${p.contact.website}`);
  lines.push(`- LinkedIn: ${p.contact.linkedin}`);
  lines.push(`- This page: ${siteUrl}`);
  lines.push('');
  lines.push(`_Last updated ${cv.builtOn}._`);
  lines.push('');

  return lines.join('\n');
}

/** The short llms.txt index (https://llmstxt.org). */
export function llmsIndex(cv: CV, siteUrl: string): string {
  const p = cv.profile.data;
  const base = siteUrl.replace(/\/$/, '');
  return [
    `# ${p.name}`,
    '',
    `> ${p.seo.description}`,
    '',
    `${p.name} is a ${p.title.toLowerCase()} running ${p.company.name} in ${p.location.city}, ${p.location.country}. ` +
      `This site is a one-page CV: experience since ${cv.experience.at(-1)?.data.start.slice(0, 4)}, education, certifications, skills, languages and contact details. ` +
      `All content is authored by ${p.name} and kept current.`,
    '',
    '## CV',
    '',
    `- [Full CV as Markdown](${base}/cv.md): every section of the site as plain Markdown`,
    `- [Web page](${base}/): the human-readable one-pager`,
    '',
    '## Contact',
    '',
    `- [Email](mailto:${p.contact.email}): ${p.contact.email}`,
    `- [LinkedIn](${p.contact.linkedin}): professional profile`,
    `- [Company website](${p.contact.website}): ${p.company.name}`,
    '',
    '## Optional',
    '',
    `- [Sitemap](${base}/sitemap-index.xml)`,
    '',
  ].join('\n');
}
