<template>
  <view class="login-box">
    <image
      class="avatar-wrapper"
      :src="avatarUrl"
      @click="chooseImage()"
      mode="aspectFill"
    ></image>
    <view v-if="isExpired">
      {{ nickName }}
    </view>
    <input
      v-else
      type="text"
      class="nick-input"
      v-model="nickName"
      placeholder="请输入昵称"
    />
    <view class="gender-box" v-if="!isExpired">
      <radio-group @change="changeGender">
        <label>
          <radio value="1" :checked="gender === 1" /><text>男</text>
        </label>
        <label>
          <radio class="gender-famale" value="0" :checked="gender === 0" /><text
            >女</text
          >
        </label>
      </radio-group>
    </view>
    <button
      class="login_btn"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      v-if="phone == null && !isExpired"
    >
      授权手机
    </button>
    <button
      class="login_btn"
      v-if="isUpdate && !isExpired"
      :class="{ green: true }"
      @click="register"
    >
      更新
    </button>
    <button
      class="login_btn"
      v-else-if="!isUpdate && !isExpired"
      :class="{ green: true }"
      @click="register"
    >
      注册
    </button>

    <button
      class="login_btn"
      v-if="isExpired"
      :class="{ green: true }"
      @click="login"
    >
      登录
    </button>

    <view class="cancle" :class="{ green: true }" @click="cancle">取消</view>
  </view>
</template>

<script>
import {
  register,
  login,
  getUserPhone,
  uploadURL,
  downloadURL,
} from "@/api/api.js";
export default {
  data() {
    return {
      isUpdate: false,
      isLogin: false,
      isExpired: false,
      userInfo: {},
      authInfo: {},
      nickName: "",
      phone: null,
      gender: 0,
      avatarUrl:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    };
  },
  computed: {},
  onLoad(e) {
    this.isLogin = getApp().globalData.isLogin;
    this.isExpired = getApp().globalData.isExpired;
    this.userInfo = uni.getStorageSync("userInfo") || {};
    this.authInfo = uni.getStorageSync("authInfo");
    if (!this.userInfo.user) this.login();
    let { user } = this.userInfo;
    if (user) {
      this.avatarUrl = user.avatar;
      this.nickName = user.nickName;
      this.gender = user.gender;
      this.isUpdate = true;
    }
  },
  onUnload() {},
  methods: {
    getToken(e, msg) {
      var that = this;
      uni.showLoading({
        title: "登录中",
      });
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          login({
            code: loginRes.code,
          })
            .then((res) => {
              if (res.data.statusCode == 0) {
                that.$set(that.userInfo, "user", res.data.data.userInfo);
                that.$set(that.userInfo, "token", res.data.data.token);
                uni.setStorageSync("userInfo", that.userInfo);
                uni.setStorageSync("accessToken", res.data.data.accessToken);
                if (res.data.data.isRegister) {
                  that.isLogin = true;
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
                    uni.navigateTo({
                      url: `/pages/index/index`,
                    });
                  }
                } else {
                  uni.hideLoading();
                  uni.showToast({
                    title: "登录失败，未注册",
                    icon: "none",
                    duration: 3000,
                  });
                }
              } else {
                uni.showToast({
                  title: res.data.message,
                  icon: "none",
                  duration: 3000,
                });
                return;
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
    async register() {
      var that = this;
      //验证手机号是否授权
      if (that.phone === null) {
        uni.showToast({
          title: "请授权手机号",
          icon: "none",
          duration: 3000,
        });
      }

      debugger

      let registerWxUserInfo = {
        Avatar: that.avatarUrl,
        NickName: that.nickName === "" ? "undefined" : that.nickName,
        Gender: that.gender,
        Phone: that.phone,
      };
      register(registerWxUserInfo).then((res) => {
        uni.hideLoading();
        if (res.data.statusCode == 0) {
          uni.showToast({
            title: res.data.message,
            icon: "none",
            duration: 1500,
          });
          that.login();
        } else {
          uni.hideLoading();
          uni.showToast({
            title: "注册失败",
            icon: "none",
            duration: 3000,
          });
        }
      });
    },
    cancle() {
      uni.navigateBack();
    },
    login() {
      this.getToken();
    },
    getuserProfile(e) {
      wx.getUserProfile({
        desc: "用于完善会员资料",
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
      let that = this;
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        console.log(e.detail.code);
        getUserPhone({ code: e.detail.code }).then((res) => {
          if (res.data.statusCode == 0) {
            that.phone = res.data.data.phone;
          }
        });
      } else {
        uni.showToast({
          icon: "none",
          title: "未获取到手机号,请重试",
          duration: 2000,
        });
      }
    },
    chooseImage() {
      let that = this;
      let tempFilePaths;
      uni.chooseImage({
        count: 1, // 可选张数
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          tempFilePaths = res.tempFilePaths;
          that.upload(tempFilePaths);
        },
      });
    },
    changeGender(e) {
      this.gender = e.detail.value;
    },
    upload(imgPaths) {
      var that = this;
      uni.showToast({
        icon: "loading",
        title: "正在上传",
      });
      that.avatarUrl = imgPaths[0];
      uni.uploadFile({
        url: uploadURL,
        filePath: imgPaths[0],
        name: "file", //示例，使用顺序给文件命名
        success: function (res) {
          if (res.statusCode == 200) {
            var data = JSON.parse(res.data);
            that.avatarUrl = data.data.url;
          } else {
            if (res.message) {
              uni.showToast({
                title: res.message,
                mask: true,
                icon: "none",
                duration: 2000,
              });
              return;
            }
          }
        },
        fail: function (e) {},
        complete: function (e) {},
      });
    },
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

.login-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-wrapper {
    width: 126rpx;
    height: 126rpx;
    border-radius: 50%;
    margin-top: 10px;
  }

  .nick-input {
    font-size: 32rpx;
    margin-top: 30rpx;
  }

  .gender-box {
    margin-top: 30rpx;
    align-items: flex-end;

    .gender-famale {
      margin-left: 30rpx;
    }
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