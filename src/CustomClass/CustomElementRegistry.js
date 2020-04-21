export const invalid_custom_element_class = "invalid custom element class !";
import { get, getPrototypeOf, has, set } from "../UtilTools/reflect";
import { isobject } from "../UtilTools/util";
import { getrandomstringandnumber } from "./getrandomstringandnumber";
import { isclassextendsHTMLElement } from "./isclassextendsHTMLElement";
if (!isobject(window.customElements)) {
    console.error(" customElements  not supported !");
    throw new TypeError();
}
function Usevaluetoquerythekeyfromthetable(table, Componentstatusname) {
    const outputentrie = Object.entries(table).find((v) => {
        return v[1] === Componentstatusname;
    });
    return outputentrie ? outputentrie[0] : undefined;
}
window.CustomElementRegistry = get(
    getPrototypeOf(window.customElements),
    "constructor"
);
const elementset = Symbol.for("elementset");
const elementmap = Symbol.for("elementmap");
const { CustomElementRegistry } = window;
const customElements = window.customElements;
if (!has(customElements, elementset)) {
    Reflect.set(customElements, elementset, new Set());
}
if (!has(customElements, elementmap)) {
    Reflect.set(customElements, elementmap, {});
}
export default (initclass, extendsname) =>
    RandomDefineCustomElement(initclass, extendsname);
function RandomDefineCustomElement(initclass, extendsname, length = 1) {
    if (!isclassextendsHTMLElement(initclass)) {
        console.error(initclass);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(initclass)) {
        const elementname = getrandomstringandnumber(length);
        if (customElements.get(elementname)) {
            return RandomDefineCustomElement(
                initclass,
                extendsname,
                length + 1
            );
        } else {
            if (extendsname) {
                customElements.define(elementname, initclass, {
                    extends: extendsname
                });
            } else {
                customElements.define(elementname, initclass);
            }
        }
        return elementname;
    } else {
        return Usevaluetoquerythekeyfromthetable(
            get(customElements, elementmap),
            initclass
        );
    }
}
customElements.define = function(name, constructor, options) {
    if (!isclassextendsHTMLElement(constructor)) {
        console.error(constructor);
        console.error(invalid_custom_element_class);
        throw TypeError();
    }
    if (!get(customElements, elementset).has(constructor)) {
        if (has(customElements[elementmap], name)) {
            RandomDefineCustomElement(
                constructor,
                options ? options.extends : undefined
            );
        } else {
            CustomElementRegistry.prototype.define.call(
                customElements,
                name,
                constructor,
                options
            );
            customElements[elementset].add(constructor);
            customElements[elementmap][name] = constructor;
        }
    }
};
set(customElements, Symbol.iterator, () => {
    const entries = Object.entries(customElements[elementmap]);
    return entries[Symbol.iterator].call(entries);
});
//# sourceMappingURL=CustomElementRegistry.js.map
