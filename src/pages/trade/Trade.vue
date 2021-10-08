<template>
    <view class="trade">
        <view class="box1">
            <view class="box1__menu">
                <image class="box1__menu__img" src="../../static/images/trade/bt_sec.png" />
                <span class="box1__menu__title">BTC/USDT</span>
                <image class="box1__menu__img2" src="../../static//images/trade/ic_b_h.png" />
            </view>
            <span class="box1__money">$81155.3</span>
        </view>
        <view class="box2">
            <view class="box2__left">
                <view class="bsbtn">
                    <view class="bsbtn__btc bsbtn__btc--active">Buy</view>
                    <view class="bsbtn__usdt">Sell</view>
                </view>
                <view class="wrapInput">
                    Limit
                    <image class="selectImg" src="../../static//images/trade/ic_drop.png" />
                </view>
                <view class="wrapTitle">Limit</view>
                <view class="wrapInput">
                    0.0000
                    <view class="wrapInput__rbtn">USD</view>
                </view>
                <view class="wrapTitle">Size</view>
                <view class="wrapInput">
                    0.0000
                    <view class="wrapInput__rbtn">ETH</view>
                </view>
                <view class="table">
                    <view class="table__item">
                        <span class="table__item__name">Buying Power</span>
                        <span class="table__item__value">$1,233.74</span>
                    </view>
                     <view class="table__item">
                        <span class="table__item__name">Cost</span>
                        <span class="table__item__value">$49.35</span>
                    </view>
                     <view class="table__item">
                        <span class="table__item__name">Margin Usage</span>
                        <span class="table__item__value">0.02%</span>
                    </view>
                     <view class="table__item">
                        <span class="table__item__name">Account leverage</span>
                        <span class="table__item__value">-</span>
                    </view>
                </view>
                <view class="table">
                    <view class="table__item">
                        <div class="table__item__name">
                            <span>Fee</span>
                            <div class="name__label">Taker</div>
                        </div>
                        <span class="table__item__value">-</span>
                    </view>
                    <view class="table__item">
                        <span class="table__item__name">Total</span>
                        <span class="table__item__value">$67,686.95</span>
                    </view>
                    <view class="table__button">Place limit order</view>
                </view>
            </view>
            <view class="box2__right">
                <view class="wrapSelect">
                    <span>1 Decimal places</span>
                    <image class="select__img" src="../../static/images/trade/ic_drop.png" />
                </view>
                <view class="table2">
                    <view class="table2__colName">
                        <span class="table2__colName__left">Price</span>
                        <span>Size</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">39644.92</span>
                        <span class="table2__item__value">2.9728</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">39643.01</span>
                        <span class="table2__item__value">0.1508</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">39638.44</span>
                        <span class="table2__item__value">0.2817</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">39636.43</span>
                        <span class="table2__item__value">0.3094</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">39620.45</span>
                        <span class="table2__item__value">1.8195</span>
                    </view>
                </view>
                <view class="colTable">
                    <span class="colTable__item">Spread</span>
                    <span class="colTable__item">1.4</span>
                    <span class="colTable__item">0.05%</span>
                </view>
                <view class="table2">
                    <view class="table2__item">
                        <span class="table2__item__name">39644.92</span>
                        <span class="table2__item__value">2.9728</span>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    onShow() {},
    methods: {}
  }
</script>

<style lang='scss' scoped>
.trade{
    background: #181C1F;
}
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
.box2{
    display: flex;
    box-sizing: border-box;
    padding: 40rpx 0 40rpx 30rpx;
    color: #fff;
    &__left{
        width: 440rpx;
        .bsbtn{
            width: 100%;
            height: 60rpx;
            background: #0D1012;
            border-radius: 10rpx;
            display: flex;
            font-weight: 400;
            margin-bottom: 28rpx;
            &__btc,&__usdt{
                height: 60rpx;
                flex: 1;
                font-size: 28rpx;
                color: #A6B5BE;
                text-align: center;
                line-height: 60rpx;
            }
            &__btc{
                border-radius: 10rpx 0 0 10rpx;
                &--active{
                    background: #13A467;
                    color: #fff;
                }
            }
            &__usdt{
                border-radius: 0 10rpx 10rpx 0;
                &--active{
                    background: #CF4D65;
                    color: #fff;
                }
            }
        }
        .wrapInput{
            width: 100%;
            height: 80rpx;
            border-radius: 10rpx;
            background: #0D1012;
            position: relative;
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #fff;
            box-sizing: border-box;
            padding: 0 20rpx;
            margin-bottom: 28rpx;
            .selectImg{
                width: 16rpx;
                height: 12rpx;
                position: absolute;
                top: 36rpx;
                right: 20rpx;
            }
            &__rbtn{
                width: 100rpx;
                height: 80rpx;
                border-radius: 0 10rpx 10rpx 0;
                background: #282E33;
                text-align: center;
                line-height: 80rpx;
                position: absolute;
                top: 0;
                right: 0;
                font-size: 24rpx;
            }
        }
        .wrapTitle{
            width: 100%;
            height: 80rpx;
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #fff;
            box-sizing: border-box;
            padding: 0 20rpx;
            margin-bottom: 6rpx;
        }
        .table{
            width: 100%;
            border-radius: 10rpx;
            background: #0D1012;
            box-sizing: border-box;
            padding: 40rpx 0 20rpx;
            margin-bottom: 28rpx;
            &__item{
                display: flex;
                align-items: center;
                font-size: 24rpx;
                color: #fff;
                padding-bottom: 20rpx;
                padding-left: 20rpx;
                padding-right: 20rpx;
                &__name{
                    color: #A6B5BE;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    .name__label{
                        box-sizing: border-box;
                        padding: 0 10rpx;
                        border-radius: 4rpx;
                        background: #20262A;
                        color: #A6B5BE;
                        font-size: 20rpx;
                        text-align: center;
                        line-height: 28rpx;
                        margin-left: 8rpx;
                    }
                }
            }
            &__button{
                width: 100%;
                height: 80rpx;
                border-radius: 10rpx;
                background: #282E33;
                font-size: 32rpx;
                color: #A6B5BE;
                text-align: center;
                line-height: 80rpx;
                margin-bottom: -20rpx;
            }
        }
    }
    &__right{
        flex: 1;
        .wrapSelect{
            display: flex;
            align-items: center;
            font-size: 20rpx;
            color: #AEB9C6;
            box-sizing: border-box;
            padding: 0 20rpx;
            margin-bottom: 20rpx;
            .select__img{
                width: 16rpx;
                height: 12rpx;
                margin-left: 8rpx;
            }
        }
        .table2{
            box-sizing: border-box;
            padding: 0 20rpx;
            margin-bottom: 20rpx;
            &__colName{
                height: 60rpx;
                font-size: 20rpx;
                color: #9EA3AE;
                display: flex;
                align-items: center;
                &__left{
                    flex: 1;
                }
            }
            &__item{
                display: flex;
                align-items: center;
                height: 50rpx;
                font-size: 20rpx;
                color: #9EA3AE;
                &__name{
                    flex: 1;
                    color: #CF4D65;
                }
            }
        }
        .colTable{
            height: 10rpx;
            margin-left: 20rpx;
            height: 50rpx;
            box-sizing: border-box;
            border: 2rpx solid #1D262B;
            border-right: none;
            border-radius: 10rpx;
            font-size: 16rpx;
            color: #A6B5BE;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 6rpx;
            margin-bottom: 20rpx;
            &__item{
                margin-right: 20rpx;
            }
        }
    }
}
</style>
