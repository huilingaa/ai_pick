<template>
	<view class="Perpetuals">
		<my-header typeView="Perpetuals" />
		<view class="wrap">
			<v-tabs class="space" scroll='true' activeColor='#4DA2FA' fontSize='36rpx' v-model="activeTab" :scroll="false" :tabs="['Portfolio', 'Price', 'Trade']" @change="changeTab">
			</v-tabs>
			<!-- <component :is="['Portfolio','Price','Trade'][activeTab]"></component> -->
			<component :is="['Portfolio','Price'][activeTab]"></component>
			<Trade v-show="activeTab==2" ref="trade" />

		</view>
	</view>
</template>

<script>
	import Portfolio from './components/Portfolio/index.vue';
	import Price from './components/Price/index.vue';
	// import Trade from './components/Trade/index.vue';
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
		},

		onPageScroll(){
			if(this.activeTab==2){
				this.$refs.trade.onScroll()
			}
		}

	}
</script>

<style lang="scss">
	.space{
		border-bottom: 1px solid #1D262B;
	}
</style>
