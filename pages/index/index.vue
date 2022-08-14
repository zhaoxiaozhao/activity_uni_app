<template>
  <view class="content">
    <button @click="gotoRegister">更新</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {
    let { token } = uni.getStorageSync('userInfo')
    if(!token) {
      uni.navigateTo({
        url: `/pages/login/login`,
      });
    }
  },
  methods: {
    gotoRegister(){
      uni.navigateTo({
        url: `/pages/login/login`,
      });
    }
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
