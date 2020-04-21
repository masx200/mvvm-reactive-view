const VirtualElementSet = new WeakSet();
const Letter_case_and_Chinese = /[A-Za-z\u4e00-\u9fa5]/;
import { isReactiveState } from "../Reactivity/isReactiveState";
import { merge_entries } from "../UtilTools/merge-entries";
import { defineProperty, preventExtensions } from "../UtilTools/reflect";
import { isstring } from "../UtilTools/util";
export function isVirtualdom(a) {
    return VirtualElementSet.has(a);
}
export { createVirtualElement };
function createVirtualElement(type, props = {}, children = []) {
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
            ])
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
//# sourceMappingURL=VirtualElement.js.map
