import { createState, h, html, MountElement, watch } from "./mvvm-view";
console.log(h);
(() => {
    const colortext = createState("blue");
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
    var inter = setInterval(() => {
        colortext.value =
            "#" + (Math.random() * 16 ** 7).toString(16).slice(0, 6);
    }, 1000);
    setTimeout(() => {
        clearInterval(inter);
    }, 10000);
    watch([colortext], (a) => console.log([a]));
    watch(stylestate, (b) => {
        console.log([{ ...b }]);
    });
    document.body.appendChild(MountElement(vdom, document.createElement("div")));
})();
//# sourceMappingURL=testxfile-1.jsx.map