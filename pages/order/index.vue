<template>
  <view class="container">
    <!-- 订单列表的容器 -->
    <uni-list
      :isRefresh="true"
      :isLoadMore="true"
      @refresh="onRefresh"
      @loadMore="onLoadMore"
    >
      <!-- 循环渲染订单列表项 -->
      <block v-for="(item, index) in orderList" :key="index">
        <!-- 订单列表项组件 -->
        <uni-list-item
          :title="item.title"
          :note="item.note"
          :rightText="item.rightText"
          :rightIcon="item.rightIcon"
          :clickable="true"
          @click="goToOrderDetail(item)"
        />
      </block>
    </uni-list>
  </view>
</template>

<style>
.container {
  /* 页面的背景颜色 */
  background-color: #f5f5f5;
}
</style>

<script>
export default {
  data() {
    return {
      // 订单列表数据，模拟从后端获取
      orderList: [
        {
          title: "订单编号：20210906120701", // 订单标题，显示订单编号
          note: "商品名称：uni-app教程", // 订单备注，显示商品名称
          rightText: "￥99.00", // 订单金额，显示价格
          rightIcon: "/static/paid.png", // 订单状态图标，显示已支付
        },
        {
          title: "订单编号：20210906115402",
          note: "商品名称：uni-app组件",
          rightText: "￥199.00",
          rightIcon: "/static/unpaid.png", // 订单状态图标，显示未支付
        },
        {
          title: "订单编号：20210906112303",
          note: "商品名称：uni-app API",
          rightText: "￥299.00",
          rightIcon: "/static/cancelled.png", // 订单状态图标，显示已取消
        },
      ],
    };
  },
  methods: {
    // 下拉刷新事件处理函数
    onRefresh() {
      var that = this;
      setTimeout(function () {
        // 模拟从后端获取新的订单数据，并添加到订单列表数据的开头
        that.orderList.unshift({
          title: "订单编号：20210906120704",
          note: "商品名称：uni-app快速上手",
          rightText: "￥49.00",
          rightIcon: "/static/unpaid.png",
        });
        // 停止刷新动画，并提示用户刷新成功
        that.$refs.uniList.stopRefresh();
        uni.showToast({
          title: "刷新成功",
          icon: "success",
        });
      }, 1000); // 延迟1秒执行，模拟网络延迟
    },
    // 上拉加载更多事件处理函数
    onLoadMore() {
      var that = this;
      setTimeout(function () {
        // 模拟从后端获取更多的订单数据，并添加到订单列表数据的末尾
        that.orderList.push({
          title: "订单编号：20210906102304",
          note: "商品名称：uni-app进阶",
          rightText: "￥399.00",
          rightIcon: "/static/paid.png",
        });
        // 停止加载动画，并提示用户加载成功
        that.$refs.uniList.stopLoadMore();
        uni.showToast({
          title: "加载成功",
          icon: "success",
        });
      }, 1000); // 延迟1秒执行，模拟网络延迟
    },
    // 点击订单列表项跳转到订单详情页面
    goToOrderDetail(item) {
      uni.navigateTo({
        url:
          "/pages/order-detail/order-detail?title=" +
          item.title +
          "&note=" +
          item.note +
          "&rightText=" +
          item.rightText +
          "&rightIcon=" +
          item.rightIcon, // 跳转到订单详情页面，并传递订单的相关信息作为参数
      });
    },
  },
};
</script>