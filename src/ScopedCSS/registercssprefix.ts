import { transformcsstext } from "./transformcsstext";
import { savestyleblob } from "./savestyleblob";

export function registercssprefix(text: string, prefix: string) {
  const css = text;
  const cssnewtext = transformcsstext(css, prefix);

  /* 把css文字转成url放入 */
  savestyleblob(prefix, cssnewtext);
}
