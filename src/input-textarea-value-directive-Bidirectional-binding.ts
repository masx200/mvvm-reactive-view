import ReactiveState from "./primitivestate";
import directives from "./extend-directive";
import Virtualdom from "./virtualdom";
directives({
  value(element: any, value: { value: any }, vdom: Virtualdom) {
    if (
      value instanceof ReactiveState &&
      (vdom.type === "input" || vdom.type === "textarea")
    ) {
      vdom.bindattr["value"] = value;
      ["change", "input"].forEach(eventname => {
        const origin = vdom.onevent[eventname];

        const eventsarray = [origin].flat(Infinity);

        vdom.onevent[eventname] = [
          ...eventsarray,
          (e: { target: { value: string | number | boolean | object } }) => {
            return (value.value = e.target.value);
          }
        ].filter(Boolean);
      });
    } else {
      throw TypeError("invalid ReactiveState or element");
    }
  }
});
