/**@jsx h */
import { createElement, h, html, MountElement } from "./mvvm-view";

// console.log(MountElement);
console.log(h);
{
    const vdom = createElement("div", [
        html`
            <html>
                testhtml
            </html>
            <button
                onclick=${[
                    console.log,
                    () => {
                        console.log("onclick");
                    }
                ]}
                *text="clicktest"
                @click=${[
                    console.log,
                    () => {
                        console.log("@click");
                    }
                ]}
            />
            <style></style>
        `
    ]);
    document.body.appendChild(
        MountElement(vdom, document.createElement("div"))
    );
    console.log("onclick", " @click", vdom);
}
