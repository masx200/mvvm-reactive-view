import{getproperyreadproxy}from "./computed"

import { invalid_primitive_or_object_state } from "./primitivestate";

import {
  deleteProperty,
  get,
  getOwnPropertyDescriptor,
  has,
  ownKeys,
  set
} from "./reflect";
import deepobserve from "deep-observe-agent-proxy";
import { isobject, isSet, gettagtype } from "./util";
import isprimitive from "./isprimitive";
import ReactiveState, {
  dispatchsymbol,
  // textnodesymbol,
  isReactiveState
} from "./primitivestate";
import { usestste } from "./context-mounted-unmounted-";
export default (init: any) => {
  /* 收集组件内部创建的 ReactiveState*/
  const state = createstate(init);
  usestste(state);
  return state;
};

function createstate(
  init: string | number | boolean | undefined | ReactiveState | object
): ReactiveState {
  if (isprimitive(init)) {
    return getproperyreadproxy(new Proxy(new ReactiveState(init), {
      defineProperty() {
        return false;
      },
      deleteProperty() {
        return false;
      },
      set(target, key, value) {
        /*  if (key === textnodesymbol) {
          return set(target, key, value);
        } */
        if (key === "value" && isprimitive(value)) {
          // if (target[key] !== value) {
          set(target, key, value);
          target[dispatchsymbol]();
          // }
          return true;
        } else {
          return false;
        }
      },
      setPrototypeOf() {
        return false;
      }
    }));
  } else if (
    isReactiveState(init)
    // init instanceof ReactiveState
  ) {
    // 如果init是个 ReactiveState，则对其解包，并生成新的 ReactiveState
    return createstate(init.value);
  } else if (isobject(init)) {
    return new Proxy(new ReactiveState(init), {
      defineProperty() {
        return false;
      },
      getOwnPropertyDescriptor(target, key) {
        const myvalue = get(target, "value");

        const descripter =
          getOwnPropertyDescriptor(target, key) ||
          getOwnPropertyDescriptor(myvalue, key);
        if (descripter) {
          descripter.configurable = true;
        }

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

        if (
          key === "value" &&
          (gettagtype(value) === "array" || gettagtype(value) === "object")
        ) {
          return deepobserve(get(target, key), (_target, patharray) => {
            target[dispatchsymbol](patharray[0]);
          });
        } else if (has(target, key)) {
          return get(target, key);
        } else if (has(value, key)) {
          if (isSet(value) && (key === "add" || key === "delete")) {
            const myvalue = value;
            if (key === "add") {
              return (add: any) => {
                if (!Set.prototype.has.call(myvalue, add)) {
                  const returnvalue = Set.prototype[key].call(myvalue, add);
                  target[dispatchsymbol]();
                  return returnvalue;
                }
              };
            } else if (key === "delete") {
              return (dele: any) => {
                if (Set.prototype.has.call(myvalue, dele)) {
                  const returnvalue = Set.prototype[key].call(myvalue, dele);
                  target[dispatchsymbol]();
                  return returnvalue;
                }
              };
            }
          } else {
            return deepobserve(get(value, key), () => {
              target[dispatchsymbol](key);
            });
          }

          /*  */
        }
      },
      ownKeys(target) {
        return Array.from(
          new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
        );
      },
      set(target, key, value) {
        /*   if (key === textnodesymbol) {
          return set(target, key, value);
        } */
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
      },
      setPrototypeOf() {
        return false;
      }
    });
  } else {
    console.error(init);
    throw TypeError(invalid_primitive_or_object_state);

    //throw TypeError("invalid State");
  }
}
