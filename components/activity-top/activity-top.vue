<template>
  <view class="top">
    <view class="left">
      <text class="location">远大都市风景一期</text>
      <text class="iconfont icon-location"></text>
      <text class="distance">0.2km</text>
    </view>
    <view class="plus">
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

<style lang="scss" scoped>
.top {
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  margin-top: 10px;
  margin-left: 10px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: left;
    width: 50%;
    .location {
      font-size: 14px;
    }
    .icon-location {
      padding-left: 5px;
    }
    .distance {
      font-size: 10px;
      margin-top: 5px;
      padding-left: 5px;
    }
  }

  .plus {
    display: flex;
    width: 50%;
    justify-content: flex-end;
    margin-right: 10px;
    .icon-add {
      font-size: 20px;
    }
  }
}
</style>
