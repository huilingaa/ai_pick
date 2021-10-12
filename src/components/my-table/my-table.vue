<template>
  <view>
    <view class="uni-container">
      <view class="title" v-if="title">{{title}}</view>
      <uni-table   :emptyText="emptyText" class="table">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th v-for="(item,index) in column" :key="index" align="center">{{item}}</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="(item,index) in tableData" :key="index">
          <uni-td>{{item.name}}</uni-td>
          <uni-td>Jeson</uni-td>
          <uni-td>北京市海淀区</uni-td>
          <uni-td>Jeson</uni-td>
          <uni-td>北京市海淀区</uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script>
  import uniTable from './uni_modules/uni-table/components/uni-table/uni-table.vue'
  import uniTh from './uni_modules/uni-table/components/uni-th/uni-th.vue'
  import uniTr from './uni_modules/uni-table/components/uni-tr/uni-tr.vue'
  import uniTd from './uni_modules/uni-table/components/uni-td/uni-td.vue'

  export default {
    data() {
      return {
        // 每页数据量
        pageSize: 10,
        // 当前页
        pageCurrent: 1,
        // 数据总量
        total: 0,
        loading: false
      }
    },
    components: {
      uniTable,
      uniTh,
      uniTr,
      uniTd
    },
    props: ['title','tableData','column','emptyText'],
    onLoad() {
      this.selectedIndexs = []
    },
    methods: {

      // 分页触发
      change(e) {
        this.$refs.table.clearSelection()
        this.selectedIndexs.length = 0
        this.getData(e.current)
      },


    }
  }
</script>

<style>
  /* #ifndef H5 */
  page {
    padding-top: 85px;
  }

  /* #endif */
  .uni-group {
    display: flex;
    align-items: center;
  }
  .table{
    border-top:2rpx solid #181D21;
  }

  .title {
    margin-top: 60rpx;
    margin-bottom: 30rpx;
    padding-left: 30rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 44rpx;
    color: #FFFFFF;
    opacity: 1;
  }
</style>
