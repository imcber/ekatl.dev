import { expect, test } from "@playwright/test";

const routes = ["", "about-me/", "projects/", "stack/"];

for (const locale of ["es", "en"] as const) {
  for (const route of routes) {
    test(`${locale}/${route || "home"} carga con el idioma correcto`, async ({
      page,
    }) => {
      const response = await page.goto(`${locale}/${route}`);

      expect(response?.ok()).toBe(true);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("main")).toBeVisible();
    });
  }
}

test("cambiar idioma conserva la sección actual", async ({ page }) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "[ en ]" }).click();

  await expect(page).toHaveURL(/\/ektl\.dev\/en\/projects\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("el botón de regreso usa home como alternativa en una visita directa", async ({
  page,
}) => {
  await page.goto("en/about-me/");
  await page
    .getByRole("link", { name: "Go back to the previous page" })
    .click();

  await expect(page).toHaveURL(/\/ektl\.dev\/en\/$/);
});

test("el botón de regreso vuelve a la página anterior", async ({ page }) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "quien-soy" }).click();
  await expect(page).toHaveURL(/\/ektl\.dev\/es\/about-me\/$/);

  await page.getByRole("link", { name: "Volver a la página anterior" }).click();

  await expect(page).toHaveURL(/\/ektl\.dev\/es\/projects\/$/);
});

test("el nombre del sitio navega a home con una transición vertical", async ({
  page,
}) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "Ir a la página de inicio" }).click();
  await page.waitForTimeout(50);

  await expect(page).toHaveURL(/\/ektl\.dev\/es\/$/);
  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-new(page-content)",
        ).animationName,
    ),
  ).toContain("slide-in-top");
});

test("atrás y adelante conservan la ruta y el idioma", async ({ page }) => {
  await page.goto("es/");
  await page.getByRole("link", { name: "proyectos" }).click();
  await expect(page).toHaveURL(/\/ektl\.dev\/es\/projects\/$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/ektl\.dev\/es\/$/);

  await page.goForward();
  await expect(page).toHaveURL(/\/ektl\.dev\/es\/projects\/$/);
});

test("la navegación funciona con movimiento reducido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("en/");
  await page.getByRole("link", { name: "projects" }).click();

  await expect(page).toHaveURL(/\/ektl\.dev\/en\/projects\/$/);
  expect(
    await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
});

test("la transición conserva la página anterior bajo una superficie opaca", async ({
  page,
}) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "stack", exact: true }).click();
  await page.waitForTimeout(50);

  const transitionStyles = await page.evaluate(() => ({
    oldOpacity: getComputedStyle(
      document.documentElement,
      "::view-transition-old(page-content)",
    ).opacity,
    newAnimationName: getComputedStyle(
      document.documentElement,
      "::view-transition-new(page-content)",
    ).animationName,
    mainBackground: getComputedStyle(document.querySelector("main")!)
      .backgroundColor,
  }));

  expect(Number(transitionStyles.oldOpacity)).toBeGreaterThanOrEqual(0.99);
  expect(transitionStyles.newAnimationName).toContain("slide-in-right");
  expect(transitionStyles.mainBackground).not.toBe("rgba(0, 0, 0, 0)");
});

test("el regreso contextual conserva la animación hacia la izquierda", async ({
  page,
}) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "quien-soy", exact: true }).click();
  await page.waitForTimeout(750);
  await page.getByRole("link", { name: "Volver a la página anterior" }).click();
  await page.waitForTimeout(50);

  expect(
    await page.evaluate(
      () =>
        getComputedStyle(
          document.documentElement,
          "::view-transition-new(page-content)",
        ).animationName,
    ),
  ).toContain("slide-in-left");
});

test("el regreso nativo evita una segunda animación personalizada", async ({
  page,
}) => {
  await page.goto("es/projects/");
  await page.getByRole("link", { name: "quien-soy", exact: true }).click();
  await page.waitForTimeout(750);
  await page.goBack();
  await page.waitForTimeout(50);

  expect(
    await page.evaluate(() =>
      document.getAnimations().some((animation) => {
        const effect = animation.effect;

        return (
          effect instanceof KeyframeEffect &&
          effect.pseudoElement?.includes("page-content") === true &&
          animation.playState === "running"
        );
      }),
    ),
  ).toBe(false);
});

test("la entrada canónica de GitHub Pages redirige al español", async ({
  page,
}) => {
  await page.goto("/ektl.dev/");
  await expect(page).toHaveURL(/\/ektl\.dev\/es\/$/);
});

test("los recursos públicos respetan el base de GitHub Pages", async ({
  request,
}) => {
  for (const asset of ["favicon.svg", "resume/es.pdf", "resume/en.pdf"]) {
    const response = await request.get(asset);
    expect(response.ok(), asset).toBe(true);
  }
});
