import {
    createState,
    //   createElement,
    html,
    MountElement,
    watch
} from "./mvvm-view.ts";
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
