import Virtualdom, { Vdomchildren } from '../../src/CreateElement/VirtualElement';

declare interface Htm {
  (strings?: TemplateStringsArray, ...values: any[]):
    | Virtualdom<any>
    | Vdomchildren;
}
declare const htm: Htm;
export default htm;
