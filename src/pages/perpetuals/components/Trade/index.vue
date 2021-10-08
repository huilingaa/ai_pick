<template>
	<view class="Perpetuals">
		<view class="wrap">
			dsfgfdr
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				activeTab: 0,



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
	.communication {
		width: 100%;

		.wrap {
			width: 100%;
			height: 100%;

			image {
				width: 750rpx;
				height: 1624rpx;
			}

			padding-bottom: var(--window-bottom);
		}
	}
</style>
