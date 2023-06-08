<script>
export default {
  globalData: {
    isLogin: false,
    // iphonex: false,
    // closeSomeMod: false,
    // scene: null,
    // isOpenSuspend: true,
    // pageScroll: 0,
    // version: `v 1.0.${extConfig.version}.${liveStreaming}.${extConfig.corpId}`, //'v 1.0.65',
    isExpired: false,
  },
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "./common/uni.css";
@import "/static/icons/iconfont.css";
/*每个页面公共css */
page {
  background-color: #2f1f5b;
  color: rgb(255, 255, 255);
}
</style>
