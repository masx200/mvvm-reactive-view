/**@jsx h */
import { createElement, h, MountElement } from "./mvvm-view";

// console.log(MountElement);
console.log(h);
// console.log([h, createElement]);

// setTimeout(
(() => {
    (() => {
        var myvdom1111111 = createElement(
            class extends HTMLElement {
                constructor(...argwwwuments: any) {
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

                        return Object.assign(Aaaaaaaaaa, {
                            defaultProps: {
                                name: "HelloKitty",
                                myAge: 18
                            }
                        });
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
})();
