import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const greetingCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/home",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    greetings: z.object({
      hello: z.string(),
      name: z.string(),
      rest: z.string(),
      alias: z.string(),
      profile: z.string(),
      projects: z.string(),
      about: z.string(),
      tooltip: z.string(),
      contact: z.string(),
    }),
    contact: z.object({
      touch: z.string(),
      description: z.string(),
      resume: z.string(),
      social: z.array(
        z.object({
          title: z.enum(["github", "linkedin", "instagram"]),
          url: z.string(),
        }),
      ),
    }),
  }),
});

const aboutMeCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/about-me",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    hello: z.string(),
    about: z.string(),
    table: z.array(
      z.object({
        description: z.string(),
        value: z.string(),
      }),
    ),
  }),
});

const headerCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/header",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    backHome: z.string(),
    back: z.string(),
    home: z.string(),
    "about-me": z.string(),
    projects: z.string(),
    stack: z.string(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/projects",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    title_page: z.string(),
    title_year: z.string(),
    title_rol: z.string(),
    title_about: z.string(),
    title_task: z.string(),
    title_visit_site: z.string(),
    work: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        about: z.string(),
        task: z.string(),
        year: z.string(),
        rol: z.string(),
        url: z.string(),
        tags: z.array(z.string()),
      }),
    ),
  }),
});

export const collections = {
  home: greetingCollection,
  aboutMe: aboutMeCollection,
  header: headerCollection,
  projects: projectsCollection,
};
