<template>
  <!-- 安全密码校验组件 -->
  <view class="myPwdCheck">
    <view class="top">
      <uni-forms class="wallet-form myPwdCheck-form" label-position="top" label-width="400" ref="form">
        <uni-forms-item>
          <uni-easyinput :inputBorder="false" :focus="isFocus" trim :clearSize="18" type="password" label="oldPassword"
            v-model="pwd" :placeholder="$t('enterSecurepassword'||'请输入安全密码')" ref="pwdCheckRef" />
        </uni-forms-item>
      </uni-forms>
      <view class="tips">
        <text class="text_normal">{{$t('forgetpwdNeedNeset'||'如忘记密码需重新')}}</text>
        <view class="text_link" @click="handleOpenImportWallet"><text>{{$t('importMnemonicword'|| '导入助记词')}}</text></view>
      </view>
    </view>
    <my-button :disabled="pwd.length<1" v-debounce="onConfirm">{{$t('definite'||'确定')}}</my-button>
  </view>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  /**
   * 事件：
   * @confirm: 验证通过
   * @failure: 验证不通过
   */

  export default {
    props: {
      walletId: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        pwdCheckTimer: null,
        isFocus: false,
        pwd: '',
        id: ''
      };
    },
    computed: {
      ...mapGetters('walletStore', ['currentWallet'])
    },
    mounted() {
      if (this.pwdCheckTimer) clearTimeout(this.pwdCheckTimer)
      this.id = this.walletId;
      if (!String(this.walletId)){
        this.id = this.currentWallet.id
      }
      this.pwdCheckTimer = setTimeout(() => {
        this.$nextTick(() => {
          this.isFocus = true
        })
      }, 400)
    },
    beforeDestroy() {
      if (this.pwdCheckTimer) clearTimeout(this.pwdCheckTimer)
    },
    methods: {
      handleOpenImportWallet(){
        uni.navigateTo({
          url: "/pages/wallet/import-wallet?type=change-password&id="+this.id
        })
      },
      // 点击确定
      onConfirm() {
        // console.log('');
        this.$store.dispatch('walletStore/checkPassword', {password: this.pwd, id:this.id}).then(item => {
          this.$emit('confirm')
          return
        }).catch(error => {
          uni.showToast({
            icon: 'none',
            title: this.$t('securityPwdErr' || '安全密码错误'),
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

  .myPwdCheck {
    width: 100%;
    height: 100%;
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
      flex-wrap: wrap;
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
        color: #429AFB;
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
      color: #FFFFFF;

      &.disabled {
        opacity: 0.5;
        color: #e1e6ea;
        pointer-events: none;
      }
    }
  }
</style>
