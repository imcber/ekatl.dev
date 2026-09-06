import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const transitionCss = readFileSync(
  new URL("../../src/styles/screenAnimation.css", import.meta.url),
  "utf8",
);

describe("page transition", () => {
  it("preserves the diagonal clipping in both directions", () => {
    expect(transitionCss).toContain("@keyframes slide-in-right");
    expect(transitionCss).toContain("@keyframes slide-in-left");
    expect(transitionCss).toContain("@keyframes slide-in-top");
    expect(transitionCss).toContain(
      "clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 70% 100%)",
    );
    expect(transitionCss).toContain(
      "clip-path: polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)",
    );
  });
});
