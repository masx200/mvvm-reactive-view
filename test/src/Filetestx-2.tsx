import { createElement, MountElement } from "./mvvm-view";
import { myclasscomponent } from "./index3-life-cycle";
{
    const vdom2 = createElement(myclasscomponent, [
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
                    <label
                        for="newsletterEmailInput"
                        class="form-label offscreen"
                    >
                        电子邮件地址
                    </label>
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
                        我接受 Mozilla 按照
                        <a href="https://www.mozilla.org/privacy/">隐私政策</a>
                        所述的方式处理我的信息。
                    </label>
                </div>
                <div id="newsletterSubmit" class="newsletter-group-submit">
                    <button
                        id="newsletter-submit"
                        type="submit"
                        class="button neutral newsletter-submit"
                    >
                        立即注册
                        <svg
                            class="icon icon-arrow"
                            xmlns="http://www.w3.org/2000/svg"
                            width="23"
                            height="28"
                            viewBox="0 0 23 28"
                            aria-hidden="true"
                        >
                            <path d="M23 15a2.01 2.01 0 0 1-.578 1.422L12.25 26.594c-.375.359-.891.578-1.422.578s-1.031-.219-1.406-.578L8.25 25.422c-.375-.375-.594-.891-.594-1.422s.219-1.047.594-1.422L12.828 18h-11C.703 18 0 17.062 0 16v-2c0-1.062.703-2 1.828-2h11L8.25 7.406a1.96 1.96 0 0 1 0-2.812l1.172-1.172c.375-.375.875-.594 1.406-.594s1.047.219 1.422.594l10.172 10.172c.375.359.578.875.578 1.406z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    ]);
    const container2 = document.createElement("div");
    MountElement(vdom2, container2);
    document.body.appendChild(container2);
}
