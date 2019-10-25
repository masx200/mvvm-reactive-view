import {
  isCSSImportRule,
  isCSSMediaRule,
  //   isCSSRule,
  isCSSStyleRule
} from "./isCSSRule";
import { prefixcssmediarule } from "./prefix-cssmediarule";
import { savestyleblob } from "./savestyleblob";
import { selectoraddprefix } from "./selectoraddprefix";
// import { isundefined } from "src/UtilTools/util";

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

        // return cssrule;

        return prefixcssmediarule(cssrule, prefix);
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
