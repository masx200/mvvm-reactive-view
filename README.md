# mvvm-reactive-view

面向未来的,轻量级,响应式,mvvm,构建视图,声明式,组件化,基于 webcomponent ,基于 Proxy,基于虚拟 dom,支持 jsx 和 hyperscript,前端 javascript 库

不使用 diff 算法,使用 proxy 精准监听状态变化,高效更新视图

# 局部安装

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
  watch,
  html,
  h,
  createApp,
  createRef,
  createElemet,
  createState
} from "mvvm-reactive-view";
```

# webcomponent custom-elements polyfill

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
```

或者

```js
import "mvvm-reactive-view/polyfill/custom-elements.min.js";
```

# 快速上手,可在浏览器中运行而不需要编译工具

`index.js`

```js
import {
  watch,
  html,
  h,
  createApp,
  createRef,
  createElemet,
  createState
} from "https://masx200.github.io/mvvm-reactive-view/dist/index.js";
const inputref = createRef();
const state1 = createState("hello");
const vdom = html`
  <div>hello world!</div>
  <input
    @input=${e => (state1.value = e.target.value)}
    *ref=${inputref}
    @change=${e => (state1.value = e.target.value)}
    id="code16"
    readonly=""
    class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"
    value=${state1}
  />
  <h1>mvvm-reactive-view</h1>
`;
watch(state1, console.log);
createApp(vdom, document.getElementById("root"));
```

`index.html`

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
<div id="root"></div>
<script type="module" src="./index.js"></script>
```

# 使用 hyperscript 可在 webpack 中, 使用 babel-plugin-htm 预编译成虚拟 dom

# 事件绑定

属性名为'@'+事件名称,属性值绑定为回调函数

`@change=${e => (state1.value = e.target.value)}`

# 使用指令

属性名为'\*'+指令名称,属性值为值

现已支持的指令有 'ref','html','text'

指令`*ref`用来获取元素的引用

`*ref=${inputref}`

指令`*html`用来设置元素的`innerHTML`

指令`*text`用来设置元素的`textContent`

# 属性单向绑定

使用`createState`创建状态,直接绑定到元素的属性上即可,当状态变化时,元素属性跟着一起变化

`value=${state1}`

# 表单双向绑定

给表单元素添加 `change` 和 `input`事件回调,改变状态的`value`属性值,即可

# API

`html`用来解析字符串模板,调用`createElemet`,转换成虚拟 `dom`

`h`等同于`createElemet`,用来生成虚拟 `dom`

```ts
function createElemet(
  type: Function | string = "",
  props: any = {},
  ...children: Array<Virtualdom | string>
): Virtualdom | Array<Virtualdom | string>;
```

使用`createApp`把虚拟 `dom` 渲染到真实 `dom` 上

```ts
function createApp(
  vdom: string | Virtualdom | (string | Virtualdom)[],
  container: HTMLElement | Element
): HTMLElement | Element;
```

使用`createRef`返回一个引用对象,可绑定到元素的`*ref`属性上,获取当前`dom元素`

```ts
function createRef(
  init: any
): {
  value: any;
};
```

虚拟 `dom` `Virtualdom`类

```ts
class Virtualdom {
  type: string | Function | undefined | Class;
  props: object = {};
  children: Array<Virtualdom | string> = [];
  directives: object = {};
  onevent: object = {};
  bindattr: object = {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string> = []
  );
}
```

使用`createState`来生成一个引用形式的状态

```ts
function createState(init: string | number | boolean|object): ReactiveState;
```

状态`Primitivestate`类,可修改其`value`属性来改变状态的值

```ts
class ReactiveState {
  value: string | number | boolean | undefined:object;

  constructor(init: string | number | boolean:object);
}
```

使用`watch`函数来监听状态的变化,执行回调函数

```ts
function watch(state: ReactiveState, callback: Function): void;
```
