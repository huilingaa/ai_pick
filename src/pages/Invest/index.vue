<template>
  <view class="invest">
    <my-header />
    <view class="wrap">
      <image class="img1" :src="require(`../../static/images/bg_invest.png`)"></image>

      <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
        <image class="img2" :src="require(`../../static/images/leaderboard@2x.png`)"></image>
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
  .invest {
    width: 100%;

    .wrap {
      width: 100%;
      height: 100%;

      .img1 {
        width: 750rpx;
        height: 4328rpx;
      }

      .img2 {
        overflow-x: scroll;
        width: 2156rpx;
        height: 1610rpx;
        margin-bottom: 200rpx;
      }

      padding-bottom: var(--window-bottom);
    }
  }
</style>
