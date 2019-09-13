export default function(
  ele: HTMLElement | Text | Array<HTMLElement | Text>,
  container: HTMLElement
) {
  container.innerHTML = "";
  if (ele instanceof Array) {
    ele.forEach(e => container.appendChild(e));
  } else {
    container.appendChild(ele);
  }
}
