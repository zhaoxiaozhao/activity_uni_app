<template>
  <view class="container">
    <activity-top
      :idx="index"
      :distance="distance"
      :options="addresslist"
      @change="changeLocation"
      @change2="selectLocation"
    ></activity-top>
    <view class="section">
      <text class="title">附近活动</text>
      <text class="iconfont icon-game"></text>
      <swiper class="swiper" indicator-dots="true" autoplay="true">
        <swiper-item v-for="(item, index) in activities" :key="index">
          <image class="image" :src="item.image" mode="aspectFill"></image>
          <text class="name">{{ item.name }}</text>
        </swiper-item>
      </swiper>
      <view class="categories">
        <view
          class="category"
          v-for="(item, index) in categories"
          :key="index"
          :style="{ 'background-color': item.color }"
        >
          <text class="name">{{ item.name }}</text>
          <view class="info">
            <text class="count">{{ item.count }}</text>
            <text class="status">{{ item.status }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="section">
      <text class="title">虚拟超市</text>
      <text class="iconfont icon-store"></text>
      <view class="grid">
        <view
          class="item"
          v-for="(item, index) in productCategories"
          :key="index"
          @click="gotoProducts(item.id)"
        >
          <image class="image" :src="item.image" mode="aspectFill"></image>
          <text class="name">{{ item.name }}</text>
        </view>
      </view>
    </view>
    <view class="section">
      <text class="title">二手交换</text>
      <text class="iconfont icon-recycle"></text>
      <view class="grid">
        <view class="item" v-for="(item, index) in exchanges" :key="index">
          <image
            class="image"
            style="border-radius: 5px"
            :src="item.image"
            mode="aspectFill"
          ></image>
          <view class="item-box">
            <text class="name">{{ item.name }}</text>
            <image class="avatar" :src="item.user.avatar"></image>
            <canvas class="avatar-canvas" :canvas-id="item.id"></canvas>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="edgeInsetBottom"></view> -->
    <!-- 绝对定位的视图需要考虑 tabBar 遮挡的问题，bottom 应该加上 tabBar 的高度 -->
    <!-- <view class="fixedView"></view> -->
  </view>
</template>

<script>
import activitytop from "@/components/activity-top/activity-top.vue";

export default {
  components: {
    activitytop,
  },
  onReady() {
    for (var key in this.exchanges) {
      const ctx = uni.createCanvasContext(this.exchanges[key].id, this);
      ctx.arc(5, 5, 5, 0, 2 * Math.PI);
      const color =
        this.exchanges[key].user.isOnline == true ? "#00FF00" : "gray";
      ctx.setFillStyle(color);
      ctx.fill();
      ctx.draw();
    }
  },
  data() {
    return {
      index: 0,
      distance: 20,
      addresslist: [
        {
          value: 0,
          text: "远大都市风景一区",
          latitude: 30.5702,
          longitude: 104.06476,
        },
        {
          value: 1,
          text: "青龙湖湿地公园",
          latitude: 31.5702,
          longitude: 104.06476,
        },
      ],
      categories: [
        {
          name: "运动",
          count: "3个活动正在进行中",
          status: "已有100人参与",
          color: "#add8e6",
          url: "https://www.bing.com/th?id=OIP.Sy9rmSh7VOYzlQxW1qZ0eQHaE7&w=139&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        },
        {
          name: "游戏",
          count: "2个活动正在进行中",
          status: "已有50人参与",
          color: "#ffa500;",
          url: "https://www.bing.com/th?id=OIP.Lrn0Pg8PE1_YjJ48_yLYqAHaFj&w=137&h=104&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        },
        {
          name: "文娱",
          count: "1个活动未开始",
          status: "已有20人报名",
          color: "#00ffff;",
          url: "https://www.bing.com/th?id=OIP.r9r7YYwxbO_FSECx3BB9ggHaEK&w=167&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
        },
      ],
      activities: [
        {
          image:
            "https://www.bing.com/th?id=OIP.Sy9rmSh7VOYzlQxW1qZ0eQHaE7&w=139&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "活动1",
          color: "#add8e6;",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.Lrn0Pg8PE1_YjJ48_yLYqAHaFj&w=137&h=104&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "活动2",
          color: "#ffa500;",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.r9r7YYwxbO_FSECx3BB9ggHaEK&w=167&h=96&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "活动3",
          color: "#00ffff;",
        },
      ],
      productCategories: [
        {
          image:
            "https://www.bing.com/th?id=OIP.HpnI-6otBP6nyqv0a-pW7QHaE7&w=146&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "蔬菜水果",
          price: "￥9.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.E5Ce0SanbLrLCq6j5IQXVQHaE7&w=146&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "粮油干杂",
          price: "￥19.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "肉类",
          price: "￥29.9",
        },
      ],
      exchanges: [
        {
          id: "1",
          image:
            "https://www.bing.com/th?id=OIP.e6ErqIOSWqm6YjhsN5QxbwHaE7&w=146&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品1",
          price: "￥5",
          user: {
            nick: "Changyou",
            avatar: "/static/images/1.jpg",
            isOnline: true,
          },
        },
        {
          id: "2",
          image:
            "https://www.bing.com/th?id=OIP.F7HqBTMUHXTE2gXZJCyz5wHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品2",
          price: "￥10",
          user: {
            nick: "John",
            avatar: "/static/images/2.jpg",
            isOnline: false,
          },
        },
        {
          id: "3",
          image:
            "https://www.bing.com/th?id=OIP.5fK4_SZrOCf09dHG24X1lgHaE8&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品3",
          price: "￥15",
          user: {
            nick: "Lisa",
            avatar: "/static/images/3.jpg",
            isOnline: true,
          },
        },
      ],
    };
  },
  methods: {
    changeLocation(value) {
      this.index = value;
    },
    join(item) {
      uni.switchTab({
        url: item.url,
      });
    },
    gotoProducts(id) {
      uni.switchTab({
        url: "/pages/product/index?id=" + id,
      });
    },
    // 定义一个函数来计算两个经纬度之间的距离，单位为米
    getDistance(lat1, lon1, lat2, lon2) {
      // 将角度转换为弧度
      var radLat1 = (lat1 * Math.PI) / 180;
      var radLat2 = (lat2 * Math.PI) / 180;
      var deltaLat = radLat1 - radLat2;
      var deltaLon = (lon1 * Math.PI) / 180 - (lon2 * Math.PI) / 180;
      // 使用 haversine formula 计算距离
      var distance =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(deltaLat / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(deltaLon / 2), 2)
          )
        );
      // 将弧度转换为米
      distance = distance * 6378137;
      return distance;
    },
    // 定义一个函数来找出 addresslist 中当前位置 A 50 米范围内的地址列表，并返回最近的一个地址的 value
    findNearbyAddresses(location) {
      let that = this;
      // 定义一个空数组来存放符合条件的地址
      var nearbyAddresses = [];
      // 遍历 addresslist 中的每个地址
      for (var i = 0; i < that.addresslist.length; i++) {
        // 获取当前地址的经纬度
        var lat = that.addresslist[i].latitude;
        var lon = that.addresslist[i].longitude;
        // 计算当前地址和当前位置 A 的距离
        var distance = that.getDistance(
          lat,
          lon,
          location.latitude,
          location.longitude
        );
        // 如果距离小于等于 50 米，将当前地址添加到 nearbyAddresses 数组中
        if (distance <= 50) {
          nearbyAddresses.push({ value: that.addresslist[i].value, distance });
        }
      }
      // 如果 nearbyAddresses 数组为空，说明没有找到符合条件的地址，返回 null
      if (nearbyAddresses.length == 0) {
        return null;
      }
      // 如果 nearbyAddresses 数组只有一个元素，说明只找到了一个符合条件的地址，返回它的 value
      if (nearbyAddresses.length == 1) {
        return nearbyAddresses[0];
      }
      debugger
      // 如果 nearbyAddresses 数组有多个元素，说明找到了多个符合条件的地址，根据distance 排序并返回集合
      let result = nearbyAddresses.sort(function (a, b) {
        return a.distance - b.distance;
      });
      return result[0];
    },
    //设置最近的位置
    selectLocation(value) {
      debugger
      let that = this;
      uni.chooseLocation({
        success: function (res) {
          console.log("位置名称：" + res.name);
          console.log("详细地址：" + res.address);
          console.log("纬度：" + res.latitude);
          console.log("经度：" + res.longitude);
          //todo : 根据获取到的位置进行计算，选取其中最近100米范围内的社区作为展示位置, 如果不存在则弹出提示信息，该区域未创建社区
          let location = {
            latitude: res.latitude,
            longitude: res.longitude,
          };

          var res = that.findNearbyAddresses(location);
          if (res == null) {
            uni.showToast({
              title: "该区域尚未创建社区，请点击+号进行创建", // the content of the toast popup
              duration: 3000, // the duration of the toast popup in milliseconds
              icon: "none", // the icon of the toast popup, none means no icon
              position: "top", // the position of the toast popup, can be top, center or bottom
            });
          } else {
            debugger;
            that.index = res.value;
            that.distance = res.distance;
          }
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
text {
  color: white;
}
.container {
  width: 100%;
  height: 100%;
}
.section {
  padding: 10px;
  margin-bottom: 10px;
}
.edgeInsetBottom {
  width: 750rpx;
  height: var(--window-bottom);
  background-color: #ffffff;
}

.fixedView {
  background-color: #4cd964;
  position: fixed;
  width: 750rpx;
  height: 30px;
  bottom: var(--window-bottom);
}

.title {
  font-size: 16px;
  color: gray;
}
.icon-game {
  margin-left: 5px;
  font-size: 18px;
  color: yellow;
}
.icon-store {
  margin-left: 5px;
  font-size: 18px;
  color: yellow;
}
.icon-recycle {
  margin-left: 5px;
  font-size: 18px;
  color: yellow;
}
.categories {
  display: flex;
  justify-content: space-between;
}
.category {
  margin-top: 5px;
  width: calc(33% - 10px);
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.name {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 16px;
}
.info {
  margin-top: 10px;
  margin-left: 10px;
}
.count {
  font-size: 14px;
}
.status {
  margin-top: 5px;
  font-size: 14px;
}
.swiper {
  margin-top: 5px;
  width: 100%;
  height: 200px;
}
.image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.name {
  margin-top: 5px;
  font-size: 16px;
}
.item {
  display: inline-block;
  width: 120px;
  height: 120px;
  padding-left: 10px;
  &.image {
    border: 1cm;
    border-radius: 5px;
  }
}
.price {
  margin-top: 5px;
  color: #f00;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  &.item {
    width: calc(25%);
    height: calc(25%);
  }
}

.item-box {
  display: flex;
  align-content: center;
}

.avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
  margin-left: 5rpx;
}
.avatar-canvas {
  width: 10px;
  height: 10px;
  position: absolute;
  margin-left: 95px;
  margin-top: 22px;
}
</style>
