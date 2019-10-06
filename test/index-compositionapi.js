import {
  computed,
  condition,
  Fragment,
  createRef,
  html,
  MountElement,
  h,
  createElement,
  createState,
  watch,
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
  const plus = computed(x, x => {
    return x + 100;
  });
  // other logic...

  const multi = computed([x, y], (x, y) => {
    return x * y;
  });
  console.log(plus, multi);
  return (
    <div>
      <h3> 鼠标位置</h3>
      <h2>x:{x}</h2>

      <h1>y:{y}</h1>
      <p>x+100 是{plus}</p>
      <p>x*y 是{multi}</p>
    </div>
  );
};
mycomapp.css = `
*{font-size:80px !important;}
p{color:blue !important;}
`;
var vdom = createElement(createComponent(mycomapp));
// MountElement(vdom, document.getElementById("root"));
document.body.appendChild(MountElement(vdom, document.createElement("div")));
