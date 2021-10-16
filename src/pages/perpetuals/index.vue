<template>
  <view class="Perpetuals">
    <my-header typeView="Perpetuals" />
    <view class="wrap">
      <v-tabs class="space" :fixed="true" paddingItem="0 30rpx" activeColor='#4DA2FA' fontSize='36rpx'
        v-model="activeTab" :scroll="true" :tabs="['Portfolio', 'Price', 'Trade']" @change="changeTab">
      </v-tabs>
      <keep-alive>
        <component :is="['Portfolio','Price','Trade'][activeTab]"
          :ref="['Portfolio','Price','Trade'][activeTab]"
          @toTrade='toTrade'>
        </component>
      </keep-alive>
    </view>
    <my-choose-wallet v-if="!connectAddressId" ref="assetWalletPopup" />
  </view>
</template>

<script>
  import Portfolio from './components/Portfolio/index.vue';
  import Price from './components/Price/Price.vue';
  // import Trade from './components/Trade/index.vue';
  // import Price from './components/Price/index.vue';
  import Trade from '../trade/Trade.vue'
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        activeTab: 0,
      }
    },
    computed: {
      ...mapGetters('walletStore', ['connectAddressId', 'walletName']),
    },
    mounted() {
      this.$bus.$on("ConnectWallet", () => {
        this.$refs.assetWalletPopup.open()
      })
    },
    components: {
      Portfolio,
      Price,
      Trade
    },
    onShow() {},
    methods: {
      changeTab(index) {
        console.log('当前选中的项：' + index)
      },
      toTrade(param){
        this.activeTab = 2
        setTimeout(()=>{
          this.$refs.Trade.switchBuyOrSell(param)
        },300)
      }
    }
  }
</script>

<style lang="scss">

</style>
