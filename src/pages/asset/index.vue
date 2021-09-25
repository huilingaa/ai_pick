<template>
  <view class="communication">

    <view class="wrap">
      <image @click="handleOpenWebView" :src="require(`../../static/images/wolin_tx_${$store.state.lang}.png`)"></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    onShow() {
  

    },

    methods: {
      handleOpenWebView(){
     
      },
    }

  }
</script>

<style lang="scss">
.communication{
  width:100%;
  .wrap{
    width:100%;
    height:100%;
    image{
      width:750rpx;
      height:1624rpx;
    }
    padding-bottom: var(--window-bottom);
  }
}
</style>
