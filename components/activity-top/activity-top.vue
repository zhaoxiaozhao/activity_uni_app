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
      <text class="iconfont icon-location" @click="change2"></text>
      <text class="distance">{{ distance }}m</text>
    </view>
  </view>
</template>

<script>
export default {
  name: "activitytop",
  props: {
    idx:0,
    options:[],
    distance:0,
  },
  data() {
    return {
      location: "远大都市风景一区",
      range: this.options,
      value: this.idx,
      distance: this.distance,
    };
  },
  watch: {
    idx(n) {
      debugger;
      this.value = n;
    },
  },
  onload() {},
  methods: {
    change(e) {
      this.$emit("change", e);
      this.value = e;
    },
    change2(e) {
      this.$emit("change2", e);
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
