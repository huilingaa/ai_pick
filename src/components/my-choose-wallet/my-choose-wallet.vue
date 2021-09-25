<template>
  <view>
    <!-- 选择节点 -->
    <my-drop-down-box :title="$t('chooseWallet'||'选择节点')" ref="cmpwalletpopup" leftIcon="close">
      <view class="walletBox">
        <view>
          <view class="walletBox_item" v-for="(item,index) in walletList" :key="index" @click="handleSwitchWallet(item.id)"
            :class="{active: item.id === currentWallet.id}">
            <view class="walletBox_item-info">
              <view class="walletBox_item-label">
                <view>{{item.name}}</view>
                <view class="walletBox_item-tag" v-if="item.id === currentWallet.id">{{$t('currentWallet'||'当前节点')}}</view>
                <view class="walletBox_item-type" v-if="!item.inviteCode">{{$t('notActive'||'未激活')}}</view>
              </view>
              <view class="walletBox_item-value">
                <text>{{item.address | encryption}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <template #right>
        <view @click="handleOpenWallet" class="walletBox-checkWallet" hover-class="none">{{$t('manageWallet'||'管理节点')}}</view>
      </template>
    </my-drop-down-box>
    <my-drop-down-box :title="$t('activateWallet'||'激活节点')" ref="indexInviteVerify">
      <my-invite-verify @confirm="handleIndexCanfirmVerifyInvite" />
    </my-drop-down-box>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  import {
    deepcClone,
    isEmpty
  } from '../../utils/index.js'

  export default {
    data() {
      return {
        inviteCheckTimer: null,
        isFocus: false,
        inviteCode: ''
      };
    },
    computed: {
      ...mapState('walletStore', {
        walletList: (state) => {
          // 将激活的节点移动到第一位
          const currentWalletId = state.currentWallet
          const list = deepcClone(state.walletList)
          let currentWallet = {}

          // 只有一个节点时，这个节点就是默认节点
          if (list.length > 1) {
            for (let i = 0; i < list.length; i++) {
              if (String(list[i].id) === String(currentWalletId)) {
                currentWallet = list[i]
                list.splice(i, 1)
                break;
              }
            }
            if (!isEmpty(currentWallet)) {
              list.unshift(currentWallet)
            }
          }




          return list
        }
      }),
      ...mapGetters('walletStore', {
        currentWallet: 'currentWallet'
      })
    },
    methods: {
      ...mapActions('walletStore', ['changeCurrentWallet']),
      showInvitePopup(currentWallet) {
        console.log(currentWallet, 'currentWallet')
        if (!currentWallet.inviteCode) {
          this.$nextTick(() => {
            this.$refs.indexInviteVerify.open();
          })
        }
      },
      // 打开弹窗
      open() {
        console.log('打开弹窗1');
        this.$refs.cmpwalletpopup.open()
      },

      // 关闭弹窗
      close() {
        this.$refs.cmpwalletpopup.close()
      },

      /**
       * 选择节点
       * @param {Number} id 节点id
       */
      async handleSwitchWallet(id) {
        if (String(id) === String(this.currentWallet.id)){
          return;
        }
        console.log('点击节点id', id);
        console.log('当前节点id', this.currentWallet.id);
        const currentWalletId = this.currentWallet.id

        await this.changeCurrentWallet(id);
        this.showInvitePopup(this.currentWallet);
        console.log('触发切换节点');
        this.$emit("switchWallet");
        this.$store.dispatch('assetStore/getAssets')
        this.$refs.cmpwalletpopup.close();

        if (id !== currentWalletId) {
          uni.showToast({
            icon: 'none',
            title: this.$t('switchSuccessfully' || '切换成功'),
          })
        }
      },
      handleOpenWallet() {
        uni.showTabBar()
        this.$refs.cmpwalletpopup.close();
        uni.navigateTo({
          url: "/pages/wallet/wallet-management"
        })
      },
      openInviteCode() {
        uni.hideTabBar()
        this.$refs.indexInviteVerify.open()
      },
      closeInviteCode() {
        uni.showTabBar()
        this.$refs.indexInviteVerify.close()
      },
      // 激活节点验证成功
      handleIndexCanfirmVerifyInvite() {
        uni.showToast({
          icon: 'none',
          title: this.$t('activatedSuccessfully' || '激活成功'),
          duration: 1500,
          success: () => {
            this.$refs.indexInviteVerify.close();
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  //选择节点
  .walletBox {
    padding-top: 8rpx;

    &-checkWallet {
      font-size: 28rpx;
      font-weight: bold;
      text-align: center;
      color: #429afb;
      line-height: 40rpx;
    }

    &_item {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 158rpx;
      background: #010a15;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      padding: 30rpx;

      &.active {
        background-image: linear-gradient(270deg, #a6bcfb 0%, #989efd 19%, #53b1fe 47%, #188fda 83%, #009aff 100%);
        padding: 1px;

        .walletBox_item-info {
          border-radius: 20rpx;
          width: 100%;
          height: 100%;
          background: #071423;
          display: inline-block;
          padding: 30rpx;
        }
      }

      &-tag {
        height: 40rpx;
        background: linear-gradient(314deg, #e3c9ff 0%, #a7a5ff 26%, #49bdff 57%, #0c6cd5 100%);
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        color: #091e34;
        margin-left: 12rpx;
        padding: 0 8rpx;
      }

      &-type {
        font-size: 24rpx;
        font-weight: 500;
        text-align: left;
        color: #429afb;
        margin-left: 12rpx;
      }

      &-label {
        font-size: 32rpx;
        font-weight: bold;
        color: #e1e6ea;
        line-height: 44rpx;
        height: 44rpx;
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;
      }

      &-value {
        font-size: 28rpx;
        font-family: DIN-Regular;
        color: #a8aaad;
        line-height: 34rpx;
      }
    }
  }
</style>
