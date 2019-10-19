import { isCSSStyleRule, isCSSMediaRule, isCSSImportRule } from "./isCSSRule";
import { selectoraddprefix } from "./selectoraddprefix";
import { savestyleblob } from "./parsecss-transformcss";

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
