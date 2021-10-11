<template>
    <div>
        <scroll-view class="sv" scroll-x>
            <table>
                <tr>
                    <th>Time</th>
                    <th>Market</th>
                    <th>Payment</th>
                    <th>Funding Rate</th>
                    <th>Position</th>
                    <th>Oracle Price</th>
                </tr>
                <!-- <tr>
                    <td>08-12 11:57:58</td>
                    <td>ETH-USD</td>
                    <td class="red">-$0.0004</td>
                    <td>10%</td>
                    <td>0.000</td>
                    <td>1.000</td>
                </tr> -->
            </table>
            <view class="none">You have no past funding payments.</view>
        </scroll-view>
    </div>
</template>

<script>
export default{
    name: 'ScrollXTable'
}
</script>

<style lang='scss' scoped>
.sv{
    white-space: nowrap;
    display: flex;
    background: #181D21;
    table{
        border-collapse: collapse;
        th{
            height: 140rpx;
            background: #20262A;
            border: none;
            box-sizing: border-box;
            padding: 0 40rpx;
            color: #fff;
            font-size: 28rpx;
        }
        td{
            height: 120rpx;
            background: #181D21;
            font-size: 24rpx;
            color: #85888A;
            box-sizing: border-box;
            border-bottom: 1rpx solid #1D262B;
        }
    }
}
.green{
    color: #13A467 !important;
}
.red{
    color: #CF4D65 !important;
}
.none{
    height: 120rpx;
    background: #181D21;
    font-size: 24rpx;
    color: #85888A;
    box-sizing: border-box;
    border-bottom: 1rpx solid #1D262B;
    padding-left: 40rpx;
    line-height: 120rpx;
}
</style>
