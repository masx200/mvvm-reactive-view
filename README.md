# mvvm-reactive-view

这是一个实验性项目,此代码库仅供学习交流使用

## 面向未来的,轻量级,响应式,`mvvm`,构建视图,声明式,组件化,基于 `webcomponent` ,基于`虚拟 dom`

## 基于 `Proxy`,支持 `jsx` 和 `hyperscript`,前端 `javascript` 库,完全使用`TypeScript`编写

## 虽然使用了`虚拟dom`，但是，与`react`，`vue`等之类的前端框架有本质上的不同，不使用`diff`算法，响应式状态直接与元素绑定，高效更新，性能更强

## 不使用 `diff` 算法,使用 `proxy` 精准监听状态变化,高效更新视图,状态都是响应式，可观察的对象,每次状态改变不会重新生成`虚拟 dom`,可实现最小化`DOM`操作

## 使用响应式状态管理全局共享状态，抛弃 `redux,vuex,mobx`，响应式状态可以独立于组件存在

## 有着面向未来的函数式`API`，提供与`React Hooks`相同级别的逻辑组合功能，方便复用逻辑和重用，抛弃`mixin`(`混入`)和`hoc`(`高阶组件`)，`Render Props`

## 支持组件局部`css`样式，仅在组件内有效，不会全局生效

## 由于使用了 `Proxy`，所以不支持 `IE` 浏览器，而且 `Proxy` 不可 `polyfill`

## 兼容的浏览器

浏览器要求原生支持`Proxy`和`ECMASCRIPT2017`以上

`EDGE,CHROME,FIREFOX,SAFARI`

# 安装 `npm` 模块

```powershell
cnpm install --save  https://github.com/masx200/mvvm-reactive-view.git
```

或者

```powershell
yarn add https://github.com/masx200/mvvm-reactive-view.git
```

# 从 `cdn` 获取模块

## 开发模式

https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.js

## 生产模式

https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/index.min.js

### 关于 `Proxy`

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

# polyfill

```js
import "@masx200/mvvm-reactive-view/dist/polyfill.js";
```

```html
<script src="https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/polyfill.js"></script>
```

## 需要`webcomponent` `custom-elements` `polyfill`

https://github.com/webcomponents/polyfills/tree/master/packages/custom-elements

## ECMAScript2019 polyfill

由于使用了 `ECMAScript2019` 的 `api`，所以需要自行添加 `polyfill`

需要 `Object.fromEntries`和`Array.prototype.flat`的 polyfill

https://github.com/zloirock/core-js

https://github.com/tc39/proposal-object-from-entries

https://tc39.es/proposal-flatMap/

# 使用 `npm` 模块

```js
import {
    Switchable,
    computed,
    createComponent,
    useCreated,
    useUpdated,
    useMounted,
    useUnMounted,
    Condition,
    Directives,
    watch,
    html,
    h,
    MountElement,
    createRef,
    createElement,
    createState,
    render
} from "@masx200/mvvm-reactive-view";
```

# 快速上手,可在浏览器中运行而不需要编译工具

`index.js`

