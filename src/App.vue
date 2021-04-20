<template>
  <div id="app" class="app" :class="w > 1700 ? 'big' : 'zhong'">
    <router-view />
  </div>
</template>

<script>
// import navBar from './views/nav/index.vue'

export default {
  name: 'App',
  data() {
    return {
      h: 890,
      w: 1920,
    };
  },
  computed: {},
  watch: {},
  // components: {
  //   navBar,
  // },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.inline-block {
  display: inline-block;
}
.tac {
  text-align: center;
}
.tar {
  text-align: right;
}
.tal {
  text-align: left;
}
.bg-gray {
  background-color: #f1f2f4;
}
.fs-12 {
  font-size: 12px;
}
.bold {
  font-weight: bold;
}
.mapboxgl-popup {
  max-width: inherit !important;
}
table {
  border-collapse: collapse;
}
.mapboxgl-popup table td {
  border: 1px solid #eee;
  padding: 5px 10px;
  font-size: 12px;
  max-width: 200px;
}
.mapboxgl-popup-content {
  background: #f1f1f1 !important;
}
.el-table::before{
  height: 0;
}
.homeMap {
  transition: 0.5s all;
  div {
    transition: 0.5s all;
  }
}
.towTextc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
div {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
img {
  outline-style: none;
}
input,
textarea {
  outline: none;
  box-sizing: border-box;
  border: none;
}
// ::-webkit-scrollbar {
//   background: transparent;
//   width: 8px;
// }
// ::-webkit-scrollbar-thumb {
//   background: #20ffff;
//   border-radius: 4px;
// }
// ::-webkit-scrollbar-button {
//   display: none;
// }
// ::-moz-scrollbar {
//   background: transparent;
//   width: 8px;
// }
// ::-moz-scrollbar-thumb {
//   background: #20ffff;
//   border-radius: 4px;
// }
// ::-moz-scrollbar-button {
//   display: none;
// }
// ::-ms-scrollbar {
//   background: transparent;
//   width: 8px;
// }
// ::-ms-scrollbar-thumb {
//   background: #20ffff;
//   border-radius: 4px;
// }
// ::-ms-scrollbar-button {
//   display: none;
// }
// ::-ms-scrollbar:horizontal {
//   background: transparent;
//   height: 3px;
// }
// ::-moz-scrollbar:horizontal {
//   background: transparent;
//   height: 3px;
// }
// ::-webkit-scrollbar:horizontal {
//   background: transparent;
//   height: 3px;
// }
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #f8f8f8;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  color: #333;
  display: flex;
  flex-flow: column;
  display: -moz-box;
  flex-direction: column;
  -moz-flex-direction: column;
}
#nav {
  width: 100%;
  height: 0.82rem;
  background: #fff;
}
.main {
  width: 100%;
  /* max-height: 890px;
   flex: 1; */
  display: flex;
  background: #f8f8f8;
  overflow: hidden;
}
.menu {
  width: 2.5rem;
  height: 100%;
  background: #2b333e;
}
.con {
  width: 16.7rem;
  height: 100%;
  padding: 0 0.3rem;
  padding-bottom: 0.3rem;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.04);
  overflow-y: auto;
}
.ivu-select-selection {
  background: linear-gradient(
    0deg,
    rgba(242, 242, 242, 1),
    rgba(255, 255, 255, 1)
  );
  border: 0.01rem solid rgba(0, 0, 0, 0.12);
  border-radius: 0.04rem;
}
.ivu-modal-footer,
.ivu-modal-body,
.ivu-modal-header {
  padding-left: 0.4rem !important;
  padding-right: 0.4rem !important;
}
.texct {
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow: hidden; /*内容会被修剪，并且其余内容是不可见的。*/
  text-overflow: ellipsis; /*显示省略号来代表被修剪的文本*/
}
.table-tr div {
  overflow: hidden;
}
.table-tr div p {
  width: 100%;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow: hidden; /*内容会被修剪，并且其余内容是不可见的。*/
  text-overflow: ellipsis;
}
.pswp__bg {
  opacity: 0.3 !important;
}
.select_box-con {
  width: 242px;
  height: 40px;
  background: #b2d3ea;
  border-radius: 4px;
  input {
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 0 15px;
    color: #fff;
  }
  input::-webkit-input-placeholder {
    color: #6e7c9d;
  }
}
.inventory .ivu-input {
  border: none !important;
  height: 40px !important;
  color: #333 !important;
}
.ivu-input-suffix i {
  color: #333 !important;
  line-height: 40px !important;
}
.ivu-btn-text[disabled] {
  color: #333 !important;
}
.inventory .ivu-icon {
  color: #333 !important;
}
.ivu-date-picker-prev-btn-arrow-double i:after {
  margin-left: -20px !important;
}
.ivu-date-picker-next-btn-arrow-double i:after {
  margin-left: -20px !important;
}
.ivu-date-picker-editor .ivu-input::-webkit-input-placeholder {
  color: #6e7c9d !important;
}
select-large
  .ivu-select-single
  .ivu-select-selection
  .ivu-select-selected-value {
  color: #333 !important;
}
.ivu-select-selected-value {
  color: #333 !important;
}
.select_box-con input {
  color: #333 !important;
}
</style>
<style lang="scss">
.recordList .ivu-modal {
  height: 860px !important;
}
#app .inventory,
.inventory {
  .ivu-modal-wrap .ivu-modal {
    top: 40px;
  }
  .ivu-page-total {
    color: #fff;
  }
  .ivu-page {
    float: right;
    margin-right: 60px;
  }
  .ivu-page-next,
  .ivu-page-prev {
    background-color: transparent;
    border: none;
    a {
      display: block;
      line-height: 32px;
    }
  }
  .ivu-icon {
    color: #ccdce7;
    font-size: 26px;
  }
  .ivu-icon-ios-arrow-down:before {
    content: "\F33D";
    color: #4e6b7d;
  }
  .ivu-page-item {
    border: none;
    background-color: transparent;
    border-radius: 50%;
  }
  .ivu-page-item a {
    color: #a1a5fe;
    display: block;
    line-height: 32px;
  }
  .ivu-page-item:hover a {
    color: #ffffff;
  }
  .ivu-page-item-active {
    background: #0934be;
  }
  .ivu-page-item-active a,
  .ivu-page-item-active:hover a {
    color: #ffffff;
  }
  .ivu-page-options-elevator input {
    background: transparent;
    border: 1px solid #2f395a;
    color: #fff;
  }
  .ivu-page-options-elevator {
    color: #fff;
  }
  .ivu-modal {
    height: 920px;
    top: 60px;
    zoom: 0.88;
    padding-top: 8px;
    background: url(./assets/space@4.0/tc.png) left top/100% 100%;
    .ivu-icon-ios-close:before {
      content: "";
    }
    .ivu-modal-content {
      background: transparent;
      width: 100%;
      height: 100%;
    }
    .ivu-table-wrapper {
      width: 1192px;
      margin: 0 auto;
      margin-left: 70px;
      .ivu-table {
        background: transparent;
        color: #bcc7ea;
      }
      .ivu-table:before {
        height: 0;
      }
      .ivu-table th {
        background: transparent;
        border-bottom: 1px solid #203c61;
      }
      .ivu-table td {
        background: transparent;
        border-bottom: 1px solid #203c61;
        height: 60px;
      }
      .ivu-table-header thead tr th {
        height: 50px;
      }
    }
    .ivu-page {
      margin: 10px 0;
      margin-right: 70px;
    }
  }
  .ivu-input {
    background-color: transparent;
    border: solid 1px #486bb2;
    height: 36px;
    font-size: 16px;
    color: #fff;
  }
  .ivu-input::-webkit-input-placeholder {
    color: #485aa0;
  }
}
.powerInfo .ivu-modal {
  height: 800px !important;
}
.ivu-scroll-container {
  overflow-y: auto;
  padding-right: 13px;
}

