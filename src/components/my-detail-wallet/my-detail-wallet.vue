<template>
  <view>
    <!-- 钱包 -->
    <my-drop-down-box title="Wallet" ref="cmpwalletpopup" height="566rpx" width="690rpx" leftIcon="close">
      <view class="walletBoxDetail">
        <view class='input input1'>
          <image v-if="name" :src="require(`../../static/images/wallet/ic_${name}@2x (1).png`)" />
          <span>{{name}}</span>
        </view>
        <view class='input input2'>
          <span>{{id | encryption}}</span>
          <image v-clipboard:copy="id" v-clipboard:success="onCopySuccess" v-clipboard:error="copyError"
            src="../../static/images/wallet/ic_copy@2x.png" />
        </view>
        <view class='btn' @click="signOut">Broken Link</view>
      </view>
    </my-drop-down-box>
  </view>
</template>

<script>
  import VueClipboard from 'vue-clipboard2';
  import Vue from 'vue';
  Vue.use(VueClipboard);
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    deepcClone,
    isEmpty
  } from '../../utils/index.js'
  import {
    getWeb3
  } from '../../utils/getWeb3.js'
  export default {
    data() {
      return {

      };
    },
    props: {
      name: {
        type: String,
        default: '90'
      },
      id: {
        type: String,
        default: ''
      },
    },

    methods: {
      // 打开弹窗
      open() {
        this.$refs.cmpwalletpopup.open()
      },
      onCopySuccess() {
        uni.showToast({
          title: '复制成功',
          duration: 2000
        });
      },
      // 复制失败时的回调函数
      copyError() {
        uni.showToast({
          title: '复制失败',
          duration: 2000
        });
      },
      signOut() {
        uni.showToast({
          title: '断开成功',
          icon: 'none',
          duration: 2000,
          success: () => {
            this.$nextTick(() => {
              this.$refs.cmpwalletpopup.close();
              this.$store.dispatch('walletStore/closeWallet')
            })
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .walletBoxDetail {
    .input {
      width: 100%;
      height: 70rpx;
      border: 2rpx solid #F4F4F4;
      opacity: 1;
      border-radius: 10rpx;
      padding: 0 20rpx;
    }

    .input1 {

      margin-top: 40rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;

      span {

        font-size: 28rpx;
        font-weight: 500;
        color: #6B757B;
        opacity: 1;
      }


      image {
        width: 34rpx;
        height: 34rpx;
        margin-right: 10rpx;
      }

    }

    .input2 {
      margin-bottom: 60rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      image {
        width: 28rpx;
        height: 28rpx;
      }

      span {

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #6B757B;
        opacity: 1;
      }
    }

    .btn {
      font-size: 28rpx;
      font-weight: 500;
      line-height: 70rpx;
      color: #FFFFFF;

      text-align: center;
      width: 100%;
      height: 70rpx;
      background: #CF4D65;

      border-radius: 10rpx;



    }
  }
</style>
