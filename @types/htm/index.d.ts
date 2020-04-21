import Virtualdom, {
    Vdomchildren
} from "../../src/CreateElement/VirtualElement";
declare interface Htm {
    (strings?: TemplateStringsArray, ...values: any[]):
        | Virtualdom<any>
        | Vdomchildren;
}
declare const myhtm: Htm;
export default myhtm;
//# sourceMappingURL=index.d.ts.map
