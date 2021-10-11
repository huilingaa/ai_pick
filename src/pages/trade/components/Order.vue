<template>
    <view class="wrap">
        <view class="topBox2">
                    <view class="topBox2__titleBox">
                        <h1 class="topBox__h1">ETH-USD</h1>
                        <span class="topBox__h2 greenColor">Buy</span>
                    </view>
                    <view class="topBox2__time">08-12 11:57:58</view>
                    <view class="topBox__btn">Cancel</view>
        </view>
        <view class="tableC">
                    <view class="tableC__item">
                        <view class="tableC__item__key">Amount</view>
                        <view class="tableC__item__value">10.000 ETH</view>
                    </view>
                    <view class="tableC__item">
                        <view class="tableC__item__key">Price</view>
                        <view class="tableC__item__value">$81110.0</view>
                    </view>
                    <view class="tableC__item">
                        <view class="tableC__item__key">Filled</view>
                        <view class="tableC__item__value">5.000 ETH</view>
                    </view>
        </view>
        <view class="divider"></view>
        <view class="topBox2">
                    <view class="topBox2__titleBox">
                        <h1 class="topBox__h1">ETH-USD</h1>
                        <span class="topBox__h2">Sell</span>
                    </view>
                    <view class="topBox2__time">08-12 11:57:58</view>
                    <view class="topBox__btn">Cancel</view>
        </view>
        <view class="tableC">
                    <view class="tableC__item">
                        <view class="tableC__item__key">Amount</view>
                        <view class="tableC__item__value">10.000 ETH</view>
                    </view>
                    <view class="tableC__item">
                        <view class="tableC__item__key">Price</view>
                        <view class="tableC__item__value">$81110.0</view>
                    </view>
                    <view class="tableC__item">
                        <view class="tableC__item__key">Filled</view>
                        <view class="tableC__item__value">0</view>
                    </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'Order'
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
