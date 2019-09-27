import render from "./rendervdomtoreal";
import createElement from "./createelement";
import { gettagtype } from "./util";
import { createcssBlob } from "./cssurlblob";
// import { RegExp } from "core-js";
import {appendchild,createanotherhtmldocument}from "./dom"
export function isCSSMediaRule(a: any): a is CSSMediaRule {
  return gettagtype(a) === "cssmediarule";
}

export function parsecsstext(text: string): Array<CSSRule> {
  const styleelement = render(createElement("style", undefined, text));
  //   console.dir(styleelement);
  /* 只有添加到document之后才会有sheet */
  //const otherdocument = document.implementation.createHTMLDocument("");
const otherdocument = createanotherhtmldocument()
appendchild(
  otherdocument.firstElementChild,styleelement);
 //otherdocument.firstElementChild.appendChild(styleelement); 
return Array.from(styleelement.sheet.cssRules);
}

export function isCSSStyleRule(a: any): a is CSSStyleRule {
  return gettagtype(a) === "cssstylerule";
}

export function selectoraddprefix(cssstylerule: CSSStyleRule, prefix: string) {
  const selectorText = cssstylerule.selectorText;
  if (selectorText.startsWith( "*")) {
    cssstylerule.selectorText =selectorText.replace("*", prefix);
  } else {
    cssstylerule.selectorText = prefix + " " + selectorText;
  }

  return cssstylerule;
}

export function prefixcssrules(
  cssRulesarray: Array<CSSRule>,
  prefix: string
): Array<CSSRule> {
  return cssRulesarray.map((cssrule: CSSRule) => {
    if (isCSSStyleRule(cssrule)) {
      return selectoraddprefix(cssrule, prefix);
    } else if (isCSSMediaRule(cssrule)) {
      prefixcssrules(Array.from(cssrule.cssRules), prefix);
      return cssrule;
    } else {
      return cssrule;
    }
  });
}

const componentsstylesheet = {};
export { componentsstylesheet };
export function savestyleblob(tagname: string, text: string) {
tagname=tagname.toLowerCase()
  if (!componentsstylesheet[tagname]) {
    componentsstylesheet[tagname] = createcssBlob(text);
  }
}
export function cssrulestocsstext(cssrules: Array<CSSRule>): string {
  return cssrules.map(c => c.cssText).join("\n");
  // .replace(/\n/g, "");
}
export function createlinkstylesheet(url: string) {
  return render(createElement("link", { href: url, rel: "stylesheet" }));
}
export function transformcsstext(text: string, prefix: string) {
  const css = text;
  const cssomold = parsecsstext(css);
  const cssomnew = prefixcssrules(cssomold, prefix);
  //   console.log([css, prefix, cssomold, cssomnew]);
  const cssnewtext = cssrulestocsstext(cssomnew);
  //   console.log([text, cssomold, cssomnew, cssnewtext]);
  return cssnewtext;
}
export function registercssprefix(text: string, prefix: string) {
  const css = text;
  const cssnewtext = transformcsstext(css, prefix);
  savestyleblob(prefix, cssnewtext);
}
