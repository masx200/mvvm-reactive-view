import { createElement, h, MountElement } from "./mvvm-view";
const Localtestx = async () => {
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
};
Localtestx();
