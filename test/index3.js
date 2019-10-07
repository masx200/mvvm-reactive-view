import { h, createElement } from "../dist/index.js";
console.log(h, createElement);
/* import * as mycss from "./test.css";
console.log(mycss); */
import {
  createComponent,
  //   createElement,
  createState,
  html,
  MountElement,
  useMounted,
  useUnMounted,
  watch
} from "../dist/index.js";
import mycss from "./test.css";
(() => {
  var mycom = (props, children) => {
    const number = createState(1);
    useMounted(() => {
      console.log("mounted1");
    });
    useMounted(() => {
      console.log("mounted2", props);
    });
    useUnMounted(() => {
      console.log("unmounted");
    });
    watch(props.cccccc, console.log);
    return (
      <div
        onclick={() => {
          number.value++;
        }}
      >
        {[
          number,
          <br />,
          "wwwwwwwwwwww",
          createElement("div", null, ["createComponent"]),
          children,
          createElement("div", null, [props.cccccc])
        ]}
      </div>
    );
  };
  mycom.defaultProps = { cccccc: "bbbbbbb" };
  mycom.css = mycss; /* css``; */
  const myclasscomponent = createComponent(mycom);
  const vdom = createElement(
    myclasscomponent,
    {
      aaaaaa: 222222222,
      tttttt: "dddddddddd"
    },
    ["children"]
  );
  console.log([vdom, myclasscomponent, mycom]);
  document.body.appendChild(MountElement(vdom, document.createElement("div")));
  setTimeout(() => {
    vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
  }, 5000);
  document.body.appendChild(
    MountElement(
      createElement(
        myclasscomponent,
        null,

        html`
          <form
            id="newsletterForm"
            class="newsletter-form nodisable"
            name="newsletter-form"
            action="https://www.mozilla.org/en-US/newsletter/"
            method="post"
          >
            <div class="newsletter-head">
              <h2 class="newsletter-teaser">学习 Web 开发的最佳实践</h2>
              <p class="newsletter-description">
                让 MDN 将最新、最棒的内容直接投递到您的邮箱。
              </p>

              <p class="newsletter-lang">目前仅提供英文版新闻报。</p>
            </div>

            <div class="newsletter-fields">
              <input type="hidden" id="fmt" name="fmt" value="H" />
              <input
                type="hidden"
                id="newsletterNewslettersInput"
                name="newsletters"
                value="app-dev"
              />
              <div id="newsletterErrors" class="newsletter-errors"></div>

              <div
                id="newsletterEmail"
                class="form-group newsletter-group-email"
              >
                <label for="newsletterEmailInput" class="form-label offscreen"
                  >电子邮件地址</label
                >
                <input
                  type="email"
                  id="newsletterEmailInput"
                  name="email"
                  class="form-input newsletter-input-email"
                  required=""
                  placeholder="you@example.com"
                  size="30"
                />
              </div>

              <div
                id="newsletterPrivacy"
                class="form-group form-group-agree newsletter-group-privacy hidden"
              >
                <input
                  type="checkbox"
                  id="newsletterPrivacyInput"
                  name="privacy"
                  required=""
                />
                <label for="newsletterPrivacyInput">
                  我接受 Mozilla 按照<a href="https://www.mozilla.org/privacy/"
                    >隐私政策</a
                  >所述的方式处理我的信息。
                </label>
              </div>
              <div id="newsletterSubmit" class="newsletter-group-submit">
                <button
                  id="newsletter-submit"
                  type="submit"
                  class="button neutral newsletter-submit"
                >
                  立即注册<svg
                    class="icon icon-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="28"
                    viewBox="0 0 23 28"
                    aria-hidden="true"
                  >
                    <path
                      d="M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        `
      ),
      document.createElement("div")
    )
  );
})();
