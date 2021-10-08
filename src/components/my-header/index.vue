<template>
	<view>
		<!-- 自定义导航 -->
		<my-navbar backgroundColor="#181C1F" class="index_header" fixed>
			<template #left>
				<navigator v-if="typeView=='Perpetuals'" class="header" hover-class="none" url="/pages/index/msg-list">
					<image class="header_san" src="/static/images/headerSan.png" mode="aspectFit"></image>
					<view class="header_font">Perpetuals</view>
				</navigator>
				<view v-else class="header">
					<image class="header_icon" src="/static/images/logo.png" mode="aspectFit"></image>
				</view>
			</template>
			<template #right>
				<view @click.stop="handleSwitchPurse" class="ConnectWallet">Connect Wallet</view>
			</template>
		</my-navbar>
		<my-choose-wallet ref="assetWalletPopup"></my-choose-wallet>
	</view>
</template>

<script>
	export default {
		props: {
			typeView: {
				type: String,
				default: ''
			},
		},
		mounted() {
		  console.log('typeView',this.typeView)
		  
		},
	

		methods: {
			// 选择 钱包
			handleSwitchPurse() {
				console.log('选择 钱包',this.$refs.assetWalletPopup);
				this.$refs.assetWalletPopup.open()
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../styles/mixin.scss';
	.index_header{
		z-index:1000;
	}

	// 钱包按钮
	.ConnectWallet {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 600;
		line-height: 56rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
		width: 232rpx;
		height: 56rpx;
		background: #4DA2FA;
		opacity: 1;
		border-radius: 10rpx;
	}

	.header {
		@include extend-click(24rpx);
		display: flex;
		align-items: center;

		.header_icon {
			width: 174.38rpx;
			height: 57.79rpx;
		}
		.header_san{
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
		.header_font{
		line-height: 57.79rpx;
			font-size: 36rpx;
			font-weight: 500;
		}
	}
</style>
