import { isCSSStyleRule, isCSSMediaRule, isCSSImportRule } from "./isCSSRule";
import { selectoraddprefix } from "./selectoraddprefix";
import { savestyleblob } from "./parsecss-transformcss";
import { cssrulestocsstext } from "./cssrulestocsstext";

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
        /*  selectoraddprefix函数返回新对象,不是修改原来的对象*/
        const rulesarr = prefixcssrules([...cssrule.cssRules], prefix);
        const conditionText = cssrule.conditionText;
        const cssText =
          cssrule.cssText.slice(0, 7) +
          conditionText +
          "{" +
          cssrulestocsstext(rulesarr) +
          "}";
        return {
          cssText,
          conditionText,
          cssRules: rulesarr,
          [Symbol.toStringTag]: "CSSMediaRule"
        };
        // return cssrule;
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
