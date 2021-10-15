<template>
  <view class="About">
    <my-header />
    <view class="wrap">
      <image :src="require(`../../static/images/ic_about.png`)"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
  }
</script>

<style lang="scss">
  .About {
    width: 100%;

    .wrap {
      width: 100%;
      height: 100%;

      image {
        width: 750rpx;
        height: 3228rpx;
      }

      padding-bottom: var(--window-bottom);
      // tabbar 在H5端是div模拟的，属于前端屏幕窗口的一部分，如果要使用bottom居底定位方式，应该使用css变量--window-bottom，
      // 比如悬浮在tabbar上方10px的按钮，样式如下bottom: calc(var(--window-bottom) + 10px)
    }
  }
</style>
