import ReactiveState, {
  // ReactiveState,
  isReactiveState
} from './reactivestate';
import directives from "./extend-directive";
import Virtualdom from "./virtualdom";
import { invalid_ReactiveState } from "./conditon";
import { invalid_Virtualdom } from "./createApp";
directives({
  value(element: any, value: ReactiveState, vdom: Virtualdom) {
    if (
      isReactiveState(value) &&
      //   value instanceof ReactiveState

      (vdom.type === "input" || vdom.type === "textarea")
    ) {
      vdom.bindattr["value"] = value;
      ["change", "input"].forEach(eventname => {
        const origin = vdom.onevent[eventname];

        const eventsarray = [origin].flat(Infinity);

        // vdom.onevent[eventname] =
        Reflect.set(
          vdom.onevent,
          eventname,
          eventsarray
            .concat([
              (e: any) => {
                return (value.value = e.target.value);
              }
            ])
            .filter(Boolean)
        );
      });
    } else {
      console.error(value);
      console.error(vdom);
      throw TypeError(invalid_ReactiveState + invalid_Virtualdom);
    }
  }
});
