import { gettagtype } from "src/UtilTools/util";

export function isCSSStyleRule(a: any): a is CSSStyleRule {
  return gettagtype(a) === "CSSStyleRule";
}
export function isCSSMediaRule(a: any): a is CSSMediaRule {
  return gettagtype(a) === "CSSMediaRule";
}
export function isCSSImportRule(a: any): a is CSSImportRule {
  return gettagtype(a) === "CSSImportRule";
}
export function isCSSRule(a: any): a is CSSRule {
  return a instanceof CSSRule;
}
