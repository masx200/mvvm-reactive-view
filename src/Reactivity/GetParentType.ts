import { Htmlelementconstructor } from "src/AttributeClass/createComponent";
import { Custom } from "src/CustomClass/customclass";
export type GetParentType<T> = T extends Custom ? Custom : T extends Htmlelementconstructor ? Htmlelementconstructor : T extends Array<any> ? Array<any> : T extends Function ? Function : T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends void ? void : T extends symbol ? symbol : T extends bigint ? bigint : T extends object ? T : never;
