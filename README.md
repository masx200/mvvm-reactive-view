# mvvm-reactive-view

## 面向未来的,轻量级,响应式,`mvvm`,构建视图,声明式,组件化,基于 `webcomponent` ,

## 基于 `Proxy`,基于`虚拟 dom`,支持 `jsx` 和 `hyperscript`,前端 `javascript` 库



## 虽然使用了`虚拟dom`，但是，与`react`，`vue`等之类的前端框架有本质上的不同，不使用`diff`算法，响应式状态直接与元素绑定，高效更新，性能更强

## 不使用 `diff` 算法,使用 `proxy` 精准监听状态变化,高效更新视图,状态都是响应式，可观察的对象,每次状态改变不会重新生成`虚拟 dom`

## 使用响应式状态管理全局共享状态，抛弃 `redux,vuex,mobx`

## 有着面向未来的函数式`API`，方便复用逻辑和重用，抛弃`mixin`(`混入`)和`hoc`(`高阶组件`)，




## 由于使用了 `Proxy`，所以不支持 `IE` 浏览器，而且 `Proxy` 不可 `polyfill`

### 浏览器要求原生支持`Proxy`和`ECMASCRIPT2015+`

### 关于 `Proxy`

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

## 基于 `EventTarget`,`Microsoft Edge` 浏览器不支持`new EventTarget`,需要自行添加`polyfill`

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/EventTarget

https://github.com/masx200/webpack-react-vue-spa-awesome-config/blob/master/lib/polyfill.min.js

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/masx200/webpack-react-vue-spa-awesome-config@2.4.5/polyfill/dist/polyfill.min.js"
></script>
```
# `webcomponent` `custom-elements` `polyfill`

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
```

或者

```js
import "mvvm-reactive-view/polyfill/custom-elements.min.js";
```

https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements


# 安装 npm 模块

```powershell
cnpm install --save  https://github.com/masx200/mvvm-reactive-view.git
```

或者

```powershell
yarn add https://github.com/masx200/mvvm-reactive-view.git
```

# 使用 npm 模块

```js
import {
  computed,
  createComponent,
  useMounted,
  useUnMounted,
  condition,
  Fragment,
  directives,
  watch,
  html,
  h,
  MountElement,
  createRef,
  createElement,
  createState
} from "mvvm-reactive-view";
```

# 从 `cdn` 获取模块

## 开发模式

https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.js

## 生产模式

https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.min.js


# 快速上手,可在浏览器中运行而不需要编译工具

`index.js`

```js
import {
  computed,
  createComponent,
  useMounted,
  useUnMounted,
  condition,
  directives,
  watch,
  html,
  h,
  MountElement,
  createRef,
  createElement,
  createState
} from "https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.min.js";
const inputref = createRef();
const state1 = createState("hello");
const stylestate = createState({ display: "block", width: "700px" });
const vdom = html`
  <div style=${{ display: "block", width: "500px" }}>hello world!</div>
  <input
    style="width:800px"
    @input=${e => (state1.value = e.target.value)}
    *ref=${inputref}
    @change=${e => (state1.value = e.target.value)}
    id="code16"
    class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"
    value=${state1}
  />
  <h1 style=${stylestate}>mvvm-reactive-view</h1>
  <button
    @click=${() => {
      stylestate.color = "red";
    }}
  >
    red</button
  ><button
    @click=${() => {
      stylestate.color = "green";
    }}
  >
    green
  </button>
`;
watch(state1, console.log);
watch(stylestate, console.log);
console.log(vdom, inputref);
MountElement(vdom, document.getElementById("root"));
```

