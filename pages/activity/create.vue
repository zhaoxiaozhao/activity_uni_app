<template>
  <view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
      <view class="title-box box-margin">
        <label for="">{{ title }}</label
        ><text
          class="iconfont icon-pen"
          style="padding-left: 10rpx; font-size: 12px; padding-top: 6px"
          @click="inputDialogToggle"
        ></text>
      </view>
      <view class="cover-box">
        <image class="cover-img" :src="cover" />
        <image
          class="cover-icon"
          src="../../static/icons/Img_box_fill.png"
          @click="changeCover"
        />
      </view>
      <view class="time-box box-margin">
        <label>活动时间：</label>
        <text
          class="iconfont icon-calendar"
          @click="onShowDatePicker('rangetime')"
          style="padding-right: 10rpx"
        ></text>
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
        <text
          class="iconfont icon-location"
          @click="onChooseLocation"
          style="padding-right: 10rpx"
        ></text>
        <label class="font-size">{{ location }}</label>
      </view>
      <view class="content-box box-margin">
        <label>活动内容：</label>
        <text
          style="
            padding-top: 10rpx;
            font-size: 14px;
            padding-right: 20rpx;
            line-height: 200%;
          "
          @click="editContent"
        >
          {{ content }}
          <text
            class="iconfont icon-pen"
            style="padding-left: 5rpx; font-size: 12px; padding-top: 6px"
          ></text
        ></text>
      </view>
      <view class="add-box box-margin" v-if="listLength == 0">
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
      <view v-else v-for="item in list" :key="item.id">
        <view class="add-box box-margin">
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
        <view class="cover-box" v-if="item.type == 'image'">
          <image class="cover-img" :src="item.value" />
          <image
            class="cover-icon"
            src="../../static/icons/Img_box_fill.png"
            @click="changeImage(item)"
          />
        </view>
        <view class="content-box box-margin" v-else>
          <text
            style="
              padding-top: 10rpx;
              font-size: 14px;
              padding-right: 20rpx;
              line-height: 200%;
            "
            @click="editContent"
          >
            {{ item.value }}
            <text
              class="iconfont icon-pen"
              style="padding-left: 5rpx; font-size: 12px; padding-top: 6px"
            ></text
          ></text>
        </view>
      </view>

      <view class="page-boot" style="">
        <button
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
        >
          保存
        </button>
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
import { uploadURL, downloadURL } from "@/api/api.js";

export default {
  components: {
    MxDatePicker,
    editPopup,
  },
  data() {
    return {
      isEdit: false,
      title: "活动标题",
      cover: "../../static/images/4.png",
      content:
        "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
      showPicker: false,
      rangetime: ["2023/03/01 14:00", "2023/03/06 13:59"],
      type: "rangetime",
      value: "",
      location: "青龙湖湿地公园",
      list: [
        {
          id: 1,
          sort: 1,
          type: "image",
          value: "../../static/images/4.png",
        },
        {
          id: 2,
          sort: 2,
          type: "text",
          value:
            "徒步旅行、漂流和草坪游戏都是适合成年人的绝佳团体露营创意，但新颖的原创活动创意可以让您的露营之旅更上一层楼。每次您的团体一起露营时尝试新活动，或者为仅限成人的年度露营旅行",
        },
        {
          id: 3,
          sort: 3,
          type: "image",
          value: "../../static/images/5.jpg",
        },
      ],
    };
  },
  onLoad(e) {
    this.getLocation();
    uni.$on("setData", (res) => {
      console.log(res.content);
    });
  },
  computed: {
    listLength() {
      return this.list.length;
    },
  },
  methods: {
    addImageCallBack(data) {
      let that = this;
      that.list.forEach((element) => {
        if ((element.sort = data.sort)) {
          debugger;
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
        that.title = val;
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
      that.list.forEach((element) => {
        if (element.sort != data.sort) {
          list2.push(element);
        }
      });
      that.list = list2;
    },
    onAddContent(data) {
      let that = this;
      let list2 = [];
      debugger;
      if (that.list.length === 0) {
        that.list.push({
          id: 0,
          sort: data.sort,
          type: "text",
          value: data.value,
        });
        return;
      }

      that.list.forEach((element) => {
        if (element.sort >= data.sort) {
          element.sort += 1;
        }
        list2.push(element);
      });
      list2.push({
        id: 0,
        sort: data.sort,
        type: "text",
        value: data.value,
      });
      list2.sort(function (a, b) {
        return a.sort - b.sort;
      });

      that.list = list2;
    },
    onContentChange(data) {
      debugger;
      let that = this;
      that.content = data;
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
              that.location = res.result;
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
              debugger;
              that.list.push({
                id: 0,
                sort: data !== null ? data.sort : 0,
                type: "image",
                value: data2.data.url,
              });
            } else if (type == 1) {
              //change image
              that.list.forEach((element) => {
                if (element.sort == data.sort) {
                  element.value = data2.data.url;
                }
              });
            } else {
              //change master cover
              that.cover = data2.data.url;
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
    save() {
      let that = this
      let model = {
          Title : that.title,
          Cover : that.cover,
          Content: that.content,
          Start: that.rangetime[0],
          End:that.rangetime[1],
          Location: that.location,
          Appendixs:list
      }

      

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
  font-size: 25rpx;
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
