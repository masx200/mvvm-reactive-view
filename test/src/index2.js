/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    createComponent,
    createElement,
    createState,
    h,
    //   createElement,
    html,
    MountElement,
    watch
} from "./mvvm-view";
console.log([h, createElement]);
/* console.log([
  condition,
  Fragment,
  createRef,
  html,
  MountElement,
  h,
  createElement,
  createState,
  watch,
  
  createComponent,
  useMounted,
  useUnMounted
]); */
// setTimeout(
(() => {
    (() => {
        var myvdom1111111 = createElement(
            class extends HTMLElement {
                constructor(...argwwwuments) {
                    super();
                    console.log(argwwwuments);
                }
            },
            {
                style: {
                    display: "block"
                }
            },
            "hhhhhhhhhhhhtests"
        );
        console.log(myvdom1111111);
        document.body.appendChild(
            MountElement(myvdom1111111, document.createElement("div"))
        );
        document.body.appendChild(
            MountElement(
                createElement(
                    (() => {
                        var Aaaaaaaaaa = class extends HTMLElement {};
                        /* 其他浏览器不支持 
                  static defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                  };
                  
                  */
                        Aaaaaaaaaa.defaultProps = {
                            name: "HelloKitty",
                            myAge: 18
                        };
                        return Aaaaaaaaaa;
                    })()
                ),
                document.createElement("div")
            )
        );
        const myele1 = createElement(
            class extends HTMLElement {
                static defaultProps = {
                    name: "aaaaaaaaaaHelloKitty",
                    myAge: 1999999999999998
                };
            }
        );
        console.log(myele1);
        document.body.appendChild(
            MountElement(myele1, document.createElement("div"))
        );
        document.body.appendChild(
            MountElement(myele1, document.createElement("div"))
        );
    })();
})(); /* , 0); */
/* (async () => {
  const { default: importcjsamdumd } = await import(
    "https://cdn.jsdelivr.net/gh/masx200/importcjsamdumd@latest/dist/index.esm.min.js"
  );

  await importcjsamdumd({
    omi: "https://cdn.jsdelivr.net/npm/omi@6.11.3/dist/omi.esm.js"
  });

  return await importcjsamdumd(
    "https://cdn.jsdelivr.net/npm/omim@0.1.17/button/index.js"
  );
})().then(console.log); */
// ));
{
    const vdom = createElement("div", [
        html`
            <html>
                testhtml
            </html>
            <button
                onclick=${[
                    console.log,
                    () => {
                        console.log("onclick");
                    }
                ]}
                *text="clicktest"
                @click=${[
                    console.log,
                    () => {
                        console.log("@click");
                    }
                ]}
            />
            <style></style>
        `
    ]);

    document.body.appendChild(
        MountElement(vdom, document.createElement("div"))
    );
    console.log("onclick", " @click", vdom);
}
(async () => {
    const defaultProps = { cccccc: "bbbbbbb" };
    const css = await (
        await fetch(
            "https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.2.2/src/assetscss/github-6556dfa9be535e551ffffaadfecdad99.min.css"
        )
    ).text();
    /* 测试不使用createComponent */
    const Hellowordclass = Object.assign(
        () => {
            return createElement(
                "div",
                ["hello world"],
                "测试不使用createComponent"
            );
        },
        { css, defaultProps }
    );
    const vdom = <Hellowordclass></Hellowordclass>;
    let vdom1 = h(Hellowordclass);
    document.body.appendChild(
        MountElement([vdom, vdom1], document.createElement("div"))
    );
    console.log(["测试不使用createComponent", Hellowordclass, vdom]);
})();
(() => {
    const colortext = createState("red");
    const stylestate = createState({
        display: "block",
        width: "100%",
        color: colortext
    });
    /* const inputref = createRef();
  const state1 = createState("hello"); */
    const vdom = html`
        <hr />
        <h1 style=${stylestate}>input color ${colortext}</h1>
        <input $value=${colortext} />
        <hr />
    `;
    /* watch(stylestate, console.log);
  watch(state1, console.log); */
    console.log([vdom, colortext, stylestate]);
    // @ts-ignore
    watch([colortext, stylestate], (a, b) => console.log([a, { ...b }]));
    document.body.appendChild(
        MountElement(vdom, document.createElement("div"))
    );
})();
(() => {
    const colortext = createState("blue");
    const stylestate = createState({
        display: "block",
        width: "100%",
        color: colortext
    });
    /* const inputref = createRef();
    const state1 = createState("hello"); */
    const vdom = html`
        <hr />
        <h1 style=${stylestate}>input color ${colortext}</h1>
        <input $value=${colortext} />
        <hr />
    `;
    /* watch(stylestate, console.log);
    watch(state1, console.log); */
    //   console.log([vdom, colortext, stylestate]);
    var inter = setInterval(() => {
        // @ts-ignore
        colortext.value =
            "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
    }, 1000);
    setTimeout(() => {
        clearInterval(inter);
    }, 10000);
    // @ts-ignore
    watch([colortext, stylestate], (a, b) => console.log([a, { ...b }]));
    document.body.appendChild(
        MountElement(vdom, document.createElement("div"))
    );
})();
