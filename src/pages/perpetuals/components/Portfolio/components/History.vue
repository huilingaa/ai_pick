<template>
  <view class="Perpetuals">
    <view class="tabsBox">

      <v-tabs v-model="activeTab" paddingItem="0 30rpx"  :fixed="true"  bgColor="#20262A" height="134rpx" activeColor='#4DA2FA'
        :scroll="true" :tabs="['Trades','Transfers','Funding']" @change="changeTab" />

      <my-table v-show="activeTab==0" title="" :column="column0" :tableData="tableData"
        emptyText="You have no trade history" />
      <my-table v-show="activeTab==1" title="" :column="column1" :tableData="tableData"
        emptyText="You have no transfer history" />
      <my-table v-show="activeTab==2" title="" :column="column2" :tableData="tableData"
        emptyText="You have no past funding payments." />

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

        activeTab: 0,
        column0: ['Time', 'Market', 'Side', 'Amount/Filled', 'Total/Fee', 'Type', 'Liquidity'],
        column1: ['Time', 'Action', 'Status', 'Amount/Fee', 'Transaction'],
        column2: ['Time', 'Market', 'Payment', 'Funding Rate', 'Position', 'Oracle Price'],
        tableData:[],
       

      };
    },
    onShow() {


    },

    methods: {
      changeTab(index) {
        this.activeTab = index
        console.log('当前选中索引：' + index)
      }
    }

  }
</script>

<style lang="scss">
  .tabsBox {
    // margin: 20rpx 10rpx 20rpx 10rpx;

  }
</style>
