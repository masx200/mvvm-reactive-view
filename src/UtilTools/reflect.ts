import { isMap, isWeakMap } from "./util";

export const {
  apply,
  construct,
  defineProperty,
  deleteProperty,

  getOwnPropertyDescriptor,
  getPrototypeOf,
  has,

  ownKeys,
  preventExtensions
} = Reflect;
/* get和set函数同时实现reflect.get和reflect.set和map.set和map.get */
export function get(
  target: Map<any, any> | WeakMap<any, any>,
  propertyKey: PropertyKey
): any;
export function get(
  target: Exclude<object, Map<any, any> | WeakMap<any, any>>,
  propertyKey: PropertyKey
): any;
export function get(target: object, propertyKey: PropertyKey): any {
  if (isMap(target) || isWeakMap(target)) {
    return target.get(propertyKey);
  } else {
    return Reflect.get(target, propertyKey /* , receiver */);
  }
}
export function set(
  target: Map<any, any> | WeakMap<any, any>,
  propertyKey: PropertyKey,
  value: any
): boolean;
export function set(
  target: Exclude<object, Map<any, any> | WeakMap<any, any>>,
  propertyKey: PropertyKey,
  value: any
): boolean;
export function set(
  target: object,
  propertyKey: PropertyKey,
  value: any
): boolean {
  if (isMap(target) || isWeakMap(target)) {
    target.set(propertyKey, value);

    return true;
  } else {
    return Reflect.set(target, propertyKey, value /* , receiver */);
  }
}

/*
apply()
对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
construct()
对构造函数进行 new 操作，相当于执行 new target(...args)。
defineProperty()
和 Object.defineProperty() 类似。
deleteProperty()
作为函数的delete操作符，相当于执行 delete target[name]。

该方法会返回一个包含有目标对象身上所有可枚举的自身字符串属性以及继承字符串属性的迭代器，for...in 操作遍历到的正是这些属性。
get()
获取对象身上某个属性的值，类似于 target[name]。
getOwnPropertyDescriptor()
类似于 Object.getOwnPropertyDescriptor()。
getPrototypeOf()
类似于 Object.getPrototypeOf()。
has()
判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
isExtensible()
类似于 Object.isExtensible().
ownKeys()
返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
preventExtensions()
类似于 Object.preventExtensions()。返回一个Boolean。
set()
将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
setPrototypeOf()
类似于 Object.setPrototypeOf()。
*/
