import { autocreateclass } from "../AttributeClass/createComponent";
import { apply } from "../UtilTools/reflect";
import {
    isarray,
    isfunction,
    isplainobject,
    isstring
} from "../UtilTools/util";
import { createVirtualElement } from "./VirtualElement";
function h(type, propsorchildren, ...children) {
    if (isfunction(type)) {
        type = autocreateclass(type);
    }
    if (isarray(propsorchildren)) {
        return apply(createElement, undefined, [
            type,
            undefined,
            [...propsorchildren, ...children].flat(1 / 0)
        ]);
    } else {
        return apply(createElement, undefined, [
            type,
            propsorchildren,
            ...children
        ]);
    }
}
function createElement(type, props = {}, ...children) {
    let typenormalized = isstring(type) || isfunction(type) ? type : "";
    const propsnormalized = isplainobject(props) ? props : {};
    const childrennormalized = children
        .flat(Infinity)
        .map((a) => (a === 0 ? "0" : a))
        .filter((a) => !!a);
    if (isstring(typenormalized)) {
        typenormalized = typenormalized.trim().toLowerCase();
    }
    if ("" === typenormalized) {
        return childrennormalized;
    } else {
        return apply(createVirtualElement, undefined, [
            typenormalized,
            propsnormalized,
            childrennormalized
        ]);
    }
}
export default h;
export { h };
//# sourceMappingURL=create-element.js.map
