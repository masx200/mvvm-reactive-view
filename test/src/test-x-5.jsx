import { Condition, createElement, createState, h, MountElement } from "./mvvm-view";
console.log(h);
(() => {
    var mystate = createState(true);
    console.log("mystatetest", mystate);
    var vdom = Condition(mystate, "testtrue", createElement("div", undefined, "testfalese"));
    var vdom2 = Condition(mystate, undefined, createElement("div", undefined, "testwwwwwwwwwfalese"));
    var vdom3 = Condition(mystate, createElement("div", undefined, "testwwwwwwwtrueeeeeeeeee"), undefined);
    console.log([vdom, vdom2, vdom3]);
    document.body.appendChild(MountElement([vdom, vdom2, vdom3], document.createElement("div")));
    var timer = setInterval(() => {
        mystate.value = !mystate.value;
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
    }, 10000);
})();
//# sourceMappingURL=test-x-5.jsx.map