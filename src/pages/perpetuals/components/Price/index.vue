<template>
	<view class="Perpetuals">
		<view class="full">
			<view class="full">
				<image src="/static/shuijiao.jpg" style="width: 750upx;height: 200px;"></image>
				<!-- 注意这里图片的高度，必须是偶数。否则在H5端的部分chrome版本上会触发chrome的bug，在标题栏下方会留下一条线的空隙 -->
			</view>
			<view class="sticky-box">
				<view style="width: 250upx;text-align: center;"><text class="textcenter">条件1</text></view>
				<view style="width: 250upx;text-align: center;"><text class="textcenter">条件2</text></view>
				<view style="width: 250upx;text-align: center;"><text class="textcenter">条件3</text></view>
			</view>
			<view>
				<text style="line-height: 90px;" class="textcenter">
					1
					2
					3
					4
					5
					6
					7
					8
					9
					10
					456
					456
					
					456
					456
					456
					464
					
					456
					456
				</text>
			</view>
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
	.Perpetuals {
		.sticky-box {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			position: -webkit-sticky;
			/* #endif */
			position: sticky;
			
			top: calc(var(--window-top) + 48px);
			z-index: 4;
			flex-direction: row;
			margin: 0px;
			padding: 15px 0 15px 0;
			background-color: #F4F5F6;
			border-bottom-style: solid;
			border-bottom-color: #E2E2E2;
		}

		.textcenter {
			text-align: center;
			font-size: 18px;
		}
	}
</style>
