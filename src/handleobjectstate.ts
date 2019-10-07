import deepobserve from "@masx200/deep-observe-agent-proxy";
import { isplainobject, isarray, isSet, isobject } from "./util";
import ReactiveState, {
  isReactiveState,
  dispatchsymbol
} from "./reactivestate";
import {
  defineProperty,
  ownKeys,
  get,
  getOwnPropertyDescriptor,
  has,
  deleteProperty,
  set
} from "./reflect";
import { watch } from "./watch";
import { set_prototype } from "./createstate";

export default function(init: object): ReactiveState<object> {
  let initobj = init;
  const containReactiveState =
    isplainobject(init) && Object.values(init).some(a => isReactiveState(a));
  const state_entries = Object.entries(init).filter(e => {
    const a = e[1];
    return isReactiveState(a);
  });
  if (containReactiveState) {
    initobj = { ...init };
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
    if (key === "value" && (isarray(value) || isplainobject(value))) {
      return deepobserve(get(target, key), (_target_, patharray) => {
        target[dispatchsymbol](patharray[0]);
      });
    } else if (has(target, key)) {
      return get(target, key);
    } else if (has(value, key)) {
      if (
        isSet(value) &&
        (key === "add" || key === "clear" || key === "delete")
      ) {
        switch (key) {
          case "add": {
            return (add: any) => {
              if (!set_prototype.has.call(value, add)) {
                const returnvalue = set_prototype[key].call(value, add);
                target[dispatchsymbol]();
                return returnvalue;
              }
              return;
            };
          }
          // break;
          case "delete": {
            return (dele: any) => {
              if (set_prototype.has.call(value, dele)) {
                const returnvalue = set_prototype[key].call(value, dele);
                target[dispatchsymbol]();
                return returnvalue;
              }
              return;
            };
          }
          // break;
          case "clear": {
            return () => {
              if (value.size) {
                const returnvalue = set_prototype[key].call(value);
                target[dispatchsymbol]();
                return returnvalue;
              }
              return;
            };
          }
          // break;
        }
      } else if (isarray(value) || isplainobject(value)) {
        return deepobserve(get(value, key), () => {
          target[dispatchsymbol](String(key));
        });
      } else {
        return get(value, key);
      }
    }
  };
  objproxyhandler.set = (target: ReactiveState<object>, key, value) => {
    if (isReactiveState(value)) {
      //如果遇到 isReactiveState则自动解包
      value = value.valueOf();
    }
    const myvalue = get(target, "value");
    if (key === "value" && isobject(value)) {
      // if (target[key] !== value) {
      set(target, key, value);
      target[dispatchsymbol]();
    } else if (!has(target, key)) {
      set(myvalue, key, value);
      target[dispatchsymbol](String(key));

      //
    }
    return true;
  };
  return new Proxy(
    reactive,

    objproxyhandler
  ) as ReactiveState<object>;
}
