<template>
  <view class="content">
    <!-- <button @click="gotoRegister">更新</button>
    <button @click="gotoActivity">添加活动</button> -->
    <activity-top class="activity-top"></activity-top>
    <view class="uni-flex uni-row">
      <view class="flex-item">
        <title class="news-box-title">最新动态</title>
        <view class="news-box">
          <view class="news-item">
            <view><image class="news-item-avatar" src="../../static/images/1.jpg" /></view>
            <view><label class="news-label uni-bg-green">闲置</label>
            <span class="news-item-content">九成新ps5游戏机...</span></view>
          </view>
          <view class="news-item">
            <view><image class="news-item-avatar" src="../../static/images/2.jpg" /></view>
            <view><label class="news-label uni-bg-dark-blue">活动</label>
            <span class="news-item-content">青龙湖公园露营...</span></view>
          </view>
          <view class="news-item">
            <view><image class="news-item-avatar" src="../../static/images/3.jpg" /></view>
            <view><label class="news-label uni-bg-bright-blue">话题</label>
            <span class="news-item-content">如何看待微博热...</span></view>
          </view>
        </view>
      </view>
      <view class="flex-item box">
        <view class="flex">
          <view><span class="news-box-title">寻宝</span> </view>
          <view><image class="box-logo" :src="treasureLogoUrl"></image></view>
        </view>
        <image class="box-cover" :src="searchCoverUrl"></image>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <view class="flex-item box" @click="gotoActivity">
        <view class="flex">
          <view><span class="news-box-title">活动</span></view>
          <view><image class="box-logo" :src="treasureLogoUrl"></image></view>
        </view>
        <image class="box-cover" :src="activityCoverUrl"></image>
      </view>
    </view>
  </view>
</template>

<script>

import activitytop from '@/components/activity-top/activity-top.vue'

export default {
 components: {
    activitytop
  },
  data() {
    return {
      title: "Hello",
      treasureLogoUrl: "../../static/images/treasure.png",
      activityCoverUrl: "../../static/images/4.png",
      searchCoverUrl:"../../static/images/5.jpg"
    };
  },
  onLoad() {
    let { token } = uni.getStorageSync("userInfo");
    if (!token) {
      uni.navigateTo({
        url: `/pages/login/login`,
      });
    }
  },
  methods: {
    gotoRegister() {
      uni.navigateTo({
        url: `/pages/login/login`,
      });
    }, 
    gotoActivity() {
      uni.navigateTo({
        url: `/pages/activity/activity`,
      });
    },
  },
};
</script>

<style lang="scss">

.activity-top {
  margin-top: 10px;
  margin-left: 10px;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
}

.uni-flex {
  display: flex;
  width: 100%;
}

.uni-row {
  width: 100%;
  height: 300rpx;
  margin-top: 10px;
}

.flex {
  display: flex;
}

.flex-item {
  width: 50%;
  align-items: center;
  margin-top: 20rpx;
  margin-left: 20rpx;
}

.news-box {
  padding-top: 10rpx;
}

.news-box-title {
  font-size: 13px;
}

.news-box-item {
  padding: 5rpx;
}

.news-label {
  border: 1px;
  border-radius: 4px;
  padding: 10rpx;
  font-size: 11px;
  color: white;
  vertical-align: middle;
}

.news-item {
  display: flex;
  margin-bottom: 10px;
}

.news-item-avatar {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    margin-right: 5px;
}

.news-item-content {
  font-size: 11px;
  margin-left: 5px;
}

.uni-bg-green {
  background-color: rgba(14, 248, 52, 1);
}

.uni-bg-dark-blue {
  background-color: rgba(47, 31, 91, 1);
}

.uni-bg-bright-blue {
  background-color: rgba(7, 207, 207, 1);
}

.news-box-title-share {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 259px;
  top: 72px;
  background-image: "./static/icons/Forward.png";
}

.box-logo {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}

.box {
  margin-right: 20rpx;
}

.box-cover {
  width: 100%;
  height: 100%;
  border: 1px;
  border-radius: 10px;
  margin-top: 10rpx;
}
</style>
