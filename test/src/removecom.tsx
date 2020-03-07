import { h, render } from "./mvvm-view";
import { container } from "./index-compositionapi";
const removecom = () => (
    <button
        $text="移除当前容器元素"
        onClick={() => {
            container.remove();
        }}
    />
);
document.body.appendChild(render(h(removecom)));
