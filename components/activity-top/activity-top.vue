<template>
  <view class="uni-flex uni-row" style="height:20px">
    <view class="flex-item">
      <text class="address-text">远大都市风景一期</text>
      <text class="iconfont icon-location" style="padding-left:10rpx;"></text>
      <text class="address-unit" style="padding-left:10rpx;font-size:16rpx;">0.2km</text>
    </view>
    <view class="flex-item right">
      <text class="iconfont icon-add"></text>
    </view>
  </view>
</template>

<script>
export default {
  name: "activitytop",
  data() {
    return {
      locationIcon: "../../static/icons/Location.png",
      plusIcon: "../../static/icons/Plus.png",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.flex-item {
  text-align: center;
  margin-top: 5px;
  margin-left: 0px;
  &.right{
      text-align: right;
      padding-right: 40rpx;
  }
}
.box {
  display: flex;
}
.address {
  display: flex;
  flex-direction: row;
  align-items: left;

  .address-text {
    font-size: 14px;
  }

  .address-icon {
    width: 24rpx;
    height: 24rpx;
    padding-top: 10rpx;
    margin-left: 10rpx;
  }

  .address-unit {
    font-size: 14rpx;
    padding-top: 12rpx;
  }
}

.plus-bar {
  display: flex;
  .plus-icon {
    width: 24rpx;
    height: 24rpx;
  }
}
</style>
