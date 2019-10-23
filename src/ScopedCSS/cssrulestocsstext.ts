export function cssrulestocsstext(cssrules: Array<CSSRule>): string {
  return cssrules.map(c => c.cssText).join("\n");
  // .replace(/\n/g, "");
}
