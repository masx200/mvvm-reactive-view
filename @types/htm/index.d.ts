import Virtualdom from "../../src/virtualdom";

/* declare module "htm" {
  const htm: (
    strings?: TemplateStringsArray,
    ...values: any[]
  ) => Virtualdom<any>;
  export default htm;
}
 */
declare const htm: (
  strings?: TemplateStringsArray,
  ...values: any[]
) => Virtualdom<any>;
export default htm;
