<template>
  <view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
      <view class="title-box box-margin">
        <label for="">{{ model.subject }}</label
        ><text
          v-if="!isView"
          class="iconfont icon-pen"
          style="padding-left: 10rpx; font-size: 12px; padding-top: 6px"
          @click="inputDialogToggle"
        ></text>
      </view>
      <view class="cover-box">
        <image class="cover-img" :src="model.coverUrl" />
        <image
          v-if="!isView"
          class="cover-icon"
          src="../../static/icons/Img_box_fill.png"
          @click="changeCover"
        />
      </view>
      <view class="time-box box-margin">
        <label>活动时间：</label>
        <text
          v-if="!isView"
          class="iconfont icon-calendar"
          @click="onShowDatePicker('rangetime')"
          style="padding-right: 10rpx"
        ></text>
        <label class="font-size"
          >{{ model.startTime }} ~ {{ model.endTime }}</label
        >
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
        <text
          class="iconfont icon-location"
          @click="onChooseLocation"
          style="padding-right: 10rpx"
        ></text>
        <label class="font-size">{{ model.address }}</label>
      </view>
      <view class="location-box box-margin">
        <view
          class="uni-flex uni-row"
          v-for="item in model.activityUsers"
          :key="item.id"
        >
          <view class="flex-item"><label>活动对象：</label></view>
          <view class="flex-item">
            <button
              open-type="share"
              style="
                width: 30px;
                height: 30px;
                line-height: 30px;
                padding: inherit;
                background-color: transparent;
                border: none;
              "
            >
              <text class="iconfont icon-share1" style="font-size: 16px"></text>
            </button>
          </view>
          <view class="flex-item">
            <image class="news-item-avatar" :src="item.user.avatar" />
          </view>
        </view>
      </view>
      <view class="content-box box-margin">
        <label>活动内容：</label>
        <text class="font-size"
          style="
            padding-top: 10rpx;
            padding-right: 20rpx;
            line-height: 200%;
          "
        >
          {{ model.content }}
          <text
            v-if="!isView"
            class="iconfont icon-pen"
            style="padding-left: 5rpx; font-size: 12px; padding-top: 6px"
            @click="editContent"
          ></text
        ></text>
      </view>
      <view class="add-box box-margin" v-if="listLength == 0 && !isView">
        <text class="iconfont icon-add" style="font-size: 26px"></text>
        <text
          class="iconfont icon-text"
          style="font-size: 26px; padding-left: 10rpx"
          @click="addContent(null)"
        ></text>
        <text
          class="iconfont icon-picture"
          style="font-size: 26px; padding-left: 10rpx"
          @click="chooseImage(null)"
        ></text>
      </view>
      <view v-else v-for="item in model.activityAppendices" :key="item.id">
        <view v-if="!isView" class="add-box box-margin">
          <text class="iconfont icon-add" style="font-size: 26px"></text>
          <text
            class="iconfont icon-text"
            style="font-size: 26px; padding-left: 10rpx"
            @click="addContent(item)"
          ></text>
          <text
            class="iconfont icon-picture"
            style="font-size: 26px; padding-left: 10rpx"
            @click="addImage(item)"
          ></text>
          <text
            class="iconfont icon-trash"
            style="font-size: 26px; padding-left: 10rpx"
            @click="deleteItem(item)"
          ></text>
        </view>
        <view class="cover-box" v-if="item.type == 1">
          <image class="cover-img" :src="item.value" />
          <image
            v-if="!isView"
            class="cover-icon"
            src="../../static/icons/Img_box_fill.png"
            @click="changeImage(item)"
          />
        </view>
        <view class="content-box box-margin" v-else>
          <text
          class="font-size"
            style="
              padding-top: 10rpx;
              padding-right: 20rpx;
              line-height: 200%;
            "
          >
            {{ item.value }}
            <text
              v-if="!isView"
              class="iconfont icon-pen"
              style="padding-left: 5rpx; font-size: 12px; padding-top: 6px"
              @click="editContent"
            ></text
          ></text>
        </view>
      </view>

      <view class="page-boot" style="">
        <button
          v-if="!isView"
          type="default"
          style="
            position: fixed;
            bottom: 25rpx;
            left: 38%;
            right: 38%;
            background-color: transparent;
            border: 5rpx solid rgba(255, 255, 255, 1);
            border-radius: 15rpx;
            color: rgba(255, 255, 255, 1);
            font-size: 26rpx;
          "
          @click="create"
        >
          保存
        </button>
        <button
          v-else-if="!isProgress && !model.isAttend"
          type="default"
          style="
            position: fixed;
            bottom: 25rpx;
            left: 38%;
            right: 38%;
            background-color: transparent;
            border: 5rpx solid greenyellow;
            border-radius: 15rpx;
            color: rgba(255, 255, 255, 1);
            font-size: 26rpx;
          "
          @click="addUser"
        >
          报名
        </button>
        <button
          v-else-if="isProgress"
          type="default"
          style="
            position: fixed;
            bottom: 25rpx;
            left: 38%;
            right: 38%;
            background-color: transparent;
            border: 5rpx solid greenyellow;
            border-radius: 15rpx;
            color: rgba(255, 255, 255, 1);
            font-size: 26rpx;
          "
          @click="signature"
        >
          签到
        </button>
        <button
          v-if="!isProgress && model.isAttend"
          type="default"
          style="
            position: fixed;
            bottom: 25rpx;
            left: 38%;
            right: 38%;
            background-color: transparent;
            border: 5rpx solid gray;
            border-radius: 15rpx;
            color: rgba(255, 255, 255, 1);
            font-size: 26rpx;
          "
        >
          已报名<text
            class="iconfont icon-success"
            style="padding-left: 10rpx; font-size: 16px"
          ></text>
        </button>
        <view type="default" style="position: fixed; bottom: 15px; right: 25%">
          <button
            open-type="share"
            style="
              background-color: transparent;
            "
          >
            <text
              class="iconfont icon-share1"
              style="display: flex; font-size: 16px"
            ></text>
          </button>
        </view>
      </view>
    </scroll-view>
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="活动标题"
        @value="title"
        placeholder="请输入"
        @confirm="dialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>
    <edit-popup
      ref="editPopupRef"
      @change="onContentChange"
      @addEvent="onAddContent"
      :content="content"
    ></edit-popup>
  </view>
