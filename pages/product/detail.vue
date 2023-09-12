<template>
  <view class="container">
    <swiper class="swiper" indicator-dots="true" autoplay="true">
      <swiper-item v-for="(item, index) in product.images" :key="index">
        <image class="image" :src="item"></image>
      </swiper-item>
    </swiper>
    <text class="title">{{ product.title }}</text>
    <text class="price">价格:</text><text class="amount">￥{{ product.price }}</text>
    <text class="sales">销量:{{ product.sales }}</text>
    <text class="stock">库存:{{ product.stock }}</text>
    <button class="button" @click="addOrder">立即预订</button>
    <text class="title">产品描述</text>
    <text class="description">{{ product.description }}</text>
    <text class="title">消费者评论</text>
    <view class="chat">
      <scroll-view
        :style="{ height: `${windowHeight}rpx` }"
        id="scrollview"
        scroll-y="true"
        :scroll-top="scrollTop"
        :scroll-with-animation="true"
        class="scroll-view"
      >
        <!-- 聊天主体 -->
        <view id="msglistview" class="chat-body">
          <!-- 聊天记录 -->
          <view v-for="(item, index) in product.msgList" :key="index">
            <!-- 自己发的消息 -->
            <view class="item self" v-if="item.userContent != ''">
              <!-- 文字内容 -->
              <view class="content right">
                {{ item.userContent }}
              </view>
              <!-- 头像 -->
              <view class="avatar">
                <image :src="item.avatar" mode="aspectFill"></image>
              </view>
            </view>
            <!-- 机器人发的消息 -->
            <view class="item Ai" v-if="item.botContent != ''">
              <!-- 头像 -->
              <view class="avatar">
                <image :src="item.avatar" mode="aspectFill"></image>
              </view>
              <!-- 文字内容 -->
              <view class="content left">
                {{ item.botContent }}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
      <!-- 底部消息发送栏 -->
      <!-- 用来占位，防止聊天消息被发送框遮挡 -->
      <view class="chat-bottom">
        <view class="send-msg">
          <view class="uni-textarea">
            <textarea
              v-model="chatMsg"
              maxlength="300"
              :show-confirm-bar="false"
              auto-height
            ></textarea>
          </view>
          <button @click="handleSend" class="send-btn">发送</button>
        </view>
      </view>
    </view>
  </view>
</template>
  
<script>
export default {
  data() {
    return {
      product: {
        title: "甘竹牌豆豉鲮鱼罐头",
        images: [
          "https://img.alicdn.com/imgextra/i2/3015107655/O1CN01TDsQ7S26Q2ed4OGeB_!!3015107655.jpg",

          "https://gw.alicdn.com/imgextra/i3/3015107655/O1CN01VOlvUS26Q2g3G5DVY_!!3015107655.jpg_Q75.jpg_.webp",

          "https://gw.alicdn.com/imgextra/i2/3015107655/O1CN01EybZhI26Q2j64AdNg_!!3015107655.jpg_Q75.jpg_.webp",
        ],
        description: "3罐装官方肉熟食即食食品下饭菜鱼鱼肉旗舰店",
        price: 99.9,
        stock:10,
        sales:9999,
        //滚动距离
        scrollTop: 0,
        userId: "",
        //发送的消息
        chatMsg: "",
        msgList: [
          {
            avatar: "/static/images/1.jpg",
            botContent: "搭配我的菜和米饭吃好香啊，每天都想来两口豆豉鱼，味道真不错，营养又好吃，每天做饭都会带两条来，恰饭的快乐~",
            recordId: 0,
            titleId: 0,
            userContent: "",
            userId: 0,
          },
          {
            avatar: "/static/images/2.jpg",
            botContent: "豆豉鱼买这款真的是很正宗，味道也好，拌饭单吃都是可以的，很香，鱼吃起来也劲道，罐头携带方便，早上配粥也是不错的选择",
            recordId: 0,
            titleId: 0,
            userContent: "",
            userId: 0,
          },
        ],
      },
    };
  },
  computed: {
    windowHeight() {
      return this.rpxTopx(uni.getSystemInfoSync().windowHeight);
    },
  },
  methods: {
    // px转换成rpx
    rpxTopx(px) {
      let deviceWidth = wx.getSystemInfoSync().windowWidth;
      let rpx = (750 / deviceWidth) * Number(px);
      return Math.floor(rpx);
    },
    // 发送消息
    handleSend() {
      //如果消息不为空
      if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
        let obj = {
          botContent: "",
          recordId: 0,
          titleId: 0,
          userContent: this.chatMsg,
          userId: 0,
        };
        this.product.msgList.push(obj);
        this.chatMsg = "";
      } else {
        this.$modal.showToast("不能发送空白消息");
      }
    },
  },
};
</script>
  
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
}

