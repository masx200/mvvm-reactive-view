import {
    //   createElement,
    createRef,
    createState,
    html,
    MountElement,
    watch
} from "./mvvm-view";
(() => {
    const stylestate = createState({ display: "block", width: "100%" });
    const inputref = createRef();
    const state1 = createState("hello");
    const vdom = html`
        <div style=${{ display: "block", width: "100%" }}>hello world!</div>
        <input
            style="width:100%"
            @input=${(e) => (state1.value = e.target.value)}
            *ref=${inputref}
            @change=${(e) => (state1.value = e.target.value)}
            id="co11111111111de16"
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
    watch(stylestate, console.log);
    watch(state1, console.log);
    console.log(vdom);
    MountElement(vdom, document.getElementById("app"));
})();
