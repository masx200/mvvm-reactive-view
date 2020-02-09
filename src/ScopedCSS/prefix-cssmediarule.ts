import { prefixcssrules } from "./transform-prefix-cssrules";
import { cssrulestocsstext } from "./cssrulestocsstext";

export function prefixcssmediarule(cssrule: CSSMediaRule, prefix: string) {
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
}
