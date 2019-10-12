export { Htmlelementconstructor as Class };
import { VaildVDom } from "./conditon";
import ReactiveState from "./reactivestate";
import { Vdomchildren } from "./VirtualElement";
import { Htmlelementconstructor } from "./createComponent";
export interface Custom {
    (props?: Record<string, ReactiveState<any>>, children?: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
