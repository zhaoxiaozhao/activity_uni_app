<template>
  <view>
    <view class="act-box" v-for="(item, index) in activities" :key="index">
      <view class="act-box-item-1">
        <image class="act-cover" :src="item.coverUrl" @click="addImage"></image>
        <view class="avatar-group">
          <view v-for="(user, index2) in item.users" :key="index2">
            <image class="avatar-item" :src="user.avatar"></image>
          </view>
        </view>
      </view>
      <view class="act-box-item-2">
        <view class="act-time">进行中:{{ item.startTime }}~{{ item.endTime }}</view>
        <view class="act-content">{{ item.content }}</view>
      </view>
    </view>
    <view class="act-boot">
      <image
        class="act-add"
        @click="addActive"
        src="../../static/icons/Plus.png"
      />
    </view>
  </view>
</template>

<script>
import { getActivities } from "@/api/api.js";

export default {
  data() {
    return {
      activities: [
        {
          coverUrl: "../../static/images/4.png",
          title: "徒步活动",
          content:
            "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
          start: "2022-12-25",
          end: "2022-12-26",
          status: "1",
          users: [
            { id: 1, avatar: "../../static/images/1.jpg" },
            { id: 2, avatar: "../../static/images/2.jpg" },
            { id: 3, avatar: "../../static/images/3.jpg" },
          ],
        },
        {
          coverUrl: "../../static/images/4.png",
          title: "徒步活动",
          content:
            "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
          start: "2022-12-25",
          end: "2022-12-26",
          status: "1",
          users: [
            { id: 1, avatar: "../../static/images/1.jpg" },
            { id: 2, avatar: "../../static/images/2.jpg" },
            { id: 3, avatar: "../../static/images/3.jpg" },
          ],
        },
      ],
    };
  },
  onLoad(e) {
    let that = this
    getActivities().then(res => {

      if(res.statusCode == 200){ 
        
        that.activities = res.data.items
      }
    })
  },
  methods: {
    //添加图片
    addImage() {},
    addActive() {
      uni.navigateTo({
        url: `/pages/activity/create`,
      });
    },
  },
};
</script>

<style lang="scss">
.act-box {
  width: 95%;
  display: flex;
  background-color: #2f1f5b;
  border-radius: 15rpx;
  margin: 15rpx;
  .act-box-item-1 {
    margin: 15rpx;
    .act-cover {
      width: 150rpx;
      height: 150rpx;
      border-radius: 15rpx;
    }
    .avatar-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar-item {
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
      }
    }
  }
  .act-box-item-2 {
    flex-grow: 1;
    .act-time {
      font-size: 25rpx;
      color: #fff;
      background-color: #3e276d;
      border-radius: 5rpx;
      padding: 10rpx;
      margin-top: 15rpx;
      margin-right: 15rpx;
    }
    .act-content {
      width: 98%;
      color: #fff;
      font-size: 24rpx;
      margin-left: 5rpx;
      padding-right: 5rpx;
    }
  }
}
.act-boot {
  margin-bottom: 10rpx;
  display: flex;
  justify-content: center;
  .act-add {
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    bottom: 50rpx;
  }
}
</style>
