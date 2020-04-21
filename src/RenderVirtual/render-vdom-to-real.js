import { dispatchcreated } from "src/others/mutationobserverwatch";
import { addmountedlistner } from "src/others/addmountedlistner";
import { addunmountedlistner } from "src/others/addunmountedlistner";
import { autocreateclass } from "../AttributeClass/createComponent";
import { iscomponent } from "../AttributeClass/iscomponent";
import { isVirtualdom } from "../CreateElement/VirtualElement";
import { createcostumelemet } from "../CustomClass/create-costum-elemet";
import mount from "../MountElement/mount-real-element";
import { invalid_Virtualdom } from "../MountElement/MountElement";
import { isReactiveState } from "../Reactivity/isReactiveState";
import watch from "../Reactivity/watch";
import {
    changetext,
    createDocumentFragment,
    createElementNS,
    createmathelement,
    createnativeelement,
    createsvgelement,
    createtextnode,
    mathnamespace,
    svgnamespace
} from "../UtilTools/dom";
import { isconnected } from "../UtilTools/isconnected";
import { get, set } from "../UtilTools/reflect";
import {
    isArray,
    isfunction,
    isnumber,
    isobject,
    isstring
} from "../UtilTools/util";
import { applydirects } from "./applydirects";
import { handleprops } from "./handleprops";
export const bindstatesymbol = Symbol("bindstate");
function throwinvalideletype(type) {
    console.error(type);
    console.error("invalid element type!");
    console.error(invalid_Virtualdom);
    throw TypeError();
}
export default render;
function render(vdom, namespace) {
    if (isArray(vdom)) {
        return vdom.map((a) => render(a)).flat(1 / 0);
    }
    if (isnumber(vdom) || isstring(vdom)) {
        const textnode = createtextnode(vdom);
        return textnode;
    } else if (isReactiveState(vdom)) {
        const reactive = vdom;
        const textnode = createtextnode(String(reactive));
        const element = textnode;
        let cancel;
        addmountedlistner(element, () => {
            cancel = watch(reactive, () => {
                const state = reactive;
                if (isconnected(element)) {
                    changetext(textnode, String(state));
                }
            });
        });
        addunmountedlistner(element, () => {
            cancel && cancel();
        });
        set(element, bindstatesymbol, new Set());
        get(element, bindstatesymbol).add(reactive);
        return textnode;
    } else if (isVirtualdom(vdom)) {
        let { type } = vdom;
        if (isfunction(type)) {
            type = autocreateclass(type);
        }
        let element = undefined;
        if (typeof type === "string") {
            if (type === "script") {
                return createElementNS("never", "script");
            } else if (type === "svg") {
                element = createsvgelement();
            } else if (type === "math") {
                element = createmathelement();
            } else if ("" === type) {
                const fragmentnode = createDocumentFragment();
                mount(render(vdom.children), fragmentnode);
                return fragmentnode;
            } else if (type === "html") {
                const fragmentelement = createElementNS("never", "html");
                mount(render(vdom.children), fragmentelement);
                return fragmentelement;
            } else {
                element = namespace
                    ? createElementNS(namespace, type)
                    : createnativeelement(type);
            }
        } else if (typeof type == "function") {
            if (isobject(type["defaultProps"])) {
                Object.assign(
                    vdom.props,
                    JSON.parse(
                        JSON.stringify({
                            ...type["defaultProps"],
                            ...vdom.props
                        })
                    )
                );
            }
            const propsjson = JSON.parse(
                JSON.stringify({
                    ...vdom.props,
                    ...Object.fromEntries(
                        Object.entries(vdom.bindattr).map(([key, value]) => {
                            return [key, value.value];
                        })
                    )
                })
            );
            element = createcostumelemet(type, propsjson, vdom.children);
        } else {
            throwinvalideletype(vdom);
        }
        dispatchcreated(element);
        applydirects(element, vdom);
        if (type && (isfunction(type) || isstring(type))) {
            if (!iscomponent(type)) {
                if (element) {
                    mount(
                        vdom.children.map((e) => {
                            if (type === "svg" && isVirtualdom(e)) {
                                return render(e, svgnamespace);
                            } else if (type === "math" && isVirtualdom(e)) {
                                return render(e, mathnamespace);
                            } else if (namespace && isVirtualdom(e)) {
                                return render(e, namespace);
                            } else {
                                return render(e);
                            }
                        }),
                        element
                    );
                }
            }
        }
        if (element) {
            handleprops(element, vdom);
        }
        return element;
    } else {
        throwinvalideletype(vdom);
    }
}
export { render };
//# sourceMappingURL=render-vdom-to-real.js.map