`index.html`

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
<div id="root"></div>
<script type="module" src="./index.js"></script>
```

# 支持`jsx`和使用 `hyperscript`

## 为什么选择`jsx`？而不是`template`？

`jsx`的表现能力明显强于`template`，`template`中无法写函数与对象，只能写字符串，

类似`vue`和`angular`的模板`DSL`会让人很难理解，模板`dsl`不如`jsx`灵活

`React`非常流行，使用过`react-jsx`的人可以轻松使用，学习成本比较低

## 可在 `webpack` 中, 使用 `babel-plugin-htm` 或者 `@babel/plugin-transform-react-jsx`预编译成`虚拟 dom`

https://github.com/developit/htm

https://github.com/hyperhype/hyperscript

https://github.com/developit/htm/tree/master/packages/babel-plugin-htm

https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx

https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

由于使用了 `ECMAScript2019` 的 `api`，所以需要自行添加 `polyfill`


```js
import 'core-js/features/array/flat'
import "core-js/modules/es.object.from-entries";
```
https://github.com/zloirock/core-js

https://github.com/tc39/proposal-object-from-entries

https://tc39.es/proposal-flatMap/

还需要使用`babel-preset-env`包含`core-js@3` 和 `"@babel/plugin-proposal-class-properties"`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    [
      "babel-plugin-htm",
      {
        "tag": "html",
        "pragma": "h"
      }
    ],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "createElement",
        "pragmaFrag": "Fragment"
      }
    ]
  ]
}
```

# 响应式状态对象 ,可以独立于组件存在,可以在任何地方使用,

## `ReactiveState`,基于 `EventTarget` 和 `Proxy`,

### 如果状态跟视图绑定，则状态改变引起界面刷新是异步的

### 可修改其`value`属性来改变状态的值，

### 如果初始值是原始类型则不能修改为对象类型，

### 如果初始值是对象类型则不能修改为原始类型，

## 轻松使用全局共享状态,可以非常简单的集中统一管理,抛弃 `redux,vuex,mobx`

```jsx
const number = createState(10);
function increment() {
  number.value++;
}
function decrement() {
  number.value--;
}
const store = { number, increment, decrement };

const mycomappclass = createComponent(() => {
  const vdom = (
    <div>
      <h3> 点击数字</h3>
      <h2>number:{store.number}</h2>

      <button onclick={store.increment}>increment</button>
      <button onclick={store.decrement}>decrement</button>
    </div>
  );
  return vdom;
});
const vdom = [
  createElement(mycomappclass),
  createElement(mycomappclass),
  createElement(mycomappclass)
];

document.body.appendChild(MountElement(vdom, document.createElement("div")));
```

# 条件渲染

使用`condition`函数来实现条件渲染,返回值是`虚拟dom`

```jsx
var mystate = createState(true);
var vdom = condition(
  mystate,
 createElement( "p",null,["testtrue"]),
  createElement("div", undefined, "testfalese")
);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
setTimeout(() => {
  mystate.value = false;
}, 3000);
```

# 组件化

一个简单的`helloworld`示例如下

```jsx
const defaultProps = { cccccc: "bbbbbbb" };
const css = `
* {
  color: purple !important;

  font-size: 50px;
}`;
const Hellowordclass = createComponent(
  Object.assign(
    () => {
      return <div> hello world</div>;
    },
    { css, defaultProps }
  )
);
document.body.appendChild(
  MountElement(
    <Hellowordclass />,

    document.createElement("div")
  )
);
```

## 父子组件传数据

组件之间的数据传递只能是从父组件到子组件的单向数据流，以`json`格式传递参数

抛弃`mixin`(`混入`)和`hoc`(`高阶组件`)，让人难以理解，难以使用，它们已经被废弃。

https://blog.csdn.net/sinat_17775997/article/details/89181398

### Mixin 带来的风险：

Mixin 可能会相互依赖，相互耦合，不利于代码维护

不同的 Mixin 中的方法可能会相互冲突

Mixin 非常多时，组件是可以感知到的，

甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

### HOC 的缺陷

HOC 需要在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这让调试变得非常困难。

HOC 可以劫持 props，在不遵守约定的情况下也可能造成冲突。

## 更好的逻辑组合复用方法

受到 `Vue Composition API`和`React Hooks`的启发,

集各家所长，但是跟它们完全不同，

响应式状态可以独立于组件存在,`watch`,`computed`,`createState`函数可以在组件外使用

