<template>
  <view class="box">
    <view class="address">
      <span class="address-text">远大都市风景一期</span>
      <image class="address-icon" :src="locationIcon" />
      <span class="address-unit">0.2km</span>
    </view>
    <view class="plus-bar">
      <image class="plus-icon" :src="plusIcon" />
    </view>
  </view>
</template>

<script>
export default {
  name: 'activitytop',
  data() {
    return {
      locationIcon:"../../static/icons/Location.png",
      plusIcon:"../../static/icons/Plus.png"
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
.box {
  display:flex;
}
.address {
  display: flex;
  flex-direction:row;
  align-items: left;

  .address-text {
    font-size: 14px;
  }

  .address-icon{
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
