export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}

export function parseLocale(value: string | undefined): Locale {
  if (!isLocale(value)) {
    throw new Error(`Idioma no soportado: ${value ?? "undefined"}`);
  }

  return value;
}