.inventory .ivu-modal-header {
  padding: 0 !important;
  border: none;
  height: 40px;
}

.inventory .ivu-modal-close {
  top: 5px;
}
.ivu-modal-close {
  right: -30px !important;
}
.inventory .ivu-modal-close .ivu-icon-ios-close {
  display: block;
  width: 58px;
  height: 58px;
  background: url(./assets/space@4.0/tcgb.png) no-repeat left top/100%;
}

.inventory .ivu-modal-body {
  padding: 0 !important;
}
.inventory .ivu-select-selection {
  background: transparent;
  border: none;
}
.inventory .ivu-select-large.ivu-select-single .ivu-select-selection {
  height: 100%;
}
.inventory .ivu-select {
  color: #fff;
}
.inventory
  .ivu-select-large.ivu-select-single
  .ivu-select-selection
  .ivu-select-placeholder {
  color: #6e7c9d;
  display: flex;
  align-items: center;
  height: 40px;
}
.big {
  .select_box-block {
    display: none !important;
  }
}
.app {
  .ivu-cascader-menu {
    min-width: 130px;
  }
  .ivu-cascader .ivu-cascader-menu-item {
    white-space: nowrap;
    overflow: hidden;
  }
}
.tanchuang {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  color: #ffffff;
  .quxiao,
  .confirms {
    cursor: pointer;
    margin-right: 20px;
    width: 112px;
    background: linear-gradient(
      90deg,
      rgba(5, 124, 174, 1) 0%,
      rgba(53, 67, 184, 1) 100%
    );
    height: 41px;
    line-height: 40px;
    border-radius: 21px;
    text-align: center;
  }
  .quxiao {
    background: linear-gradient(
      90deg,
      rgba(61, 94, 107, 1) 0%,
      rgba(64, 72, 134, 1) 100%
    );
  }
}
.table {
  width: 100%;
  max-height: 620px;
  margin-top: 10px;
  .table-title {
    width: 100%;
    height: 60px;
    display: flex;
    background: rgba(7, 53, 105, 1);
    color: #34fdff;
    font-size: 18px;
    line-height: 26px;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
    }
  }
  .table-tr {
    width: 100%;
    display: flex;
    color: #a7acd0;
    font-size: 16px;
    line-height: 18px;
    border-bottom: 1px #2f395a solid;
    div {
      // width: 100%;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px 5px;
    }
    .title_name {
      color: #ffffff;
      text-decoration: underline;
      cursor: pointer;
    }
    .title_name:hover {
      color: #01fcff;
    }
  }
  .table-tr:hover {
    background: #1e347f;
  }
}
#addSelect .ivu-input-default {
  color: #fff !important;
}
#addSelect .ivu-icon-ios-close-circle {
  color: #fff !important;
}
</style>
<!-- 无限下拉样式 -->
<style>
.toast-company {
  height: 294px;
}
.toast-company .ivu-scroll-container {
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.ivu-scroll-container .ivu-scroll-loader:first-child {
  display: none;
}
.clickDetail {
  cursor: pointer;
}
textarea::-webkit-input-placeholder {
  color: #485aa0;
  text-align: left;
}
.ivu-date-picker-cells {
  color: #333 !important;
}
.ivu-date-picker-header-label {
  color: #333 !important;
}
.ivu-date-picker-cells-cell-prev-month {
  color: red !important;
}
</style>