</template>

<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
import editPopup from "@/components/edit-popup/edit-popup.vue";
import { mapKey } from "@/api/base.js";
import {
  uploadURL,
  downloadURL,
  createActivity,
  getActivity,
  addUser,
} from "@/api/api.js";

export default {
  components: {
    MxDatePicker,
    editPopup,
  },
  data() {
    return {
      isView: false,
      isEdit: false,
      isProgress: false,

      userId: 0,
      showPicker: false,
      type: "rangetime",
      rangetime: ["2023/03/01 14:00", "2023/03/06 13:59"],
      value: "",
      model: {
        isAttend: false,
        subject: "活动标题",
        coverUrl: "../../static/images/4.png",
        content:
          "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
        address: "青龙湖湿地公园",
        activityAppendices: [
          {
            id: 0,
            sort: 1,
            type: 1,
            value: "../../static/images/4.png",
          },
          {
            id: 0,
            sort: 2,
            type: 0,
            value:
              "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
          },
          {
            id: 0,
            sort: 3,
            type: 1,
            value: "../../static/images/5.jpg",
          },
        ],
        activityUsers: [],
      },
    };
  },
  onLoad(e) {
    let that = this;
    let { user } = uni.getStorageSync("userInfo");
    that.userId = user.id;

    if (e.id !== undefined && e.id > 0) {
      that.isView = true;
      getActivity(e.id).then((res) => {
        if (res.statusCode == 200) {
          that.model = res.data;
        }
      });
    } else {
      that.getLocation();
    }

    uni.$on("setData", (res) => {
      console.log(res.content);
    });
  },
  onShareAppMessage(res) {
    if (res.from === "button") {
      //this.$refs.sharebox.close();
    }
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    return {
      title: this.model.subject,
      path: `pages/activity/create?id=${this.model.id}`,
      imageUrl: this.model.coverUrl,
    };
  },
  computed: {
    listLength() {
      return this.model.activityAppendices.length;
    },
  },
  methods: {
    addImageCallBack(data) {
      let that = this;
      that.model.activityAppendices.forEach((element) => {
        if ((element.sort = data.sort)) {
          element.value = data;
        }
      });
    },
    chooseImage(data, type) {
      let that = this;
      let tempFilePaths;
      uni.chooseImage({
        count: 1, // 可选张数
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          tempFilePaths = res.tempFilePaths;
          that.upload(tempFilePaths, data, type);
        },
      });
    },
    //添加图片
    addImage(data) {
      this.chooseImage(data, 0);
    },
    //重新上传图片
    changeImage(data) {
      this.chooseImage(data, 1);
    },
    //更改封面
    changeCover() {
      this.chooseImage(null, 2);
    },
    editTitle() {
      this.isEdit = !this.isEdit;
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    dialogInputConfirm(val) {
      uni.showLoading({
        title: "3秒后会关闭",
      });
      let that = this;
      setTimeout(() => {
        uni.hideLoading();
        console.log(val);
        that.model.subject = val;
        // 关闭窗口后，恢复默认内容
        this.$refs.inputDialog.close();
      }, 3000);
    },
    editContent() {
      this.$refs.editPopupRef.show();
    },
    addContent(data) {
      this.$refs.editPopupRef.change({
        sort: data == null ? 1 : data.sort,
        value: "请输入",
      });
    },
    deleteItem(data) {
      let that = this;
      var list2 = [];
      that.model.activityAppendices.forEach((element) => {
        if (element.sort != data.sort) {
          list2.push(element);
        }
      });
      that.model.activityAppendices = list2;
    },
    onAddContent(data) {
      let that = this;
      let list2 = [];

      if (that.model.activityAppendices.length === 0) {
        that.model.activityAppendices.push({
          id: 0,
          sort: data.sort,
          type: 0,
          value: data.value,
        });
        return;
      }

      that.model.activityAppendices.forEach((element) => {
        if (element.sort >= data.sort) {
          element.sort += 1;
        }
        list2.push(element);
      });
      list2.push({
        id: 0,
        sort: data.sort,
        type: 0,
        value: data.value,
      });
      list2.sort(function (a, b) {
        return a.sort - b.sort;
      });

      that.model.activityAppendices = list2;
    },
    onContentChange(data) {
      let that = this;
      that.model.content = data;
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
      let that = this;
      // 首先，你需要在腾讯地图开放平台申请一个key
      var key = "YOUR_KEY_HERE";
      // 调用uni.chooseLocation方法打开地图选择地址
      uni.chooseLocation({
        success: function (res) {
          var name = res.name;
          var address = res.address;
          var latitude = res.latitude;
          var longitude = res.longitude;
          that.model.address = res.address;
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
      let that = this;
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
              that.model.address = res.result;
              console.log(res.result);
            },
          });
        },
      });
    },
    upload(imgPaths, data, type) {
      var that = this;
      uni.showToast({
        icon: "loading",
        title: "正在上传",
      });
      uni.uploadFile({
        url: uploadURL,
        filePath: imgPaths[0],
        name: "file", //示例，使用顺序给文件命名
        success: function (res) {
          if (res.statusCode == 200) {
            var data2 = JSON.parse(res.data);
            if (type == 0) {
              //add image
              that.model.activityAppendices.push({
                id: 0,
                sort: data !== null ? data.sort : 0,
                type: 1,
                value: data2.data.url,
              });
            } else if (type == 1) {
              //change image
              that.model.activityAppendices.forEach((element) => {
                if (element.sort == data.sort) {
                  element.value = data2.data.url;
                }
              });
            } else {
              //change master cover
              that.model.coverUrl = data2.data.url;
            }
          } else {
            if (res.message) {
              uni.showToast({
                title: res.message,
                mask: true,
                icon: "none",
                duration: 2000,
              });
              return;
            }
          }
        },
        fail: function (e) {},
        complete: function (e) {},
      });
    },
    create() {
      uni.showLoading({
        title: "保存中",
      });

      let that = this;
      let { user } = uni.getStorageSync("userInfo");
      let model = {
        Subject: that.model.subject,
        CoverUrl: that.model.coverUrl,
        Content: that.model.content,
        StartTime: that.rangetime[0].replaceAll("/", "-") + ":00",
        EndTime: that.rangetime[1].replaceAll("/", "-") + ":00",
        Address: that.model.address,
        ActivityUsers: [],
        ActivityAppendices: that.model.activityAppendices,
        Creator: user.id,
      };
      console.log(model);

      createActivity(model).then((res) => {
        console.log(res);
        uni.hideLoading();

        if (res.statusCode == 200) {
          uni.navigateTo({
            url: `/pages/activity/activity`,
          });
        } else {
          uni.showToast({
            title: res.message,
            mask: true,
            icon: "none",
            duration: 2000,
          });
          return;
        }
      });
    },
    addUser() {
      uni.showLoading({
        title: "报名中...",
      });
      let { user } = uni.getStorageSync("userInfo");

      let param = {
        WxUserId: user.id,
        ActivityId: this.model.id,
      };

      addUser(param).then((res) => {
        if (res.statusCode == 200) {
          uni.showToast({
            title: "报名成功",
            mask: true,
            icon: "none",
            duration: 2000,
          });
        } else {
          uni.showToast({
            title: res.message,
            mask: true,
            icon: "none",
            duration: 2000,
          });
          return;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.news-item-avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 5px;
}

.flex-item {
  text-align: center;
  margin-top: 5px;
  margin-left: 0px;
}
.title-box {
  display: flex;
  justify-content: center;
  margin-top: 10rpx;

  .title-input {
    border: 1rpx solid #fbfbfb;
    border-radius: 5rpx;
    padding-left: 10rpx;
    font-size: 12px;
    color: black;
    background-color: white;
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

.icon-location {
  color: #03fced;
}

.size {
  width: 30rpx;
  height: 30rpx;
}

.font-size {
  font-size: 22rpx;
}

.cover-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rpx;
  .cover-img {
    width: 90%;
    border-radius: 5rpx;
  }

  .cover-icon {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    // top: 12%;
    // left: 50%;
    transform: translate(-50%, -50%);
  }
}
.box-margin {
  margin-top: 20rpx;
  margin-left: 32rpx;
  margin-right: 20rpx;
}

.content-box {
  margin-right: 20rpx;
}

.context-input {
  width: 95%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1rpx solid #fbfbfb;
  background-color: white;
  color: black;
  border-radius: 5rpx;
}
</style>
