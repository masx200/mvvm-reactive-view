import createElement from "../CreateElement/create-element";
import render from "../RenderVirtual/render-vdom-to-real";
// import { RegExp } from "core-js";
import {
  appendchild,
  createanotherhtmldocument /* , insertfirst */
} from "../UtilTools/dom";
import { get, set } from "../UtilTools/reflect";
import { createcssBlob } from "./create-cssurlblob";
import { transformcsstext } from "./transformcsstext";

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

const componentsstylesheet: Map<string, Set<string>> = new Map();
// { [key: string]: Set<string> }

export { componentsstylesheet };
export function savestyleblob(
  tagname: string,
  csstext?: string,
  urltext?: string
) {
  tagname = tagname.toLowerCase();
  const prefix = tagname;
  if (
    !get(componentsstylesheet, prefix)
    // componentsstylesheet[tagname]
  ) {
    set(componentsstylesheet, tagname, new Set());
    // componentsstylesheet[tagname] = ;
  }
  if (csstext) {
    get(componentsstylesheet, prefix).add(createcssBlob(csstext));
  } else if (urltext) {
    get(componentsstylesheet, prefix).add(urltext);
  }
}

export function createlinkstylesheet(url: string): HTMLLinkElement {
  return render(
    createElement("link", { href: url, rel: "stylesheet" })
  ) as HTMLLinkElement;
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
