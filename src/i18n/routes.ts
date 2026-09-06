import type { Locale } from "./config";

export const routeSegments = {
  home: "",
  about: "about-me",
  projects: "projects",
  stack: "stack",
} as const;

export type RouteId = keyof typeof routeSegments;

export function normalizeBase(base: string): string {
  const segment = base.trim().replace(/^\/+|\/+$/g, "");
  return segment ? `/${segment}/` : "/";
}

export function localizedPath(
  locale: Locale,
  route: RouteId,
  base = import.meta.env.BASE_URL,
): string {
  const segment = routeSegments[route];
  return `${normalizeBase(base)}${locale}/${segment ? `${segment}/` : ""}`;
}

export function assetPath(
  path: string,
  base = import.meta.env.BASE_URL,
): string {
  return `${normalizeBase(base)}${path.replace(/^\/+/, "")}`;
}
