"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {
    gotoLogin() {
      common_vendor.index.navigateTo({
        url: `/pages/login/login`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.gotoLogin && $options.gotoLogin(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Source/Repos/activity_uni_app/activity_uni_app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
