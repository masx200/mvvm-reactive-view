import { getsymbol, isobject } from "./util";
import isprimitive from "./isprimitive";
import ReactiveState, { dispatchsymbol } from "./primitivestate";
export default function(init: string | number | boolean | undefined) {
  if (isprimitive(init)) {
    return new Proxy(new ReactiveState(init), {
      set(target, key, value) {
        if (key === "value" && isprimitive(value)) {
          // if (target[key] !== value) {
          Reflect.set(target, key, value);
          target[dispatchsymbol]();
          // }
          return true;
        } else {
          return false;
        }
      }
    });
  } else if (isobject(init)) {
    return new Proxy(new ReactiveState(init), {
      get(target, key) {
        const value = Reflect.get(target, "value");
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        } else if (Reflect.has(value, key)) {
          /*  */
          return Reflect.get(target, key);
        }
      },
      ownKeys(target) {
        return Array.from(
          new Set([
            ...Reflect.ownKeys(target),
            ...Reflect.ownKeys(Reflect.get(target, "value"))
          ])
        );
      },
      set(target, key, value) {
        if (key === "value" && isobject(value)) {
          // if (target[key] !== value) {
          Reflect.set(target, key, value);
          target[dispatchsymbol]();
          // }
          return true;
        } else {
          return false;
        }
      }
    });
  } else {
    throw TypeError("invalid State");
  }
}
