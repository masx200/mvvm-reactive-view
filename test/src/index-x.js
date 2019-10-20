/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  computed,
  createElement,
  createRef,
  createState,
  h,
  MountElement,
  watch
} from "./mvvm-view";
console.log([h, createElement]);
const lirefs = [];
// console.log()
// export{vdom}
const temp_ref = createRef();
const check = createState(false);
const check2 = createState(true);
watch(check2, a => console.log(a));
const check3 = createState(true);
watch(check3, a => console.log(a));
const check4 = createState(true);
watch(check4, a => console.log(a));
const notcheck = computed(
  check,
  a => !a,
  v => {
    // console.log(v);
    console.log(notcheck, check, v);
    // check3.value = v;
    check.value = !v;
  }
);
var list = Array(10)
  .fill(undefined)
  .map((v, i) => i);
watch(check, a => console.log(a));
watch(notcheck, a => console.log(a));
var vdom = (
  <>
    <input type="radio" _checked={check4} name="myname1" />
    <input type="radio" _checked={check3} name="myname1" />
    <input type="radio" _checked={check2} name="myname2" />
    <input type="radio" _checked={check4} name="myname2" />
    {[
      <input type="checkbox" _checked={check} />,
      <input type="checkbox" _checked={notcheck} />,
      <>
        <ul>
          {list.map((a, index) => (
            <li
              $ref={ele => {
                lirefs[index] = ele;
                lirefs.length = list.length;
              }}
            >
              item{a}
            </li>
          ))}
        </ul>
        <header
          class="common-header fixed noborder floating"
          id="git-header-nav"
          _ref={temp_ref}
        >
          <div class="ui container">
            <div class="ui menu header-menu">
              <div class="git-nav-expand-bar">
                <i class="iconfont icon-mode-table"></i>
              </div>
              <div class="gitee-nav__sidebar">
                <div class="gitee-nav__sidebar-container">
                  <div class="gitee-nav__sidebar-top">
                    <div class="gitee-nav__avatar-box">
                      <a href="/masx200" onclick={e => e.preventDefault()}>
                        <img
                          alt="1081296_masx200"
                          class="ui avatar image masx200-avatar"
                          src="https://avatar.gitee.com/uploads/96/1081296_masx200.png?1566294318"
                        />
                      </a>
                    </div>
                    <div class="gitee-nav__info-box">
                      <a href="/masx200">masx200</a>
                    </div>
                  </div>
                  <div class="gitee-nav__sidebar-middle">
                    <div class="gitee-nav__sidebar-list">
                      <ul>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/masx200">
                            <i class="iconfont icon-ic-dashboard"></i>
                            <span class="gitee-nav__sidebar-name">
                              个人主页
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/explore">
                            <i class="iconfont icon-ic-discover"></i>
                            <span class="gitee-nav__sidebar-name">
                              开源软件
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/gists">
                            <i class="iconfont icon-ic-gists1"></i>
                            <span class="gitee-nav__sidebar-name">
                              代码片段
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/enterprises">
                            <i class="iconfont icon-ic-enterprise"></i>
                            <span class="gitee-nav__sidebar-name">企业版</span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/education">
                            <i class="iconfont icon-ic-education"></i>
                            <span class="gitee-nav__sidebar-name">高校版</span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item split-line"></li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/search">
                            <i class="iconfont icon-ic-search"></i>
                            <span class="gitee-nav__sidebar-name">搜索</span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/help">
                            <i class="iconfont icon-help-circle"></i>
                            <span class="gitee-nav__sidebar-name">
                              帮助中心
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/terms">
                            <i class="iconfont icon-file"></i>
                            <span class="gitee-nav__sidebar-name">
                              使用条款
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/about_us">
                            <i class="iconfont icon-issuepx"></i>
                            <span class="gitee-nav__sidebar-name">
                              关于我们
                            </span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/profile">
                            <i class="iconfont icon-edit"></i>
                            <span class="gitee-nav__sidebar-name">设置</span>
                          </a>
                        </li>
                        <li class="gitee-nav__sidebar-item">
                          <a href="/logout" data-method="delete" rel="nofollow">
                            <i class="iconfont icon-ic-logout"></i>
                            <span class="gitee-nav__sidebar-name">退出</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="gitee-nav__sidebar-bottom">
                    <div class="gitee-nav__sidebar-close-button">
                      <i class="fa fa-angle-double-left"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="item gitosc-logo">
                <a href="/">
                  <img
                    class="ui inline image"
                    height="28"
                    src="https://gitee.com//logo.svg?20171024"
                    width="95"
                  />
                  <img
                    class="ui inline black image"
                    height="28"
                    src="https://gitee.com//logo-black.svg?20171024"
                    width="95"
                  />
                </a>
              </div>
              <a href="/explore" class="item " title="开源软件">
                开源软件
              </a>
              <a href="/enterprises" class="item " title="企业版">
                企业版
                <sup class="ui red label">特惠</sup>
              </a>
              <a href="/education" class="item " title="高校版">
                高校版
              </a>
              <a
                href="https://blog.gitee.com/"
                class="item"
                id="gitee-blog"
                target="_blank"
                title="博客"
              >
                博客
              </a>
              <div class="dropdown item ui" id="my-gitee-dropdown" tabindex="0">
                <a href="/masx200/dashboard">我的码云</a>
                <i class="dropdown icon"></i>
                <div class="menu transition hidden" tabindex="-1">
                  <div class="header user-projects">
                    <a
                      href="/masx200/projects"
                      class="pull-right"
                      target="_blank"
                    >
                      全部
                    </a>
                    仓库
                    <span class="count">(11)</span>
                  </div>
                  <a
                    target="_blank"
                    href="/masx200/mvvm-reactive-view"
                    title="masx200/mvvm-reactive-view"
                    class="item"
                  >
                    masx200/mvvm-reactive-view
                  </a>
                  <a
                    target="_blank"
                    href="/masx200/webpack-react-vue-spa-awesome-config"
                    title="masx200/webpack-react-vue-spa-awesome-config"
                    class="item"
                  >
                    masx200/webpack-react-vue-spa-awesome-config
                  </a>
                  <a
                    target="_blank"
                    href="/masx200/custom-elements-random-define"
                    title="masx200/custom-elements-random-define"
                    class="item"
                  >
                    masx200/custom-elements-random-define
                  </a>
                  <a
                    target="_blank"
                    href="/masx200/importcjsamdumd"
                    title="masx200/importcjsamdumd"
                    class="item"
                  >
                    masx200/importcjsamdumd
                  </a>
                  <a
                    target="_blank"
                    href="/masx200/dom-element-attribute-agent-proxy"
                    title="masx200/dom-element-attribute-agent-proxy"
                    class="item"
                  >
                    masx200/dom-element-attribute-agent-proxy
                  </a>
                </div>
              </div>
              <div class="center responsive-logo">
                <a href="/">
                  <img
                    class="ui inline image"
                    height="24"
                    src="https://gitee.com//logo.svg?20171024"
                    width="85"
                  />
                  <img
                    class="ui inline black image"
                    height="24"
                    src="https://gitee.com//logo-black.svg?20171024"
                    width="85"
                  />
                </a>
              </div>
              <div class="right menu userbar" id="git-nav-user-bar">
                <div class="item git-nav-search-item">
                  <form
                    accept-charset="UTF-8"
                    action="/search"
                    autocomplete="on"
                    data-text-filter="搜索格式不正确"
                    data-text-require="搜索关键字不能少于1个"
                    id="navbar-search-form"
                    method="get"
                  >
                    <div style="margin:0;padding:0;display:inline">
                      <input name="utf8" type="hidden" value="✓" />
                    </div>
                    <div class="ui mini fluid input">
                      <input
                        id="navbar-search-input"
                        name="q"
                        placeholder="搜索项目、代码片段..."
                        type="text"
                        value=""
                      />
                      <input
                        id="navbar-search-type"
                        name="type"
                        type="hidden"
                      />
                    </div>
                  </form>
                </div>
                <div
                  class="item ui dropdown empty"
                  data-count-path="/notifications/unread_count"
                  data-enable=""
                  data-mark-notice-path="/notifications/mark"
                  id="notice-dropdown"
                  tabindex="0"
                >
                  <a href="/notifications" class="remind-button">
                    <i class="iconfont icon-remind"></i>
                    <div class="notice-count total">1</div>
                  </a>
                  <div
                    class="notice-dropdown-panel menu transition hidden"
                    tabindex="-1"
                    style="left: -165px;"
                  >
                    <div class="notice-dropdown-panel-header">
                      <div
                        class="tab"
                        data-data-path="/notifications/notices?scope=referer"
                        data-html-path="/notifications/referer"
                        data-scope="referer"
                      >
                        <div class="content">
                          @ 我<div class="notice-count referer"></div>
                        </div>
                      </div>
                      <div
                        class="tab active"
                        data-data-path="/notifications/notices?scope=infos"
                        data-html-path="/notifications/infos"
                        data-scope="infos"
                      >
                        <div class="content">
                          通知
                          <div class="notice-count infos">1</div>
                        </div>
                      </div>
                      <div
                        class="tab"
                        data-data-path="/notifications/notices?scope=messages"
                        data-html-path="/notifications/messages"
                        data-scope="messages"
                      >
                        <div class="content">
                          私信
                          <div class="notice-count messages"></div>
                        </div>
                      </div>
                    </div>
                    <div class="item notice-dropdown-panel-container">
                      <div class="ui dimmer over active">
                        <div class="ui loader"></div>
                      </div>
                      <div class="notice-list" style="min-height: auto;">
                        <a
                          class="noti"
                          href="/masx200/mvvm-reactive-view"
                          target="_blank"
                          data-type="project"
                          data-id="50555275"
                        >
                          <div class="title">
                            你的仓库 masx200/mvvm-reactive-view 已经从
                            https://github.com/masx200/mvvm-reactive-view.git
                            同步成功
                          </div>
                          <div class="meta">
                            <time class="timeago">2小时前</time> ·{" "}
                            <span class="namespace">
                              masx200/mvvm-reactive-view
                            </span>
                          </div>
                        </a>
                      </div>
                      <div class="notice-dropdown-panel-blank">
                        暂没有新消息
                      </div>
                    </div>
                    <div class="notice-dropdown-panel-footer">
                      <div class="action">
                        <div class="side left">
                          <a href="javascript: void(0);" class="mark-notices">
                            当前标记为已读
                          </a>
                        </div>
                        <div class="side right">
                          <a
                            href="/notifications/infos"
                            class="load-all"
                            target="_blank"
                          >
                            查看全部
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="ui dropdown link item"
                  id="git-nav-create"
                  tabindex="0"
                >
                  <i class="iconfont icon-add-thin"></i>
                  <div class="right menu" tabindex="-1">
                    <a href="/projects/new" class="item">
                      <i class="add square icon"></i>
                      新建仓库
                    </a>
                    <a href="/masx200/codes/new" class="item">
                      <i class="code icon"></i>
                      发布代码片段
                    </a>
                    <a href="/organizations/new" class="item">
                      <i class="group icon"></i>
                      创建组织
                    </a>
                    <a href="/enterprises/new" class="item">
                      <i class="icon iconfont icon-enterprise"></i>
                      开通企业版
                    </a>
                    <a href="/projects/oauth_github" class="item">
                      <i class="github icon"></i>从 GitHub 导入仓库
                    </a>
                  </div>
                </div>
                <div class="ui dropdown item" id="git-nav-user" tabindex="0">
                  <img
                    alt="1081296_masx200"
                    class="ui avatar image"
                    src="https://avatar.gitee.com/uploads/96/1081296_masx200.png!avatar30?1566294318"
                  />
                  <i class="dropdown icon"></i>
                  <div class="right menu" tabindex="-1">
                    <a href="/masx200" class="item">
                      <i class="iconfont icon-ic-home"></i>
                      个人主页
                    </a>
                    <a href="/profile" class="item">
                      <div class="mayun-icon my-ic-edit my-ic-edit-dims"></div>
                      设置
                    </a>
                    <div class="divider"></div>
                    <a href="/gists" class="item">
                      <div class="iconfont icon-ic-gist"></div>
                      代码片段
                    </a>
                    <a
                      href="https://gitee.com/help"
                      class="item"
                      target="_blank"
                    >
                      <div class="mayun-icon my-ic-help my-ic-help-dims"></div>
                      帮助
                    </a>
                    <div class="divider"></div>
                    <a
                      href="/logout"
                      class="item destroy-user-session"
                      data-method="delete"
                      rel="nofollow"
                    >
                      <div class="mayun-icon my-ic-exit my-ic-exit-dims"></div>
                      退出
                    </a>
                  </div>
                </div>
                <script></script>
              </div>
            </div>
          </div>
        </header>
      </>
    ]}
  </>
);
console.log(vdom, temp_ref, lirefs);
document.body.appendChild(MountElement(vdom, document.createElement("div")));
