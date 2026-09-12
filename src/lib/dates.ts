/** Date helpers for "YYYY-MM" strings. All durations are computed at build time. */

const LONG_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface YearMonth {
  year: number;
  month: number; // 1–12
}

export function parseYearMonth(value: string): YearMonth {
  const [y, m] = value.split('-').map(Number);
  return { year: y, month: m };
}

export function yearOf(value: string): number {
  return parseYearMonth(value).year;
}

/** "June 2012" */
export function formatLong(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${LONG_MONTHS[month - 1]} ${year}`;
}

/** "Jun 2012" */
export function formatShort(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${LONG_MONTHS[month - 1].slice(0, 3)} ${year}`;
}

/** Current month as "YYYY-MM" (the build date). */
export function currentYearMonth(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Inclusive month count, the way LinkedIn counts: June 2012 → September 2026
 * is 172 months = 14 yrs 4 mos. `end === null` means ongoing.
 */
export function inclusiveMonths(start: string, end: string | null, now: Date = new Date()): number {
  const a = parseYearMonth(start);
  const b = parseYearMonth(end ?? currentYearMonth(now));
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

/** "14 yrs 4 mos" · "1 yr 6 mos" · "11 mos" · "4 yrs" */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ') || '0 mos';
}

/** Compact ISO-8601 duration for schema.org / datetime attributes, e.g. "P14Y4M". */
export function isoDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return `P${years ? `${years}Y` : ''}${rest ? `${rest}M` : ''}` || 'P0M';
}
