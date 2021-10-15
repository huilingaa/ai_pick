<template>
  <view class="Perpetuals">
    <view class="wrap">
      <view class="tabsBox">
        <v-tabs class="tab" height="110rpx" :fixed="true"  v-model="activeTab" activeColor='#4DA2FA' :scroll="false"
          :tabs="['Overview','Positions','Orders','Fees','History']" @change="changeTab" />
      </view>
      <view class="line"></view>
      <component :is="['Overview','Positions','Orders','Fees','History'][activeTab]"></component>
    </view>
  </view>
</template>

<script>
  import Fees from './components/Fees.vue';
  import History from './components/History.vue';
  import Orders from './components/Orders.vue';
  import Overview from './components/Overview.vue';
  import Positions from './components/Positions.vue';
  export default {
    data() {
      return {
        activeTab: 0,
      };
    },
    onShow() {},
    components: {
      Fees,
      History,
      Orders,
      Positions,
      Overview
    },
    methods: {
      changeTab() {}
    }

  }
</script>

<style lang="scss">



</style>
