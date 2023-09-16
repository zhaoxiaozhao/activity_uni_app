<template>
  <view class="container">
    <!-- 聊天详情的容器 -->
    <scroll-view class="chat-detail" scroll-y="true">
      <!-- 循环渲染聊天消息 -->
      <block v-for="(item, index) in chatDetail" :key="index">
        <!-- 判断消息是自己发送的还是对方发送的 -->
        <view v-if="item.isSelf" class="message self">
          <!-- 自己发送的消息，头像在右边，文字在左边 -->
          <!-- 头像 -->
          <image
            class="avatar"
            src="/static/images/1.jpg"
            mode="aspectFill"
          ></image>
          <!-- 文字 -->
          <text class="text">{{ item.text }}</text>
        </view>
        <view v-else class="message other">
          <!-- 对方发送的消息，头像在左边，文字在右边 -->
          <!-- 头像 -->
          <image
            class="avatar"
            src="/static/images/2.jpg"
            mode="aspectFill"
          ></image>
          <!-- 文字 -->
          <text class="text">{{ item.text }}</text>
        </view>
      </block>
    </scroll-view>
    <!-- 输入框和发送按钮的容器 -->
    <view class="input-bar">
      <!-- 输入框 -->
      <input
        class="input"
        type="text"
        placeholder="请输入内容"
        v-model="inputText"
      />
      <!-- 发送按钮 -->
      <button class="button" @tap="sendMessage">发送</button>
    </view>
  </view>
</template>

<style>
.container {
  /* 页面的背景颜色 */
  background-color: #f5f5f5;
}
.chat-detail {
  /* 聊天详情的高度，占满屏幕减去输入框的高度 */
  height: calc(100vh - 100rpx);
}
.message {
  /* 消息的布局方式，水平排列 */
  display: flex;
  flex-direction: row;
  /* 消息的外边距，上下各10rpx */
  margin: 10rpx 0;
}
.self {
  /* 自己发送的消息，从右往左排列 */
  flex-direction: row-reverse;
}
.other {
  /* 对方发送的消息，从左往右排列 */
  flex-direction: row;
}
.avatar {
  /* 头像的宽度，60rpx */
  width: 60rpx;
  /* 头像的高度，60rpx */
  height: 60rpx;
  /* 头像的圆角半径，30rpx，即半径等于宽高的一半，形成圆形 */
  border-radius: 30rpx;
  /* 头像的左右边距，10rpx */
  margin: 0 10rpx;
}
.text {
  /* 文字的字体大小，20rpx */
  font-size: 20rpx;
  /* 文字的字体颜色，黑色 */
  color: #000000;
  /* 文字的背景颜色，白色 */
  background-color: #ffffff;
  /* 文字的内边距，10rpx */
  padding: 10rpx;
  /* 文字的圆角半径，10rpx */
  border-radius: 10rpx;
}
.input-bar {
  /* 输入框和发送按钮的布局方式，水平排列 */
  display: flex;
  flex-direction: row;
  /* 输入框和发送按钮的对齐方式，垂直居中 */
  align-items: center;
  /* 输入框和发送按钮的背景颜色，白色 */
  background-color: #ffffff;
}
.input {
  /* 输入框的宽度，占满屏幕减去发送按钮的宽度 */
  width: calc(100vw - 100rpx);
  /* 输入框的高度，80rpx */
  height: 80rpx;
  /* 输入框的字体大小，20rpx */
  font-size: 20rpx;
  /* 输入框的左边距，10rpx */
  margin-left: 10rpx;
}
.button {
  /* 发送按钮的宽度，80rpx */
  width: 80rpx;
  /* 发送按钮的高度，80rpx */
  height: 80rpx;
  /* 发送按钮的字体大小，20rpx */
  font-size: 20rpx;
  /* 发送按钮的字体颜色，白色 */
  color: #ffffff;
  /* 发送按钮的背景颜色，蓝色 */
  background-color: #0000ff;
}
</style>

<script>
export default {
  onLoad(options) {
    this.messageId = options.id;
    // 根据categoryId查询商品列表
  },
  data() {
    return {
      messageId: 0,
      // 输入框的文本内容
      inputText: "",
      // 聊天详情数据，模拟从后端获取
      chatDetail: [
        {
          isSelf: false, // 是否是自己发送的消息
          text: "你好，很高兴认识你", // 消息的文本内容
        },
        {
          isSelf: true,
          text: "你好，我也很高兴认识你",
        },
        {
          isSelf: false,
          text: "你在做什么呢？",
        },
        {
          isSelf: true,
          text: "我在学习uni-app呢",
        },
      ],
    };
  },
  methods: {
    // 发送消息
    sendMessage() {
      // 判断输入框是否为空
      if (this.inputText.trim() === "") {
        // 提示用户输入内容
        uni.showToast({
          title: "请输入内容",
          icon: "none",
        });
      } else {
        // 将输入框的内容添加到聊天详情数据中
        this.chatDetail.push({
          isSelf: true, // 标记为自己发送的消息
          text: this.inputText, // 消息的文本内容为输入框的内容
        });
        // 清空输入框的内容
        this.inputText = "";
        // 滚动到底部
        this.scrollToBottom();
      }
    },
    // 滚动到底部
    scrollToBottom() {
      var that = this;
      var query = uni.createSelectorQuery();
      query.selectAll(".message").boundingClientRect();
      query.select("#scrollview").boundingClientRect();
      query.exec(function (res) {
        that.style.messageHeight = 0;
        res[0].forEach(function (rect) {
          that.style.messageHeight =
            that.style.messageHeight + rect.height + 20;
        });
        if (that.style.messageHeight > that.style.chatDetailHeight) {
          that.scrollTop =
            that.style.messageHeight - that.style.chatDetailHeight;
        }
      });
    },
  },
};
</script>