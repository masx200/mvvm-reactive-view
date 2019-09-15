const Reflect=window.Reflect;
export default Reflect



export const {apply,construct}=Reflect
/*
Reflect.apply()
对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
Reflect.construct()
对构造函数进行 new 操作，相当于执行 new target(...args)。
Reflect.defineProperty()
和 Object.defineProperty() 类似。
Reflect.deleteProperty()
作为函数的delete操作符，相当于执行 delete target[name]。
Reflect.enumerate()
该方法会返回一个包含有目标对象身上所有可枚举的自身字符串属性以及继承字符串属性的迭代器，for...in 操作遍历到的正是这些属性。
Reflect.get()
获取对象身上某个属性的值，类似于 target[name]。
Reflect.getOwnPropertyDescriptor()
类似于 Object.getOwnPropertyDescriptor()。
Reflect.getPrototypeOf()
类似于 Object.getPrototypeOf()。
Reflect.has()
判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
Reflect.isExtensible()
类似于 Object.isExtensible().
Reflect.ownKeys()
返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
Reflect.preventExtensions()
类似于 Object.preventExtensions()。返回一个Boolean。
Reflect.set()
将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
Reflect.setPrototypeOf()
类似于 Object.setPrototypeOf()。
*/
