<template>
  <view>
    <view class="title-box">
      <input
        class="title-input"
        type="text"
        v-if="isEdit"
        @input="onInput"
        :value="title"
      />
      <h3 class="title-h3" v-else>{{ title }}</h3>
      <image
        class="icon-pen"
        @click="editTitle()"
        src="../../static/icons/edit_pen.png"
      ></image>
    </view>
    <view class="cover-box">
      <image class="cover-img" src="../../static/images/4.png" />
    </view>
    <view class="time-box box-margin">
      <label>活动时间：</label>
      <image
        class="size"
        @click="onShowDatePicker('rangetime')"
        src="../../static/icons/date_range.png"
      ></image>
      <label class="font-size">{{ rangetime[0] }} ~ {{ rangetime[1] }}</label>
      <view>
        <mx-date-picker
          :show="showPicker"
          :type="type"
          :value="value"
          :show-tips="true"
          :begin-text="'开始'"
          :end-text="'结束'"
          :show-seconds="true"
          @confirm="onSelected"
          @cancel="onSelected"
        />
      </view>
    </view>
    <view class="location-box box-margin">
      <label>活动地点：</label>
      <image class="size" src="../../static/icons/Location.png" @click="onChooseLocation"></image>
      <label class="font-size">{{location}}</label>
    </view>
    <view class="object-box box-margin">
      <label>活动对象：</label>
    </view>
    <view class="content-box box-margin">
      <label>活动内容：</label>
      <textarea
        class="context-input"
        v-if="isEdit"
        v-model="content"
      ></textarea>
      <p v-else>
        {{ content }}
      </p>
      <image class="icon-pen" src="../../static/icons/edit_pen.png"></image>
    </view>
  </view>
</template>

<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
import { mapKey } from "@/api/base.js";
export default {
  components: {
    MxDatePicker,
  },
  data() {
    return {
      isEdit: false,
      title: "活动标题",
      content:
        "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
      showPicker: false,
      rangetime: ["2023/03/01 14:00", "2023/03/06 13:59"],
      type: "rangetime",
      value: "",
      location:"青龙湖湿地公园"
    };
  },
  onLoad(e) {
    this.getLocation()
  },
  methods: {
    //添加图片
    addImage() {},
    editTitle() {
      this.isEdit = !this.isEdit;
    },
    oninput(e) {
      this.title = e.target.value;
    },
    onShowDatePicker(type) {
      //显示
      this.type = type;
      this.showPicker = true;
      this.value = this[type];
    },
    onSelected(e) {
      //选择
      this.showPicker = false;
      if (e) {
        this[this.type] = e.value;
        //选择的值
        console.log("value => " + e.value);
        //原始的Date对象
        console.log("date => " + e.date);
      }
    },
    onChooseLocation() {
      let that = this
      // 首先，你需要在腾讯地图开放平台申请一个key
      var key = "YOUR_KEY_HERE";
      // 调用uni.chooseLocation方法打开地图选择地址
      uni.chooseLocation({
        success: function (res) {
          var name = res.name;
          var address = res.address;
          var latitude = res.latitude;
          var longitude = res.longitude;
          that.location = res.address;
          console.log(
            "name: " +
              name +
              ", address: " +
              address +
              ", latitude: " +
              latitude +
              ", longitude: " +
              longitude
          );
        },
      });
    },
    getLocation() {
      // 首先，你需要在腾讯地图开放平台申请一个key
      var key = "YOUR_KEY_HERE";
      // 然后，调用uni.getLocation方法获取当前位置的经纬度
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          var latitude = res.latitude;
          var longitude = res.longitude;

          // 使用腾讯地图SDK进行逆地理位置解析
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            success: function (res) {
              this.location = res.result
              console.log(res.result);
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="scss">
.title-box {
  display: flex;
  justify-content: center;
  margin-top: 10rpx;

  .title-input {
    border: 1px solid #fbfbfb;
    border-radius: 5px;
    padding: 5px;
    font-size: 12px;
  }
  .title-input:focus {
    outline: none;
    border-color: #ffaa66;
  }
}

.icon-pen {
  width: 40rpx;
  height: 40rpx;
}

.size {
  width: 40rpx;
  height: 40rpx;
}

.font-size {
  font-size: 10px;
}

.cover-box {
  display: flex;
  justify-content: center;
  margin-top: 10rpx;
  .cover-img {
    width: 334px;
    height: 202px;
  }
}
.box-margin {
  margin-top: 10rpx;
  margin-left: 32rpx;
}

.context-input {
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}
</style>
