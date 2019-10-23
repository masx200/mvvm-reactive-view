export declare const apply: typeof Reflect.apply, construct: typeof Reflect.construct, defineProperty: typeof Reflect.defineProperty, deleteProperty: typeof Reflect.deleteProperty, getOwnPropertyDescriptor: typeof Reflect.getOwnPropertyDescriptor, getPrototypeOf: typeof Reflect.getPrototypeOf, has: typeof Reflect.has, ownKeys: typeof Reflect.ownKeys, preventExtensions: typeof Reflect.preventExtensions;
export declare function get(target: Map<any, any> | WeakMap<any, any>, propertyKey: PropertyKey): any;
export declare function get(target: Exclude<object, Map<any, any> | WeakMap<any, any>>, propertyKey: PropertyKey): any;
export declare function set(target: Map<any, any> | WeakMap<any, any>, propertyKey: PropertyKey, value: any): boolean;
export declare function set(target: Exclude<object, Map<any, any> | WeakMap<any, any>>, propertyKey: PropertyKey, value: any): boolean;
