/**@jsx h */
import { h, html, MountElement } from "./mvvm-view";

// console.log(MountElement);
console.log(h);
(() => {
    var vdom = html`
        <math>
            <mrow>
                <mrow>
                    <msup>
                        <mi>a</mi>
                        <mn>2</mn>
                    </msup>
                    <mo>+</mo>
                    <msup>
                        <mi>b</mi>
                        <mn>2</mn>
                    </msup>
                </mrow>
                <mo>=</mo>
                <msup>
                    <mi>c</mi>
                    <mn>2</mn>
                </msup>
            </mrow>
        </math>
    `;
    document.body.appendChild(
        MountElement(vdom, document.createElement("div"))
    );
    console.log(vdom);
})();
