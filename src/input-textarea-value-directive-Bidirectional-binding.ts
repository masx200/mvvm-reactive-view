import { invalid_ReactiveState } from "./conditon";
import { invalid_Virtualdom } from "./createApp";
import directives from "./extend-directive";
import ReactiveState, {
  // ReactiveState,
  isReactiveState
} from "./reactivestate";
import { set } from "./reflect";
import { toArray } from "./toArray";
import Virtualdom from "./virtualdom";
directives({
  value(_element: Element, value: ReactiveState<any>, vdom: Virtualdom<any>) {
    console.log(vdom);
    if (
      isReactiveState(value) &&
      //   value instanceof ReactiveState

      (vdom.type === "input" ||
        vdom.type === "textarea" ||
        vdom.type === "select")
    ) {
      vdom.bindattr["value"] = value;
      ["change", "input"].forEach(eventname => {
        const origin = vdom.onevent[eventname];

        const eventsarray = toArray(origin);

        set(
          vdom.onevent,
          eventname,
          [
            ...eventsarray,

            (e: any) => {
              return (value.value = e.target.value);
            }
          ].filter(Boolean)
        );
      });
    } else {
      console.error(value);
      console.error(vdom);
      console.error(invalid_ReactiveState + invalid_Virtualdom);
      throw TypeError();
    }
  }
});
directives({
  checked(_element: Element, value: ReactiveState<any>, vdom: Virtualdom<any>) {
    console.log(vdom);
    if (
      isReactiveState(value) &&
      //   value instanceof ReactiveState

      vdom.type === "input"
    ) {
      vdom.bindattr["checked"] = value;
      ["change", "input"].forEach(eventname => {
        const origin = vdom.onevent[eventname];

        const eventsarray = toArray(origin);

        set(
          vdom.onevent,
          eventname,
          [
            ...eventsarray,

            (e: any) => {
              return (value.value = e.target.checked);
            }
          ].filter(Boolean)
        );
      });
    } else {
      console.error(value);
      console.error(vdom);
      console.error(invalid_ReactiveState + invalid_Virtualdom);
      throw TypeError();
      //throw TypeError(invalid_ReactiveState + invalid_Virtualdom);
    }
  }
});
