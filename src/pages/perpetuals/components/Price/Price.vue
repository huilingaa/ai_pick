<template>
    <view class="price">
        <NavEthBtc @ChangeSymbol='ChangeSymbol' />
        <view class="moneyBox">
            <view class="moneyBox__left">
                <h1 class="bigMoney">{{btcData.price}}</h1>
                <view class="rateMoney">
                    <span class="rateMoney__item">{{btcData.chg}}</span>
                    <span class="rateMoney__item">{{btcData.chgPrice}}</span>
                </view>
            </view>
            <view class="moneyBox__right">
                <view class="moneyBox__right__item">
                    <span>高</span>
                    <span class="moneyBox__right__item__money">{{btcData.high}}</span>
                </view>
                <view class="moneyBox__right__item">
                    <span>低</span>
                    <span class="moneyBox__right__item__money">{{btcData.low}}</span>
                </view>
                <view class="moneyBox__right__item">
                    <span>开</span>
                    <span class="moneyBox__right__item__money">{{btcData.open}}</span>
                </view>
            </view>
        </view>
        <KLine ref='kline' />
        <scroll-view scroll-x class="nav">
            <view class="nav__item" :class="{'nav__item--active':show_content=='0'}"
                @click="show_content='0'">
                Book
            </view>
            <view class="nav__item" :class="{'nav__item--active':show_content=='1'}"
                @click="show_content='1'">
                Trades
            </view>
            <view class="nav__item" :class="{'nav__item--active':show_content=='2'}"
                @click="show_content='2'">
                Depth
            </view>
            <view class="nav__item" :class="{'nav__item--active':show_content=='3'}"
                @click="show_content='3'">
                Funding
            </view>
            <view class="nav__item" :class="{'nav__item--active':show_content=='4'}"
                @click="show_content='4'">
                Details
            </view>
        </scroll-view>

        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='0'">
            <view class="content">
                <Book />
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='1'">
            <view class="content">
                <Trades />
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='2'">
            <view class="content">
                <!-- <Depth /> -->
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='3'">
            <view class="content">
                <Funding />
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='4'">
            <view class="content">
                <Details />
            </view>
        </uni-transition>

        <view class="btBtn">
            <view class="btBtn__item btBtn__item__left">Buy</view>
            <view class="btBtn__item btBtn__item__right">Sell</view>
        </view>
    </view>
</template>

<script>
import NavEthBtc from '../../../trade/components/Nav-EthBtc'
import KLine from './components/KLine.vue'
import Book from './components/Book.vue'
import Trades from './components/Trades'
import Depth from './components/Depth.vue'
import Funding from './components/Funding'
import Details from './components/Details'

import { mapState, mapActions } from "vuex"

export default{
    name: 'Price',
    components: { NavEthBtc, KLine, Book, Trades, Depth, Funding, Details },
    data(){
        return {
            show_content: '0'
        }
    },
    methods:{
        ChangeSymbol(symbol){
            this.$refs.kline.ChangeSymbol(symbol)
        }
    },
    mounted(){
    },
    computed: {
        ...mapState('priceStore',['btcData'])
    }
}
</script>

<style lang='scss' scoped>
@import '../../../trade/common/uni-nvue';
.price{
    background: #181C1F;
    padding-bottom: 120rpx;
}
.moneyBox{
    display: flex;
    height: 180rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    align-items: center;
    &__left{
        // height: 100%;
        flex: 1;
        .bigMoney{
            font-size: 56rpx;
            color: #13A467;
            font-weight: 600;
            margin-bottom: 10rpx;
        }
        .rateMoney{
            font-size: 28rpx;
            color: #13A467;
            &__item{
                margin-right: 20rpx;
            }
        }
    }
    &__right{
        &__item{
            font-size: 24rpx;
            color: #A6B5BE;
            text-align: right;
            margin-bottom: 12rpx;
            &__money{
                margin-left: 26rpx;
            }
        }
    }
}
.nav{
    height: 100rpx;
    background: #20262A;
    white-space: nowrap;
    display: flex;
    position: sticky;
    // top: 88rpx;
    top: 158rpx;
    left: 0;
    z-index: 998;
    &__item{
        height: 100rpx;
        box-sizing: border-box;
        // padding: 0 30rpx;
        width: 20%;
        line-height: 100rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fff;
        font-weight: 600;
        display: inline-block;
        border-bottom: 1rpx solid #20262A;
        transition: all 0.5s;
        &--active{
            color: #4DA2FA;
            border-bottom: 1rpx solid #4DA2FA;
        }
    }
}
.content{
    box-sizing: border-box;
    padding-top: 40rpx;
}
.btBtn{
    width: 100vw;
    height: 120rpx;
    background: #20262A;
    position: fixed;
    left: 0;
    bottom: 100rpx;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    &__item{
        width: 320rpx;
        height: 80rpx;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #fff;
        background: #13A467;
    }
    &__item__left{
        margin-right: 28rpx;
    }
    &__item__right{
        background: #CF4D65;
    }
}
</style>
