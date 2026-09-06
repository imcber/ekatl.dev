# CLAUDE.md — ektl.dev

Portfolio personal de Bernardo Ramírez. Sitio estático (SSG) con soporte bilingüe es/en, deployado en GitHub Pages.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 5 (SSG, sin adaptador de runtime) |
| UI interactiva | React 19 (`@astrojs/react`) |
| Estilos | Tailwind CSS 4 vía `@tailwindcss/vite` + CSS custom properties |
| Fuentes | Inter (sans), Montserrat (serif) — `@fontsource` |
| Package manager | pnpm 10.15.1 |
| Tipado | TypeScript strict (`strictNullChecks: true`, jsx: `react-jsx`) |
| Imágenes | Sharp 0.34.4 |

## Comandos

```bash
pnpm dev        # Dev server expuesto en red (--host)
pnpm build      # Build de producción → ./dist/
pnpm preview    # Preview del build local
pnpm lint       # Formatear todo con Prettier (sobreescribe)
```

## Estructura

```
src/
├── pages/
│   ├── index.astro          # Redirect a /es/
│   └── [lang]/              # Rutas dinámicas por idioma
│       ├── index.astro      # Home
│       ├── projects.astro
│       ├── stack.astro
│       └── about-me.astro
├── components/
│   ├── Home/                # Welcome, Background3D, Tooltip
│   ├── Projects/            # ProjectContainer, ProjectCard
│   ├── About/               # AboutMe
│   ├── Stack/               # StackContainer (hardcoded), Cards
│   ├── commons/             # CommonHead (meta + ClientRouter)
│   ├── Header.astro
│   └── Contact.astro
├── layouts/
│   └── Layout.astro         # Envuelve cada página; gestiona View Transitions y GA4
├── content/                 # Colecciones JSON por idioma
│   ├── home/{es,en}/home.json
│   ├── about-me/{es,en}/about-me.json
│   ├── header/{es,en}/header.json
│   └── projects/{es,en}/projects.json
├── lib/
│   └── screenTransition.mjs # Objetos de animación para View Transitions
└── styles/
    ├── global.css           # @theme Tailwind + variables CSS + fuentes
    └── screenAnimation.css  # @keyframes slide-left / slide-rigth
```

## i18n

- Locales: `es` (default) y `en` — ambos con prefijo (`prefixDefaultLocale: true`)
- Rutas resultantes: `/ektl.dev/es/`, `/ektl.dev/en/`
- Cada página llama a `getCollection("colección")` y mapea los entries por idioma:

```astro
export async function getStaticPaths() {
  const pages = await getCollection("home");
  return pages.map((page) => ({
    params: { lang: page.id.split("/")[0] },
    props: { page },
  }));
}
```

- El `id` de cada entry sigue el patrón `{lang}/{nombre}` (ej. `"es/home"`, `"en/home"`)
- El `Header` calcula `baseSlug` desde `Astro.url.pathname` para preservar la ruta al cambiar de idioma

## Colecciones de contenido (`src/content.config.js`)

Todas usan `glob()` loader con Zod. Para agregar contenido: editar los JSON y actualizar el schema si se añaden campos.

| Colección | Campos raíz |
|-----------|-------------|
| `home` | `greetings` (objeto con hello/name/rest/alias/profile/projects/about/tooltip/contact), `contact` (objeto con touch/description/resume + `social[]`) |
| `aboutMe` | `hello`, `about`, `table[]` (array de `{description, value}`) |
| `header` | `about-me`, `projects`, `stack` (strings para labels de nav) |
| `projects` | `title_page/year/rol/about/task` (labels de columnas), `work[]` (array de proyectos) |

**Shape de un proyecto:**
```json
{
  "id": "string",
  "name": "string",
  "about": "string",
  "task": "string",
  "year": "string",
  "rol": "string",
  "url": "string",
  "tags": ["string"]
}
```

> **Nota:** El stack de tecnologías (`StackContainer.astro`) está hardcodeado en el componente, no en una colección JSON.

## Componentes clave

### `Layout.astro`

Props: `{ currentLang: string }`

- Activa `transition:animate` condicionalmente: home usa `screenTransitionBack` (slide derecha), el resto usa `screenTransition` (slide izquierda)
- Incluye GA4 inline (`G-3GFXE31GD8`)
- El video de fondo (`Background3D`) usa `transition:persist` para sobrevivir a las transiciones

### `Header.astro`

Props: `{ currentLang, showBackButton?, isDarkmode?, isAbsolute? }`

- `showBackButton`: muestra flecha de regreso (páginas internas)
- `isDarkmode`: adapta colores de texto para fondos claros (About)
- `isAbsolute`: posicionamiento absoluto (Home) vs estático (resto)

## Estilos / Tema

Variables CSS definidas en `src/styles/global.css`:

```css
--foreground:      #10160a   /* negro verdoso */
--principal:       #f2f5f3   /* blanco crema */
--principal_light: #fffdf9   /* crema muy claro */
--secondary:       #3a5f4a   /* verde medio */
--secondary_light: #93ad9e   /* verde claro */
```

Referenciadas en Tailwind mediante `@theme` como `foreground`, `principal`, etc.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`): push a `main` → `pnpm build` → GitHub Pages.

- `base: '/ektl.dev/'` en `astro.config.mjs` — todos los links internos deben usar `import.meta.env.BASE_URL` o rutas absolutas con el prefijo
- `site: 'https://ektl.dev'`

## Convenciones

- Todo texto visible al usuario vive en los JSON de `src/content/` — no hardcodear cadenas en componentes
- Componentes organizados por sección (Home, Projects, About, Stack), no por tipo
- Formatear siempre con `pnpm lint` antes de commitear
- No hay `src/env.d.ts`; Astro genera tipos automáticamente en `.astro/types.d.ts`
