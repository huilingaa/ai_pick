<template>
	<view class="Perpetuals">
		<my-table title="Orders" :column="column" :tableData="tableData" emptyText="You have no orders."/>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

		column:['Market','Status','Side','Amount/Filled','Price','Trigger','Good Til'],
		tableData:[],



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
