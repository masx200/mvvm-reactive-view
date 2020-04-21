import { isCSSImportRule, isCSSMediaRule, isCSSStyleRule } from "./isCSSRule";
import { prefixcssmediarule } from "./prefix-cssmediarule";
import { savestyleblob } from "./savestyleblob";
import { selectoraddprefix } from "./selectoraddprefix";
export function prefixcssrules(cssRulesarray, prefix) {
    return cssRulesarray
        .map((cssrule) => {
            if (isCSSStyleRule(cssrule)) {
                const resultoutput = selectoraddprefix(cssrule, prefix);
                return resultoutput;
            } else if (isCSSMediaRule(cssrule)) {
                return prefixcssmediarule(cssrule, prefix);
            } else if (isCSSImportRule(cssrule)) {
                savestyleblob(prefix, undefined, cssrule.href);
                return;
            } else {
                return cssrule;
            }
        })
        .filter(Boolean);
}
//# sourceMappingURL=transform-prefix-cssrules.js.map
