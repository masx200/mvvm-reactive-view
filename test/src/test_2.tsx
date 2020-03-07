import { createState, html, MountElement, watch } from "./mvvm-view.ts";
function test_2() {
    const state1 = createState("<a>绑定textcontent</a>");
    const state2 = createState("<a>绑定innerhtml</a>");
    /* setInterval(() => {
  state2.value = state2.value + "qw";
  //   if (state2.value.length > 60) {
  //     state2.value = "";
  //   }
  state1.value = state2.value;
}, 2000); */
    const vdom3 = html`
  <textarea value=${state1} @input=${[
        (e: { target: { value: string } }) => {
            state1.value = e.target.value;
        }
    ]}></textarea>
  <input value=${state2} style='width:100%' @change=${[
        (e: { target: { value: string } }) => {
            state2.value = e.target.value;
        }
    ]}  
@input=${[
        (e: { target: { value: string } }) => {
            state2.value = e.target.value;
        }
    ]}
></input>
`;
    console.log(vdom3);
    // watch(state1, console.log);
    // watch(state2, console.log);
    document.body.appendChild(
        MountElement(vdom3, document.createElement("div"))
    );
    // const { state1, state2 } = test_x();
    //////////////////////
    const state3 = createState("<a>绑定innerhtml</a>");
    const vdom4 = (
        <>
            <div $text={state3}></div>
            <div $html={state3}></div>

            <script> </script>
        </>
    );
    // setInterval(() => {
    //   state3.value = String(Math.random());
    // }, 2000);
    watch(state1, (state) => (state3.value = state));
    watch(state2, (state) => (state1.value = state));
    console.log(state3);
    // watch(state3, console.log);
    console.log(vdom4);
    document.body.appendChild(
        MountElement(vdom4, document.createElement("div"))
    );
}
// function test_x() {

//     return { state1, state2 };
// }
test_2();
