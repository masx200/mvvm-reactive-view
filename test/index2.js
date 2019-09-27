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
  //RandomDefine
  createComponent,
  useMounted,
  useUnMounted
} from "../dist/index.js";
/* console.log([
  condition,
  Fragment,
  createRef,
  html,
  createApp,
  h,
  createElement,
  createState,
  watch,
  //RandomDefine
  createComponent,
  useMounted,
  useUnMounted
]); */
// setTimeout(
(() => {
  (() => {
    var myvdom1111111 = createElement(
      class extends HTMLElement {
        constructor(...argwwwuments) {
          super();
          console.log(argwwwuments);
        }
      },
      {
        style: {
          display: "block"
        }
      },
      "hhhhhhhhhhhhtests"
    );
    console.log(myvdom1111111);
    document.body.appendChild(
      createApp(myvdom1111111, document.createElement("div"))
    );
    document.body.appendChild(
      createApp(
        createElement(
          (() => {
            var Aaaaaaaaaa = class extends HTMLElement {};
            /* 其他浏览器不支持 
                  static defaultProps = {
                    name: "HelloKitty",
                    myAge: 18
                  };
                  
                  */
            Aaaaaaaaaa.defaultProps = {
              name: "HelloKitty",
              myAge: 18
            };
            return Aaaaaaaaaa;
          })()
        ),
        document.createElement("div")
      )
    );
    const myele1 = createElement(
      class extends HTMLElement {
        static defaultProps = {
          name: "aaaaaaaaaaHelloKitty",
          myAge: 1999999999999998
        };
      }
    );
    console.log(myele1);
    document.body.appendChild(createApp(myele1, document.createElement("div")));
    document.body.appendChild(createApp(myele1, document.createElement("div")));
  })();
})(); /* , 0); */
/* (async () => {
  const { default: importcjsamdumd } = await import(
    "https://cdn.jsdelivr.net/gh/masx200/importcjsamdumd@latest/dist/index.esm.min.js"
  );

  await importcjsamdumd({
    omi: "https://cdn.jsdelivr.net/npm/omi@6.11.3/dist/omi.esm.js"
  });

  return await importcjsamdumd(
    "https://cdn.jsdelivr.net/npm/omim@0.1.17/button/index.js"
  );
})().then(console.log); */
// ));
const vdom = html`
  <html>
    testhtml
  </html>
  <button
    onclick=${[
      console.log,
      () => {
        alert("onclick");
      }
    ]}
    *text="clicktest"
    @click=${[
      console.log,
      () => {
        alert("@click");
      }
    ]}
  />
  <style>
  .users__personal-avatar {
    position: relative;
    margin: 0 auto 10px;
    width: 160px;
    height: 160px
}

.users__personal-avatar .over-avatar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #FFF;
    font-size: 14px;
    text-align: center;
    line-height: 200px;
    border: 4px solid #EEE;
    border-radius: 50%;
    background: rgba(0,0,0,0.5);
    cursor: pointer;
    display: none
}

.users__personal-avatar .over-avatar:hover {
    display: block
}

.users__personal-avatar .ui.image.avatar {
    margin: 0;
    width: 100%;
    height: 100%;
    border: 4px solid #EEE
}

.users__personal-avatar .ui.image.avatar:hover+.over-avatar {
    display: block
}

.users__personal-avatar .avatar-gender {
    position: absolute;
    bottom: 2px;
    right: 27px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: #FFF;
    font-size: 21px;
    text-align: center;
    line-height: 30px;
    border: 2px solid #FFF
}

.users__personal-avatar .avatar-gender.mars {
    background: #3eb4ff
}

.users__personal-avatar .avatar-gender.venus {
    background: #ff5bc6
}

.users__personal-name {
    text-align: center
}

.users__personal-name h2,.users__personal-name p {
    margin: 8px 0 0;
    word-break: break-all
}

.users__personal-name h2 span,.users__personal-name p span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical
}

.users__personal-name .remark-name {
    color: #8c92a4;
    font-size: 14px;
    font-weight: normal;
    display: inline
}

.users__personal-name .ui.small.label {
    margin-bottom: .5em;
    padding: .4em .7em;
    font-weight: normal
}

.users__personal-setting {
    margin: 15px auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-around;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.users__personal-setting .ui.button {
    margin: 0;
    width: 45%;
    font-size: 14px
}

.users__personal-setting .ui.button.basic {
    border: 1px solid #CCC
}

.users__personal-socials .ui.grid {
    padding: 0 1rem
}

.users__personal-socials .ui.grid .column {
    padding: 1rem 0;
    text-align: center
}

.users__personal-socials .social-count {
    font-size: 18px;
    font-weight: bold
}

.users__personal-socials .social-name {
    padding-top: 5px;
    color: #40485b;
    font-size: 12px;
    display: block
}

.users__personal-info {
    padding: 15px 0;
    color: #8c92a4
}

.users__personal-info .info-item {
    padding: 3px 0;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.users__personal-info .info-item i.iconfont {
    width: 20px;
    text-align: center
}

.users__personal-info .info-item i.iconfont.icon-time {
    font-size: 12px
}

.users__personal-achievement {
    padding: 10px 0
}

.users__personal-achievement h3 {
    margin: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid #DCE3E8
}

.users__personal-achievement .ui.list .item .content {
    line-height: 1.8
}

.users__personal-achievement .ui.list .item .content .description {
    color: #7687ab
}

.users__personal-groups {
    padding: 10px 0
}

.users__personal-groups h3 {
    margin: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid #DCE3E8
}

.users__personal-groups .ui.list {
    margin: 0
}

.users__personal-groups .ui.list:not(.more-groups) {
    margin-top: 1em
}

.users__personal-groups .ui.list .item {
    padding: .3em 0
}

.users__personal-groups .ui.list .item a {
    color: #005980 !important
}

.users__personal-groups .ui.list .item a:hover {
    color: #4c8aa6 !important
}

.users__personal-groups .ui.list .item a:active {
    color: #003e59 !important
}

.users__personal-groups .ui.list .item .content {
    line-height: 1.8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.users__personal-groups .ui.list .item .right.floated.content {
    color: #7687ab
}

.users__personal-groups .ui.list .item .right.floated.content .mr-1 {
    width: 24px;
    display: inline-block
}

.users__personal-groups .load-more-groups {
    margin-top: 8px;
    display: block;
    color: #7687ab
}

.users__personal-groups .load-more-groups:hover {
    color: #9fabc4
}

.users__personal-groups .load-more-groups:active {
    color: #525e77
}

.users__navbar .ui.secondary.pointing.menu {
    border-bottom: 2px solid #DEDEDF
}

.users__navbar .ui.secondary.pointing.menu>.item {
    margin-bottom: -2px;
    padding: 10px 30px;
    min-width: 100px;
    text-align: center;
    border-width: 2px
}

.users__navbar .ui.secondary.pointing.menu>.item.active {
    color: #fe7300;
    border-color: #fe7300
}

.users__navbar .ui.secondary.pointing.menu>.item.active .ui.label {
    color: #fe7300;
    background: rgba(254,115,0,0.2)
}

.users__header {
    margin-top: 2em;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.users__header h3 {
    margin: 0
}

.users__header .ui.dropdown {
    padding: .5em .92857em
}

.users__popular-projects .ui.cards {
    margin: 0 -0.5em -0.5em
}

.users__popular-projects .ui.cards .ui.card {
    margin: .5em !important;
    padding: 1em;
    width: calc(50% - 1em ) !important;
    border: 1px solid #dce3e8;
    -webkit-box-shadow: none;
    box-shadow: none
}

.users__popular-projects .ui.cards .ui.card .content {
    padding: 0
}

.users__popular-projects .ui.cards .ui.card .content .popular-project-title {
    font-size: 16px;
    word-break: break-all;
    vertical-align: middle
}

.users__popular-projects .ui.cards .ui.card .content .git-project-gvp-badge {
    margin-top: -3px
}

.users__popular-projects .ui.cards .ui.card .content i.iconfont {
    font-size: 14px
}

.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-mode-table {
    margin-top: 1px;
    color: #d0d0d0;
    cursor: move
}

.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-recommended {
    color: #fe7300;
    font-weight: normal
}

.users__popular-projects .ui.cards .ui.card .content i.iconfont.icon-watch {
    font-size: 12px;
    vertical-align: baseline
}

.users__popular-projects .ui.cards .ui.card .content .description {
    color: #8c92a4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical
}

.users__popular-projects .ui.cards .ui.card .extra.content {
    padding-top: 1em;
    border: none !important;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.users__popular-projects .ui.cards .ui.card .extra.content:after {
    content: none
}

.users__popular-projects .ui.cards .ui.card .extra.content .left .ui.small.label {
    padding: .4em .7em
}

.users__popular-projects .ui.cards .ui.card .extra.content .right a {
    padding: 0 .2em;
    color: #8c92a4
}

.users__popular-projects .ui.cards .ui.card .extra.content .right a:hover {
    color: #aeb2bf
}

.users__popular-projects .ui.cards .ui.card .extra.content .right a:active {
    color: #626672
}

.users__popular-projects .ui.cards .ui.card.sortable-chosen {
    background: #FED !important
}

.users__contribution-panel .less {
    background-color: #EEEEEE
}

.users__contribution-panel .little {
    background-color: #D6E685
}

.users__contribution-panel .some {
    background-color: #8CC665
}

.users__contribution-panel .many {
    background-color: #44A340
}

.users__contribution-panel .much {
    background-color: #1E6823
}

.users__contribution-panel .contribution-box {
    padding-top: 20px;
    height: 125px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex
}

.users__contribution-panel .contribution-box .left-side {
    width: 32px;
    font-size: 12px;
    text-align: center;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.users__contribution-panel .contribution-box .right-side {
    position: relative;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap
}

.users__contribution-panel .contribution-box .right-side .box {
    width: 1.88679%;
    height: 15px;
    border: 1px solid #FFF
}

.users__contribution-panel .contribution-box .right-side .box[data-content]:hover {
    border: 1px solid #000
}

.users__contribution-panel .contribution-box .right-side .month {
    position: absolute;
    top: 0;
    margin-top: -15px;
    margin-left: -15px;
    min-width: 45px;
    font-size: 12px;
    text-align: center
}

.users__contribution-panel .contribution-tip {
    margin-top: 10px;
    padding-right: 10px;
    font-size: 12px;
    text-align: right
}

.users__contribution-panel .contribution-tip .word {
    font-size: 12px;
    vertical-align: top;
    display: inline-block
}

.users__contribution-panel .contribution-tip .ui.horizontal.list>.item {
    margin: 0 1px;
    width: 12px;
    height: 12px;
    vertical-align: text-bottom
}

.users__contribution-panel .contribution-describ p {
    margin: 0;
    margin-right: 20px;
    display: inline-block
}

.users__contribution-panel .contribution-describ p.text-muted {
    margin-top: 10px;
    display: block
}

.users__customize-modal .ui.form {
    min-height: 180px
}

.users__customize-modal .grouped.fields {
    margin: .2em 0em 1em !important;
    padding: 10px 0;
    max-height: 20em;
    overflow-y: auto
}

.users__customize-modal .grouped.fields .field {
    padding: 5px !important
}

.users__customize-modal .grouped.fields .field .ui.checkbox {
    width: 100%
}

.users__customize-modal .grouped.fields .field label {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.users__customize-modal .grouped.fields .field label span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.users__customize-modal .grouped.fields .field label .star-count {
    min-width: 4em;
    text-align: right
}

.users__customize-modal .grouped.fields .field.active {
    background: rgba(254,115,0,0.2)
}

.users__report-modal .appeal-success-tip {
    text-align: center
}

.users__report-modal .appeal-success-tip i.iconfont {
    font-size: 7rem;
    color: #4baf50
}

.users__report-modal .ui.items {
    padding: 20px;
    background: #f4f5f6
}

.users__report-modal .ui.items .ui.image {
    width: 50px
}

.users__report-modal .ui.items .content .header {
    color: #40485b
}

.users__report-modal .ui.items .content .description {
    color: #8c92a4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
}

.users__report-modal .ui.segment.loader-block {
    border: 0;
    min-height: 100px
}

.users__report-modal .action-types .item {
    margin: 5px;
    padding: 10px 20px;
    min-width: 120px;
    text-align: center;
    display: inline-block;
    background: #F2F2F2;
    border-radius: 5px;
    cursor: pointer
}

.users__report-modal .action-types .item:hover,.users__report-modal .action-types .item:active,.users__report-modal .action-types .item.active {
    color: #fe7300
}

.users__report-modal .extra-content textarea {
    width: 100%;
    height: 5em
}

#user-show-detail .git-dashboard-projects-menu>.f-bold {
    color: #fe7300
}

#user-show-detail .git-codes-tags {
    margin-bottom: 16px
}

#user-show-detail .git-user-twl-col>.gitee-headbread {
    margin-bottom: 16px;
    margin-top: 10px
}

#user-show-detail .git-profile-content-header .git-dashboard-projects-menu {
    margin-bottom: 14px
}

#user-show-detail .git-profile-content-header .git-dashboard-projects-menu>a {
    font-size: 14px
}

.recommend-container {
    padding: 24px 0 0 0 !important
}

.recommend-container .recommend-notice {
    background-color: #FFFEED !important;
    margin-bottom: 24px
}

.recommend-container .recommend-notice>.header {
    margin-right: 8px !important
}

.recommend-container .ui.message {
    color: #40485b;
    padding: 12px 16px;
    -webkit-box-shadow: 0px 0px 0px 1px #e2d8bf inset,0px 0px 0px 0px rgba(0,0,0,0);
    box-shadow: 0px 0px 0px 1px #e2d8bf inset,0px 0px 0px 0px rgba(0,0,0,0)
}

.recommend-container .ui.message i {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.8em;
    margin-top: 8px;
    margin-right: 8px;
    cursor: pointer;
    color: #005980
}

.recommend-container .ui.message .header {
    color: #40485b;
    font-size: 14px
}

.recommend-container .ui.message .content {
    margin-top: 4px
}

.recommend-container .recommend-block {
    margin-bottom: 32px
}

.recommend-container .recommend-block>.items {
    margin-top: 0
}

.recommend-container .recommend-block .header {
    margin-bottom: 16px
}

.recommend-container .recommend-block .header strong {
    font-size: 16px
}

.recommend-container .recommend-block .recommend-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex
}

.recommend-container .recommend-block .item {
    margin: 0
}

.recommend-container .recommend-user .header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -moz-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end
}

.recommend-container .recommend-user .recommend-list {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center
}


  </style>
`;
document.body.appendChild(createApp(vdom, document.createElement("div")));
console.log("onclick", " @click", vdom);
