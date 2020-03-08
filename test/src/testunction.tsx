/**@jsx h */
import { h, html, MountElement } from "./mvvm-view";

// console.log(MountElement);
console.log(h);
function testunction() {
    const vdom2 = html`
        <div *text=${"<a>绑定textcontent</a>"}></div>
        <div *html=${"<a>绑定innerhtml</a>"}></div>
    `;
    console.log(vdom2);
    document.body.appendChild(
        MountElement(vdom2, document.createElement("div"))
    );
}
testunction();
