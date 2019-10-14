import { VaildVDom } from "./conditon";
import createElement from "./createelement";
import { AttrChange } from "./attrchange";
import { Htmlelementconstructor, createComponent } from "./createComponent";
import Virtualdom from "./VirtualElement";
import ReactiveState from "./reactivestate";
export { listmap };
function listmap(
  list: any[] | Set<any>,
  mapfun: (value: any, index: number) => VaildVDom
): Virtualdom<Htmlelementconstructor> {
  const ITEMfactory = (index: number) =>
    createComponent(props => {
      const value = (props as { value: ReactiveState<any> }).value.valueOf();
      return mapfun(value, index);
    });
  class ListMap extends AttrChange {}
  return createElement(ListMap, { value: list });
}
