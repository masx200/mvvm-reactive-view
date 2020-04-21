import { createState, h, html, MountElement, watch } from "./mvvm-view";
console.log(h);
function test_2() {
    const state1 = createState("<a>绑定textcontent</a>");
    const state2 = createState("<a>绑定innerhtml</a>");
    Object.getOwnPropertyDescriptors(state2);
    const vdom3 = html `
  <textarea value=${state1} @input=${[
        (e) => {
            state1.value = e.target.value;
        }
    ]}></textarea>
  <input value=${state2} style='width:100%' @change=${[
        (e) => {
            state2.value = e.target.value;
        }
    ]}  
@input=${[
        (e) => {
            state2.value = e.target.value;
        }
    ]}
></input>
`;
    console.log(vdom3);
    document.body.appendChild(MountElement(vdom3, document.createElement("div")));
    const state3 = createState("<a>绑定innerhtml</a>");
    const vdom4 = (<>
            <div $text={state3}></div>
            <div $html={state3}></div>

            <script> </script>
        </>);
    watch(state1, (state) => (state3.value = state));
    watch(state2, (state) => (state1.value = state));
    console.log(state3);
    console.log(vdom4);
    document.body.appendChild(MountElement(vdom4, document.createElement("div")));
}
test_2();
//# sourceMappingURL=test_2.jsx.map