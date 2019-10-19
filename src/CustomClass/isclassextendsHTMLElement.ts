import { Class } from "../CustomClass/customclass";
import { isfunction } from "../UtilTools/util";

export function isclassextendsHTMLElement(initclass: {
  prototype: any;
}): initclass is Class {
  return !!(
    isfunction(initclass) &&
    initclass.prototype &&
    initclass.prototype instanceof HTMLElement
  );
}
