import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** "YYYY-MM" — kept as a string so YAML never turns it into a timezone-shifted Date. */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Dates must be written as YYYY-MM, e.g. 2012-06');

/**
 * One file per position. Sorted for display by end date (ongoing first),
 * then by start date, both descending.
 */
const experience = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experience' }),
  schema: z.object({
    /** Job title. Omit to show the company name as the title (see uiq.md). */
    role: z.string().optional(),
    org: z.string(),
    location: z.string().optional(),
    start: yearMonth,
    /** null = ongoing */
    end: yearMonth.nullable().default(null),
    /** Green treatment for "own company" years. */
    highlight: z.boolean().default(false),
    /** Small outlined badge next to the role, e.g. "Assignment". */
    badge: z.string().optional(),
    /** Adds "· in parallel with own company" to the date line. */
    parallel: z.boolean().default(false),
    /** Nested roles held at the same company. */
    positions: z
      .array(
        z.object({
          title: z.string(),
          start: yearMonth,
          end: yearMonth,
          description: z.string(),
        }),
      )
      .default([]),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/education' }),
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    institutionUrl: z.url().optional(),
    start: z.number().int(),
    end: z.number().int(),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/certifications' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    issuerUrl: z.url().optional(),
    year: z.number().int().optional(),
    /** Display order, ascending. */
    order: z.number().default(0),
  }),
});

/** Single file: src/content/profile.md. The Markdown body is the hero lead paragraph. */
const profile = defineCollection({
  loader: glob({ pattern: 'profile.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      givenName: z.string(),
      familyName: z.string(),
      title: z.string(),
      headline: z.string(),
      portrait: image(),
      status: z.object({ left: z.string(), right: z.string() }),
      company: z.object({ name: z.string(), url: z.url() }),
      location: z.object({
        city: z.string(),
        region: z.string(),
        country: z.string(),
        countryCode: z.string().length(2),
      }),
      contact: z.object({
        email: z.email(),
        phone: z.string(),
        website: z.url(),
        linkedin: z.url(),
      }),
      footer: z.object({ heading: z.string(), note: z.string() }),
      clientsLabel: z.string(),
      clients: z.array(z.object({ name: z.string(), logo: image() })),
      experienceNote: z.string(),
      topSkills: z.array(z.string()),
      stack: z.array(z.string()),
      languages: z.array(z.object({ name: z.string(), level: z.string(), code: z.string() })),
      seo: z.object({ title: z.string(), description: z.string() }),
    }),
});

export const collections = { experience, education, certifications, profile };
