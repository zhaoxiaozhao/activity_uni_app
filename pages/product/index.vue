<template>
  <view class="container">
    <!-- <view class="search-bar">
      <input class="input" type="text" placeholder="搜索商品" />
      <text
        class="iconfont icon-search"
        style="padding-left: 10rpx; font-size: 25px; padding-top: 6px"
        @click="search"
      ></text>
    </view> -->
    <uni-search-bar
      :show="true"
      :show-cancel-button="true"
      :show-icon="true"
      :show-button="true"
      :button-text="'Search'"
      :button-type="'primary'"
      :placeholder="'Enter goods name'"
      @confirm="confirm"
      @cancel="cancel"
    />
    <view class="content">
      <view class="grid">
        <view
          class="item"
          v-for="(item, index) in products"
          :key="index"
          @click="gotoDetails(item.id)"
        >
          <image class="image" :src="item.image" mode="aspectFill"></image>
          <text class="name"
            >{{ item.name }} {{ item.sku }}
            <text class="price">{{ item.price }}</text>
          </text>
          <!-- <button class="add-button">加入购物车</button> -->
        </view>
      </view>
    </view>
  </view>
</template>
  
<script>
export default {
  data() {
    return {
      categoryId: null,
      products: [
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品1",
          sku: "SKU001",
          price: "￥9.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品2",
          sku: "SKU002",
          price: "￥19.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品3",
          sku: "SKU003",
          price: "￥29.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品1",
          sku: "SKU001",
          price: "￥9.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品2",
          sku: "SKU002",
          price: "￥19.9",
        },
        {
          image:
            "https://www.bing.com/th?id=OIP.KXKolcN1mOqUos-SKc0UkQHaE7&w=146&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
          name: "商品3",
          sku: "SKU003",
          price: "￥29.9",
        },
      ],
    };
  },
  onLoad(options) {
    this.categoryId = options.id;
    // 根据categoryId查询商品列表
  },
  methods: {
    confirm(e) {
      // handle the confirm action of the search bar
      // e.detail.value is the input value
      this.value = e.detail.value;
      console.log("confirm:", this.value);
      // call your search function here
      this.searchGoods(this.value);
    },
    cancel(e) {
      // handle the cancel action of the search bar
      // e.detail.value is the input value
      this.value = e.detail.value;
      console.log("cancel:", this.value);
      // clear your search results here
      this.clearGoods();
    },
    searchGoods(value) {
      // your search function logic here
      // for example, you can use uni.request to send a request to your backend API with the value as a parameter
      // then you can use uni.navigateTo to jump to another page that displays the search results
    },
    clearGoods() {
      // your clear function logic here
      // for example, you can use uni.navigateBack to go back to the previous page that shows all the goods
    },
    gotoDetails(id) {
      uni.navigateTo({
        url: "/pages/product/detail?id=" + id,
      });
    },
  },
};
</script>
  
<style lang='scss'>
.container {
  width: 100%;
  height: 100%;
}
.search-bar {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  //   justify-content: space-between;
  padding: 10px;
  .input {
    width: 80%;
    height: 40px;
    border-radius: 20px;
    border: none;
    padding-left: 10px;
    font-size: 14px;
    color: #000;
    background-color: #fff;
  }
}
.content {
  width: 100%;
  height: calc(100% - 80px);
}
.grid {
  display: flex;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-wrap: wrap;
    width: calc(25% - 20px);
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 40px;
    .image {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .name {
      //   padding-top: 5px;
      font-size: 10px;
      .price {
        // padding-top: 5px;
        color: red;
      }
    }
    .sku {
      // padding-top: 5px;
    }
  }
}

.add-button {
  margin-top: 5px;
}
</style>
  
  