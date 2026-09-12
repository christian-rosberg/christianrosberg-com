/** schema.org structured data: a ProfilePage whose main entity is the Person. */
import { inclusiveMonths, isoDuration } from './dates';
import { titleOf, type CV } from './cv';

export function buildJsonLd(cv: CV, siteUrl: string, portraitUrl: string) {
  const p = cv.profile.data;
  const base = siteUrl.replace(/\/$/, '');
  const personId = `${base}/#person`;

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: p.name,
    givenName: p.givenName,
    familyName: p.familyName,
    jobTitle: p.title,
    description: (cv.profile.body ?? '').trim(),
    url: base + '/',
    image: portraitUrl,
    email: `mailto:${p.contact.email}`,
    telephone: p.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: p.location.city,
      addressRegion: p.location.region,
      addressCountry: p.location.countryCode,
    },
    worksFor: {
      '@type': 'Organization',
      name: p.company.name,
      url: p.company.url,
    },
    sameAs: [p.contact.linkedin, p.contact.website],
    knowsAbout: [...p.topSkills, ...p.stack],
    knowsLanguage: p.languages.map((l) => ({
      '@type': 'Language',
      name: l.name,
      alternateName: l.code,
    })),
    alumniOf: cv.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.data.institution,
      ...(e.data.institutionUrl ? { url: e.data.institutionUrl } : {}),
    })),
    hasCredential: [
      ...cv.education.map((e) => ({
        '@type': 'EducationalOccupationalCredential',
        name: e.data.title,
        credentialCategory: 'degree',
        recognizedBy: { '@type': 'EducationalOrganization', name: e.data.institution },
      })),
      ...cv.certifications.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.data.title,
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: c.data.issuer },
      })),
    ],
    hasOccupation: cv.experience.map((e) => ({
      '@type': 'OrganizationRole',
      roleName: titleOf(e),
      startDate: e.data.start,
      ...(e.data.end ? { endDate: e.data.end } : {}),
      duration: isoDuration(inclusiveMonths(e.data.start, e.data.end)),
      memberOf: { '@type': 'Organization', name: e.data.org },
      ...(e.body?.trim() ? { description: e.body.trim() } : {}),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${base}/#profilepage`,
        url: base + '/',
        name: p.seo.title,
        description: p.seo.description,
        inLanguage: 'en',
        dateModified: cv.builtOn,
        mainEntity: { '@id': personId },
        isPartOf: { '@id': `${base}/#website` },
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: base + '/',
        name: p.name,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
      person,
    ],
  };
}
