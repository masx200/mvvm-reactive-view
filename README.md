# mvvm-reactive-view

面向未来的,轻量级,响应式,mvvm,构建视图,声明式,组件化,基于 webcomponent ,基于 Proxy,基于虚拟 dom,支持 jsx 和 hyperscript,前端 javascript 库

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
  html,
  h,
  createApp,
  createRef,
  createElemet
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

```js
import {
  html,
  h,
  createApp,
  createRef,
  createElemet
} from "https://masx200.github.io/mvvm-reactive-view/dist/index.js";

const vdom = html`
  <div>hello world!</div>
  <h1>mvvm-reactive-view</h1>
`;

createApp(vdom, document.getElementById("root"));
```

```html
<script src="https://cdn.staticfile.org/custom-elements/1.2.4/custom-elements.min.js"></script>
<div id="root"></div>
<script type="module" src="./index.js"></script>
```

# 可在 webpack 中, 使用 babel-plugin-htm 预编译
