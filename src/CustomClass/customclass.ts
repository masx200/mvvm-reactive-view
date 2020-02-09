import { Htmlelementconstructor } from "../AttributeClass/createComponent";
import ReactiveState from "../Reactivity/reactivestate.js";
import { Vdomchildren } from "../CreateElement/VirtualElement";
import { VaildVDom } from "../CreateElement/isvalidvdom";
export { Htmlelementconstructor };

export interface Custom {
    (
        props?: Record<string, ReactiveState<any>>,

        children?: Vdomchildren
    ): VaildVDom;
    defaultProps?: Record<string, any>;
    css?: string;
}
