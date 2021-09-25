<template>
  <!-- 安全密码校验组件 -->
  <view class="myInviteVerify">
    <uni-forms class="wallet-form createWallet-form" label-position="top" label-width="400" ref="form">
      <uni-forms-item class="hairline--bottom">
        <uni-easyinput trim :inputBorder="false" type="text" v-model="inviteCode" :placeholder="$t('leaseEnterActivationCode'||'請輸入身份識別碼')" />
      </uni-forms-item>
    </uni-forms>
    <my-button :disabled="!inviteCode" @click="handleInputInviteCode">{{$t('confirmActivation'||'确认激活')}}</my-button>
  </view>
</template>

<script>
/**
 * 事件：
 * @confirm: 验证通过
 * @failure: 验证不通过
 */

export default {

  data() {
    return {
      inviteCheckTimer: null,
      isFocus: false,
      inviteCode: ''
    };
  },
  // mounted() {
  //   if (this.inviteCheckTimer) clearTimeout(this.inviteCheckTimer)
  //   this.inviteCheckTimer = setTimeout(() => {
  //     this.$nextTick(() => {
  //       this.isFocus = true
  //     })
  //   }, 400)
  // },
  beforeDestroy() {
    if (this.inviteCheckTimer) clearTimeout(this.inviteCheckTimer)
  },
  methods: {
    // 点击确定
    handleInputInviteCode() {
      uni.showLoading();
      this.$store.dispatch('walletStore/verifyInviteCode', {
        inviteCode: this.inviteCode
      }).then(res => {
        uni.hideLoading()
        this.$emit('confirm')
      }).catch(error => {
        uni.hideLoading()
        uni.showToast({
          icon: 'none',
          title: error || this.$t('securityPwdErr' || '安全密码错误'),
          duration: 2000
        })
        this.$emit('failure')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/wallet.scss';

.myInviteVerify {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 8px;

  &-form {
    padding: 40rpx 0 0;
    display: block;

    .uni-forms-item {
      line-height: 40rpx;
      margin-bottom: 42rpx;

      .title {
        margin-bottom: 30rpx;
        font-size: 30rpx;
      }

      &-mnemonic {
        height: 372rpx;
        border: none !important;
      }
    }
  }

  .input_item {
    box-shadow: inset 0 0 0 1000px #f7f7f7 !important;

    height: 112rpx;
    display: flex;
    align-items: center;
  }

  .tips {
    margin-top: 38rpx;
    display: flex;

    .text_normal {
      font-size: 28rpx;
      text-align: left;
      color: #747c83;
      line-height: 40rpx;
    }

    .text_link {
      font-size: 28rpx;
      text-align: left;
      line-height: 40rpx;
      color: #429afb;
      margin-left: 10rpx;
    }
  }

  .btn {
    width: 690rpx;
    height: 92rpx;
    background: #010a15;
    border-radius: 46rpx;
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    line-height: 92rpx;
    margin-bottom: 16rpx;
    opacity: 1;
    color: #ffffff;

    &.disabled {
      opacity: 0.5;
      color: #e1e6ea;
      pointer-events: none;
    }
  }
}
</style>
