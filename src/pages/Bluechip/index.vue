<template>
  <view class="Bluechip">

    <my-header ref="myHeader" />
    <view class="wrap">
      <image :src="require(`../../static/images/bg_bluechip.png`)"></image>
      <view class="Announcement" :style="{top: `${titleHeight}px`}">
        <view>Announcement: </view>
        <view> Chinese user registration and IP login are prohibited </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        titleHeight: ''
      };
    },
    mounted() {
      this.titleHeight = this.$refs.myHeader.$el.clientHeight
      console.log('rey', this.$refs.myHeader.$el.clientHeight)
    }
  }
</script>

<style lang="scss">
  .Bluechip {
    width: 100%;

    .wrap {
      width: 100%;
      height: 100%;
      position: relative;

      image {


        width: 100%;
        height: 8240rpx;
        background: #FFFFFF;
        opacity: 1;
      }

      padding-bottom: var(--window-bottom);
      // tabbar 在H5端是div模拟的，属于前端屏幕窗口的一部分，如果要使用bottom居底定位方式，应该使用css变量--window-bottom，
      // 比如悬浮在tabbar上方10px的按钮，样式如下bottom: calc(var(--window-bottom) + 10px)
    }

    .Announcement {
      position: fixed;
      // top: 0;
      width: 100%;
      padding: 20rpx 30rpx;
      background-color: rgba(207, 77, 101, 0.2);

      view {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #CF4D65;
        opacity: 1;
      }
    }
  }
</style>
