import {
  condition,
  Fragment,
  createRef,
  html,
  createApp,
  h,
  createElement,
  createState,
  watch,
  //RandomDefine
  createComponent,
  useMounted,
  useUnMounted
} from "../dist/index.js";
function useMousePosition() {
  const x = createState(0);
  const y = createState(0);

  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  useMounted(() => {
    window.addEventListener("mousemove", update);
  });

  useUnMounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return { x, y };
}

const mycomapp = () => {
  const { x, y } = useMousePosition();
  // other logic...
  return (
    <div>
      <h3> 鼠标位置</h3>
      <h2>x:{x}</h2>

      <h1>y:{y}</h1>
    </div>
  );
};
var vdom = createElement(createComponent(mycomapp));
// createApp(vdom, document.getElementById("root"));
document.body.appendChild(createApp(vdom, document.createElement("div")));