基于函数的 `API` 提供与`React Hooks`相同级别的逻辑组合功能，但有一些重要的区别。

与`React hooks`不同，该组件初始化函数仅被调用一次

在组件初始化函数里面可以使用`useMounted`,`useUnMounted`,`watch`,`createState`等函数

## 可以给组件设置默认属性,设置组件初始化函数的`defaultProps`属性即可

组件初始化函数需要返回一个`虚拟DOM`

最后给组件初始化函数包裹一个`createComponent`函数,返回一个`web component custom element`

## 组件局部 `css` 样式,设置组件初始化函数的`css`属性即可,可以使用 `postcss`或者`css-loader`引入外部 `css` 文件转成字符串

在运行时,使用浏览器自带的`css`解析器，解析 `css` 文本变成`cssrule`,然后添加前缀,再转换成 `css` 文本

## 使用`useMounted`和`useUnMounted`来给组件添加挂载和卸载时执行的`callback函数`,只能在组件初始化函数里面使用，这些`callback`函数都会异步执行

```js
var mycom = (props, children) => {
  useMounted(() => {
    console.log("mounted1");
  });
  useMounted(() => {
    console.log("mounted2", props);
  });
  useUnMounted(() => {
    console.log("unmounted");
  });
  watch(props.cccccc, console.log);
  return createElement("div", null, [
    "wwwwwwwwwwww",
    createElement("div", null, ["createComponent"]),
    children,
    createElement("div", null, [props.cccccc])
  ]);
};
mycom.defaultProps = { cccccc: "bbbbbbb" };
mycom.css = `
* {
  color: purple !important;

  font-size: 50px;
}

  .article-content h3 {
    font-size: 18px;
  }


`;
const myclasscomponent = createComponent(mycom);
const vdom = createElement(
  myclasscomponent,
  {
    aaaaaa: 222222222,
    tttttt: "dddddddddd"
  },
  ["children"]
);
console.log(vdom);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
setTimeout(() => {
  vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
}, 5000);
```

## 不建议在组件局部样式 css 中使用`@import`加载外部样式表

如果像如下这样,在组件局部样式 css 中引用外部 css,可能会导致页面闪动

```css
@import url(https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css);
```

一个解决办法是把外部样式写在`html`中

```html
<link
  href="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css"
  rel="stylesheet"
/>
```

另一个解决办法是异步`fetch`加载`css`文本

```js
(async () => {
  const defaultProps = { cccccc: "bbbbbbb" };
  const css = await (await fetch(
    "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css"
  )).text();
  const Hellowordclass = createComponent(
    Object.assign(
      () => {
        return createElement("div", undefined, "hello world");
      },
      { css, defaultProps }
    )
  );
  document.body.appendChild(
    MountElement(
      createElement(Hellowordclass),

      document.createElement("div")
    )
  );
})();
```

# 使用 webcomponents costum elements

可以通过静态属性 `static` `defaultProps` 来设置默认值

传递参数给元素，以 `json` 格式传递,

可以不显式使用`CustomElements.define()`，因为在渲染组件时会自动使用随机命名定义

```js
var mycom = class extends HTMLElement {};

var vdom = html`
  <${mycom} />
`;

document.body.appendChild(MountElement(vdom, document.createElement("div")));
```

```ts
document.body.appendChild(
  MountElement(
    createElement(
      class extends HTMLElement {
        static defaultProps = {
          name: "HelloKitty",
          myAge: 18
        };
      }
    ),
    document.createElement("div")
  )
);
```

# 支持元素的 `class` 属性赋值 `Set` 类型,自动转成 字符串

`class`属性支持的类型有

```ts
type classprop = string | Set<string> | Array<string>|ReactiveState<string | Set<string> | Array<string>>;
```

```js
const classsetstate = createState(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
html`
  <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}>
    
  </div>
  
  <div style=${stylestate} class=${classsetstate} />
`;

setTimeout(() => {
  classsetstate.add("vvvvvvvvvvv");
}, 5000);
```

# 元素的 `style` 属性可是字符串或者对象

支持驼峰命名法和横杠命名法，自动转换成字符串



