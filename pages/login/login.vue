<template>
  <view class="login_box">
    <image class="avatar-wrapper" :src="avatarUrl" @click="selectImage()" mode="aspectFill" ></image>
    <input type="nickname" class="nick-input" placeholder="请输入昵称" />
    <button v-if="!authInfo && canIUseGetUserProfile" class="login_btn green" @click="getuserProfile">
      微信授权用户信息
    </button>
    <button v-else-if="!authInfo && !canIUseGetUserProfile" class="login_btn green" open-type="getUserInfo" @getuserinfo="getuserinfo">
      微信授权用户信息
    </button>
    <button v-else-if="!userInfo.isMember" class="login_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      授权登录
    </button>
    <button v-else class="login_btn" @click="login">授权登录</button>
    <view class="cancle" :class="{ green: !authInfo }" @click="cancle">取消</view>
    <text class="tip" v-if="!authInfo">请完成微信授权以继续使用</text>
    <text class="tip" v-else>为了体验更多内容并确保账户安全，请先登录</text>
    <text class="varsions" v-if="version">{{ version }}</text>
  </view>
</template>

<script>
import { WxLogin, uploadURL, download } from "@/api/api.js";
//import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      optionUrl: "",
      isLogin: false,
      userInfo: {},
      authInfo: null,
      getCodeInfo: null,
      storeInfo: {},
      canIUseGetUserProfile: false,
      avatarUrl:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    };
  },
  computed: {
    //...mapGetters(["store", "storeConfig"]),
    //version() {
    //  return getApp().globalData.version;
    //},
  },
  onLoad(e) {
    // this.userInfo = uni.getStorageSync("uerInfo") || {};
    // this.authInfo = uni.getStorageSync("authInfo");
    // this.optionUrl = e.curUrl;
    // this.canIUseGetUserProfile = wx.canIUse("getUserProfile");
  },
  onUnload() {
    // getApp().globalData.isExpired = false;
    // var that = this;
    // if (
    //   !that.isLogin &&
    //   (that.optionUrl == "pages/my/my" || that.optionUrl == "pages/cart/cart")
    // ) {
    //   getApp().globalData.toLogin = false;
    //   uni.reLaunch({
    //     url: "/pages/index/index/index",
    //   });
    // }
  },
  methods: {
    //...mapActions(["setStore", "setStoreConfig"]),
    onChooseAvatar(e) {
      debugger;
      this.avatarUrl = e.detail;
    },
    getToken(e, msg) {
      var that = this;
      uni.showLoading({
        title: "登录中",
      });
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          WxLogin({
            code: loginRes.code,
          })
            .then((res) => {
              if (res.data.error) {
                uni.showToast({
                  title: res.data.error.message,
                  icon: "none",
                  duration: 3000,
                });
                return;
              }
              that.isLogin = true;
              that.$set(that.userInfo, "token", res.data.value.Token);
              uni.setStorageSync("uerInfo", that.userInfo);
              that.setDefaltStore(res.data.value);
              if (res.data.value.IsMember) {
                uni.hideLoading();
                if (msg) {
                  uni.showToast({
                    title: msg,
                    icon: "none",
                    duration: 1500,
                  });
                } else {
                  uni.showToast({
                    title: "登录成功",
                    icon: "success",
                    duration: 1500,
                  });
                }
              } else {
                that.registerWxUser(e);
              }
            })
            .catch((err) => {
              uni.hideLoading();
              uni.showToast({
                title: "登录失败，请重试",
                icon: "none",
                duration: 3000,
              });
            });
        },
        fail: function (res) {
          uni.hideLoading();
          uni.showToast({
            title: "登录失败，请重试",
            icon: "none",
            duration: 3000,
          });
        },
      });
    },
    async registerWxUser(e) {
      var that = this;
      let { encryptedData, iv } = e.detail;
      // 获取保存的门店ID
      let shopId = uni.getStorageSync("shopId");
      // 获取二维码信息保存 如果成为分销员增加自己信息 只是注册成为会员只要上级分销员信息
      let codeInfo = uni.getStorageSync("codeInfo") || {};
      let queryScene = getApp().globalData.queryScene;
      if (!codeInfo.sid && queryScene) {
        // 如果url参数信息没获取到 重新获取
        const result = await getByKey({
          key: queryScene,
        });
        if (result.data.value) {
          let arr = result.data.value.split("&");
          codeInfo = {};
          let name, val;
          arr.forEach((e) => {
            name = e.split("=")[0];
            val = e.split("=")[1];
            codeInfo[name] = val;
          });
          uni.setStorageSync("codeInfo", codeInfo);
        }
      }
      let keyInfo = {
        Target: 0,
        TargetType: 0,
        StoreId: 0,
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
        ExtendInfo1: keyInfo,
      };
      registerWxUser(registerWxUserInfo).then((res) => {
        uni.hideLoading();
        if (res.data.error) {
          uni.removeStorageSync("uerInfo");
          that.userInfo = {};
          if (res.data.error.message.indexOf("授权用户信息失败") != -1) {
            uni.removeStorageSync("authInfo");
            that.authInfo = null;
          }
          uni.showToast({
            title: res.data.error.message,
            icon: "none",
            duration: 3000,
          });
          return;
        }
        if (that.userInfo.isMember) {
          uni.showToast({
            title: "登录成功",
            icon: "none",
            duration: 1500,
          });
        }
        that.setDefaltStore(res.data.value);
        if (that.userInfo.isMember) {
          uni.showToast({
            title: "登录成功",
            icon: "none",
            duration: 1500,
          });
          setTimeout(function () {
            uni.navigateBack();
          }, 1500);
        } else {
          that.getToken(e, res.data.value.message);
        }
      });
    },
    cancle() {
      let that = this;
      if (
        !that.isLogin &&
        (that.optionUrl == "pages/my/my" || that.optionUrl == "pages/cart/cart")
      ) {
        getApp().globalData.toLogin = false;
        uni.reLaunch({
          url: "/pages/index/index",
        });
      } else {
        uni.navigateBack();
      }
    },
    login() {
      this.getToken();
    },
    //微信接口
    getuserProfile(e) {
      wx.getUserProfile({
        desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async (res) => {
          if ((res.errMsg = "getUserProfile:ok")) {
            this.authInfo = {};
            this.$set(this.authInfo, "avatarUrl", res.userInfo.avatarUrl);
            this.$set(this.authInfo, "nickName", res.userInfo.nickName);
            this.$set(this.authInfo, "iv", res.iv);
            this.$set(this.authInfo, "encryptedData", res.encryptedData);
            uni.setStorageSync("authInfo", this.authInfo);
          } else {
            uni.showToast({
              icon: "none",
              title: "授权失败,请重试",
              duration: 2000,
            });
          }
        },
        error(e) {},
      });
    },
    //微信接口
    getuserinfo(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        this.authInfo = {};
        this.$set(this.authInfo, "avatarUrl", e.detail.userInfo.avatarUrl);
        this.$set(this.authInfo, "nickName", e.detail.userInfo.nickName);
        this.$set(this.authInfo, "iv", e.detail.iv);
        this.$set(this.authInfo, "encryptedData", e.detail.encryptedData);
        uni.setStorageSync("authInfo", this.authInfo);
      } else {
        uni.showToast({
          icon: "none",
          title: "授权失败,请重试",
          duration: 2000,
        });
      }
    },
    getPhoneNumber(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        this.getToken(e);
      } else {
        uni.showToast({
          icon: "none",
          title: "未获取到手机号,请重试",
          duration: 2000,
        });
      }
    },
    selectImage() {
      //添加照片
      let that = this
      let tempFilePaths
      uni.chooseImage({
        count: 1, // 可选张数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          tempFilePaths = res.tempFilePaths
         that.upload(tempFilePaths)
        }
      })
    },
    upload(imgPaths) {
      var that = this
      uni.showToast({
        icon: 'loading',
        title: '正在上传'
      })
      debugger
      this.avatarUrl = imgPaths[0];
      uni.uploadFile({
        url: uploadURL,
        filePath: imgPaths[0],
        name: 'file', //示例，使用顺序给文件命名
        success: function (res) {
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data)
            if (data.error) {
              uni.showToast({
                title: data.error,
                mask: true,
                icon: 'none',
                duration: 2000
              })
              return
            } else {
              this.avatarUrl = res.data.url;
            }
          }
        },
        fail: function (e) {
        },
        complete: function (e) {
        }
      })
    }
    // ...mapMutations(["setInfo"]),
  },
};
</script>

<style lang="scss">
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

.login_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-wrapper {
    width: 126rpx;
    height: 126rpx;
    border-radius: 50%;
  }

  .nick-input {
    font-size: 32rpx;
  }

  .headerPhotoBox {
    border-radius: 50%;
    overflow: hidden;
    width: 126rpx;
    height: 126rpx;
    margin-top: 250rpx;
    margin-bottom: 26rpx;
  }

  .login_btn {
    margin-top: 120rpx;
    background: red;
    width: 80%;
    color: white;
    font-size: 30rpx;
    line-height: 88rpx;

    &.green {
      background-color: #52a936;
    }
  }

  .tip {
    color: #9b9b9b;
    font-size: 24rpx;
    position: fixed;
    bottom: 100rpx;
    text-align: center;
  }

  .varsions {
    color: #9b9b9b;
    font-size: 24rpx;
    position: fixed;
    bottom: 50rpx;
    text-align: center;
  }

  .cancle {
    text-align: center;
    margin-top: 40rpx;
    color: red;

    &.green {
      color: #52a936;
    }
  }
}
</style>