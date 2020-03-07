import htm from "htm";
import Virtualdom, {
    Vdomchildren
} from "../../src/CreateElement/VirtualElement";

declare interface Htm {
    (strings?: TemplateStringsArray, ...values: any[]):
        | Virtualdom<any>
        | Vdomchildren;
}
const myhtm: Htm = htm as Htm;
export default myhtm;
