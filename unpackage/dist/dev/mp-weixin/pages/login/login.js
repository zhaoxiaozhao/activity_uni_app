"use strict";
var common_vendor = require("../../common/vendor.js");
var api_api = require("../../api/api.js");
require("../../api/base.js");
require("../../utils/request/index.js");
require("../../utils/request/request.js");
require("../../utils/utils.js");
const _sfc_main = {
  data() {
    return {
      optionUrl: "",
      isLogin: false,
      userInfo: {},
      authInfo: null,
      getCodeInfo: null,
      storeInfo: {},
      canIUseGetUserProfile: false,
      avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
    };
  },
  computed: {},
  onLoad(e) {
  },
  onUnload() {
  },
  methods: {
    onChooseAvatar(e) {
      debugger;
      this.avatarUrl = e.detail;
    },
    getToken(e, msg) {
      var that = this;
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D"
      });
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          api_api.WxLogin({
            code: loginRes.code
          }).then((res) => {
            if (res.data.error) {
              common_vendor.index.showToast({
                title: res.data.error.message,
                icon: "none",
                duration: 3e3
              });
              return;
            }
            that.isLogin = true;
            that.$set(that.userInfo, "token", res.data.value.Token);
            common_vendor.index.setStorageSync("uerInfo", that.userInfo);
            that.setDefaltStore(res.data.value);
            if (res.data.value.IsMember) {
              common_vendor.index.hideLoading();
              if (msg) {
                common_vendor.index.showToast({
                  title: msg,
                  icon: "none",
                  duration: 1500
                });
              } else {
                common_vendor.index.showToast({
                  title: "\u767B\u5F55\u6210\u529F",
                  icon: "success",
                  duration: 1500
                });
              }
            } else {
              that.registerWxUser(e);
            }
          }).catch((err) => {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
              icon: "none",
              duration: 3e3
            });
          });
        },
        fail: function(res) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
            icon: "none",
            duration: 3e3
          });
        }
      });
    },
    async registerWxUser(e) {
      var that = this;
      let { encryptedData, iv } = e.detail;
      let shopId = common_vendor.index.getStorageSync("shopId");
      let codeInfo = common_vendor.index.getStorageSync("codeInfo") || {};
      let queryScene = getApp().globalData.queryScene;
      if (!codeInfo.sid && queryScene) {
        const result = await getByKey({
          key: queryScene
        });
        if (result.data.value) {
          let arr = result.data.value.split("&");
          codeInfo = {};
          let name, val;
          arr.forEach((e2) => {
            name = e2.split("=")[0];
            val = e2.split("=")[1];
            codeInfo[name] = val;
          });
          common_vendor.index.setStorageSync("codeInfo", codeInfo);
        }
      }
      let keyInfo = {
        Target: 0,
        TargetType: 0,
        StoreId: 0
      };
      keyInfo.Target = codeInfo.tid;
      keyInfo.TargetType = codeInfo.t;
      keyInfo.StoreId = codeInfo.sid;
      keyInfo.NearbyStoreId = shopId;
      let registerWxUserInfo = {
        PhoneEncryptedData: encryptedData,
        PhoneIV: iv,
        EncryptedData: this.authInfo.encryptedData,
        IV: this.authInfo.iv,
        ExtendInfo1: keyInfo
      };
      registerWxUser(registerWxUserInfo).then((res) => {
        common_vendor.index.hideLoading();
        if (res.data.error) {
          common_vendor.index.removeStorageSync("uerInfo");
          that.userInfo = {};
          if (res.data.error.message.indexOf("\u6388\u6743\u7528\u6237\u4FE1\u606F\u5931\u8D25") != -1) {
            common_vendor.index.removeStorageSync("authInfo");
            that.authInfo = null;
          }
          common_vendor.index.showToast({
            title: res.data.error.message,
            icon: "none",
            duration: 3e3
          });
          return;
        }
        if (that.userInfo.isMember) {
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u6210\u529F",
            icon: "none",
            duration: 1500
          });
        }
        that.setDefaltStore(res.data.value);
        if (that.userInfo.isMember) {
          common_vendor.index.showToast({
            title: "\u767B\u5F55\u6210\u529F",
            icon: "none",
            duration: 1500
          });
          setTimeout(function() {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          that.getToken(e, res.data.value.message);
        }
      });
    },
    cancle() {
      let that = this;
      if (!that.isLogin && (that.optionUrl == "pages/my/my" || that.optionUrl == "pages/cart/cart")) {
        getApp().globalData.toLogin = false;
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      } else {
        common_vendor.index.navigateBack();
      }
    },
    login() {
      this.getToken();
    },
    getuserProfile(e) {
      wx.getUserProfile({
        desc: "\u7528\u4E8E\u5B8C\u5584\u4F1A\u5458\u8D44\u6599",
        success: async (res) => {
          if (res.errMsg = "getUserProfile:ok") {
            this.authInfo = {};
            this.$set(this.authInfo, "avatarUrl", res.userInfo.avatarUrl);
            this.$set(this.authInfo, "nickName", res.userInfo.nickName);
            this.$set(this.authInfo, "iv", res.iv);
            this.$set(this.authInfo, "encryptedData", res.encryptedData);
            common_vendor.index.setStorageSync("authInfo", this.authInfo);
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u6388\u6743\u5931\u8D25,\u8BF7\u91CD\u8BD5",
              duration: 2e3
            });
          }
        },
        error(e2) {
        }
      });
    },
    getuserinfo(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        this.authInfo = {};
        this.$set(this.authInfo, "avatarUrl", e.detail.userInfo.avatarUrl);
        this.$set(this.authInfo, "nickName", e.detail.userInfo.nickName);
        this.$set(this.authInfo, "iv", e.detail.iv);
        this.$set(this.authInfo, "encryptedData", e.detail.encryptedData);
        common_vendor.index.setStorageSync("authInfo", this.authInfo);
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u6388\u6743\u5931\u8D25,\u8BF7\u91CD\u8BD5",
          duration: 2e3
        });
      }
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        this.getToken(e);
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u672A\u83B7\u53D6\u5230\u624B\u673A\u53F7,\u8BF7\u91CD\u8BD5",
          duration: 2e3
        });
      }
    },
    selectImage() {
      let that = this;
      let tempFilePaths;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          tempFilePaths = res.tempFilePaths;
          that.upload(tempFilePaths);
        }
      });
    },
    upload(imgPaths) {
      common_vendor.index.showToast({
        icon: "loading",
        title: "\u6B63\u5728\u4E0A\u4F20"
      });
      debugger;
      this.avatarUrl = imgPaths[0];
      common_vendor.index.uploadFile({
        url: api_api.uploadURL,
        filePath: imgPaths[0],
        name: "file",
        success: function(res) {
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data);
            if (data.error) {
              common_vendor.index.showToast({
                title: data.error,
                mask: true,
                icon: "none",
                duration: 2e3
              });
              return;
            } else {
              this.avatarUrl = res.data.url;
            }
          }
        },
        fail: function(e) {
        },
        complete: function(e) {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.avatarUrl,
    b: common_vendor.o(($event) => $options.selectImage()),
    c: !$data.authInfo && $data.canIUseGetUserProfile
  }, !$data.authInfo && $data.canIUseGetUserProfile ? {
    d: common_vendor.o((...args) => $options.getuserProfile && $options.getuserProfile(...args))
  } : !$data.authInfo && !$data.canIUseGetUserProfile ? {
    f: common_vendor.o((...args) => $options.getuserinfo && $options.getuserinfo(...args))
  } : !$data.userInfo.isMember ? {
    h: common_vendor.o((...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args))
  } : {
    i: common_vendor.o((...args) => $options.login && $options.login(...args))
  }, {
    e: !$data.authInfo && !$data.canIUseGetUserProfile,
    g: !$data.userInfo.isMember,
    j: !$data.authInfo ? 1 : "",
    k: common_vendor.o((...args) => $options.cancle && $options.cancle(...args)),
    l: !$data.authInfo
  }, !$data.authInfo ? {} : {}, {
    m: _ctx.version
  }, _ctx.version ? {
    n: common_vendor.t(_ctx.version)
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Source/Repos/activity_uni_app/activity_uni_app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
