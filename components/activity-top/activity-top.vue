<template>
  <view class="top">
    <view class="left">
      <uni-data-select
        class="select"
        v-model="value"
        :localdata="range"
        @change="change"
        :clear="false"
      ></uni-data-select>
    </view>
    <view class="location">
      <text class="iconfont icon-location" @click="onChooseLocation"></text>
      <text class="distance">0.1m</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "activitytop",
  props: ["index", "options"],
  data() {
    return {
      location: "远大都市风景一区",
      range: this.options,
      value: this.index,
    };
  },
  onload() {},
  methods: {
    change(e) {
      debugger;
      this.$emit("change", e);
    },
    onChooseLocation() {
      debugger;
      uni.chooseLocation({
        success: function (res) {
          console.log("位置名称：" + res.name);
          console.log("详细地址：" + res.address);
          console.log("纬度：" + res.latitude);
          console.log("经度：" + res.longitude);
        },
      });
    },
  },
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
.location {
  margin-top: 15px;
}
.distance {
  font-size: 12px;
  padding-left: 5rpx;
}
.select {
  width: 200px;
  height: 40px;
  color: #333333;
  background-color: #ffffff;
  border-radius: 5px;
}
</style>
