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
  //   css,
  //RandomDefine
  createComponent,
  useMounted,
  useUnMounted
} from "../dist/index.js";
import modulecss from "./main.b9c7ffd191cff11a9b96.css";
const mycomapp = () => {
  const inputpassword = createState("");
  const inputref = createRef();
  const inputref2 = createRef();
  console.log(inputref2);
  console.log(inputpassword);
  watch(inputpassword, console.log);
  const vdom = html`
    <h1 style="padding-top: 127.6px;">
      <svg
        style="
      width: 100%;
      height: 200px;
  "
        class="octicon octicon-book"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
        ></path></svg
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3046.7 875.7"
        style="
      width: 100%;
      height: 200px;
  "
      >
        <title>logo-on-dark-bg</title>
        <rect Color="#FFF" x="0" y="0" width="3046.7" height="875.7" />
        <path
          fill="#FFF"
          d="M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        />
        <path
          fill="#8ED6FB"
          d="M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        />
        <path
          fill="#1C78C0"
          d="M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        />
        <path
          fill="#F5FAFA"
          d="M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        />
      </svg>
    </h1>
    <div>
      <div>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          <div>
            <div class="container-fluid fixed-top" id="my导航栏">
              <nav
                class="navbar navbar-default navbar navbar-expand-sm bg-light navbar-light"
                role="navigation"
              >
                <div>
                  <a
                    class="navbar-brand mui-btn mui-btn-primary mui-btn-outlined"
                    href="#/"
                    >masx200的
                    <hr id="hidewidthless500" />
                    github主页</a
                  ><button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                </div>
                <div
                  class="collapse navbar-collapse"
                  id="example-navbar-collapse"
                  style="display: none;"
                >
                  <ul class="nav navbar-nav" id="allnavbar">
                    <li id="mynav1">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/react-home"
                        >基于REACT的主页</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/react-rssreader"
                        >rss阅读</a
                      >
                    </li>
                    <li id="mynav2">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/react-about"
                        >关于REACT</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/picalc"
                        >圆周率计算多线程</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/react-huami"
                        >花密网页版</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/decoder"
                        >JSfuck-and-hieroglyphy-Decoder</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/jsfuck"
                        >JSfuck-ENCODER</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/hieroglyphy"
                        >hieroglyphy-ENCODER</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/webpack-react-vue-spa-awesome-config"
                        >webpack-react-vue- 极速零配置的单页面 web
                        应用打包工具</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/IMPORTCJSAMDUMD动态异步加载"
                        >动态异步加载-commonjs和umd和amd模块库</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/react-simple-global-state-store-hook"
                        >适用于React的极简全局状态管理库</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/excellent-vscode-extensions-for-javascript"
                        >VScode的优秀扩展推荐</a
                      >
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        href="#/vue-simple-global-state-store-manager"
                        >适用于Vue的极简全局状态管理库</a
                      >
                    </li>
                    <li>
                      <a
                        href="./my-vue-router-project/index.html"
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        >基于vue的主页</a
                      >
                    </li>
                    <li>
                      <a
                        href="./my-vue-router-project/index.html#/about"
                        class="nav-link mui-btn mui-btn-primary mui-btn-outlined"
                        >关于Vue</a
                      >
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div class="container" id="my主体" style="padding-top: 127.6px;">
              <div class="hello flowerpassword">
                <h1>花密 不一样的密码管理工具</h1>

                <div id="rong1" class="container" style="text-align: center;">
                  <div id="rong2">
                    <h2><span>1</span>输入</h2>
                    <div id="input">
                      <p></p>
                      <h3>记忆密码</h3>
                      <p></p>
                      <p>
                        <input
                          *ref=${inputref}
                          @change=${e => console.log(e, inputref)}
                          @input=${e => console.log(e)}
                          id="password"
                          placeholder="输入密码"
                          name="password"
                          type="password"
                          tabindex="1"
                          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control"
                          value=""
                        />
                      </p>
                      <p></p>
                      <span>+</span>
                      <h3>区分代号</h3>
                      <p></p>
                      <p>
                        <input
                          *ref=${inputref2}
                          *value=${inputpassword}
                          @input=${e => console.log(e)}
                          id="key"
                          placeholder="输入代号"
                          name="key"
                          type="text"
                          tabindex="2"
                          class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-control"
                          value=""
                        />
                      </p>
                    </div>
                    <br />
                    <p></p>
                    <h2><span>2</span>获取</h2>
                    <p></p>
                    <div id="get">
                      <p id="tuijian"></p>
                      <p></p>
                      <h3>最终密码</h3>
                      <p></p>
                      <span id="myhezi"
                        ><p>
                          <input
                            id="cod222222222222e16"
                            readonly=""
                            class="col-lg-12 col-md-12 col-sm-12 col-xs-12 snippet code16d form-control"
                            value=""
                          />
                        </p>
                        <br />
                        <p>
                          <button
                            id="copycode16"
                            data-clipboard-target="#code16"
                            class="btn btn-lg btn copycode16d btn-info"
                            style="width: 100%;"
                          >
                            点击复制
                          </button>
                        </p></span
                      >
                      <p>
                        <span id="copyOK" style="display: none;"
                          >√复制成功</span
                        >
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/bundle.runtime~main.3a15bebb435b0d3fead6.js"
        ></script
        ><script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.vendors~main.f7c5ea92c1b78a8ff211.js"
        ></script
        ><script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/chunk.main.b9c7ffd191cff11a9b96.js"
        ></script>
      </div>

      <div contenteditable></div>
    </div>
    <h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        baseProfile="full"
        style="
      width:600px;
      height: 600px;
  "
      >
        <g fill-opacity="0.7" stroke="black" stroke-width="0.1cm">
          <circle
            cx="6cm"
            cy="2cm"
            r="100"
            fill="red"
            transform="translate(0,50)"
          />
          <circle
            cx="6cm"
            cy="2cm"
            r="100"
            fill="blue"
            transform="translate(70,150)"
          />
          <circle
            cx="6cm"
            cy="2cm"
            r="100"
            fill="green"
            transform="translate(-70,150)"
          />
        </g>
      </svg>

      <svg
        style="
      width: 100%;
      height: 200px;
  "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3046.7 875.7"
      >
        <title>logo-on-dark-bg</title>
        <rect Color="#FFF" x="0" y="0" width="3046.7" height="875.7" />
        <path
          fill="#FFF"
          d="M387 0l387 218.9v437.9L387 875.7 0 656.8V218.9L387 0z"
        />
        <path
          fill="#8ED6FB"
          d="M704.9 641.7L399.8 814.3V679.9l190.1-104.6 115 66.4zm20.9-18.9V261.9l-111.6 64.5v232l111.6 64.4zM67.9 641.7L373 814.3V679.9L182.8 575.3 67.9 641.7zM47 622.8V261.9l111.6 64.5v232L47 622.8zm13.1-384.3L373 61.5v129.9L172.5 301.7l-1.6.9-110.8-64.1zm652.6 0l-312.9-177v129.9l200.5 110.2 1.6.9 110.8-64z"
        />
        <path
          fill="#1C78C0"
          d="M373 649.3L185.4 546.1V341.8L373 450.1v199.2zm26.8 0l187.6-103.1V341.8L399.8 450.1v199.2zM198.1 318.2l188.3-103.5 188.3 103.5-188.3 108.7-188.3-108.7z"
        />
        <path
          fill="#F5FAFA"
          d="M1164.3 576.3h82.5l84.1-280.2h-80.4l-49.8 198.8-53.1-198.8H1078l-53.6 198.8-49.3-198.8h-80.4l83.6 280.2h82.5l52-179.5 51.5 179.5zM1335.2 437c0 84.1 57.3 146.3 147.4 146.3 69.7 0 107.2-41.8 117.9-61.6l-48.8-37c-8 11.8-30 34.3-68.1 34.3-41.3 0-71.3-26.8-72.9-64.3H1608c.5-5.4.5-10.7.5-16.1 0-91.6-49.3-149.5-136.1-149.5-79.9 0-137.2 63.2-137.2 147.9zm77.7-30.6c3.2-32.1 25.7-56.8 60.6-56.8 33.8 0 58.4 22.5 60 56.8h-120.6zm223.5 169.9h69.7v-28.9c7.5 9.1 35.4 35.9 83.1 35.9 80.4 0 137.2-60.5 137.2-146.8 0-86.8-52.5-147.3-132.9-147.3-48.2 0-76.1 26.8-83.1 36.4V188.9h-73.9v387.4h-.1zm71.8-139.3c0-52.5 31.1-82.5 71.8-82.5 42.9 0 71.8 33.8 71.8 82.5 0 49.8-30 80.9-71.8 80.9-45 0-71.8-36.5-71.8-80.9zm247 239.5h73.9V547.3c7 9.1 34.8 35.9 83.1 35.9 80.4 0 132.9-60.5 132.9-147.3 0-85.7-56.8-146.8-137.2-146.8-47.7 0-75.6 26.8-83.1 36.4V296h-69.7v380.5h.1zm71.8-241.1c0-44.5 26.8-80.9 71.8-80.9 41.8 0 71.8 31.1 71.8 80.9 0 48.8-28.9 82.5-71.8 82.5-40.7 0-71.8-30-71.8-82.5zm231.5 54.1c0 58.9 48.2 93.8 105 93.8 32.2 0 53.6-9.6 68.1-25.2l4.8 18.2h65.4V398.9c0-62.7-26.8-109.8-116.8-109.8-42.9 0-85.2 16.1-110.4 33.2l27.9 50.4c20.9-10.7 46.6-19.8 74.5-19.8 32.7 0 50.9 16.6 50.9 41.3v18.2c-10.2-7-32.2-15.5-60.6-15.5-65.4-.1-108.8 37.4-108.8 92.6zm73.9-2.2c0-23 19.8-39.1 48.2-39.1s48.8 14.5 48.8 39.1c0 23.6-20.4 38.6-48.2 38.6s-48.8-15.5-48.8-38.6zm348.9 30.6c-46.6 0-79.8-33.8-79.8-81.4 0-45 29.5-82 77.2-82 31.6 0 53.1 15.5 65.4 26.8l20.9-62.2c-18.2-13.9-47.2-30-88.4-30-85.2 0-149 62.7-149 147.9s62.2 146.3 149.5 146.3c40.7 0 71.3-17.1 87.3-30l-19.8-60.5c-12.4 10.1-34.9 25.1-63.3 25.1zm110.9 58.4h73.9V431.6l93.8 144.7h86.8L2940.6 423l98.6-127h-83.1l-90 117.9v-225h-73.9v387.4z"
        />
      </svg>
    </h1>
  `;
  console.log(vdom);
  return vdom;
  // createApp(vdom, document.getElementById("root"));
};
mycomapp.css = modulecss;
var vdom = createElement(createComponent(mycomapp));
createApp(vdom, document.getElementById("root"));
