import Reflect, {
  apply,
  construct,
  defineProperty,
  deleteProperty,
  get,
  getOwnPropertyDescriptor,
  getPrototypeOf,
  has,
  isExtensible,
  ownKeys,
  preventExtensions,
  set,
  setPrototypeOf
} from "./reflect";
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
      defineProperty() {
        return false;
      },
      deleteProperty(target, key) {
        return false;
      },
      set(target, key, value) {
        if (key === textnodesymbol) {
          return set(target, key, value);
        }
        if (key === "value" && isprimitive(value)) {
          // if (target[key] !== value) {
          set(target, key, value);
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
      defineProperty() {
        return false;
      },
      getOwnPropertyDescriptor(target, key) {
        const myvalue = get(target, "value");

        var descripter =
          getOwnPropertyDescriptor(target, key) ||
          getOwnPropertyDescriptor(myvalue, key);
        descripter.configurable = true;
        return descripter;
      },
      deleteProperty(target, key) {
        const myvalue = get(target, "value");
        if (has(myvalue, key)) {
          deleteProperty(myvalue, key);
          target[dispatchsymbol](key);
          return true;
        } else {
          return true;
        }
      },
      has(target, key) {
        const myvalue = get(target, "value");
        return has(target, key) || has(myvalue, key);
      },
      get(target, key) {
        const value = get(target, "value");
        if (has(target, key)) {
          return get(target, key);
        } else if (has(value, key)) {
          /*  */

          return deepobserve(get(value, key), () => {
            target[dispatchsymbol](key);
          });
        }
      },
      ownKeys(target) {
        return Array.from(
          new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
        );
      },
      set(target, key, value) {
        if (key === textnodesymbol) {
          return set(target, key, value);
        }
        const myvalue = get(target, "value");
        if (key === "value" && isobject(value)) {
          // if (target[key] !== value) {
          set(target, key, value);
          target[dispatchsymbol]();

          // }
          return true;
        } else if (!has(target, key)) {
          set(myvalue, key, value);
          target[dispatchsymbol](key);

          //
        } else if (key === "length") {
          set(myvalue, key, value);
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
