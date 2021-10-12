<template>
  <view class="Perpetuals">
    <my-table title="Fees" :column="column" :tableData="tableData" emptyText="You have no fees." />

  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

        column: ['Level', "From(30D Volumeof Taker)", "From(30D Volumeof Taker)", 'Maker(get)','Taker(Pay)'],
        tableData: [],



      };
    },
    onShow() {


    },

    methods: {
      changeTab(index) {
        console.log('当前选中索引：' + index)
      }
    }

  }
</script>

<style lang="scss">

</style>
