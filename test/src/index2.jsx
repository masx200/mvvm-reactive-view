import { createElement, h, MountElement } from "./mvvm-view";
console.log(h);
(() => {
    (() => {
        var _a;
        var myvdom1111111 = createElement(class extends HTMLElement {
            constructor(...argwwwuments) {
                super();
                console.log(argwwwuments);
            }
        }, {
            style: {
                display: "block"
            }
        }, "hhhhhhhhhhhhtests");
        console.log(myvdom1111111);
        document.body.appendChild(MountElement(myvdom1111111, document.createElement("div")));
        document.body.appendChild(MountElement(createElement((() => {
            var Aaaaaaaaaa = class extends HTMLElement {
            };
            return Object.assign(Aaaaaaaaaa, {
                defaultProps: {
                    name: "HelloKitty",
                    myAge: 18
                }
            });
        })()), document.createElement("div")));
        const myele1 = createElement((_a = class extends HTMLElement {
            },
            _a.defaultProps = {
                name: "aaaaaaaaaaHelloKitty",
                myAge: 1999999999999998
            },
            _a));
        console.log(myele1);
        document.body.appendChild(MountElement(myele1, document.createElement("div")));
        document.body.appendChild(MountElement(myele1, document.createElement("div")));
    })();
})();
//# sourceMappingURL=index2.jsx.map