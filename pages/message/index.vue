<template>
  <view class="container">
    <!-- 聊天列表的容器 -->
    <scroll-view class="chat-list" scroll-y="true">
      <!-- 循环渲染聊天列表项 -->
      <block v-for="(item, index) in chatList" :key="index">
        <!-- 聊天列表项组件 -->
        <uni-list-chat
          :avatar-circle="true"
          :title="item.title"
          :avatar="item.avatar"
          :note="item.note"
          :time="item.time"
          :badge-text="item.badgeText"
          :clickable="true"
          @click="goToChat(item)"
        />
      </block>
    </scroll-view>
  </view>
</template>
  
  <style>
.container {
  /* 页面的背景颜色 */
  background-color: #f5f5f5;
}
.chat-list {
  /* 聊天列表的高度，占满屏幕 */
  height: 100vh;
}
</style>
  
<script>
export default {
  data() {
    return {
      // 聊天列表数据，模拟从后端获取
      chatList: [
        {
          id:1,
          title: "张三",
          avatar: "/static/images/1.jpg",
          note: "你好，最近怎么样？",
          time: "2021-09-06 12:07",
          badgeText: "2", // 有两条未读消息
        },
        {
          id:2,
          title: "李四",
          avatar: "/static/images/2.jpg",
          note: "明天有空吗？",
          time: "2021-09-06 11:54",
          badgeText: "", // 没有未读消息
        },
        {
          id:3,
          title: "王五",
          avatar: "/static/images/3.jpg",
          note: "收到我的红包了吗？",
          time: "2021-09-06 11:23",
          badgeText: "dot", // 有未读消息，但不显示具体数量，只显示一个红点
        },
      ],
    };
  },
  methods: {
    // 点击聊天列表项跳转到聊天页面
    goToChat(item) {
      uni.navigateTo({
        url: "/pages/message/detail?id=" + item.id, // 跳转到聊天页面，并传递聊天对象的名称作为参数
      });
    },
  },
};
</script>