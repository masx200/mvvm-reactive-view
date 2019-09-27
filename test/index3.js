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
(() => {
  var mycom = (props, children) => {
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
    return [
      "wwwwwwwwwwww",
      createElement("div", null, ["createComponent"]),
      children,
      createElement("div", null, [props.cccccc])
    ];
  };
  mycom.defaultProps = { cccccc: "bbbbbbb" };
  mycom.css = `.recommend-container .recommend-user .item {
      margin-bottom: 16px
  }
  
  .recommend-container .recommend-user .ui.button {
      padding: 3px 5px;
      margin-right: 0
  }
  
  .recommend-container .recommend-user .header .pull-right {
      color: #005980;
      cursor: pointer
  }
  
  .recommend-container .recommend-user .header .pull-right.disabled {
      opacity: .7;
      cursor: default
  }
  
  .recommend-container .recommend-user .icon-reset {
      margin-top: -1px;
      height: 16px;
      font-size: 16px;
      margin-right: 2px
  }
  
  .recommend-container .recommend-user__content {
      position: relative
  }
  
  .recommend-container .dimmer.active {
      z-index: 1
  }
  
  .recommend-container .recommend-list__user {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -moz-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-right: 4px
  }
  
  .recommend-container .recommend-list__user strong {
      color: #005980
  }
  
  .recommend-container .recommend-list__user .recommend-list__user-info {
      margin: 0 4px 0 8px;
      max-width: 155px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
  }
  
  .recommend-container .recommend-list__user .recommend-list__user-info.is-follow {
      max-width: 125px
  }
  
  .recommend-container .recommend-list__user .recommend-list__user-info>div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
  }
  
  .recommend-container .recommend-list__flollow .disable {
      opacity: .5
  }
  
  .recommend-container .recommend-project .icon-recommended {
      color: #fe7300
  }
  
  .recommend-container .recommend-project .project-label {
      display: inline-block
  }
  
  .recommend-container .recommend-project .recommend-list {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -moz-box-orient: vertical;
      -moz-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column
  }
  
  .recommend-container .recommend-project .recommend-list>* {
      word-break: break-all
  }
  
  .recommend-container .recommend-project .recommend-list .recommend-project__describe {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      display: -webkit-box;
      -webkit-box-orient: vertical
  }
  
  .recommend-container .recommend-project .item {
      margin-bottom: 16px
  }
  
  .recommend-container .recommend-project .recommend-project__name {
      margin-bottom: 4px;
      color: #005980
  }
  
  .recommend-container .recent_visits .ui.items {
      margin-right: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex
  }
  
  .recommend-container .recent_visits .avatar-item {
      margin-right: -22px !important
  }
  
  .recommend-container .recent_visits .item {
      width: 20%;
      min-width: initial;
      font-size: 16px
  }
  
  .recommend-container .recent_visits .empty-visitor.item {
      font-size: 14px;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      flex: 1
  }
  
  .dashboard-content.twelve {
      padding-right: 0 !important
  }
  
  .dashboard-content .gitee-headbread .git-user-selection-dropdown {
      margin-right: 0 !important
  }
  
  .dashboard-content .dashboard-team .git-user-content-header {
      display: none
  }
  
  .dashboard-content .gitee-headbread {
      margin-bottom: 24px
  }
  
  .dashboard-content .git-dashboard-projects-menu {
      margin-bottom: 24px !important
  }
  
  .dashboard-content .git-dashboard-projects-menu .f-bold {
      color: #fe7300;
      border-bottom: 2px solid #fe7300 !important
  }
  
  .dashboard-content .git-dashboard-projects-menu>a.item {
      font-size: 16px;
      padding: 8px 18px !important
  }
  
  .dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input {
      width: 150px;
      margin-right: 10px
  }
  
  .dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input input {
      margin-top: -6px;
      font-size: 12px;
      margin-right: 10px
  }
  
  .dashboard-content .git-dashboard-projects-menu #search-form .ui.search .ui.input .icon-search {
      margin-top: -4px
  }
  
  .dashboard-content #event-timeline-panel h3.event-timeline-title {
      font-size: 16px;
      margin-top: 0;
      margin-bottom: 16px;
      display: inline-block
  }
  
  .dashboard-content #event-timeline-panel .event-timeline.content {
      padding: 0 0 18px 12px
  }
  
  .dashboard-content #event-timeline-panel .event-actionbar .dropdown.icon {
      margin-left: 4px
  }
  
  .dashboard-content #event-timeline-panel .message-container .message {
      margin: 0;
      margin-bottom: 1em
  }
  
  .dashboard-content .issues-filter__item {
      display: block;
      padding: 0 !important;
      color: initial !important;
      font-weight: 500 !important
  }
  
  .dashboard-content .issues-dropdown {
      margin-top: -6px !important
  }
  
  .dashboard-content .issues-dropdown .pl-0.f-bold {
      padding-left: 0 !important
  }
  
  .dashboard-content .dashboard-team .dashboard-team_info {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex
  }
  
  .dashboard-content .dashboard-team .ui.image {
      width: 40px;
      height: 40px;
      min-width: 40px
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner .dashboard-team__name {
      font-size: 16px;
      font-weight: bold;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      display: block
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner a {
      color: #005980 !important
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner>.item:first-child {
      padding-top: 0 !important
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner .item {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner .content {
      display: -webkit-box !important;
      display: -webkit-flex !important;
      display: -moz-box !important;
      display: -ms-flexbox !important;
      display: flex !important;
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
      justify-content: space-between;
      overflow: hidden
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner .content::after {
      content: none
  }
  
  .dashboard-content .dashboard-team .dashboard-team__contaniner .content i {
      font-size: 16px
  }
  
  .dashboard-content .dashboard-team .icon-enterprise-badge {
      margin-left: 4px
  }
  
  .dashboard-content .dashboard-team .dashboard-team__operate {
      min-width: 75px;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -moz-box-pack: end;
      -ms-flex-pack: end;
      justify-content: flex-end
  }
  
  .dashboard-content .dashboard-team .dashboard-team__operate.has-exit {
      min-width: 150px
  }
  
  .recommend-project .icon-help-circle {
      vertical-align: baseline
  }
  
  .dashboard-content__show {
      width: 608px !important;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box
  }
  
  .ui.container.user_page {
      width: 1240px
  }
  
  #rc-users__container {
      position: relative
  }
  
  #rc-users__container .secondary-navigation .active {
      color: #fe7300 !important
  }
  
  #rc-users__container .dashboard-content {
      padding-right: 32px;
      padding-left: 32px;
      padding-top: 24px
  }
  
  #rc-users__container .dashboard-sidebar {
      padding: 16px 0 0 0;
      width: 280px !important;
      margin-left: 10px
  }
  
  #rc-users__container .dashboard-sidebar .dashboard-group .item {
      margin: 8px 0
  }
  
  #rc-users__container .dashboard-sidebar .dashboard-group:last-child {
      margin-bottom: 0 !important
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar {
      padding-top: 0
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card {
      width: 100%;
      margin-top: 32px;
      margin-bottom: 0;
      padding-bottom: 0
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .ui.card .header {
      font-size: 16px
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name h4 {
      font-size: 14px;
      display: inline-block
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .description {
      margin-top: 0
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex {
      margin-top: 16px
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .item.flex:first-child {
      margin-top: 12px
  }
  
  #rc-users__container .dashboard-sidebar .user-dashboard-sidebar .enterprise-name .quit i {
      margin-top: 0
  }
  
  #rc-users__container .has-active .content {
      padding-left: 0 2px 0 8px
  }
  
  #rc-users__container .navigation .header {
      padding-right: 8px;
      border-bottom: 1px solid #e3e9ed;
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
      align-items: center;
      padding-bottom: 4px
  }
  
  #rc-users__container .navigation .header .title {
      font-size: 16px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex
  }
  
  #rc-users__container .navigation .header .avatar.image {
      margin-right: 0
  }
  
  #rc-users__container .navigation .header strong {
      font-size: 16px;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      max-width: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
  }
  
  #rc-users__container .navigation .header strong a {
      color: unset
  }
  
  #rc-users__container .navigation .header .actions {
      margin-top: 4px
  }
  
  #rc-users__container .navigation .header .actions i {
      color: #005980
  }
  
  #rc-users__container .navigation.user i {
      color: #989dad
  }
  
  #rc-users__container .navigation.user .content {
      padding: 0 8px
  }
  
  #rc-users__container .navigation .items>a {
      color: #40485b
  }
  
  #rc-users__container .navigation .items>a:hover {
      color: #095eab
  }
  
  #rc-users__container .navigation .items>a:active {
      color: #064177
  }
  
  #rc-users__container .navigation .items>a:hover {
      color: #40485b
  }
  
  #rc-users__container .navigation .item:hover .content {
      background: #F8F8F8
  }
  
  #rc-users__container .navigation .item .active {
      color: #fe7300;
      background: #F8F8F8
  }
  
  #rc-users__container .navigation .item .active .num {
      color: inherit
  }
  
  #rc-users__container .navigation .item:hover .exit {
      display: inline-block
  }
  
  #rc-users__container .navigation .icon-add,#rc-users__container .navigation .icon-search {
      color: #8c92a4 !important
  }
  
  #rc-users__container .navigation .num {
      font-size: 12px;
      font-weight: 500;
      color: #8c92a4
  }
  
  #rc-users__container .navigation .gray {
      color: #8c92a4
  }
  
  #rc-users__container .navigation .avatar.image {
      width: 32px;
      height: 32px
  }
  
  #rc-users__container .twitter-typeahead {
      width: 100%
  }
  
  #rc-users__container .gray {
      color: #8c92a4
  }
  
  #rc-users__container .ui.container {
      width: 1240px
  }
  
  #rc-users__container .contribution-events {
      padding-top: 32px
  }
  
  #rc-users__container #git-footer-main {
      min-width: 1240px
  }
  
  #rc-users__container .gitee-headbread .gitee-divider {
      display: inline-block;
      opacity: 0.5;
      margin: 0em 0.2rem 0em;
      color: rgba(0,0,0,0.4);
      vertical-align: baseline
  }
  
  #rc-users__container .git-user-content .git-user-content-header {
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
      margin-bottom: 16px
  }
  
  #rc-users__container .ui.button.js-project-watch {
      background: #fff;
      border: 1px solid rgba(140,146,164,0.5);
      padding: 2px 5px;
      margin: 0
  }
  
  #rc-users__container .recommend-container {
      width: 248px !important
  }
  `;
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
  document.body.appendChild(createApp(vdom, document.createElement("div")));
  setTimeout(() => {
    vdom.element.setAttribute("cccccc", "bbbbbbbbbbnnnnnnnnnnnnn");
  }, 5000);
})();
