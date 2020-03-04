import Virtualdom from "../CreateElement/VirtualElement";
import { isReactiveState } from "../Reactivity/reactivestate.js";
import { querySelectorAll, setelehtml, seteletext } from "../UtilTools/dom";
import { apply, set } from "../UtilTools/reflect";
import { toArray } from "../UtilTools/toArray";
import { isfunction, isobject, isstring } from "../UtilTools/util";
import { createhtmlandtextdirective } from "./create-html-and-text-directive";
import extenddirectives from "./extend-directive";
import { model } from "./model";
extenddirectives(
    "ref",
    (
        ref: unknown, //{ value: Element } | ((value: Element) => void),
        ele: Element,
        _vdom: Virtualdom<any>
    ) => {
        if (isfunction(ref)) {
            apply(ref, undefined, [ele]);
        } else if (isobject(ref)) {
            set(ref, "value", ele);
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
        html: unknown, //string | ReactiveState<any>,
        ele: Element,
        _vdom: Virtualdom<any>
    ) => {
        if (isstring(html) || isReactiveState(html)) {
            console.log(_vdom);
            createhtmlandtextdirective(setelehtml, "html")(ele, html);
        } else {
            throw new TypeError();
        }
    }
);
extenddirectives(
    "text",
    (
        text: unknown, //string | ReactiveState<any>,
        ele: Element,
        _vdom: Virtualdom<any>
    ) => {
        if (isstring(text) || isReactiveState(text)) {
            console.log(_vdom);
            createhtmlandtextdirective(seteletext, "text")(ele, text);
        } else {
            throw new TypeError();
        }
    }
);
extenddirectives(
    "value",
    (
        value: unknown, //ReactiveState<any>,
        element,
        vdom
    ) => {
        if (isReactiveState(value)) {
            console.log(element);
            model(
                ["input", "textarea", "select"],
                "value",
                "value",
                ["change", "input"],
                value,
                vdom
            );
        } else {
            throw new TypeError();
        }
    }
);
extenddirectives(
    "checked",
    (
        value: unknown,
        //ReactiveState<any>,
        element,
        vdom
    ) => {
        if (!isReactiveState(value)) {
            throw new TypeError();
        }
        console.log(element);
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
    }
);
