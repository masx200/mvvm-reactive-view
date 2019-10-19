import { isFunction, isobject, issymbol } from "src/UtilTools/util";
import {
  get,
  has,
  ownKeys,
  getOwnPropertyDescriptor
} from "src/UtilTools/reflect";

export function getproperyreadproxy<T extends object>(a: T): T {
  const __proto__ = "__proto__";
  /* 把基本类型原型的属性 也加上*/
  //   const target = isobject(a) ? a : getPrototypeOf(a);
  const target = a;
  return new Proxy(target, {
    getOwnPropertyDescriptor(target, key) {
      //对于symbol属性，返回undefined
      if (issymbol(key)) {
        return;
      } else {
        return getOwnPropertyDescriptor(target, key);
      }
    },
    ownKeys(target) {
      let myvalue = get(target, "value");
      const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
      //   return ownKeys(target);
      return Array.from(new Set([...ownKeys(target), ...ownKeys(myvalueobj)]));

      /* Array.from(
          new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
        ); */
    },
    has(target, key) {
      const myvalue = get(target, "value");
      const myvalueobj = isobject(myvalue) ? myvalue : myvalue[__proto__];
      return has(target, key) || has(myvalueobj, key);
    },
    get(target, key) {
      if (has(target, key)) {
        return get(target, key);
      } else {
        const myvalue = get(target, "value");
        const myvalueobj = /*  isobject(myvalue) ? myvalue :  */ Object(
          myvalue
        );

        if (has(myvalueobj, key)) {
          /* 对于string,number等原始类型,返回的函数要绑定this */
          const property = get(myvalueobj, key);
          return isFunction(property) ? property.bind(myvalueobj) : property;
        }
      }
      //   return get(target, key);
      /*  const myvalue = get(target, "value");
  
        if (has(target, key)) {
          return get(target, key);
        } else if (has(myvalue, key)) {
          return get(myvalue, key);
        } */
    }
  });
}