```js
import {
    Switchable,
    computed,
    createComponent,
    useCreated,
    useUpdated,
    useMounted,
    useUnMounted,
    Condition,
    Directives,
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
const stylestate = createState({ display: "block", width: "700px", color: "" });
const vdom = html`
    <div style=${{ display: "block", width: "500px" }}>hello world!</div>
    <input
        style="width:800px"
        @input=${(e) => (state1.value = e.target.value)}
        *ref=${inputref}
        @change=${(e) => (state1.value = e.target.value)}
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
        red
    </button>

    <button
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
<script src="https://cdn.jsdelivr.net/gh/masx200/mvvm-reactive-view@latest/dist/polyfill.js"></script>
<div id="root"></div>
<script type="module" src="./index.js"></script>
```

# 支持`jsx`和使用 `hyperscript`

## 为什么选择`jsx`？而不是`template`？

在体积方面，`template`编译器远大于`jsx`编译器。

浏览器中运行的`JSX`编译器`HTM (Hyperscript Tagged Markup)`体积小于 1KB

`jsx`的表现能力明显强于`template`，`template`中无法写函数与对象，只能写字符串，

类似`vue`和`angular`的模板`DSL`会让人很难理解，模板`dsl`不如`jsx`灵活

`JSX`非常流行，使用过`react-jsx`的人可以轻松使用，学习成本比较低

但是与`react-jsx`有一些不同，例如 属性名不使用驼峰命名等等

## 可在 `rollup`或`webpack` 中, 使用 `babel-plugin-htm` 或者 `@babel/plugin-transform-react-jsx`预编译成`虚拟 dom`

https://github.com/developit/htm

https://github.com/hyperhype/hyperscript

https://github.com/developit/htm/tree/master/packages/babel-plugin-htm

https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx

https://babeljs.io/docs/en/babel-plugin-transform-react-jsx

还需要使用`babel-preset-env`包含`core-js@3` 和 `"@babel/plugin-proposal-class-properties"`

```json
{
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "pragma": "h",
                "pragmaFrag": "\"\""
            }
        ],
        [
            "babel-plugin-htm",
            {
                "tag": "html",
                "pragma": "h"
            }
        ],
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-class-properties"
    ],
    "presets": [
        [
            "@babel/preset-env",
            {
                "corejs": 3,
                "useBuiltIns": "usage",
                "targets": [
                    "last 1 edge version",
                    "last 1 safari version",
                    "last 1 chrome version",
                    "last 1 firefox version"
                ]
            }
        ]
    ]
}
```

# 响应式状态对象 `ReactiveState`,可以独立于组件存在,可以在任何地方使用,

### `ReactiveState`状态改变触发`Event`,触发函数也已经用 `lodash`的`debounce`函数包装成防抖函数，保证了短时间内只能触发一次事件

## `ReactiveState`,基于 `Proxy`,

## 基于`Proxy`的深层数据劫持监听，对于数组`Array`和普通对象`Plain Object`理论上无限层次的数据观察代理

### 如果状态跟视图绑定，则状态改变引起界面刷新是异步的

### 可修改其`value`属性来改变状态的值，

### 初始值类型一旦确定，后续只能把相同类型的值赋给它

### 创建之后，对其`value`赋值，必须和初始类型相同

## 轻松使用全局共享状态,可以非常简单的集中统一管理,抛弃 `redux,vuex,mobx`

```jsx
/**
 * @param {number} init
 * @returns{{
    get: () => number;
    increment: () => void;
    decrement: () => void;
}}
 */
function create(init) {
    /**
     * @type{{value:number}}
     */
    const number = createState(init);
    function increment() {
        number.value++;
    }
    function decrement() {
        number.value--;
    }
    const get = () => number.value;
    const store = { get, increment, decrement };
    return store;
}
const count = create(0);
const mycomappclass = createComponent(() => {
    const vdom = (
        <div>
            <h3> 点击数字</h3>
            <h2>number:{count.get()}</h2>

            <button onclick={count.increment}>increment</button>
            <button onclick={count.decrement}>decrement</button>
        </div>
    );
    return vdom;
});
const vdom = [
    createElement(mycomappclass),
    createElement(mycomappclass),
    createElement(mycomappclass)
];
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

# 条件渲染

使用`Condition`函数来实现条件渲染,返回值是`虚拟dom`

