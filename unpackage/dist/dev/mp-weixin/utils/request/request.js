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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var common_vendor = require("../../common/vendor.js");
class Request {
  constructor() {
    __publicField(this, "config", {
      header: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET"
    });
    __publicField(this, "interceptor", {
      request: (cb) => {
        if (cb) {
          this.requestBeforeFun = cb;
        }
      },
      response: (cb, ecb) => {
        if (cb && ecb) {
          this.requestComFun = cb;
          this.requestComFail = ecb;
        }
      }
    });
  }
  static posUrl(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }
  requestBeforeFun(config) {
    return config;
  }
  requestComFun(response) {
    return response;
  }
  requestComFail(response) {
    return response;
  }
  setConfig(f) {
    this.config = f(this.config);
  }
  request(options = {}) {
    options.baseUrl = this.config.baseUrl || "";
    options.dataType = options.dataType || this.config.dataType;
    options.responseType = options.responseType || this.config.responseType;
    options.url = Request.posUrl(options.url) ? options.url : options.baseUrl + options.url;
    options.data = options.data || {};
    options.header = options.header || this.config.header;
    options.method = options.method || this.config.method;
    return new Promise((resolve, reject) => {
      let next = true;
      let _config = null;
      options.complete = (response) => {
        let statusCode = response.statusCode;
        response.config = _config;
        if (statusCode === 200) {
          response = this.requestComFun(response);
          resolve(response);
        } else {
          response = this.requestComFail(response);
          reject(response);
        }
      };
      let cancel = (t = "handle cancel", config = options) => {
        let err = {
          errMsg: t,
          config
        };
        reject(err);
        next = false;
      };
      _config = __spreadValues({}, this.requestBeforeFun(options, cancel));
      if (!next)
        return;
      common_vendor.index.request(_config);
    });
  }
  get(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "GET"
    }, options));
  }
  post(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "POST"
    }, options));
  }
  put(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "PUT"
    }, options));
  }
  delete(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "DELETE"
    }, options));
  }
  connect(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "CONNECT"
    }, options));
  }
  head(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "HEAD"
    }, options));
  }
  options(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "OPTIONS"
    }, options));
  }
  trace(url, data, options = {}) {
    return this.request(__spreadValues({
      url,
      data,
      method: "TRACE"
    }, options));
  }
}
exports.Request = Request;
