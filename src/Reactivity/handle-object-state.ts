import deepobserve from "@masx200/deep-observe-agent-proxy";
import { set_prototype } from "./create-state";
import ReactiveState, {
  dispatchsymbol,
  invalid_primitive_or_object_state,
  isReactiveState
} from "./ReactiveState";
import {
  defineProperty,
  deleteProperty,
  get,
  getOwnPropertyDescriptor,
  has,
  ownKeys,
  set
} from "../UtilTools/reflect";
import {
  isArray,
  isarray,
  isobject,
  isplainobject,
  isSet,
  issymbol,
  isfunction
} from "../UtilTools/util";
import { watch } from "./watch";

export default function(init: object): ReactiveState<object> {
  let initobj = init;
  const containReactiveState =
    isplainobject(init) && Object.values(init).some(a => isReactiveState(a));
  const state_entries = Object.entries(init).filter(e => {
    const a = e[1];
    return isReactiveState(a);
  });
  if (containReactiveState) {
    initobj = Object.assign({}, init);
    // initobj = { ...init };
    state_entries.forEach(([key, state]) => {
      defineProperty(initobj, key, {
        enumerable: true,
        get() {
          return state.valueOf();
        },
        configurable: true
      });
    });
  }
  //   const inittype = isfunction(init)
  //   ? "function"
  //   : isprimitive(init)
  //   ? "primitive"
  //   : /* isobject(init)
  //   ? "object" */
  //     /* : */ void 0;
  const reactive: ReactiveState<object> = new ReactiveState(initobj);
  if (containReactiveState) {
    state_entries.forEach(([key, state]) => {
      watch(state, () => {
        reactive[dispatchsymbol](String(key));
      });
    });
    // console.log(reactive);
  }
  const objproxyhandler: ProxyHandler<object> = {};
  objproxyhandler.ownKeys = target => {
    return Array.from(
      new Set([...ownKeys(target), ...ownKeys(get(target, "value"))])
    );
  };
  objproxyhandler.setPrototypeOf = () => {
    return false;
  };
  objproxyhandler.defineProperty = () => {
    return false;
  };
  objproxyhandler.getOwnPropertyDescriptor = (
    target: ReactiveState<object>,
    key
  ) => {
    //如果是symbol属性返回undefined
    if (issymbol(key)) {
      return;
    }
    const myvalue = get(target, "value");

    const descripter =
      getOwnPropertyDescriptor(target, key) ||
      getOwnPropertyDescriptor(myvalue, key);
    if (descripter) {
      descripter.configurable = true;
    }

    return descripter;
  };
  objproxyhandler.deleteProperty = (target: ReactiveState<object>, key) => {
    const myvalue = get(target, "value");
    if (has(myvalue, key)) {
      deleteProperty(myvalue, key);
      target[dispatchsymbol](String(key));
      return true;
    } else {
      return true;
    }
  };
  objproxyhandler.has = (target: ReactiveState<object>, key) => {
    const myvalue = get(target, "value");
    return has(target, key) || has(myvalue, key);
  };
  objproxyhandler.get = (target: ReactiveState<object>, key) => {
    const value = get(target, "value");
    const deepflage = isarray(value) || isplainobject(value);
    if (key === "value" && deepflage) {
      return deepobserve(get(target, key), (_target_, patharray) => {
        target[dispatchsymbol](patharray[0]);
      });
    } else if (has(target, key)) {
      return get(target, key);
    } else if (has(value, key)) {
      const resultvalue = get(value, key);
      if (isSet(value)) {
        if (key === "add" || key === "clear" || key === "delete") {
          switch (key) {
            case "add": {
              return ((add: any) => {
                if (!set_prototype.has.call(value, add)) {
                  const returnvalue = set_prototype[key].call(value, add);
                  target[dispatchsymbol]();
                  return returnvalue;
                }
                return;
              }).bind(value);
            }
            // break;
            case "delete": {
              return ((dele: any) => {
                if (set_prototype.has.call(value, dele)) {
                  const returnvalue = set_prototype[key].call(value, dele);
                  target[dispatchsymbol]();
                  return returnvalue;
                }
                return;
              }).bind(value);
            }
            // break;
            case "clear": {
              return (() => {
                if (value.size) {
                  const returnvalue = set_prototype[key].call(value);
                  target[dispatchsymbol]();
                  return returnvalue;
                }
                return;
              }).bind(value);
            }
            // break;
          }
        } else {
          /* VM1933:1 Uncaught TypeError: Method Set.prototype.values called on incompatible receiver [object Object] */
          return isfunction(resultvalue)
            ? resultvalue.bind(value)
            : resultvalue;
        }
      } else if (
        deepflage &&
        (isarray(resultvalue) || isplainobject(resultvalue))
      ) {
        return deepobserve(resultvalue, () => {
          target[dispatchsymbol](String(key));
        });
      } else {
        return resultvalue;
      }
    }
  };
  objproxyhandler.set = (target: ReactiveState<object>, key, value) => {
    if (isReactiveState(value)) {
      //如果遇到 isReactiveState则自动解包
      value = value.valueOf();
    }
    const myvalue = get(target, "value");
    /* 若初始值数组,则只能赋值数组 */
    if (
      key === "value" &&
      isobject(value) &&
      ((isArray(init) && isarray(value)) || (!isArray(init) && !isarray(value)))
    ) {
      // if (target[key] !== value) {
      set(target, key, value);
      target[dispatchsymbol]();
      return true;
    } else if (!has(target, key)) {
      set(myvalue, key, value);
      target[dispatchsymbol](String(key));
      return true;
      //
    } else {
      console.error(value);
      console.error(init);
      console.error(invalid_primitive_or_object_state);
      throw TypeError();
      //   return false;
    }
    // return true;
  };
  return new Proxy(
    reactive,

    objproxyhandler
  ) as ReactiveState<object>;
}