```jsx
var mystate = createState(true);
var vdom = Condition(
    mystate,
    createElement("p", null, ["testtrue"]),
    createElement("div", undefined, "testfalese")
);

setTimeout(() => {
    mystate.value = false;
}, 3000);

const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

# 组件化

## 使用`createComponent` 来创建组件,传参是一个组件初始化函数,返回一个`web component custom element`

### 在组件初始化函数里面可以使用`useMounted`,`useUnMounted`,`watch`,`createState`等函数

## 可以给组件设置默认属性,设置组件初始化函数的`defaultProps`属性即可

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
const vdom = <Hellowordclass />;
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

## 更新:可以不使用`createComponent`,创建组件了,内部会自动使用`createComponent`,自动转换

## 组件初始化函数需要返回一个`虚拟DOM`

最后给组件初始化函数包裹一个`createComponent`函数,返回一个`web component custom element`

## 组件局部 `css` 样式,设置组件初始化函数的`css`属性即可,可以使用 `rollup-plugin-postcss`或者`to-string-loader`引入外部 `css` 文件转成字符串

### webpack to-string-loader

How to import css string from css file?

If you don't want to write CSS in JS, you can use `to-string-loader` of webpack, For example, the following configuration:

```js
[
    {
        test: /[\\|\/]_[\S]*\.css$/,
        use: ["to-string-loader", "css-loader"]
    }
];
```

If your CSS file starts with "\_", CSS will use `to-string-loader`, such as:

```js
const css = require("./_index.css");
```

### rollup postcss plugin

```js
import postcss from "rollup-plugin-postcss";

postcss({
    minimize: true,
    extract: false,
    inject: false
});
```

# 样式隔离实现原理

在运行时,使用浏览器自带的`css`解析器，解析 `css` 文本变成`cssrule`,然后给`selectorText`添加前缀,再转换成 `css` 文本

转换前

```css
div {
    transform: rotate(30deg);
}
```

转换后

```css
foobar div {
    transform: rotate(30deg);
}
```

## 关于组件,元素的生命周期

每个组件,每个元素都有 创建, 挂载,更新,卸载 的生命周期

使用`MutationObserver`来高效的监听组件和元素的变化

### 给组件注册生命周期回调函数

使用`useCreated`来添加组件创建之后的回调函数

使用`useMounted`来添加组件挂载之后的回调函数

使用`useUpdated`来添加组件及其子节点更新之后的回调函数

使用`useUnMounted`来添加组件卸载之后的回调函数

## 使用`useMounted`和`useUnMounted`来给组件添加挂载和卸载时执行的`callback函数`,只能在组件初始化函数里面使用，这些`callback`函数都会异步执行

组件卸载时，组件内创建的响应式状态会自动取消`watch`，自动给元素删除事件监听器`removeEventListener`

组件挂载时，组件内创建的响应式状态会自动重新`watch`，自动给元素添加事件监听器`addEventListener`

## 父子组件传数据

组件之间的数据传递只能是从父组件到子组件的单向数据流，以`json`格式传递参数

抛弃`mixin`(`混入`)和`hoc`(`高阶组件`)，让人难以理解，难以使用，它们已经被废弃。

https://blog.csdn.net/sinat_17775997/article/details/89181398

### `Mixin` 带来的风险：

Mixin 可能会相互依赖，相互耦合，不利于代码维护

不同的 Mixin 中的方法可能会相互冲突

Mixin 非常多时，组件是可以感知到的，

甚至还要为其做相关处理，这样会给代码造成滚雪球式的复杂性

### `HOC` 和`Render Props`的缺陷

HOC 需要在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这让调试变得非常困难。

HOC 可以劫持 `props`，在不遵守约定的情况下也可能造成冲突。

## 更好的逻辑组合复用方法

受到 `Vue Composition API`和`React Hooks`的启发,

集各家所长，但是跟它们有很大不同，

响应式状态可以独立于组件存在,`watch`,`computed`,`createState`函数可以在组件外使用

基于函数的 `API` 提供与`React Hooks`相同级别的逻辑组合功能，但有一些重要的区别。

与`React hooks`不同，该组件初始化函数仅被调用一次

## 使用`useMounted`和`useUnMounted`来给组件添加挂载和卸载时执行的函数,只能在组件初始化函数里面使用

## 使用`watch`函数来监听状态的变化,执行回调函数,可在任何地方使用此函数,传参 `ReactiveState`,或者 `ReactiveState` 数组,回调函数参数是`unwrapped state`的数组,返回一个`取消观察` `cancelwatch`函数

## 函数`watch`的回调函数已经自动使用`lodash`的`debounce`方法包装成防抖函数了，确保短时间内回调函数只执行一次

```js
var mystate = createState("aaeeqtt");
const mycom = createComponent(
    Object.assign(
        (props, children) => {
            useCreated(() => {
                console.log("life-cycle-created");
            });
            useUpdated(() => {
                console.log("life-cycle-updated");
            });
            useMounted(() => {
                console.log("life-cycle-mounted1");
            });
            useUnMounted(() => {
                console.log("life-cycle-unmounted");
            });
            watch(props.cccccc, console.log);
            return createElement("div", null, [
                "wwwwwwwwwwww",
                createElement("div", null, ["createComponent"]),
                children,
                createElement("div", null, [props.cccccc])
            ]);
        },
        {
            defaultProps: {
                cccccc: "bbbbbbb"
            },
            css: `* {
  color: purple !important;

  font-size: 50px;
}
  .article-content h3 {
    font-size: 18px;
  }`
        }
    )
);

