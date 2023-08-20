<template>
  <view class="container">
    <activity-top ></activity-top>
    <view class="section">
      <text class="title">附近活动</text> <text class="iconfont icon-game"></text>
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
      <view class="grid">
        <view class="item" v-for="(item, index) in exchanges" :key="index">
          <image
            class="image"
            style="border-radius: 5px"
            :src="item.image"
            mode="aspectFill"
          ></image>
          <text class="name">{{ item.name }}</text>
          <text class="price">{{ item.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import activitytop from "@/components/activity-top/activity-top.vue";

export default {
  components: {
    activitytop,
  },
  data() {
    return {
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
          image:
            "https://www.bing.com/th?id=OIP.e6ErqIOSWqm6YjhsN5QxbwHaE7&w=146&h=97&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品1",
          price: "￥5",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.F7HqBTMUHXTE2gXZJCyz5wHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品2",
          price: "￥10",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.5fK4_SZrOCf09dHG24X1lgHaE8&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "交换物品3",
          price: "￥15",
        },
      ],
    };
  },
  methods: {
    join(item) {
      uni.navigateTo({
        url: item.url,
      });
    },
    gotoProducts(id) {
      uni.navigateTo({
        url: "/pages/product/index?id=" + id,
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
  &.item {
    width: calc(25%);
    height: calc(25%);
  }
}
</style>
