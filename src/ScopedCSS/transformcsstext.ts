import { prefixcssrules } from "./transform-prefix-cssrules";
import { cssrulestocsstext } from "./cssrulestocsstext";
import { parsecsstext } from "./parsecsstext";

export function transformcsstext(text: string, prefix: string): string {
  const cachedtext = oldcsstotransformedcss.get(text);
  if (cachedtext) {
    return cachedtext;
  } else {
    const css = text;
    const cssomold = parsecsstext(css);
    const cssomnew = prefixcssrules(cssomold, prefix).filter(Boolean);

    const cssnewtext = cssrulestocsstext(cssomnew);

    oldcsstotransformedcss.set(text, cssnewtext);
    return cssnewtext;
  }
}
const oldcsstotransformedcss = new Map<string, string>();
