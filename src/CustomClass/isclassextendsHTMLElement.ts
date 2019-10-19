import { Class } from "src/CustomClass/customclass";
import { isfunction } from "src/UtilTools/util";

export function isclassextendsHTMLElement(initclass: {
  prototype: any;
}): initclass is Class {
  return !!(
    isfunction(initclass) &&
    initclass.prototype &&
    initclass.prototype instanceof HTMLElement
  );
}