.swiper {
  margin-top: 10px;
  width: 100%;
  height: 300px;
}
.image {
  width: 95%;
  height: 300px;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
}
.title {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 10px;
}
.price {
  font-size: 14px;
  margin-left: 10px;
}
.amount{
    color: red;
    font-size: 14px;
  }
.sales {
  font-size: 14px;
  color: grey;
  margin-left: 100px;
}
.stock {
    font-size: 14px;
    color: grey;
    margin-left: 100px;
}
.description {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  color: grey;
}
.button {
  background-color: lightgreen;
  font-size: 20px;
  color: white;
  margin: 10px;
}

$chatContentbgc: #c2dcff;
$sendBtnbgc: #4f7df5;

view,
button,
text,
input,
textarea {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 聊天消息 */
.chat {
  width: calc(100% - 20px);
  margin: 10px auto;
  .scroll-view {
    ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }
    border-radius: 5px;
    // background-color: orange;
    background-color: #f6f6f6;

    .chat-body {
      display: flex;
      flex-direction: column;
      padding-top: 23rpx;
      // background-color:skyblue;

      .self {
        justify-content: flex-end;
      }
      .item {
        display: flex;
        padding: 23rpx 30rpx;
        // background-color: greenyellow;

        .right {
          background-color: $chatContentbgc;
        }
        .left {
          background-color: #ffffff;
        }
        // 聊天消息的三角形
        .right::after {
          position: absolute;
          display: inline-block;
          content: "";
          width: 0;
          height: 0;
          left: 100%;
          top: 10px;
          border: 12rpx solid transparent;
          border-left: 12rpx solid $chatContentbgc;
        }

        .left::after {
          position: absolute;
          display: inline-block;
          content: "";
          width: 0;
          height: 0;
          top: 10px;
          right: 100%;
          border: 12rpx solid transparent;
          border-right: 12rpx solid #ffffff;
        }

        .content {
          position: relative;
          max-width: 486rpx;
          border-radius: 8rpx;
          word-wrap: break-word;
          padding: 24rpx 24rpx;
          margin: 0 24rpx;
          border-radius: 5px;
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 42rpx;
        }

        .avatar {
          display: flex;
          justify-content: center;
          width: 78rpx;
          height: 78rpx;
          background: $sendBtnbgc;
          border-radius: 39rpx;
          overflow: hidden;

          image {
            align-self: center;
          }
        }
      }
    }
  }

  /* 底部聊天发送栏 */
  .chat-bottom {
    width: 100%;
    margin: 0 auto;
    height: auto;
    background: #f4f5f7;

    .send-msg {
      display: flex;
      align-items: flex-end;
      margin: 10px auto;
      width: 95%;
      height: 50px;
      position: fixed;
      padding-right: 10px;
      padding-left: 10px;   
      border-radius: 5px;
      bottom: 50px;
      background: #ededed;
    }

    .uni-textarea {
      padding-bottom: 0rpx;
      height: 100%;
      border-radius: 5px;
      border: 2px solid greenyellow;
      textarea {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 5px;
        font-size: 32rpx;
        font-family: PingFang SC;
        color: #333333;
        line-height: 43rpx;
        padding: 5rpx 8rpx;
      }
    }

    .send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10rpx;
      margin-left: 5rpx;
      width: 128rpx;
      height: 75rpx;
      background: $sendBtnbgc;
      border-radius: 5px;
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 28rpx;
    }
  }
}
</style>
  
  