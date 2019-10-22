import createElement from "../CreateElement/create-element";
import render from "../RenderVirtual/render-vdom-to-real";
// import { RegExp } from "core-js";
import {
  appendchild,
  createanotherhtmldocument /* , insertfirst */
} from "../UtilTools/dom";
import { get } from "../UtilTools/reflect";
import { createcssBlob } from "./create-cssurlblob";
import { prefixcssrules } from "./transform-prefix-cssrules";

export function parsecsstext(text: string): Array<CSSRule> {
  const styleelement = render(
    createElement("style", [text])
  ) as HTMLStyleElement;
  //   console.dir(styleelement);
  /* 只有添加到document之后才会有sheet */
  //const otherdocument = document.implementation.createHTMLDocument("");
  const otherdocument = createanotherhtmldocument();
  appendchild(otherdocument.documentElement, styleelement);
  //otherdocument.firstElementChild.appendChild(styleelement);
  return Array.from(
    get(
      get(styleelement, "sheet"),

      "cssRules"
    )
  );
}

const componentsstylesheet: Record<string, Set<string>> = {};
// { [key: string]: Set<string> }

export { componentsstylesheet };
export function savestyleblob(
  tagname: string,
  csstext?: string,
  urltext?: string
) {
  tagname = tagname.toLowerCase();
  if (!componentsstylesheet[tagname]) {
    componentsstylesheet[tagname] = new Set();
  }
  if (csstext) {
    componentsstylesheet[tagname].add(createcssBlob(csstext));
  } else if (urltext) {
    componentsstylesheet[tagname].add(urltext);
  }
}
export function cssrulestocsstext(cssrules: Array<CSSRule>): string {
  return cssrules.map(c => c.cssText).join("\n");
  // .replace(/\n/g, "");
}
export function createlinkstylesheet(url: string): HTMLLinkElement {
  return render(
    createElement("link", { href: url, rel: "stylesheet" })
  ) as HTMLLinkElement;
}
export function transformcsstext(text: string, prefix: string): string {
  const css = text;
  const cssomold = parsecsstext(css);
  const cssomnew = prefixcssrules(cssomold, prefix).filter(Boolean);
  //   console.log(cssomnew);
  //   console.log([css, prefix, cssomold, cssomnew]);
  const cssnewtext = cssrulestocsstext(cssomnew);
  //   console.log([text, cssomold, cssomnew, cssnewtext]);
  return cssnewtext;
}
export function registercssprefix(text: string, prefix: string) {
  const css = text;
  const cssnewtext = transformcsstext(css, prefix);
  //   cssnewtext.forEach(url => {
  /* 把css文字转成url放入 */
  savestyleblob(prefix, cssnewtext);
  //   });
}
export function loadlinkstyle(
  stylelinkelement: HTMLElement,
  container: HTMLElement | Element | SVGSVGElement | SVGElement
): Promise<void> {
  return new Promise(rs => {
    const loaderrorfun = () => {
      stylelinkelement.onload = stylelinkelement.onerror = null;
      rs();
      //   console.log(stylelinkelement.href);
    };
    stylelinkelement.onload = loaderrorfun;
    stylelinkelement.onerror = loaderrorfun;
    appendchild(container, stylelinkelement);
  });
}

export  function waitloadallstyle(
  prefix: string,
  containerthis: Element | HTMLElement | SVGSVGElement | SVGElement
) {
  return Promise.all(
    [...componentsstylesheet[prefix]].map(styleurl =>
      loadlinkstyle(createlinkstylesheet(styleurl), containerthis)
    )
  );
}
