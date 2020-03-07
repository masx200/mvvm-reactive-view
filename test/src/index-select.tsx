/* eslint-disable @typescript-eslint/no-unused-vars */
import { h, MountElement } from "./mvvm-view.ts";
// console.log([h, createElement]);
const vdom = (
    <select
        onchange={(e) => console.log(e)}
        style={{ textAlign: "center", fontSize: "30px", color: "#65a4f0" }}
        value="94b92331-e2f4-40c6-90ee-80e203a4de3a"
        name="version_id"
        id="version_id"
        class="StyleSelectBox"
    >
        <option value="0">- Select version -</option>
        <option value="94b92331-e2f4-40c6-90ee-80e203a4de3a">
            Windows 10 Insider Preview 18999.1 (vb_release) [arm64]
        </option>
        <option value="7268dbc9-dfe0-4947-af82-67f384e95cb6">
            Windows 10 Insider Preview 18999.1 (vb_release) [x64]
        </option>
        <option value="08f0d32e-c68a-46a8-b301-57e86b4e96e0">
            Windows 10 Insider Preview 18999.1 (vb_release) [x86]
        </option>
        <option value="9fa87c7f-75fa-4e5e-9ca3-1e19cb2c743f">
            Windows 10 Insider Preview 18995.1 (vb_release) [x64]
        </option>
        <option value="5173796c-11ac-47d7-9ed7-dbad6d5c9486">
            Windows 10 Insider Preview 18995.1 (vb_release) [x86]
        </option>
        <option value="4adf5f24-213a-472c-ae94-70f3cb81bade">
            Windows 10 Insider Preview 18995.1 (vb_release) [arm64]
        </option>
        <option value="9287fe5e-2cb3-4064-820f-3e336a3ddff4">
            Windows 10 Insider Preview 18990.1 (vb_release) [arm64]
        </option>
        <option value="5e420f0d-b3a5-424c-9b55-5c2cf939af14">
            Windows 10 Insider Preview 18990.1 (vb_release) [x86]
        </option>
        <option value="13e2104c-c98c-43b2-b232-9b2a4b5af2ac">
            Windows 10 Insider Preview 18990.1 (vb_release) [x64]
        </option>
    </select>
);

const container = document.createElement("div");
MountElement(vdom, container);
document.body.appendChild(container);
console.log([vdom, container]);
