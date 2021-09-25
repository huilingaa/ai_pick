<template>
  <!-- 缺省页 -->
  <view class="content">
    <image class="empty" :style="{  'margin-top': top + 'rpx' }"  :src="img"></image>
    <view>
      <text class="title">{{$t(title)}}</text>
    </view>
  </view>
</template>

<script>
  export default {

    props: {
      title: {
        type: String,
        default: 'noData'
      },
      img: {
        type: String,
        default: '../../static/images/asset/noData.png'
      },
      top:{
        type: Number,
        default: 234
      },
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .empty {
    height: 340rpx;
    width: 340rpx;

  }

  .title {

    font-size: 28rpx;
    margin-top: 30rpx;
    color: #42526e;
    line-height: 40rpx;
  }
</style>
