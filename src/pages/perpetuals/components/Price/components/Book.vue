<template>
    <div>
        <scroll-view class="sv" scroll-x>
            <table>
                <tr>
                    <th>
                      <div class="wrap__th">
                        <span class="th__title">Size</span>
                        <div class="th__label">ETH</div>
                      </div>
                    </th>
                    <th>
                      <div class="wrap__th">
                        <span class="th__title">Price</span>
                        <div class="th__label">USD</div>
                      </div>
                    </th>
                    <th>
                      <div class="wrap__th">
                        <span class="th__title">Mine</span>
                      </div>
                    </th>
                </tr>
                <tr>
                  <td>180.420</td>
                  <td>3225.5</td>
                  <td>-</td>
                </tr>
                 <tr>
                  <td>180.420</td>
                  <td>3225.5</td>
                  <td>-</td>
                </tr>
                 <tr>
                  <td>180.420</td>
                  <td>3225.5</td>
                  <td>-</td>
                </tr>
                 <tr>
                  <td>180.420</td>
                  <td>3225.5</td>
                  <td>-</td>
                </tr>
            </table>
            <table class="table2">
              <tr>
                <th>Spread</th>
                <th>1.4</th>
                <th>0.05%</th>
              </tr>
              <tr>
                <td>180.420</td>
                <td>3225.5</td>
                <td>-</td>
              </tr>
              <tr>
                <td>180.420</td>
                <td>3225.5</td>
                <td>-</td>
              </tr>
              <tr>
                <td>180.420</td>
                <td>3225.5</td>
                <td>-</td>
              </tr>
            </table>
        </scroll-view>
    </div>
</template>

<script>
export default {
    name: 'Book'
}
</script>

<style lang='scss' scoped>
.sv{
    white-space: nowrap;
    display: flex;
    background: #181C1F;
    table{
        border-collapse: collapse;
        th{
          min-width: 250rpx;
          box-sizing: border-box;
          padding: 0 40rpx 20rpx;
          .wrap__th{
            display: flex;
            align-items: center;
            justify-content: center;
            .th__title{
              font-size: 24rpx;
              color: #6B757B;
            }
            .th__label{
              background: #20262A;
              font-size: 20rpx;
              color: #A6B5BE;
              border-radius: 4rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 32rpx;
              margin-left: 6rpx;
            }
          }
        }
        td{
          height: 40rpx;
          line-height: 40rpx;
          font-size: 24rpx;
          color: #fff;
          text-align: center;
        }
    }
    .table2{
      height: 80rpx;
      box-sizing: border-box;
      margin-top: 20rpx;
      th{
        color: #6B757B;
        font-size: 2rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid #1C2125;
        border-bottom: 1rpx solid #1C2125;
      }
    }
}
</style>
