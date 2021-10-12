<template>
    <div>
        <view class="box1">
            <view class="box1__menu" @click="show_ethOrBtc=!show_ethOrBtc">
                <image class="box1__menu__img" src="../../../static/images/trade/bt_sec.png" />
                <span class="box1__menu__title">BTC/USDT</span>
                <image class="box1__menu__img2" src="../../../static//images/trade/ic_b_h.png" />
            </view>
            <span class="box1__money">$81155.3</span>
        </view>
        <view class="bz" :class="{'bz--show':show_ethOrBtc}" @click="show_ethOrBtc=false">
            <view class="bz__wrap" :class="{'bz__wrap--show':show_ethOrBtc}">
                <view class="bz__item">
                    <image class="bz__item__img" src='../../../static/images/trade/eth.png'/>
                    <view class="bz__item__titleBox">
                        <span class="bz__item__titleBox__title">Ethereum</span>
                        <span class="bz__item__titleBox__subTitle">ETH-USD</span>
                    </view>
                    <span class="bz__item__money">$2,013.52</span>
                    <view class="bz__item__rate">+5.35%</view>
                </view>
                <view class="bz__item bz__item--btc">
                    <image class="bz__item__img" src='../../../static/images/trade/btc.png'/>
                    <view class="bz__item__titleBox">
                        <span class="bz__item__titleBox__title">Bitcoin</span>
                        <span class="bz__item__titleBox__subTitle">BTC-USD</span>
                    </view>
                    <span class="bz__item__money">$2,013.52</span>
                    <view class="bz__item__rate">-0.24%</view>
                </view>
            </view>
        </view>
    </div>
</template>

<script>
export default{
    name: 'Nav-EthBtc',
    data(){
        return{
            show_ethOrBtc: false,
        }
    }
}
</script>

<style lang='scss' scoped>
.box1{
    height: 116rpx;
    background: #181C1F;
    box-sizing: border-box;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #1C2429;
    display: flex;
    align-items: center;
    &__menu{
        display: flex;
        align-items: center;
        height: 100%;
        &__img{
            width: 40rpx;
            height: 40rpx;
            margin-right: 20rpx;
        }
        &__title{
            font-size: 40rpx;
            color: #fff;
            margin-right: 20rpx;
        }
        &__img2{
            width: 36rpx;
            height: 36rpx;
        }
    }
    &__money{
        flex: 1;
        text-align: right;
        font-size: 32rpx;
        color: #CF4D65;
    }
}
.bz{
    width: 100vw;
    height: 100vh;
    position: fixed;
    // top: 116rpx;
    top: 276rpx;
    left: 0;
    z-index: 99999;
    transform: translateY(-200%);
    transition: transform 0s linear 0.5s;
    &--show{
        transform: translateY(0);
        transition: transform 0s;
    }
    &__wrap{
        width: 100%;
        border-radius: 0 0 10rpx 10rpx;
        background: #282E33;
        box-sizing: border-box;
        padding: 0 30rpx;
        height: 0;
        overflow: hidden;
        transition: all 0.5s;
        &--show{
            height: 280rpx;
        }
        .bz__item{
            width: 100%;
            height: 140rpx;
            box-sizing: border-box;
            border-bottom: 1rpx solid #1D262B;
            display: flex;
            align-items: center;
            &__img{
                width: 48rpx;
                height: 48rpx;
                margin-right: 16rpx;
            }
            &__titleBox{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                &__title{
                    font-size: 28rpx;
                    color: #fff;
                    font-weight: 500;
                    margin-bottom: 8rpx;
                    margin-top: 26rpx;
                }
                &__subTitle{
                    font-size: 40rpx;
                    color: #8F9295;
                    transform-origin: 0 0;
                    transform: scale(0.5, 0.5);
                }
            }
            &__money{
                flex: 1;
                font-size: 28rpx;
                color: #13A467;
                text-align: center;
            }
            &__rate{
                min-width: 120rpx;
                height: 46rpx;
                border-radius: 4rpx;
                color: #fff;
                font-size: 24rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 0 16rpx;
                background: #13A467;
            }
            &--btc{
                .bz__item__money{
                    color: #CF4D65;
                }
                .bz__item__rate{
                    background: #CF4D65;
                }
            }
        }
    }
}
</style>
