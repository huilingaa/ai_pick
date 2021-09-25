<template>
  <!-- 缺省页 -->
  <view class="myEmpty" id="cmp_empty" :style="{height}">
    <image class="myEmpty_img" :src="img" mode="aspectFit"></image>
    <view class="myEmpty_text">
      <text>{{$t(text)}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: 'noData'
      },
      img: {
        type: String,
        default: '/static/images/asset/noData.png'
      },
    },
    data() {
      return {
        height: 0
      }
    },
    mounted() {
      const windowHeight = uni.getSystemInfoSync().windowHeight

      const query = uni.createSelectorQuery().in(this);
      query.select('#cmp_empty').boundingClientRect(data => {
        this.height = windowHeight - data.top + 'px'
      }).exec();
    }
  }
</script>

<style scoped lang="scss">
  .myEmpty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &_img {
      height: 340rpx;
      width: 340rpx;
      // margin-bottom: 30rpx;s
    }

    &_text {
      font-size: 28rpx;
      margin-top: 30rpx;
      color: #42526e;
      line-height: 40rpx;
    }
  }
</style>
