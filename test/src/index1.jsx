import { createState, h, html, MountElement, watch } from "./mvvm-view";
console.log(h);
(() => {
    const objstate = createState({ a: "w", 6: "xxxxxxx", tttttttt: "true" });
    const objstate2 = createState(`{ a: "w", 6: "xxxxxxx", tttttttt: "true" }`);
    console.log(objstate);
    setTimeout(() => {
        objstate.length = 10;
        objstate2.value = " 2222222222222";
    }, 2000);
    const objstatearray = createState([
        { a: "w", 6: "xxxxxxx", tttttttt: "true" },
        1,
        true,
        "test"
    ]);
    const stylestate = createState({ display: "block", width: "100%" });
    Object.getOwnPropertyDescriptors(stylestate);
    const classsetstate = createState(new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"]));
    console.log("classsetstate", classsetstate);
    watch(classsetstate, (a) => console.log(a));
    setTimeout(() => {
        classsetstate.add("vvvvvvvvvvv");
    }, 5000);
    setTimeout(() => {
        classsetstate.delete("eeeeeeee");
    }, 4000);
    requestAnimationFrame(() => {
        objstatearray.unshift(Math.random());
        objstatearray.push("qqqqqqqqq");
        objstatearray.unshift(Math.random());
        objstatearray.push("qqqqqqqqq");
        objstatearray.length = 10;
        objstatearray.push(Math.random());
    });
    console.log(objstatearray);
    const timer = setInterval(() => {
        objstate2.value += String(Math.random());
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
    }, 10000);
    console.log([objstate2]);
    console.log(Object.getOwnPropertyDescriptors(objstatearray));
    console.log(Object.entries(objstate));
    const vdomobj = html `
        <div style=${{ display: "block", width: "100%" }}>${objstate2}</div>
        <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}>
            ${objstatearray}
        </div>
        ${objstate}
        <div style=${stylestate} class=${classsetstate} />
    `;
    document.body.appendChild(MountElement(vdomobj, document.createElement("div")));
    console.log(vdomobj);
})();
//# sourceMappingURL=index1.jsx.map