`style`属性支持的类型有

```ts
type styleprop = string | object|ReactiveState<string>|ReactiveState<object>;
```

`style="width:800px"`

`style=${{ display: "block", width: "500px" }}`

```js
const stylestate = createState({ display: "block", width: "700px" });

html`
<div style=${stylestate} class=${classsetstate} />

  <div style=${{ display: "block", width: "100%" }}></div>
`;
```

# 属性单向绑定

使用`createState`创建状态,直接绑定到元素的属性上即可,当状态变化时,元素属性跟着一起变化

`const state1=createState()`

`value=${state1}`

# 事件绑定

1.属性名为'@'+事件名称,属性值绑定为回调函数或者回调函数组成的数组

`@change=${e => (state1.value = e.target.value)}`

`@input=${[e => (state1.value = e.target.value),console.log]}`

2.使用"on"+事件名称

```jsx
<button onclick={e => console.log(e)} />
```

# 使用指令

1.属性名为'\*'+指令名称,属性值为值

2.使用"\_"+指令名称

现已支持的指令有 `'ref','html','text'，"value","checked"`

### 指令`ref`用来获取元素的引用,值可以是`object`或者`Function`

`*ref=${ref}`

```ts
const ref = createRef();

var vdom = html`
  <div *ref=${ref} />
`;

console.log(ref.value);
```

```tsx
const ref =createRef( );

var vdom = 
  <div _ref={ele=>ref.value=ele} />


console.log(ref.value);
```

### 指令`html`用来设置元素的`innerHTML`

`*html=${state}`

### 指令`text`用来设置元素的`textContent`

`*text=${state}`

```jsx
<button _text="click me" />
```

### 指令`value`只是一个简单的表单`textarea`或者`input`元素的`value`值双向绑定语法糖

```jsx
<input _value={state} />
```

```jsx
<textarea _value={state} />
```

### 指令`checked`只是一个简单的`checkbox`表单`input`元素的`checked`值双向绑定语法糖

```jsx
<input type="checkbox" _checked={state} />
```

# 扩展自定义指令

```js
directives({ myfocus(element, value, vdom) {} });

html`
  <input *myfocus=${myvalue} />
`;
```

# 表单双向绑定

给表单`input`或者`textarea`元素添加 `change` 和 `input`事件回调,改变状态的`value`属性值,即可

```js
html`
  <textarea
    value=${state1}
    @input=${e => (state1.value = e.target.value)}
    @change=${e => (state1.value = e.target.value)}
  />
`;
```

# 支持绑定状态到 文字节点

```js
const objstate2 = createState(`ssssssssssss`);
const vdomobj = html`
  <div>${objstate2}</div>
  <div>${objstate2}</div>
  ${objstate2}
`;
```

# 组件中逻辑提取和重用

## 您可以通过简单地将其导出为函数来重用组件逻辑的任何部分

## 计算属性,当一个状态依赖于另一个状态时可以使用`computed`,并且可以缓存计算结果,回调函数作为计算属性的`getter`使用

### 当依赖项发生变化时,计算属性也会发生变化,计算属性还带有缓存计算结果的功能,计算属性是只读的!

例子：跟踪鼠标的位置

```jsx
function useMousePosition() {
  const x = createState(0);
  const y = createState(0);

  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  useMounted(() => {
    window.addEventListener("mousemove", update);
  });

  useUnMounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return { x, y };
}

const mycomapp = createComponent(() => {
  const { x, y } = useMousePosition();
  const plus = computed(x, x => {
    return x + 100;
  });
  const multi = computed([x, y], (x, y) => {
    return x * y;
  });
  return (
    <div>
      <h3> 鼠标位置</h3>
      <h2>x:{x}</h2>

      <h1>y:{y}</h1>
      <p>x+100 是{plus}</p>
      <p>x*y 是{multi}</p>
    </div>
  );
});
var vdom = createElement((mycomapp));

document.body.appendChild(MountElement(vdom, document.createElement("div")));
```

# API

## 使用`createState`来生成一个引用形式响应式的状态，

