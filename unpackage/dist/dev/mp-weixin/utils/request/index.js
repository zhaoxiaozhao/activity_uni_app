"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
var utils_request_request = require("./request.js");
var utils_utils = require("../utils.js");
const extConfig = common_vendor.index.getExtConfigSync ? common_vendor.index.getExtConfigSync() : {};
const http = new utils_request_request.Request();
http.setConfig((config) => {
  let templateIds = extConfig.templateId;
  if (extConfig.templateId <= 161) {
    templateIds = 69;
  } else {
    templateIds = extConfig.templateId;
  }
  config.header = {
    corpId: extConfig.corpId,
    version: "v1",
    templateId: templateIds
  };
  return config;
});
http.interceptor.request((config, cancel) => {
  debugger;
  let { token } = common_vendor.index.getStorageSync("userInfo");
  config.header = __spreadValues({}, config.header);
  if (token) {
    config.header.token = token;
  }
  return config;
});
http.interceptor.response((response) => {
  let toLogin = getApp().globalData.toLogin;
  if (response.data && response.data.error && toLogin) {
    if (response.data.error.errorCode) {
      let txt = "";
      let curUrl = utils_utils.getCurrentPageUrl();
      switch (response.data.error.errorCode) {
        case 401:
          txt = "\u767B\u5F55\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55";
          break;
        case 500100:
          txt = "\u4F1A\u5458\u4FE1\u606F\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55";
          break;
      }
      common_vendor.index.showToast({
        title: txt,
        icon: "none",
        duration: 1500
      });
      if (getApp().globalData.isExpired) {
        return response;
      }
      if (response.data.error.errorCode === 401 || response.data.error.errorCode === 500100) {
        getApp().globalData.isExpired = true;
        setTimeout(function() {
          getApp().globalData.toLogin = true;
          var pages = getCurrentPages();
          var page = pages[pages.length - 1];
          if (page && page.route === "pages/login/login") {
            return response;
          }
          common_vendor.index.navigateTo({
            url: `/pages/login/login?curUrl=${curUrl}`
          });
        }, 1500);
      }
      return response;
    }
  }
  return response;
}, (response) => {
  return response;
});
exports.http = http;
