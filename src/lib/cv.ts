/**
 * Loads every content collection once and exposes a single typed CV object.
 * Used by the page, the JSON-LD, the Markdown/llms.txt outputs and the OG image,
 * so they can never drift apart.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { formatDuration, formatLong, inclusiveMonths, yearOf } from './dates';

export type ExperienceEntry = CollectionEntry<'experience'>;
export type EducationEntry = CollectionEntry<'education'>;
export type CertificationEntry = CollectionEntry<'certifications'>;
export type Profile = CollectionEntry<'profile'>;

export interface CV {
  profile: Profile;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  /** Build timestamp, ISO date (YYYY-MM-DD). */
  builtOn: string;
}

let cached: Promise<CV> | undefined;

export function loadCV(): Promise<CV> {
  cached ??= (async () => {
    const profile = await getEntry('profile', 'profile');
    if (!profile) throw new Error('src/content/profile.md is missing');

    const experience = (await getCollection('experience')).sort(byEndThenStartDesc);
    const education = (await getCollection('education')).sort((a, b) => b.data.end - a.data.end);
    const certifications = (await getCollection('certifications')).sort(
      (a, b) => a.data.order - b.data.order,
    );

    return {
      profile,
      experience,
      education,
      certifications,
      builtOn: new Date().toISOString().slice(0, 10),
    };
  })();
  return cached;
}

/**
 * Own-company (highlighted) entries first, then ongoing roles, then most
 * recently ended, then most recently started.
 */
function byEndThenStartDesc(a: ExperienceEntry, b: ExperienceEntry): number {
  if (a.data.highlight !== b.data.highlight) return a.data.highlight ? -1 : 1;
  const endA = a.data.end ?? '9999-12';
  const endB = b.data.end ?? '9999-12';
  if (endA !== endB) return endA < endB ? 1 : -1;
  return a.data.start < b.data.start ? 1 : -1;
}

/** Display title: the role, or the company when no role is given (nested positions). */
export function titleOf(entry: ExperienceEntry): string {
  return entry.data.role ?? entry.data.org;
}

/** Secondary line: "Org · Location", or just the location when the org is the title. */
export function subtitleOf(entry: ExperienceEntry): string {
  const { role, org, location } = entry.data;
  if (!role) return location ?? '';
  return location ? `${org} · ${location}` : org;
}

/** "June 2012 — Present · 14 yrs 4 mos · in parallel with own company" */
export function dateLineOf(entry: ExperienceEntry): string {
  const { start, end, parallel } = entry.data;
  const parts = [
    `${formatLong(start)} — ${end ? formatLong(end) : 'Present'}`,
    formatDuration(inclusiveMonths(start, end)),
  ];
  if (parallel) parts.push('in parallel with own company');
  return parts.join(' · ');
}

/** Gutter sub-label under the start year: "ONGOING" or "— 2023". */
export function endLabelOf(entry: ExperienceEntry): string {
  return entry.data.end ? `— ${yearOf(entry.data.end)}` : 'ONGOING';
}
