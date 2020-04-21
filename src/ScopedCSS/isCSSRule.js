import { gettagtype } from "../UtilTools/util";
export function isCSSStyleRule(a) {
    return gettagtype(a) === "CSSStyleRule";
}
export function isCSSMediaRule(a) {
    return gettagtype(a) === "CSSMediaRule";
}
export function isCSSImportRule(a) {
    return gettagtype(a) === "CSSImportRule";
}
export function isCSSRule(a) {
    return a instanceof CSSRule;
}
//# sourceMappingURL=isCSSRule.js.map
