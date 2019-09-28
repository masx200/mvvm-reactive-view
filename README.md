# mvvm-reactive-view

## 面向未来的,轻量级,响应式,mvvm,构建视图,声明式,组件化,基于 `webcomponent` ,

## 基于 `Proxy`,基于`虚拟 dom`,支持 `jsx` 和 `hyperscript`,前端 `javascript` 库

## 虽然使用了`虚拟dom`，但是，与`react`，`vue`等之类的前端框架有本质上的不同，不使用`diff`算法，响应式状态直接与元素绑定，高效更新，性能更强

## 不使用 `diff` 算法,使用 proxy 精准监听状态变化,高效更新视图,状态都是响应式，可观察的对象,每次状态改变不会重新生成`虚拟 dom`


## 由于使用了 `Proxy`，所以不支持 `IE` 浏览器，而且 `Proxy` 不可 `polyfill`

关于 `Proxy`

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

## 基于 `EventTarget`,`Microsoft Edge` 浏览器不支持`new EventTarget`,需要自行添加`polyfill`

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/EventTarget

https://github.com/masx200/webpack-react-vue-spa-awesome-config/blob/master/lib/polyfill.min.js



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
  createComponent,
  useMounted,
  useUnMounted,
  condition,
  Fragment,
  directives,
  watch,
  html,
  h,
  createApp,
  createRef,
  createElement,
  createState
} from "mvvm-reactive-view";
```

# 从 cdn 获取

https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.min.js

# webcomponent custom-elements polyfill

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
```

或者

```js
import "mvvm-reactive-view/polyfill/custom-elements.min.js";
```

https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements

# 快速上手,可在浏览器中运行而不需要编译工具

`index.js`

```js
import {
  createComponent,
  useMounted,
  useUnMounted,
  condition,
  directives,
  watch,
  html,
  h,
  createApp,
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
createApp(vdom, document.getElementById("root"));
```

`index.html`

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
<div id="root"></div>
<script type="module" src="./index.js"></script>
```

# 支持`jsx`和使用 `hyperscript`

## 可在 `webpack` 中, 使用 `babel-plugin-htm` 或者 `@babel/plugin-transform-react-jsx`预编译成`虚拟 dom`

https://github.com/developit/htm

https://github.com/hyperhype/hyperscript

https://github.com/developit/htm/tree/master/packages/babel-plugin-htm

https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx

https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

由于使用了 ECMAScript2019 的 api，所以需要自行添加 polyfill

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

# 条件渲染

使用`condition`函数来实现条件渲染,返回值是`虚拟dom`

```js
var mystate = createState(true);
var vdom = condition(
  mystate,
  ["testtrue"],
  createElement("div", undefined, "testfalese")
);
document.body.appendChild(createApp(vdom, document.createElement("div")));
setTimeout(() => {
  mystate.value = false;
}, 3000);
```

# 组件化

在组件初始化函数里面可以使用`useMounted`,`useUnMounted`,`watch`等函数

## 使用`useMounted`和`useUnMounted`来给组件添加挂载和卸载时执行的函数,只能在组件初始化函数里面使用

## 可以给组件设置默认属性,设置组件初始化函数的`defaultProps`属性即可

组件初始化函数需要返回一个`虚拟DOM`

最后给组件初始化函数包裹一个`createComponent`函数,返回一个`web component custom element`

## 组件局部 css 样式,设置组件初始化函数的`css`属性即可,可以使用 `postcss`或者`css-loader`引入外部 `css` 文件转成字符串

在运行时,解析 `css` 文本,然后添加前缀,再转换成 `css` 文本

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
document.body.appendChild(createApp(vdom, document.createElement("div")));
setTimeout(() => {
  vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
}, 5000);
```

# 使用 webcomponents costum elements

可以通过静态属性 static `defaultProps` 来设置默认值

通过 props 来传递参数给元素，以 json 格式传递

```js
var mycom = class extends HTMLElement {};

var vdom = html`
  <${mycom} />
`;

document.body.appendChild(createApp(vdom, document.createElement("div")));
```

