<template>
  <view class="container">
    <!-- 头像和昵称的容器 -->
    <view class="profile">
      <!-- 头像 -->
      <image
        class="avatar"
        src="/static/images/1.jpg"
        mode="aspectFill"
      ></image>
      <!-- 昵称 -->
      <text class="nickname">张三</text>
    </view>
    <!-- 模块的容器 -->
    <view class="modules">
      <!-- 活动模块 -->
      <view class="module" @tap="goToActivities">
        <!-- 活动图标 -->
        <image
          class="icon"
          src="/static/icons/_activity.png"
          mode="aspectFit"
        ></image>
        <!-- 活动文字 -->
        <text class="text">我的活动</text>
      </view>
      <!-- 订单模块 -->
      <view class="module" @tap="goToOrders">
        <!-- 订单图标 -->
        <image
          class="icon"
          src="/static/icons/cart.png"
          mode="aspectFit"
        ></image>
        <!-- 订单文字 -->
        <text class="text">我的订单</text>
      </view>
      <!-- 交换记录模块 -->
      <view class="module" @tap="goToExchanges">
        <!-- 交换记录图标 -->
        <image
          class="icon"
          src="/static/icons/game.png"
          mode="aspectFit"
        ></image>
        <!-- 交换记录文字 -->
        <text class="text">交换记录</text>
      </view>
      <view class="module" @tap="goToExchanges">
        <!-- 交换记录图标 -->
        <image
          class="icon"
          src="/static/icons/ic_tabbar_message_nor.png"
          mode="aspectFit"
        ></image>
        <!-- 交换记录文字 -->
        <text class="text">我的消息</text>
      </view>
    </view>
    <!-- 在页面最下方添加站位视图，高度等于 tabBar 的高度 -->
    <view class="edgeInsetBottom"></view>
    <!-- 绝对定位的视图需要考虑 tabBar 遮挡的问题，bottom 应该加上 tabBar 的高度 -->
    <view class="fixedView"></view>
  </view>
</template>
<script>
export default {
  methods: {
    // 跳转到活动页面
    goToActivities() {
      uni.switchTab({
        url: "/pages/activity/index",
      });
    },
    // 跳转到订单页面
    goToOrders() {
      uni.switchTab({
        url: "/pages/order/index",
      });
    },
    // 跳转到交换记录页面
    goToExchanges() {
      uni.switchTab({
        url: "/pages/exchange/index",
      });
    },
  },
};
</script>

<style>
.container {
  /* 页面的背景颜色 */
  background-color: #f5f5f5;
}
.profile {
  /* 头像和昵称的布局方式，水平排列 */
  display: flex;
  flex-direction: column;
  /* 头像和昵称的对齐方式，垂直居中 */
  align-items: center;
  /* 头像和昵称的外边距，上下各10rpx，左右各20rpx */
  margin: 0rpx 10rpx 20rpx;
}
.avatar {
  /* 头像的宽度，80rpx */
  width: 80rpx;
  /* 头像的高度，80rpx */
  height: 80rpx;
  /* 头像的圆角半径，40rpx，即半径等于宽高的一半，形成圆形 */
  border-radius: 40rpx;
  margin-top: 10rpx;
}
.nickname {
  /* 昵称的字体大小，24rpx */
  font-size: 24rpx;
  /* 昵称的字体颜色，黑色 */
  color: #000000;
  /* 昵称的左边距，10rpx */
  margin-left: 10rpx;
}
.modules {
  /* 模块的布局方式，水平排列 */
  display: flex;
  flex-direction: row;
  /* 模块的对齐方式，水平居中 */
  justify-content: space-between;
}
.module {
  /* 模块的内边距，10rpx */
  padding: 10rpx;
  /* 模块的外边距，10rpx */
  margin: 10rpx;
  display: flex;
  flex-direction: column;
  /* 模块的对齐方式，垂直居中 */
  align-items: center;
}
.icon {
  /* 图标的宽度，80rpx */
  width: 40rpx;
  /* 图标的高度，80rpx */
  height: 40rpx;
}
.text {
  /* 文字的字体大小，16rpx */
  font-size: 24rpx;
  /* 文字的字体颜色，灰色 */
  color: #999999;
  /* 文字的对齐方式，水平居中 */
  text-align: center;
}

.edgeInsetBottom {
  width: 750rpx;
  height: var(--window-bottom);
  background-color: #ffffff;
}

.fixedView {
  /* background-color: #4cd964; */
  position: fixed;
  width: 750rpx;
  height: 30px;
  bottom: var(--window-bottom);
}
</style>
