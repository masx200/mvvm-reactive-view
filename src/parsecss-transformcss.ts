export function isCSSStyleRule(a: any): a is CSSStyleRule {
  return gettagtype(a) === "CSSStyleRule";
}
import createElement from "./createelement";
import { createcssBlob } from "./cssurlblob";
// import { RegExp } from "core-js";
import { appendchild, createanotherhtmldocument /* , insertfirst */ } from "./dom";
import { get } from "./reflect";
import render from "./render-vdom-to-real";
import { gettagtype } from "./util";
export function isCSSMediaRule(a: any): a is CSSMediaRule {
  return gettagtype(a) === "CSSMediaRule";
}
export function isCSSImportRule(a: any): a is CSSImportRule {
  return gettagtype(a) === "CSSImportRule";
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

export function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string) {
  /* 突然发现Edge浏览器的 CSSStyleRule的selectorText属性居然是只读的?*/
  //css 选择器可能有多个
  //h1,p,h3,div
  const selectorold = cssstylerule.selectorText;
  const stylebodyold = cssstylerule.cssText.slice(selectorold.length);
  const selectorTextss = selectorold;

  const selectorarray = selectorTextss.split(",");
  const selectoraftertransform = selectorarray
    .map(selectorTextone => {
      let prefixselector = prefix + " " + selectorTextone;

      if (selectorTextone.startsWith("*")) {
        prefixselector =
          prefixselector + "," + selectorTextone.replace("*", prefix);
      }
      return prefixselector;
    })
    .join(",");

  /*   cssstylerule.selectorText = selectoraftertransform;
  if (cssstylerule.selectorText.startsWith(prefix)) {
    return cssstylerule;
  } else { */
  // console.trace();
  return {
    type: cssstylerule.type,
    parentRule: cssstylerule.parentRule,
    parentStyleSheet: cssstylerule.parentStyleSheet,
    style: cssstylerule.style,
    styleMap: get(cssstylerule, "styleMap"),
    selectorText: selectoraftertransform,
    cssText: selectoraftertransform + stylebodyold,
    // cssText: selectoraftertransform + stylebodyold,
    // selectorText: selectoraftertransform,
    [Symbol.toStringTag]: "CSSStyleRule"
  };
  // }

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
}

export function prefixcssrules(
  cssRulesarray: Array<CSSRule>,
  prefix: string
): Array<CSSRule> {
  return cssRulesarray
    .map((cssrule: CSSRule) => {
      if (isCSSStyleRule(cssrule)) {
        const resultoutput = selectoraddprefix(cssrule, prefix);
        // console.log(resultoutput);
        return resultoutput;
      } else if (isCSSMediaRule(cssrule)) {
        prefixcssrules([...cssrule.cssRules], prefix);
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

export async function waitloadallstyle(
  prefix: string,
  containerthis: Element | HTMLElement | SVGSVGElement | SVGElement
) {
  await Promise.all(
    [...componentsstylesheet[prefix]].map(styleurl =>
      loadlinkstyle(createlinkstylesheet(styleurl), containerthis)
    )
  );
}
