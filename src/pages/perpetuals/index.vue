<template>
	<view class="Perpetuals">
		<my-header typeView="Perpetuals" />
		<view class="wrap">
			<v-tabs class="space" scroll='true' activeColor='#4DA2FA' fontSize='36rpx' v-model="activeTab" :scroll="false" :tabs="['Portfolio', 'Price', 'Trade']" @change="changeTab">
			</v-tabs>
			<component :is="['Portfolio','Price','Trade'][activeTab]"></component>

		</view>
	</view>
</template>

<script>
	import Portfolio from './components/Portfolio/index.vue';
	import Price from './components/Price/index.vue';
	import Trade from './components/Trade/index.vue';

	export default {
		data() {
			return {

				activeTab: 0,



			}
		},
		components: {
			Portfolio,
			Price,
			Trade
		},

		onShow() {


		},

		methods: {
			changeTab(index) {
				console.log('当前选中的项：' + index)
			}
		}

	}
</script>

<style lang="scss">
	.space{
		border-bottom: 1px solid #1D262B;
	}
</style>
