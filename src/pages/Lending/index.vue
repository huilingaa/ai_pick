<template>
  <view class="Lending">
    <my-header />
    <view class="wrap">
      <image class="img1" :src="require(`../../static/images/bg_lending@2x.png`)"></image>
      <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
        <image class="img2" :src="require(`../../static/images/markets@2x (4).png`)"></image>
      </scroll-view>
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
  .Lending {
    width: 100%;

    .wrap {
      width: 100%;
      height: 100%;

      .img1 {
        width: 100%;
        height: 1486rpx;
      }

      .img2 {
        overflow-x: scroll;
        width:2400rpx;
        height: 1690rpx;

      }

      padding-bottom: var(--window-bottom);
      // tabbar 在H5端是div模拟的，属于前端屏幕窗口的一部分，如果要使用bottom居底定位方式，应该使用css变量--window-bottom，
      // 比如悬浮在tabbar上方10px的按钮，样式如下bottom: calc(var(--window-bottom) + 10px)
    }
  }
</style>
