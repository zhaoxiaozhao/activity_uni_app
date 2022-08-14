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
      isUpdate: false,
      isLogin: false,
      userInfo: {},
      authInfo: {},
      nickName: "",
      gender: 0,
      avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
    };
  },
  computed: {},
  onLoad(e) {
    this.userInfo = common_vendor.index.getStorageSync("userInfo") || {};
    this.authInfo = common_vendor.index.getStorageSync("authInfo");
    if (!this.userInfo.token)
      this.login();
    let { user } = this.userInfo;
    if (user) {
      this.avatarUrl = user.avatar;
      this.nickName = user.nickName;
      this.gender = user.gender;
      this.isUpdate = true;
    }
  },
  onUnload() {
  },
  methods: {
    getToken(e, msg) {
      var that = this;
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D"
      });
      common_vendor.index.login({
        provider: "weixin",
        success: function(loginRes) {
          api_api.login({
            code: loginRes.code
          }).then((res) => {
            if (res.data.statusCode == 0) {
              that.$set(that.userInfo, "user", res.data.data.userInfo);
              that.$set(that.userInfo, "token", res.data.data.token);
              common_vendor.index.setStorageSync("userInfo", that.userInfo);
              if (res.data.data.isRegister) {
                that.isLogin = true;
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
                  common_vendor.index.navigateTo({
                    url: `/pages/index/index`
                  });
                }
              } else {
                common_vendor.index.hideLoading();
              }
            } else {
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none",
                duration: 3e3
              });
              return;
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
    async register() {
      var that = this;
      let registerWxUserInfo = {
        Avatar: that.avatarUrl,
        NickName: that.nickName,
        Gender: that.gender
      };
      api_api.register(registerWxUserInfo).then((res) => {
        common_vendor.index.hideLoading();
        if (res.data.statusCode == 0) {
          common_vendor.index.showToast({
            title: res.data.message,
            icon: "none",
            duration: 1500
          });
          that.$set(that.userInfo, "user", res.data.data.userInfo);
          common_vendor.index.setStorageSync("userInfo", that.userInfo);
          common_vendor.index.navigateTo({
            url: `/pages/index/index`
          });
        }
      });
    },
    cancle() {
      common_vendor.index.navigateBack();
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
    chooseImage() {
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
    changeGender(e) {
      this.gender = e.detail.value;
    },
    upload(imgPaths) {
      var that = this;
      common_vendor.index.showToast({
        icon: "loading",
        title: "\u6B63\u5728\u4E0A\u4F20"
      });
      that.avatarUrl = imgPaths[0];
      common_vendor.index.uploadFile({
        url: api_api.uploadURL,
        filePath: imgPaths[0],
        name: "file",
        success: function(res) {
          debugger;
          if (res.statusCode == 200) {
            var data = JSON.parse(res.data);
            that.avatarUrl = data.data.url;
          } else {
            if (res.message) {
              common_vendor.index.showToast({
                title: res.message,
                mask: true,
                icon: "none",
                duration: 2e3
              });
              return;
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
    b: common_vendor.o(($event) => $options.chooseImage()),
    c: $data.nickName,
    d: common_vendor.o(($event) => $data.nickName = $event.detail.value),
    e: common_vendor.o((...args) => $options.changeGender && $options.changeGender(...args)),
    f: $data.isUpdate
  }, $data.isUpdate ? {
    g: common_vendor.o((...args) => $options.register && $options.register(...args))
  } : {
    h: common_vendor.o((...args) => $options.register && $options.register(...args))
  }, {
    i: common_vendor.o((...args) => $options.cancle && $options.cancle(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Source/Repos/activity_uni_app/activity_uni_app/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
