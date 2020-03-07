// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createState, html, MountElement, watch } from "./mvvm-view";

// console.log(MountElement);
// console.log(h);
// console.log([].flat);

// console.log(Object.fromEntries);
// console.log(setImmediate);
(() => {
    /////////////////////
    const objstate = createState({ a: "w", 6: "xxxxxxx", tttttttt: "true" });
    const objstate2 = createState(`{ a: "w", 6: "xxxxxxx", tttttttt: "true" }`);
    // watch(objstate, console.log);
    // watch(objstate2, console.log);
    console.log(objstate);
    setTimeout(() => {
        //
        objstate.length = 10;
        objstate2.value = " 2222222222222";
        //   objstate.push(Math.random());
        //   objstate.push(Math.random());
    }, 2000);

    const objstatearray = createState([
        { a: "w", 6: "xxxxxxx", tttttttt: "true" },
        1,
        true,
        "test"
    ]);
    const stylestate = createState({ display: "block", width: "100%" });
    Object.getOwnPropertyDescriptors(stylestate);
    //
    const classsetstate = createState(
        new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"])
    );

    console.log("classsetstate", classsetstate);
    watch(classsetstate, (a) => console.log(a));
    setTimeout(() => {
        classsetstate.add("vvvvvvvvvvv");
    }, 5000);
    setTimeout(() => {
        classsetstate.delete("eeeeeeee");
    }, 4000);

    //

    requestAnimationFrame(() => {
        objstatearray.unshift(Math.random());
        //   objstate.sort();
        objstatearray.push("qqqqqqqqq");
        //   objstatearray.push(Math.random());

        objstatearray.unshift(Math.random());
        //   objstatearray.sort();
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
    console.log([objstate2 /*  createState(objstate2) */]);
    console.log(Object.getOwnPropertyDescriptors(objstatearray));
    console.log(Object.entries(objstate));
    const vdomobj = html`
        <div style=${{ display: "block", width: "100%" }}>${objstate2}</div>
        <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}>
            ${objstatearray}
        </div>
        ${objstate}
        <div style=${stylestate} class=${classsetstate} />
    `;
    document.body.appendChild(
        MountElement(vdomobj, document.createElement("div"))
    );
    console.log(vdomobj);
})();
