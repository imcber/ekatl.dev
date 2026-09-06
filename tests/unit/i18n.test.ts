import { describe, expect, it } from "vitest";
import {
  createLocalizedPaths,
  localeFromEntryId,
} from "../../src/i18n/content";
import { isLocale, parseLocale } from "../../src/i18n/config";
import { assetPath, localizedPath, normalizeBase } from "../../src/i18n/routes";

describe("configuración de idiomas", () => {
  it("acepta únicamente los idiomas soportados", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(() => parseLocale("fr")).toThrow("Idioma no soportado");
  });

  it("obtiene el idioma desde un ID de contenido", () => {
    expect(localeFromEntryId("es/home")).toBe("es");
    expect(localeFromEntryId("en/projects")).toBe("en");
  });
});

describe("construcción de rutas", () => {
  it("normaliza el prefijo de despliegue", () => {
    expect(normalizeBase("/")).toBe("/");
    expect(normalizeBase("ektl.dev")).toBe("/ektl.dev/");
    expect(normalizeBase("/ektl.dev/")).toBe("/ektl.dev/");
  });

  it("construye rutas localizadas con una sola copia del base", () => {
    expect(localizedPath("es", "home", "/ektl.dev/")).toBe("/ektl.dev/es/");
    expect(localizedPath("en", "projects", "/ektl.dev/")).toBe(
      "/ektl.dev/en/projects/",
    );
    expect(localizedPath("es", "about", "/")).toBe("/es/about-me/");
  });

  it("construye rutas para recursos estáticos", () => {
    expect(assetPath("favicon.svg", "/ektl.dev/")).toBe(
      "/ektl.dev/favicon.svg",
    );
  });
});

describe("rutas de contenido", () => {
  it("genera una ruta por cada idioma soportado", () => {
    const entries = [{ id: "en/home" }, { id: "es/home" }];
    expect(createLocalizedPaths(entries)).toEqual([
      { params: { lang: "es" }, props: { page: entries[1] } },
      { params: { lang: "en" }, props: { page: entries[0] } },
    ]);
  });

  it("falla si falta una traducción", () => {
    expect(() => createLocalizedPaths([{ id: "es/home" }])).toThrow(
      "Falta contenido para el idioma: en",
    );
  });

  it("falla si aparece un idioma no soportado", () => {
    expect(() =>
      createLocalizedPaths([
        { id: "es/home" },
        { id: "en/home" },
        { id: "fr/home" },
      ]),
    ).toThrow("Idioma no soportado: fr");
  });
});