const myclasscomponent = mycom;
const vdom = createElement(
    myclasscomponent,
    { cccccc: mystate, aaaaaa: 222222222, tttttt: "dddddddddd" },
    ["children"]
);
console.log(vdom);

setTimeout(() => {
    mystate.value = "bbbbbbbbbbnnnnnnnnnnnnn";
}, 5000);
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

# 组件中逻辑提取和重用

## 您可以通过简单地将其导出为函数来重用组件逻辑的任何部分

## 计算属性,当一个状态依赖于另一个状态时可以使用`computed`,并且可以缓存计算结果,回调函数作为计算属性的`getter`使用,也可定义计算属性的`setter`函数

### 当依赖项发生变化时,计算属性也会发生变化,计算属性还带有缓存计算结果的功能,计算属性其实也是个语法糖

### 例子：跟踪鼠标的位置

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
    const plus = computed(x, (x) => {
        return x + 100;
    });
    const multi = computed([x, y], (x, y) => {
        return x * y;
    });
    let count = 0;
    const cancelwatch = watch([x, y, multi, plus], (...args) => {
        console.log(count, args);
        count++;
        if (count > 50) {
            cancelwatch();
        }
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
var vdom = createElement(mycomapp);
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

## 另一种状态之间有依赖关系的用法,看起来是状态里面嵌套状态,但是实际上只是个语法糖

```js
/* 第一种用法 */
const colortext = createState("red");
const stylestate = createState({
    display: "block",
    width: "100%",
    color: colortext
});

const vdom = html`
    <hr />
    <h1 style=${stylestate}>input color ${colortext}</h1>
    <input $value=${colortext} />
    <hr />
`;

console.log([vdom, colortext, stylestate]);
watch([colortext, stylestate], (a, b) => console.log([a, b]));
const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

```js
/* 
第二种用法
*/
watch(colortext, (unwrapedstate) => (stylestate.color = unwrapedstate));
```

## 对于不接收`props`和`children` 参数,且不使用局部`css`的组件,没有副作用的纯函数,甚至可以不使用`createComponent`

```jsx
function App1() {
    return <div>helloworld</div>;
}

var vdom = <div>{App1()}</div>;

const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
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
    const css = await (
        await fetch(
            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css"
        )
    ).text();
    const Hellowordclass = createComponent(
        Object.assign(
            () => {
                return createElement("div", undefined, "hello world");
            },
            { css, defaultProps }
        )
    );
    const vdom = createElement(Hellowordclass);

    const container = document.createElement("div");
    MountElement(vdom, container);
    document.body.appendChild(container);
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

const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

```ts
const vdom = createElement(
    class extends HTMLElement {
        static defaultProps = {
            name: "HelloKitty",
            myAge: 18
        };
    }
);

const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
```

# 列表渲染

## 1.不变的列表，没有响应性

```tsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => {
    return <li>{number}</li>;
});

MountElement(<ul>{listItems}</ul>, document.getElementById("root"));
```

## 2.可变的列表，有响应式

使用指令`for`,实现响应式列表渲染

```jsx
const liststate = createState(
    Array(10)
        .fill(undefined)

        .map((v, i) => i)
);
let vdom = (
    <div
        $for={[
            liststate,
            (value, index) => (
                <div>
                    <p>{["item:", "value:", value, ",index:", index]} </p>
                </div>
            )
        ]}
    />
);
```

# 可自由切换的组件,可配合前端路由使用

例如 page.js https://github.com/visionmedia/page.js

函数`Switchable`用来生成可自由切换组件的`虚拟DOM`

```jsx
const com1 = createComponent(() => {
    return <h1>component 1</h1>;
});
const com2 = createComponent(() => {
    return <h1>component 2</h1>;
});
const com3 = createComponent(() => {
    return <h1>component 3</h1>;
});
const com4 = createComponent(() => {
    return <h1>component 4</h1>;
});
const mystate = createState(com1);
const vdom = Switchable(mystate);
const element = render(vdom);
document.body.appendChild(element);
document.body.appendChild(
    render(
        h(() => (
            <div>
                <button
                    $text="component 1"
                    onclick={() => {
                        mystate.value = com1;
                    }}
                />
                <button
                    $text="component 2"
                    onclick={() => {
                        mystate.value = com2;
                    }}
                />
                <button
                    $text="component 3"
                    onclick={() => {
                        mystate.value = com3;
                    }}
                />
                <button
                    $text="component 4"
                    onclick={() => {
                        mystate.value = com4;
                    }}
                />
            </div>
        ))
    )
);
```

# 支持元素的 `class` 属性赋值 `Set` 类型,自动转成 字符串

`class`属性支持的类型有

```ts
type classprop =
    | string
    | Set<string>
    | Array<string>
    | ReactiveState<string | Set<string> | Array<string>>;
```

```js
const classsetstate = createState(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
html`
    <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}></div>

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
type styleprop =
    | string
    | object
    | ReactiveState<string>
    | ReactiveState<object>;
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
<button onclick={(e) => console.log(e)} />
```

# 使用`jsx 指令`

所有指令都将在组件或元素的创建之后,挂载之前调用.

1.属性名为'\*'+指令名称

2.使用"\$"+指令名称

现已支持的内置指令有 `'ref','html','text'，"value","checked"`,`mounted`,`unmounted`

### 指令`ref`用来获取元素的引用,值可以是`{ value?: Element } | ((value: Element) => void)`

`<div *ref=${ref}/>`

```ts
const ref = createRef();

var vdom = html`
    <div *ref=${ref} />
`;

console.log(ref.value);
```

```tsx
const ref = createRef();

var vdom = <div $ref={(ele) => (ref.value = ele)} />;

console.log(ref.value);
```

```jsx
const lirefs = [];
var list = Array(10)
    .fill(undefined)
    .map((v, i) => i);
const vdom = (
    <ul>
        {list.map((a, index) => (
            <li
                $ref={(ele) => {
                    lirefs[index] = ele;
                    lirefs.length = list.length;
                }}
            >
                item{a}
            </li>
        ))}
    </ul>
);
console.log(lirefs);
```

### 指令`html`用来设置元素的`innerHTML`,值类型为`string|ReactiveState<string>`

`<div *html=${state} />`

### 指令`text`用来设置元素的`textContent`,值类型为`string|ReactiveState<string>`

`<div *text=${state}/>`

```jsx
<button $text="click me" />
```

### 指令`value`只是一个简单的表单`textarea`或者`input`或者`select`元素的`value`值双向绑定语法糖,值类型为`ReactiveState<string>`

```jsx
<input $value={state} />
```

```jsx
<textarea $value={state} />
```

```jsx
<select $value={state}></select>
```

### 指令`checked`只是一个简单的`checkbox`或者`radio`表单`input`元素的`checked`值双向绑定语法糖,值类型为`ReactiveState<boolean>`

```jsx
<input type="checkbox" $checked={state} />
```

```jsx
<input type="radio" $checked={state} />
```

### 指令`mounted`,当元素挂载到`document.body`的子节点中时,会触发回调函数,值类型为`() => void`

### 指令`unmounted`,当元素从`document.body`的子节点中卸载时,会触发回调函数,值类型为`() => void`

### 指令`updated`,当元素及其子节点更新时,会触发回调函数,值类型为`() => void`

### 指令`created`,当元素创建时,会触发回调函数,值类型为`() => void`

给元素注册生命周期回调函数

```jsx
let vdom = (
    <div
        $mounted={() => console.log("mounted")}
        $unmounted={() => console.log("unmounted")}
        $updated={() => console.log("updated")}
        $created={() => console.log("created")}
    >
        测试mounted,unmounted,updated,created
    </div>
);
```

### 指令 `for`用于响应式列表渲染,

其类型为

```ts
interface ATTRFOR<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
}
```

## 扩展自定义指令

```js
Directives(
    "myfocus",
    (value, element, vdom, onmounted, onunmounted, onupdated) => {
        console.log("created");
        console.log(value, element, vdom);
        onmounted(() => {
            console.log("mounted");
        });
        onunmounted(() => {
            console.log("unmounted");
        });
        onupdated(() => {
            console.log("updated");
        });
    }
);
const myvalue = "your directive value";
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
        @input=${(e) => (state1.value = e.target.value)}
        @change=${(e) => (state1.value = e.target.value)}
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

