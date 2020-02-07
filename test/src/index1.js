// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Condition,
  createElement,
  //   createElement,
  createRef,
  createState,
  h,
  html,
  MountElement,
  watch
} from "./mvvm-view";
console.log([h, createElement]);
/* console.log([
  Fragment,
  createRef,
  html,
  MountElement,
  h,
  createElement,
  createState,
  watch,
  Condition,
  createComponent,
  useMounted,
  useUnMounted
]); */
// console.log(createElement(Fragment));
(() => {
  var mystate = createState(true);
  //   watch(mystate, console.log);
  console.log("mystatetest", mystate);
  var vdom = Condition(
    mystate,
    "testtrue",
    createElement("div", undefined, "testfalese")
  );
  var vdom2 = Condition(
    mystate,
    undefined,
    createElement("div", undefined, "testwwwwwwwwwfalese")
  );
  var vdom3 = Condition(
    mystate,
    createElement("div", undefined, "testwwwwwwwtrueeeeeeeeee"),
    undefined
  );
  console.log([vdom, vdom2, vdom3]);
  document.body.appendChild(
    MountElement([vdom, vdom2, vdom3], document.createElement("div"))
  );
  var timer = setInterval(() => {
    mystate.value = !mystate.value;
    // setInterval(() => {
    //   mystate.value = true;
    // }, 1500);
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
  }, 10000);
})();

(() => {
  const stylestate = createState({ display: "block", width: "100%" });
  const inputref = createRef();
  const state1 = createState("hello");
  const vdom = html`
    <div style=${{ display: "block", width: "100%" }}>hello world!</div>
    <input
      style="width:100%"
      @input=${e => (state1.value = e.target.value)}
      *ref=${inputref}
      @change=${e => (state1.value = e.target.value)}
      id="co11111111111de16"
      class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"
      value=${state1}
    />
    <h1 style=${stylestate}>mvvm-reactive-view</h1>
    <button
      @click=${() => {
        stylestate.color = "red";
      }}
    >
      red</button
    ><button
      @click=${() => {
        stylestate.color = "green";
      }}
    >
      green
    </button>
  `;
  watch(stylestate, console.log);
  watch(state1, console.log);
  console.log(vdom);
  MountElement(vdom, document.getElementById("app"));
})();

// console.log(MountElement);
// console.log(h);
// console.log([].flat);

// console.log(Object.fromEntries);
// console.log(setImmediate);
(() => {
  const vdom2 = html`
    <div *text=${"<a>绑定textcontent</a>"}></div>
    <div *html=${"<a>绑定innerhtml</a>"}></div>
  `;
  console.log(vdom2);
  document.body.appendChild(MountElement(vdom2, document.createElement("div")));

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
    e => {
      state1.value = e.target.value;
    }
  ]}></textarea>
  <input value=${state2} style='width:100%' @change=${[
    e => {
      state2.value = e.target.value;
    }
  ]}  
@input=${[
    e => {
      state2.value = e.target.value;
    }
  ]}
></input>
`;
  console.log(vdom3);
  // watch(state1, console.log);
  // watch(state2, console.log);
  document.body.appendChild(MountElement(vdom3, document.createElement("div")));
  //////////////////////
  const state3 = createState("<a>绑定innerhtml</a>");
  const vdom4 = (
    <>
      <div _text={state3}></div>
      <div _html={state3}></div>

      <script> </script>
    </>
  );

  // setInterval(() => {
  //   state3.value = String(Math.random());
  // }, 2000);
  watch(state1, state => (state3.value = state));
  watch(state2, state => (state1.value = state));
  console.log(state3);
  // watch(state3, console.log);
  console.log(vdom4);
  document.body.appendChild(MountElement(vdom4, document.createElement("div")));

  /////////////////////
  const objstate = createState({ a: "w", 6: "xxxxxxx", tttttttt: "true" });
  const objstate2 = createState(`{ a: "w", 6: "xxxxxxx", tttttttt: "true" }`);
  // watch(objstate, console.log);
  // watch(objstate2, console.log);
  console.log(objstate);
  setTimeout(() => {
    //
    objstate.length = 10;
    objstate2.value = 2222222222222;
    //   objstate.push(Math.random());
    //   objstate.push(Math.random());
  }, 2000);

  const objstatearray = createState([
    { a: "w", 6: "xxxxxxx", tttttttt: "true" },
    1,
    true,
    "test"
  ]);
  const stylestate = createState({ display: "block", width: "100%" });

  //
  const classsetstate = createState(
    new Set(["xxxxxxx", "wwwwwww", "eeeeeeee"])
  );

  console.log("classsetstate", classsetstate);
  watch(classsetstate, a => console.log(a));
  setTimeout(() => {
    classsetstate.add("vvvvvvvvvvv");
  }, 5000);
  setTimeout(() => {
    classsetstate.delete("eeeeeeee");
  }, 4000);

  //

  const vdomobj = html`
    <div style=${{ display: "block", width: "100%" }}>${objstate2}</div>
    <div style=${stylestate} class=${new Set(["wwwwwww", "eeeeeeee"])}>
      ${objstatearray}
    </div>
    ${objstate}
    <div style=${stylestate} class=${classsetstate} />
  `;
  document.body.appendChild(
    MountElement(vdomobj, document.createElement("div"))
  );
  console.log(vdomobj);

  /* requestAnimationFrame(() => {
  //   watch(objstatearray, console.log);
}); */

  requestAnimationFrame(() => {
    objstatearray.unshift(Math.random());
    //   objstate.sort();
    objstatearray.push("qqqqqqqqq");
    //   objstatearray.push(Math.random());

    objstatearray.unshift(Math.random());
    //   objstatearray.sort();
    objstatearray.push("qqqqqqqqq");
    objstatearray.length = 10;
    objstatearray.push(Math.random());
  });
  console.log(objstatearray);
  const timer = setInterval(() => {
    objstate2.value += String(Math.random());
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
  }, 10000);
  console.log([objstate2, createState(objstate2)]);
  //   console.log(Object.getOwnPropertyDescriptors(objstatearray));
  console.log(Object.entries(objstate));
})();
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
  document.body.appendChild(MountElement(vdom, document.createElement("div")));
  console.log(vdom);
})();

/*const mytestclass = class extends HTMLElement {
  constructor(...argwwwuments) {
    super();
    // console.log(argwwwuments);
  }
};
customElements.define("mejej-rjeken", mytestclass);
console.log(mytestclass, RandomDefine(mytestclass));

console.log(
  Array(999)
    .fill()
    .map(() => RandomDefine(class extends HTMLElement {}))
);
*/
class Bqqqqqqqqq extends HTMLElement {}
class Aqqqqqqqqq extends HTMLElement {}
console.log(customElements, [...customElements]);
customElements.define("qqqqqqqqqq-----a", Bqqqqqqqqq);
customElements.define("qqqqqqqqqq-----a", Aqqqqqqqqq);
document.body.appendChild(
  MountElement(
    [h(Bqqqqqqqqq), createElement(Aqqqqqqqqq)],
    document.createElement("div")
  )
);
