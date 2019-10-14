import { VaildVDom } from "./conditon";
import { Htmlelementconstructor } from "./createComponent";
import ReactiveState from "./reactivestate";
import { Vdomchildren } from "./VirtualElement";
export { Htmlelementconstructor as Class };
export interface Custom {
    (props?: Record<string, ReactiveState<any>>, children?: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