# 渲染虚拟 dom 为真实 dom 元素的过程

1.判断标签，

1.1.如果标签是字符串

1.1.1.如果是"math"，则使用 math 的 namespace 创建元素，其所有子元素的 namespace 都是 math。

1.1.2.如果是"svg"，则使用 svg 的 namespace 创建元素，其所有子元素的 namespace 都是 svg。

1.1.3.如果是其他标签，则使用 `document.createElement`创建元素

1.2.如果是自定义组件，则创建自定义组件的实例

2.调用绑定的指令

3.如果是原生元素，则递归渲染并挂载子元素。自定义组件的子元素是通过参数传递给了组件构造函数

4.设置元素的 attributes，如果绑定了响应式状态，则为响应式状态其添加监听器，自动更新 attributes

5.给元素添加事件监听器回调函数

# `API` : 可在 `TypeScript` 类型声明文件中查看更多

https://github.com/masx200/mvvm-reactive-view/blob/master/dist/index.d.ts

https://github.com/masx200/mvvm-reactive-view/blob/master/src/jsx.ts

## 函数`Switchable`

用来生成可自由切换组件的`虚拟DOM`,

传入一个`ReactiveState<Htmlelementconstructor | Custom>`,表示可改变的组件

修改`ReactiveState`的`value`值,组件就会切换,

