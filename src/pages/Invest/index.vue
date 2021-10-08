<template>
	<view class="invest">
		<my-header />
		<view class="wrap">
			<image :src="require(`../../static/images/bg_invest.png`)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.invest {
		width: 100%;

		.wrap {
			width: 100%;
			height: 100%;

			image {
				width: 750rpx;
				height: 4328rpx;
			}

			padding-bottom: var(--window-bottom);
		}
	}
</style>
