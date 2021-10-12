<template>
	<view class="Perpetuals">
		<my-table title="Open Positions" :column="column" :tableData="tableData"  emptyText="You have no open position."/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				column:['Market','Side','Size','Leverage','Liq.Price/Oracle','Unrealized P&L','Realized P&L','Realized P&L','Average Open/Close'],
        tableData:[],
			};
		},
		onShow() {

		},
		methods: {
			// changeTab(index) {
			// 	console.log('当前选中索引：' + index)
			// }
		}

	}
</script>

<style lang="scss">

</style>
