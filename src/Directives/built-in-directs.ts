import Virtualdom from "../CreateElement/VirtualElement";
import ReactiveState from "../Reactivity/reactivestate.js";
import { querySelectorAll, setelehtml, seteletext } from "../UtilTools/dom";
import { apply, set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { isfunction, isobject } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
import extenddirectives from "./extend-directive";
import { model } from "./model";
extenddirectives(
    "ref",
    (ele: Element, _vdom: Virtualdom<any>, ref: object | Function) => {
        if (isfunction(ref)) {
            apply(ref as Function, undefined, [ele]);
        } else if (isobject(ref)) {
            set(ref as object, "value", ele);
        } else {
            console.log(_vdom);
            console.error(ref);
            console.error("invalid ref");
            throw TypeError();
        }
    }
);
extenddirectives(
    "html",
    (
        ele: Element,
        _vdom: Virtualdom<any>,
        html: string | ReactiveState<any>
    ) => {
        console.log(_vdom);
        createhtmlandtextdirective(setelehtml, "html")(ele, html);
    }
);
extenddirectives(
    "text",
    (
        ele: Element,
        _vdom: Virtualdom<any>,
        text: string | ReactiveState<any>
    ) => {
        console.log(_vdom);
        createhtmlandtextdirective(seteletext, "text")(ele, text);
    }
);
extenddirectives("value", (element, vdom, value) => {
    model(
        ["input", "textarea", "select"],
        "value",
        "value",
        ["change", "input"],
        value,
        vdom
    );
});
extenddirectives("checked", (element, vdom, value) => {
    model(["input"], "checked", "checked", ["change"], value, vdom);
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
});
