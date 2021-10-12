<template>
	<view class="Perpetuals">
		<my-header typeView="Perpetuals" />
		<view class="wrap">
			<v-tabs class="space" :fixed="true"  paddingItem="0 30rpx" activeColor='#4DA2FA' fontSize='36rpx' v-model="activeTab" :scroll="true" :tabs="['Portfolio', 'Price', 'Trade']" @change="changeTab">
			</v-tabs>
			<!-- <component :is="['Portfolio','Price','Trade'][activeTab]"></component> -->
			<Portfolio v-show="activeTab==0" />
			<Price v-show="activeTab==1" />
			<Trade v-show="activeTab==2" />
		</view>
	</view>
</template>

<script>
	import Portfolio from './components/Portfolio/index.vue';
	// import Price from './components/Price/index.vue';
	// import Trade from './components/Trade/index.vue';
	import Price from './components/Price/Price.vue';
	import Trade from '../trade/Trade.vue'

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

	}
</style>
