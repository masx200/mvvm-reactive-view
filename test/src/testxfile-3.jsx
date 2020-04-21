import { createState, h, html, MountElement, watch } from "./mvvm-view";
console.log(h);
(() => {
    const colortext = createState("red");
    const stylestate = createState({
        display: "block",
        width: "100%",
        color: colortext
    });
    const vdom = html `
        <hr />
        <h1 style=${stylestate}>input color ${colortext}</h1>
        <input $value=${colortext} />
        <hr />
    `;
    console.log([vdom, colortext, stylestate]);
    watch([colortext], (a) => console.log([a]));
    watch(stylestate, (b) => {
        console.log([{ ...b }]);
    });
    document.body.appendChild(MountElement(vdom, document.createElement("div")));
})();
//# sourceMappingURL=testxfile-3.jsx.map