import isprimitive from "./isprimitive";
import primitivestate, { dispatchsymbol } from "./primitivestate";
export default function(init: string | number | boolean | undefined) {
  return new Proxy(new primitivestate(init), {
    set(target, key, value) {
      if (key === "value" && isprimitive(value)) {
        if (target[key] !== value) {
          target[dispatchsymbol]();
        }
        return Reflect.set(target, key, value);
      } else {
        return false;
      }
    }
  });
}
