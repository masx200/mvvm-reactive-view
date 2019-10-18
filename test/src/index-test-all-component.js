import { render, h } from './mvvm-view';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
setTimeout(() => {
  // @ts-ignore
  Object.values(Object.fromEntries(customElements))
    .map(c => render(h(c)))
    .forEach(e => document.body.appendChild(e));
}, 8000);
setTimeout(() => {
  // @ts-ignore
  Object.values(Object.fromEntries(customElements))
    .map(c => new c())
    .forEach(e => document.body.appendChild(e));
}, 8000);
