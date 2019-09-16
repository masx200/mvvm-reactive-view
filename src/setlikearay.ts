import { isobject, isfunction } from "./util";
// import {isclassextendsHTMLElement} from './customelement';
export default class Setlikearray extends Array {
  /*   constructor() {
    super();
    Object.defineProperty(this, Symbol.toStringTag, { value: "setlikearray" });
  } */
  push(...items: Array<any>): number {
    items.forEach(item => {
      if (isfunction(item) || isobject(item)) {
        if (!this.includes(item)) {
          super.push(item);
        }
      }
    });

    return this.length;
  }
}
