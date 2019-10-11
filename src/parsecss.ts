import createElement from "./createelement";
import { createcssBlob } from "./cssurlblob";
// import { RegExp } from "core-js";
import {
  appendchild,
  createanotherhtmldocument /* , insertfirst */
} from "./dom";
import { get } from "./reflect";
import render from "./rendervdomtoreal";
import { gettagtype } from "./util";
export function isCSSMediaRule(a: any): a is CSSMediaRule {
  return gettagtype(a) === "cssmediarule";
}
export function isCSSImportRule(a: any): a is CSSImportRule {
  return gettagtype(a) === "cssimportrule";
}

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

export function isCSSStyleRule(a: any): a is CSSStyleRule {
  return gettagtype(a) === "cssstylerule";
}

export function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string) {
  //css 选择器可能有多个
  //h1,p,h3,div
  const selectorText = cssstylerule.selectorText;

  const selectorarray = selectorText.split(",");
  cssstylerule.selectorText = selectorarray
    .map(selectorText => {
      let prefixselector = prefix + " " + selectorText;

      if (selectorText.startsWith("*")) {
        prefixselector =
          prefixselector + "," + selectorText.replace("*", prefix);
      }
      return prefixselector;
    })
    .join(",");
  /*
  const prefixselector = prefix + " " + selectorText;
  if (selectorText.startsWith("*")) {
    cssstylerule.selectorText =
      selectorText.replace("*", prefix) + "," + prefixselector;
    /* 对于'* '的处理,变成两个selectorrule*/

  /* 
    *{font-size:80px !important;}
p{color:blue !important;} 
*/
  /* 
    
    q-9, q-9 * { font-size: 80px !important; }
q-9 p { color: blue !important; }

    */
  /* } else {
    cssstylerule.selectorText = prefixselector;
  }
*/
  return cssstylerule;
}

export function prefixcssrules(
  cssRulesarray: Array<CSSRule>,
  prefix: string
): Array<CSSRule> {
  return cssRulesarray
    .map((cssrule: CSSRule) => {
      if (isCSSStyleRule(cssrule)) {
        return selectoraddprefix(cssrule, prefix);
      } else if (isCSSMediaRule(cssrule)) {
        prefixcssrules(Array.from(cssrule.cssRules), prefix);
        return cssrule;
      } else if (isCSSImportRule(cssrule)) {
        //把url放入
        savestyleblob(prefix, undefined, cssrule.href);
        return;
      } else {
        return cssrule;
      }
    })
    .filter(Boolean) as Array<CSSRule>;
}

const componentsstylesheet: { [key: string]: Set<string> } = {};
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
  //   console.log([css, prefix, cssomold, cssomnew]);
  const cssnewtext = cssrulestocsstext(cssomnew);
  //   console.log([text, cssomold, cssomnew, cssnewtext]);
  return cssnewtext;
}
export async function registercssprefix(text: string, prefix: string) {
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

export async function waitloadallstyle(
  prefix: string,
  _this: Element | HTMLElement | SVGSVGElement | SVGElement
) {
  await Promise.all(
    [...componentsstylesheet[prefix]].map(styleurl =>
      loadlinkstyle(createlinkstylesheet(styleurl), _this)
    )
  );
}
