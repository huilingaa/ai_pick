<template>
  <view>
    <!-- 选择钱包 -->
    <my-drop-down-box title="Digital wallets" ref="cmpwalletpopup" leftIcon="close">
      <view class="walletBox">
        <view>
          <view class="walletBox_item" v-for="(item,index) in walletLists" :key="index"
            @click="handleSwitchWallet(item.id)">
            <view class="walletBox_item-icon">
              <image :src="require(`../../static/images/wallet/ic_${item.img}@2x (1).png`)" />
            </view>
            <view class="walletBox_item-label">
              <view>{{item.name}}</view>
            </view>
            <image class="walletBox_item-back" src="../../static/images/wallet/bt_back@2x (1).png" />
          </view>
        </view>
      </view>
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
        inviteCode: '',
        currentWallet: {
          id: 1,
        },
        walletLists: [{
            id: '',
            img: 'metaMask',
            name: 'MetaMask'
          }, {
            id: '',
            img: 'walletConnect',
            name: 'WalletConnect'
          },
          {
            id: '',
            img: 'imToken',
            name: 'imToken'
          }, {
            id: '',
            img: 'tokenPocket',
            name: 'TokenPocket'
          }
        ],
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
          // if (list.length > 1) {
          //   for (let i = 0; i < list.length; i++) {
          //     if (String(list[i].id) === String(currentWalletId)) {
          //       currentWallet = list[i]
          //       list.splice(i, 1)
          //       break;
          //     }
          //   }
          //   if (!isEmpty(currentWallet)) {
          //     list.unshift(currentWallet)
          //   }
          // }
          return list




        }
      }),
      // ...mapGetters('walletStore', {
      //   currentWallet: 'currentWallet'
      // })
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


      /**
       * 选择节点
       * @param {Number} id 节点id
       */
      async handleSwitchWallet(id) {
        if (String(id) === String(this.currentWallet.id)) {
          return;
        }
        const currentWalletId = this.currentWallet.id

        await this.changeCurrentWallet(id);
        this.showInvitePopup(this.currentWallet);
        // console.log('触发切换节点');
        // this.$emit("switchWallet");
        // // this.$store.dispatch('assetStore/getAssets')
        this.$refs.cmpwalletpopup.close();

        if (id !== currentWalletId) {
          uni.showToast({
            icon: 'none',
            title: this.$t('switchSuccessfully' || '切换成功'),
          })
        }
      },



    },

  }
</script>

<style lang="scss" scoped>
  //选择节点
  .walletBox {
    padding-top: 80rpx;

    &-checkWallet {
      font-size: 28rpx;
      font-weight: bold;
      text-align: center;
      color: #429afb;
    }

    &_item {
      display: flex;

      align-items: center;
      width: 100%;
      height: 70rpx;
      position: relative;
      background: #4DA2FA;
      border-radius: 10rpx;
      margin-bottom: 38rpx;


      &.active {
        background-image: linear-gradient(270deg, #a6bcfb 0%, #989efd 19%, #53b1fe 47%, #188fda 83%, #009aff 100%);
        padding: 1px;

        .walletBox_item-info {
          border-radius: 20rpx;
          width: 100%;
          height: 100%;
          background: #071423;
          display: inline-block;

        }
      }

      &-icon {
        width: 34rpx;
        height: 34rpx;
        margin: 0 42rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }




      &-label {
        font-size: 32rpx;
        font-weight: bold;
        color: #FFFFFF;


      }

      &-back {
        width: 32.79rpx;
        height: 26.18rpx;
        position: absolute;
        right: 28rpx;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