返回`Virtualdom<Htmlelementconstructor>`

## 使用`Condition`函数

用来实现条件渲染,传入三个参数,

第一个是 `ReactiveState<boolean>`,表示可改变的条件真假

第二个是 `string | Virtualdom<any> | undefined`,表示条件为真时的挂载的虚拟元素

第三个是 `string | Virtualdom<any> | undefined`,表示条件为徦时的挂载的虚拟元素

返回值是`Virtualdom<Htmlelementconstructor>`

## 使用`createComponent`

用来定义组件,

第一个参数是一个组件初始化函数,类型为`Custom`

第二个参数可选,为组件的默认属性和`css`样式,其类型为

```
{
    defaultProps?: Record<string, any>;
    css?: string;
}
```

返回一个`web component custom element`的`Htmlelementconstructor`

## 注册生命周期函数

使用`useCreated`来添加组件创建之后的回调函数

使用`useMounted`来添加组件挂载之后的回调函数

使用`useUpdated`来添加组件及其子节点更新之后的回调函数

使用`useUnMounted`来添加组件卸载之后的回调函数

来给组件生命周期时执行的`callback函数`,传参类型为`()=>void`

只能在组件定义函数中的顶层使用

## 函数`render`

把`虚拟dom`转换成真实`dom`元素

