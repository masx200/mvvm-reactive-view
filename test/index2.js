import {
  condition,
  Fragment,
  createRef,
  html,
  createApp,
  h,
  createElement,
  createState,
  watch,
  createComponent,
  useMounted,
  useUnMounted
} from "../dist/index.js";
/* console.log([
  condition,
  Fragment,
  createRef,
  html,
  createApp,
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
      createApp(myvdom1111111, document.createElement("div"))
    );
    document.body.appendChild(
      createApp(
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
    document.body.appendChild(createApp(myele1, document.createElement("div")));
    document.body.appendChild(createApp(myele1, document.createElement("div")));
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
const vdom = html`
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
`;
document.body.appendChild(createApp(vdom, document.createElement("div")));
console.log("onclick", " @click", vdom);
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
    createApp(
      createElement(Hellowordclass),

      document.createElement("div")
    )
  );
})();
