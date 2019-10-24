import { transformcsstext } from "./transformcsstext";
import { savestyleblob } from "./savestyleblob";
// import { savestyleblob } from "./parsecss-transformcss";

export function registercssprefix(text: string, prefix: string) {
  //   debugger;
  //   console.trace();
  const css = text;
  const cssnewtext = transformcsstext(css, prefix);
  //   cssnewtext.forEach(url => {
  /* 把css文字转成url放入 */
  savestyleblob(prefix, cssnewtext);
  //   });
}
