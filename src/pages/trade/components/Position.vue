<template>
    <view class="wrap">
        <view class="topBox">
                <h1 class="topBox__h1">ETH-USD</h1>
                <span class="topBox__h2">Sell 10X</span>
                <view class="topBox__btn">Close Position</view>
        </view>
        <view class="tableC">
                <view class="tableC__item">
                    <view class="tableC__item__key">Average Open</view>
                    <view class="tableC__item__value">790.1 USD</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Average Close</view>
                    <view class="tableC__item__value">800.0 USD</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Net Funding</view>
                    <view class="tableC__item__value">-</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Liquidation Price</view>
                    <view class="tableC__item__value">900.1 USD</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Unrezlized P&amp;L</view>
                    <view class="tableC__item__value">0.0 USD</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Realized P&amp;L</view>
                    <view class="tableC__item__value">0.8 USD</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Open Interest</view>
                    <view class="tableC__item__value">20.00 ETH</view>
                </view>
                <view class="tableC__item">
                    <view class="tableC__item__key">Leverage</view>
                    <view class="tableC__item__value">1.12 X</view>
                </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Position'
}
</script>

<style lang='scss' scoped>
.topBox{
        height: 100rpx;
        background: #20262A;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        &__h1{
            font-size: 36rpx;
            color: #fff;
            font-weight: 500;
            margin-right: 20rpx;
        }
        &__h2{
            font-size: 28rpx;
            color: #CD4F66;
            flex: 1;
        }
        &__btn{
            min-width: 140rpx;
            height: 56rpx;
            box-sizing: border-box;
            padding: 0 20rpx;
            border-radius: 10rpx;
            background: #282E33;
            text-align: center;
            line-height: 56rpx;
            color: #A6B5BE;
            font-size: 24rpx;
        }
    }
    .tableC{
        background: #121619;
        box-sizing: border-box;
        padding: 20rpx 30rpx;
        &__item{
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: #A6B5BE;
            margin-bottom: 22rpx;
            &__key{
                flex: 1;
            }
        }
    }
    .topBox2{
        height: 120rpx;
        background: #20262A;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
        &__titleBox{
            display: flex;
            align-items: center;
        }
        &__time{
            font-size: 20rpx;
            color: #A6B5BE;
            margin-top: 8rpx;
        }
        .topBox__btn{
            position: absolute;
            right: 30rpx;
        }
    }
    .divider{
        height: 40rpx;
        background: #181C1F;
    }
.greenColor{
    color: #13A467 !important;
}
</style>
