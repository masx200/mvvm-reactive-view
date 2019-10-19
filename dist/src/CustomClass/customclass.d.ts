import { VaildVDom } from "../AttributeClass/conditon";
import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import ReactiveState from "../Reactivity/ReactiveState";
import { Vdomchildren } from "../CreateElement/VirtualElement";
export { Htmlelementconstructor as Class };
export interface Custom {
    (props?: Record<string, ReactiveState<any>>, children?: Vdomchildren): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
