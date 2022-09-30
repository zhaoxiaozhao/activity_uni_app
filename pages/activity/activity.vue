<template>
  <view class="add-box">
    <view>{{ title }}</view>
    <view
      ><image class="add-img" :src="coverUrl" @click="addImage"></image
    ></view>
    <view class="add-discribe">asdasdasdasdasdasdasdsa</view>
    <view class="avatar-group">
      <view v-for="(item, index) in users" :key="index">
        <image class="avatar-item" :src="item.avatar"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      coverUrl: "../../static/logo.png",
      title: "活动",
      users: [
        { id: 1, avatar: "../../static/1.jpg" },
        { id: 2, avatar: "../../static/2.jpg" },
        { id: 3, avatar: "../../static/3.jpg" },
      ],
    };
  },
  methods: {
    //添加图片
    addImage() {},
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
.add-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  text-align: center;
}
.add-img {
  align-items: center;
}
.add-discribe {
  flex-wrap: wrap;
}
.avatar-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  .avatar-item {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
}
</style>
