import { html, createApp } from "../dist/index.js";
var vdom = html`
  <div>
    <link
      href="https://cdn.jsdelivr.net/gh/masx200/masx200.github.io@4.3.3/main.b9c7ffd191cff11a9b96.css"
      rel="stylesheet"
    />
    <body>
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
                      >webpack-react-vue- 极速零配置的单页面 web 应用打包工具</a
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
                          id="code16"
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
                      <span id="copyOK" style="display: none;">√复制成功</span>
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
    </body>
    <div></div>
  </div>
`;
createApp(vdom, document.getElementById("root"));
console.log(vdom);