```ts
document.body.appendChild(
  createApp(
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

# 支持使用给元素的 class 属性赋值 Set 类型,自动转成 字符串

`class`属性支持的类型有

```ts
type classprop=string|Set<string>|Array<string>
```

```js
const classsetstate = createState(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
html`
  
  <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}>
    ${objstatearray}
  </div>
  ${objstate}
  <div style=${stylestate} class=${classsetstate} />
`;

setTimeout(() => {
  classsetstate.add("vvvvvvvvvvv");
}, 5000);
```

# 元素的 style 属性可是字符串或者对象

`style`属性支持的类型有

```ts
type styleprop=string|object
```
`style="width:800px"`

`style=${{ display: "block", width: "500px" }}`

```js
html`<div style=${{ display: "block", width: "100%" }}>${objstate2}</div>`
```

# 属性单向绑定

使用`createState`创建状态,直接绑定到元素的属性上即可,当状态变化时,元素属性跟着一起变化

`value=${state1}`

# 事件绑定

1.属性名为'@'+事件名称,属性值绑定为回调函数或者回调函数组成的数组

`@change=${e => (state1.value = e.target.value)}`

`@input=${[e => (state1.value = e.target.value),console.log]}`

2.使用"on"+事件名称

`onclick={e=>console.log(e)}`

# 使用指令

属性名为'\*'+指令名称,属性值为值

现已支持的指令有 `'ref','html','text'，"value"`

### 指令`*ref`用来获取元素的引用

`*ref=${ref}`

```ts
const ref = createRef();

html`
  <div *ref=${ref} />
`;

console.log(ref.value);
```

### 指令`*html`用来设置元素的`innerHTML`

`*html=${state}`

### 指令`*text`用来设置元素的`textContent`

`*text=${state}`

### 指令`*value`只是一个简单的表单`textarea`或者`input`元素的`value`值双向绑定语法糖

`*value=${state}`

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

# API

## 使用`createComponent` 来创建组件,传参是一个组件初始化函数,返回一个`web component custom element`

```ts
function createComponent(custfun: Custom): Class;
interface Custom {
  (props?: object, children?: Array<any>):
    | Virtualdom
    | string
    | ReactiveState
    | Array<Virtualdom | ReactiveState | string>;
  defaultProps?: object;
css?:string;
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
  iftrue:
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

## 使用`directives`函数来扩展指令

```ts
function directives(options: { [s: string]: Extendfun }): void;

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
  ...children: Array<Virtualdom | string>
): Virtualdom | Array<Virtualdom | string>;
```

## 使用`createApp`把虚拟 `dom` 渲染到真实 `dom` 上,返回容器元素

```ts
function createApp(
  vdom: string | Virtualdom | (string | Virtualdom)[],
  container: HTMLElement | Element
): HTMLElement | Element;
```

## 使用`createRef`返回一个引用对象,可绑定到元素的`*ref`属性上,获取当前`dom元素`

```ts
function createRef(
  init: any
): {
  value: any;
};
```

## 虚拟 `dom` `Virtualdom`类

```ts
class Virtualdom {
  type: string | Function  ;
  props: object = {};
  children: Array<Virtualdom | string|ReactiveState> = [];
  directives: object = {};
  onevent: { [key: string]: Array<EventListener> } = {};
  bindattr:  { [key: string]: ReactiveState } = {};= {};
  constructor(
    type: Function | string = "",
    props: object = {},
    children: Array<Virtualdom | string|ReactiveState> = []
  );
}
```

## 使用`createState`来生成一个引用形式的状态

```ts
function createState(init: string | number | boolean | object): ReactiveState;
```

## 响应式状态`ReactiveState`类,可修改其`value`属性来改变状态的值

```ts
class ReactiveState {
  value: string | number | boolean | undefined | object;

  constructor(init: string | number | boolean | object);
}
```

## 使用`watch`函数来监听状态的变化,执行回调函数

```ts
function watch(state: ReactiveState, callback: Function): void;
```

# 懒加载

尚在开发中

# 列表渲染

1.不变的列表

```jsx

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

createApp(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

2.可变的列表

尚在开发中
