import isprimitive from "./isprimitive";
import Primitivestate, { dispatchsymbol } from "./primitivestate";
export default function(init: string | number | boolean | undefined) {
  if (isprimitive(init)) {
    return new Proxy(new Primitivestate(init), {
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
  }
}
