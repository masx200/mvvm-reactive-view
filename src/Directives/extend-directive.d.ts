import Virtualdom from "../CreateElement/VirtualElement";
export interface Extendfun {
    (
        value: unknown,
        element: Element,
        vdom: Virtualdom<any>,
        onmounted: (call: () => void) => void,
        onunmounted: (call: () => void) => void,
        onupdated: (call: () => void) => void
    ): void;
}
export interface ExtendOptions {
    [s: string]: Extendfun;
}
export { extenddirectives };
export default function extenddirectives(name: string, fun: Extendfun): void;
//# sourceMappingURL=extend-directive.d.ts.map
