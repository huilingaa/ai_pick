<template>
  <view class="perpetuals">
      <view class="navigation">
          <view class="box-menu">
              <image src="../../assets/image/perpetuals/san@2x.png" class="img-menu"/>
          </view>
          <h1 class="pageTitle">Perpetuals</h1>
          <view class="btn">Connect Wallet</view>
      </view>

      <scroll-view class="navBar">
          <view class="item">Portfolio</view>
          <view class="item">Price</view>
          <view class="item">Trade</view>
      </scroll-view>

      <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show1==0">
          <view class="contentBox">Portfolio</view>
      </uni-transition>
      <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show1==1">
          <view class="contentBox">Price</view>
      </uni-transition>
      <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show1==2">
          <view class="contentBox">Trade</view>
      </uni-transition>

  </view>
</template>

<script>
  export default {
    data() {
      return {
          show1: 0
      }
    },
    onShow() {},
    methods: {}

  }
</script>

<style lang="scss">
.perpetuals{
  width:100%;
  .navigation{
      width: 100%;
      height: 60px;
      background: #181C1F;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      align-items: center;
      .box-menu{
          width: 30px;
          height: 100%;
          display: flex;
          align-items: center;
          .img-menu{
              width: 20px;
              height: 20px;
          }
      }
      .pageTitle{
          font-size: 18px;
          color: #fff;
          font-weight: normal;
          flex: 1;
      }
      .btn{
          width: 116px;
          height: 28px;
          border-radius: 5px;
          background: #4DA2FA;
          font-size: 12px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
      }
  }
  .navBar{
      width: 100%;
      height: 44px;
      background: #181C1F;
      white-space:nowrap;
      display: flex;
      .item{
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #fff;
      }
  }
  .contentBox{
      width: 100%;
      height: calc(100vh - 104px);
      background: #181C1F;
      color: #fff;
  }
}
</style>