第一个参数是`虚拟元素`,`Virtualdom<any>`

第二个参数是可选的元素的命名空间,`string`

返回值为真实`DOM`元素

第一个参数是`虚拟元素`数组,`Virtualdom<any>[]`

第二个参数是可选的元素的命名空间,`string`

返回值为真实`DOM`元素数组

## 使用`watch`函数

用来监听状态的变化,执行回调函数,可在任何地方使用此函数,

传参第一个是 `ReactiveState<any>`,或者 `ReactiveState<any>` 数组,

传参第二个是回调函数,其参数是`unwrapped state`的数组,

返回一个取消观察 `cancelwatch`函数`() => void`

## 使用`createState`

用来生成一个引用形式的响应式的状态，

### 在其初始创建时,其类型已经确定,

后续只能把相同类型的值赋给其'value'属性,如果后续修改类型不一致,则报错

其类型来判断的方式是`Object.prototype.toString.call`

### 响应式状态`ReactiveState`类,

可修改其`value`属性来改变状态的值，

### 如果初始值是原始类型则不能修改为对象类型，

### 如果初始值是对象类型则不能修改为原始类型，

传参是任意对象`T extends any`除了`ReactiveState<any>`

返回值为`ReactiveState<T>&T`

## 计算属性`computed`,

计算属性在处理一些复杂逻辑时是很有用的。

### 第一个参数是

`ReactiveState<any>`,或者 `ReactiveState<any>` 数组,

### 第二个参数是

回调函数,充当`getter`,

其回调函数参数是`unwrapped state`的数组

### 第三个参数

可选,是`setter`函数

返回一个响应式状态对象,`ReactiveState`

## 使用`Directives`函数

用来扩展自定义指令

第一个参数是指令的名称`string`

第二个参数是创建指令的回调函数

其回调函数的参数依次是:

1.指令绑定的值,`any`

2.真实`dom`元素,`Element`

3.虚拟元素,`Virtualdom<any>`

4.注册挂载时回调函数的函数,`(call: () => void) => void`

5.注册卸载时回调函数的函数,`(call: () => void) => void`

6.注册更新时回调函数的函数,`(call: () => void) => void`

## 函数`html`

用来解析字符串模板,

可以使用 `hyperscript`

自动调用`createElement`,

转换成虚拟 `dom`

## 函数`h`

等同于`createElement`,

用来生成虚拟 `dom`,

第一个参数可以是元素的标签名，`string`

或者`costum element`的构造函数，`Htmlelementconstructor | Custom`

第二个参数可以是子元素数组，

或者元素的`attributes`对象,

后面的剩余参数都是子元素

返回值是`Virtualdom`

## 使用`MountElement`

用来把`虚拟dom` 或者真实元素渲染到真实 `dom` 容器上

第一个参数是`虚拟dom` 或真实元素,或真实元素数组,或虚拟元素数组

第二个参数是容器元素,`Element`

返回容器元素

## 使用`createRef`

用来创建一个引用对象,

此函数的第一个参数可选,是引用对象的初始值

返回引用对象`{ value: any | undefined;}`

可绑定到元素的`ref`指令属性上,

获取当前`dom元素`

## `虚拟 dom` `Virtualdom`接口

属性`type`:是元素的标签名`string`或者组件的构造函数`Htmlelementconstructor`

属性`props`:是绑定的非响应式属性对象

属性`children`:是子元素数组

属性`directives`:是绑定的指令对象

属性`onevent`:是绑定的事件对象

属性`bindattr`:是绑定的响应式属性对象
