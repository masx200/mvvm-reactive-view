import { invalid_ReactiveState } from "./conditon";
import { invalid_Virtualdom } from "./MountElement";
import directives from "./extend-directive";
import ReactiveState, {
  // ReactiveState,
  isReactiveState
} from "./reactivestate";
import { set, get } from "./reflect";
import { toArray } from "./toArray";
import Virtualdom from "./VirtualElement";
import { querySelectorAll } from "./dom";
directives({
  value(value, element, vdom) {
    model(
      ["input", "textarea", "select"],
      "value",
      "value",
      ["change", "input"],
      value,
      vdom
    );
  },
  checked(value, element, vdom) {
    model(["input"], "checked", "checked", ["change", "click"], value, vdom);

    /* 对于name相同的input,radio,单选框,如果一个改变,其他全都要触发change事件 */
    const eventname = "click";
    const origin = toArray(vdom.onevent[eventname]);
    const eventsarray = origin;
    const dispatchallsamename: EventListener = (event: Event) => {
      const inputelement = event.target as HTMLInputElement;
      const name = (event.target as HTMLInputElement).name;
      if (name) {
        querySelectorAll(`input[name=${name}]`)
          /* 通知其他inputelement */
          .filter(ele => ele !== inputelement)

          .forEach(element => {
            element.dispatchEvent(new Event("change"));
          });
      }
    };

    set(
      vdom.onevent,
      eventname,
      toArray([...eventsarray, dispatchallsamename]).filter(Boolean)
    );
  }
});
function model(
  types: string[],
  bindattribute: string,
  domprop: string,
  eventnames: string[],
  value: ReactiveState<any>,
  vdom: Virtualdom<any>
) {
  if (!isReactiveState(value)) {
    console.error(value);
    console.error(invalid_ReactiveState + invalid_Virtualdom);
    throw TypeError();
  }
  if (types.includes(vdom.type)) {
    // const vdom = virtualdom;
    set(vdom.bindattr, bindattribute, value);
    /*  [
      // vdom.bindattr["checked"] = value;
      "change",
      "input"
    ]. */

    eventnames.forEach(eventname => {
      const origin = vdom.onevent[eventname];

      const eventsarray = toArray(origin);

      set(
        vdom.onevent,
        eventname,
        toArray([
          ...eventsarray,

          (e: any) => {
            return (value.value = get(e.target, domprop));
          }
        ]).filter(Boolean)
      );
    });
  } else {
    console.error(vdom);
    console.error(invalid_ReactiveState + invalid_Virtualdom);
    throw TypeError();
  }
}

/* directives({
  value(_element: Element, value: ReactiveState<any>, vdom: Virtualdom<any>) {
    // console.log(vdom);
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
      console.log(_element);
      console.error(value);
      console.error(vdom);
      console.error(invalid_ReactiveState + invalid_Virtualdom);
      throw TypeError();
    }
  }
});
directives({
  checked(_element: Element, value: ReactiveState<any>, vdom: Virtualdom<any>) {
    // console.log(vdom);
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
      console.log(_element);
      console.error(value);
      console.error(vdom);
      console.error(invalid_ReactiveState + invalid_Virtualdom);
      throw TypeError();
      //throw TypeError(invalid_ReactiveState + invalid_Virtualdom);
    }
  }
}); */
