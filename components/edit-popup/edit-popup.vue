<template>
  <view>
    <popup-layer ref="popupRef" :direction="'top'" @closeCallBack="close">
      <view class="content_box">
        <view class="cont">
          <textarea
            v-model="txt"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="请输入"
          ></textarea>
        </view>
        <view class="i_btn">
          <button class="btn" @click.stop="confirm">确认</button>
        </view>
      </view>
    </popup-layer>
  </view>
</template>

<script>
import popupLayer from "@/components/popup-layer/popup-layer.vue";
export default {
  name: "edit-popup",
  components: {
    popupLayer,
  },
  props: {
    content: "",
  },
  data() {
    return {
      txt: "",
      isAdd: false,
      sort: 0,
    };
  },

  methods: {
    close() {
      this.$refs.popupRef.close(); // 或者 boolShow = false
    },
    show() {
      let that = this;
      that.txt = that.content;
      that.$refs.popupRef.show(); // 或者 boolShow = rue
    },
    confirm() {
      let that = this;
      that.close();
      if (that.isAdd) {
        that.$emit("addEvent", { sort: that.sort, value: that.txt });
      } else {
        that.$emit("change", that.txt);
      }
    },
    change(data) {
      let that = this;
      that.txt = data.value;
      that.sort = data.sort + 1;
      that.$refs.popupRef.show();
      that.isAdd = true;
    },
  },
};
</script>

<style lang="scss">
textarea {
  color: black;
  width: 90%;
  margin: 10px 10px 0px 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #673ab7;
  border-radius: 5px;
}
.content_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .i_main {
    flex: 1;
    max-height: 600rpx;
    overflow: auto;
    background-color: #f7f7f7;
  }
  .i_btn {
    background: #f7f7f7;
    padding: 20rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    .btn {
      line-height: 80rpx;
      background-image: linear-gradient(to right, #9e12e4, #950ad5);
      color: #fff;
      border-radius: 10rpx;
    }
  }
}
.evaluate {
  background-color: #fff;
  margin-bottom: 20rpx;
  .head {
    position: relative;
    padding: 20rpx 20rpx;
    display: flex;
    align-items: center;
    .text {
      color: black;
      margin-right: 20rpx;
    }
  }
  .cont {
    padding: 10rpx 20rpx;
    width: 100%;
    box-sizing: border-box;
    // .text-area{
    // 	width: 100%;
    // 	min-height: 100rpx;
    // 	line-height: 2;
    // 	border: 1rpx;
    // }
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
