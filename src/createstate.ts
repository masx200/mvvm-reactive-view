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
  } else {
    throw TypeError("invalid State");
  }
}