```ts
function createState<T extends string | number | boolean | undefined | object|bigint > (init:T): ReactiveState<T>;
```

## 响应式状态`ReactiveState`类,可修改其`value`属性来改变状态的值，

### 如果初始值是原始类型则不能修改为对象类型，

### 如果初始值是对象类型则不能修改为原始类型，

```ts
class ReactiveState<T extends string | number | boolean | undefined | object|bigint > {
  value: T
  constructor(init: T);
}
```

## 计算属性`computed`,计算属性在处理一些复杂逻辑时是很有用的。

### 第一个参数是依赖项,或者依赖项数组,第二个参数是回调函数,返回一个响应式状态对象,

```typescript
interface CallbackReactiveState<T extends string | number | boolean | undefined | object|bigint > {
  
 (...Array<ReactiveState<T>>):any
}
function computed<T>(
  state: ReactiveState<T> | ReactiveState<T>[],
  callback:CallbackReactiveState<T>
): ReactiveState<any>;
```
## 使用`watch`函数来监听状态的变化,执行回调函数,可在任何地方使用此函数

```ts
function watch<T>(
state: ReactiveState<T>| ReactiveState<T>[],
 callback: CallbackReactiveState<T>): void;
```
## 使用`createComponent` 来创建组件,传参是一个组件初始化函数,返回一个`web component custom element`

```ts
function createComponent(custfun: Custom): Class;
interface Custom {
  (props?: { [key: string]: ReactiveState }, children?: Array<any>):
    | Virtualdom
    | string
    | number
    | ReactiveState
    | Array<Virtualdom | ReactiveState | string | number>;
  defaultProps?: object;
  css?: string;
}
interface Class {
  new (propsjson?: object, children?: any[]): HTMLElement;
  prototype: HTMLElement;
  defaultProps?: object;
}
```

## 使用`useMounted`和`useUnMounted`来给组件添加挂载和卸载时执行的函数,只能在组件初始化函数里面使用

```ts
function useMounted(fun: Function): void;

function useUnMounted(fun: Function): void;
```

## 使用`condition`函数来实现条件渲染,返回值是`虚拟dom`

```ts
function condition(
  conditon: ReactiveState,
  iftrue?:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState,
  iffalse?:
    | Virtualdom
    | string
    | Array<Virtualdom | string | ReactiveState>
    | ReactiveState
): Virtualdom;
```

## 使用`directives`函数来扩展指令,返回已有的指令合集

```ts
function directives(options?: { [s: string]: Extendfun }): object;

interface Extendfun {
  (element: Element, value: any, vdom: Virtualdom): void;
}
```

## `html`用来解析字符串模板,调用`createElement`,转换成虚拟 `dom`

## `h`等同于`createElement`,用来生成虚拟 `dom`

```ts
function createElement(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string | number>
): Virtualdom | Array<Virtualdom | string | number>;
```

## 使用`MountElement`把虚拟 `dom` 渲染到真实 `dom` 上,返回容器元素

```ts
function MountElement<T extends Element>(
  vdom:
    | string
    | Virtualdom
    | number
    | ReactiveState
    | (string | number | Virtualdom | ReactiveState)[],
  container: T
): T;
```

## 使用`createRef`返回一个引用对象,可绑定到元素的`*ref`属性上,获取当前`dom元素`

```ts
interface Ref<T> {
  value: T
}

function createRef<T>(value: T): Ref<T> {
  return { value };
}

```

## 虚拟 `dom` `Virtualdom`类

```ts
class Virtualdom {
  element: Element | undefined;
  type: string | Function;
  props: object = {};
  children: Array<Virtualdom | number | string | ReactiveState> = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr: { [key: string]: ReactiveState } = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string | ReactiveState> = []
  );
}
```



# 懒加载

尚在开发中

# 列表渲染

1.不变的列表，没有响应性

```tsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => {
return <li>{number}</li>}
);

MountElement(<ul>{listItems}</ul>, document.getElementById("root"));
```

2.可变的列表，有响应式

尚在开发中
