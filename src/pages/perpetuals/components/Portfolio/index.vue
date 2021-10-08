<template>
	<view class="Perpetuals">
		<view class="wrap">
			<view class="tabsBox">
				<v-tabs    v-model="activeTab" activeColor='#4DA2FA' :scroll="false" :tabs="['Overview','Positions','Orders','Fees','History']" @change="changeTab" />
				
			</view>
		
			<component :is="['Overview','Positions','Orders','Fees','History'][activeTab]"></component>
		</view>
	</view>
</template>

<script>
	import Fees from './components/Fees.vue';
	import History from './components/History.vue';
	import Orders from './components/Orders.vue';
	import Overview from './components/Overview.vue';
	import Positions from './components/Positions.vue';
	export default {
		data() {
			return {
				activeTab: 0,
			};
		},
		onShow() {},
		components: {
			Fees,
			History,
			Orders,
			Positions,
			Overview
		},

		methods: {

		}

	}
</script>

<style lang="scss">
	.tabsBox{
		margin: 28rpx 10rpx 20rpx 10rpx;
		
	}
	
</style>
