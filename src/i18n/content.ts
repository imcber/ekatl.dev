import { locales, parseLocale, type Locale } from "./config";

interface LocalizedEntry {
  id: string;
}

export function localeFromEntryId(id: string): Locale {
  return parseLocale(id.split("/")[0]);
}

export function createLocalizedPaths<T extends LocalizedEntry>(entries: T[]) {
  const entriesByLocale = new Map<Locale, T>();

  for (const entry of entries) {
    const locale = localeFromEntryId(entry.id);

    if (entriesByLocale.has(locale)) {
      throw new Error(`Hay más de una entrada para el idioma: ${locale}`);
    }

    entriesByLocale.set(locale, entry);
  }

  return locales.map((locale) => {
    const page = entriesByLocale.get(locale);

    if (!page) {
      throw new Error(`Falta contenido para el idioma: ${locale}`);
    }

    return { params: { lang: locale }, props: { page } };
  });
}
