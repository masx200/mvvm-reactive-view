const VirtualElementSet = new WeakSet<Virtualdom<any>>();
const Letter_case_and_Chinese = /[A-Za-z\u4e00-\u9fa5]/;
import { Htmlelementconstructor } from "../CustomClass/customclass";
import ReactiveState from "../Reactivity/reactivestate.js";
import { isReactiveState } from "../Reactivity/isReactiveState";

import { merge_entries } from "../UtilTools/merge-entries";
import { defineProperty, preventExtensions } from "../UtilTools/reflect";
import { isstring } from "../UtilTools/util";
import { ElementAttrs } from "./create-element";
import { VaildVDom } from "./isvalidvdom";

export function isVirtualdom(a: any): a is Virtualdom<any> {
    return VirtualElementSet.has(a);
}

export type Vdomchildren = Array<VaildVDom>;
export { createVirtualElement };
function createVirtualElement<
    T extends Htmlelementconstructor | string | Function
>(
    type: T,
    props: ElementAttrs = {},
    children: Vdomchildren = []
): Virtualdom<T> {
    props = Object.assign({}, props);
    children = children.flat(1 / 0);

    const propsentries = Object.entries(props);
    const propsentriesNOTevents = propsentries.filter(
        ([key]) => !(key.startsWith("@") || key.startsWith("on"))
    );
    const Entries_beginning_with_a_letter = propsentriesNOTevents.filter(
        ([key]) => Letter_case_and_Chinese.test(key[0])
    );
    const virtual = Object.create(null);
    const vdom = virtual;
    ["onevent", "type", "props", "children", "directives", "bindattr"].forEach(
        (key) => {
            defineProperty(virtual, key, {
                writable: true,
                enumerable: false
            });
        }
    );

    Object.assign(virtual, {
        type,
        bindattr: Object.fromEntries(
            Entries_beginning_with_a_letter.filter((e) => isReactiveState(e[1]))
        ),
        props: Object.fromEntries(
            Entries_beginning_with_a_letter.filter(
                (e) => !isReactiveState(e[1])
            ).map(([key, value]) => [
                key,
                isstring(value) ? value.trim() : value
            ])
        ),
        children,
        onevent: Object.fromEntries(
            merge_entries([
                ...propsentries
                    .filter(([key]) => "@" == key[0])
                    .map(([key, value]) => [
                        key
                            .slice(1)
                            .toLowerCase()
                            .trim(),
                        [value].flat(1 / 0)
                    ]),
                ...propsentries
                    .filter(([key]) => key.startsWith("on"))
                    .map(([key, value]) => [
                        key
                            .slice(2)
                            .toLowerCase()
                            .trim(),
                        [value].flat(1 / 0)
                    ])
            ] as [string, any][])
        ),
        directives: Object.fromEntries(
            propsentriesNOTevents
                .filter(([key]) => key[0] === "*" || key[0] === "$")
                .map(([key, value]) => [
                    key
                        .slice(1)
                        .toLowerCase()
                        .trim(),
                    value
                ])
        )
    });
    defineProperty(virtual, Symbol.toStringTag, { value: "VirtualElement" });

    preventExtensions(virtual);
    VirtualElementSet.add(virtual);

    Object.freeze(vdom);
    return virtual;
}

interface Virtualdom<T extends Htmlelementconstructor | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";

    readonly type: T;
    readonly props: ElementAttrs;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;

    readonly onevent: Record<string, Array<EventListener>>;

    readonly bindattr: Record<string, ReactiveState<any>>;
}
export default Virtualdom;
