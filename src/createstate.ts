import Reflect from "./reflect";
import deepobserve from "deep-observe-agent-proxy";
import { getsymbol, isobject } from "./util";
import isprimitive from "./isprimitive";
import ReactiveState, {
  dispatchsymbol,
  textnodesymbol
} from "./primitivestate";
export default function createstate(
  init: string | number | boolean | undefined | ReactiveState | object
) {
  if (isprimitive(init)) {
    return new Proxy(new ReactiveState(init), {
      set(target, key, value) {
        if (key === textnodesymbol) {
          return Reflect.set(target, key, value);
        }
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
  } else if (init instanceof ReactiveState) {
    // 如果init是个 ReactiveState，则对其解包，并生成新的 ReactiveState
    return createstate(init.value);
  } else if (isobject(init)) {
    return new Proxy(new ReactiveState(init), {
      deleteProperty(target, key) {
        const myvalue = Reflect.get(target, "value");
        if (Reflect.has(myvalue, key)) {
          Reflect.deleteProperty(myvalue, key);
          target[dispatchsymbol](key);
          return true;
        } else {
          return true;
        }
      },
      has(target, key) {
        const myvalue = Reflect.get(target, "value");
        return Reflect.has(target, key) || Reflect.has(myvalue, key);
      },
      get(target, key) {
        const value = Reflect.get(target, "value");
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        } else if (Reflect.has(value, key)) {
          /*  */

          return deepobserve(Reflect.get(value, key), () => {
            target[dispatchsymbol](key);
          });
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
        if (key === textnodesymbol) {
          return Reflect.set(target, key, value);
        }
        const myvalue = Reflect.get(target, "value");
        if (key === "value" && isobject(value)) {
          // if (target[key] !== value) {
          Reflect.set(target, key, value);
          target[dispatchsymbol]();

          // }
          return true;
        } else if (!Reflect.has(target, key)) {
          Reflect.set(myvalue, key, value);
          target[dispatchsymbol](key);

          //
        } else if (key === "length") {
          Reflect.set(myvalue, key, value);
          target[dispatchsymbol](key);
        } else {
          return false;
        }
        return true;
      }
    });
  } else {
    throw TypeError("invalid State");
  }
}
