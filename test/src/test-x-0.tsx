import {
    createElement,
    //   createElement,
    html,
    MountElement
} from "./mvvm-view.ts";
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
