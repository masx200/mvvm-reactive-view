import {
  computed,
  createComponent,
  createElement,
  //   createElement,
  createState,
  h,
  MountElement,
  useMounted,
  useUnMounted
} from "../dist/index.js";
console.log(h, createElement);
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

const mycomapp = createComponent(() => {
  const { x, y } = useMousePosition();
  const plus = computed(x, x => {
    return x + 100;
  });
  // other logic...

  const multi = computed([x, y], (x, y) => {
    return x * y;
  });
  console.log(plus, multi);
  /* watch([x, y, multi, plus], (...args) => {
    console.log(args.map(a => a.valueOf()));
  }); */
  return (
    <div>
      <h3> 鼠标位置</h3>
      <h2>x:{x}</h2>

      <h1>y:{y}</h1>
      <p>x+100 是{plus}</p>
      <p>x*y 是{multi}</p>
    </div>
  );
});
mycomapp.css = `
*{font-size:80px !important;}
p{color:blue !important;}
`;
var vdom = createElement(mycomapp);
// MountElement(vdom, document.getElementById("root"));
document.body.appendChild(MountElement(vdom, document.createElement("div")));
