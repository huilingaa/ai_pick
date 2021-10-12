<template>
  <div class="details">
    <div class="topD">
      <div class="topD__title">
        <image class="topD__title__img" src="../../../../../static/images/trade/eth_big.png" />
        <h1 class="topD__title__h1">Ethereum</h1>
      </div>
      <div class="topD__content">
        <p class="p">
          Ethereum is a global,open-source platform for
decentralized applications.
        </p>
        <p class="p subP">
          Ethereum is a decentralized blockchain platform 
foundee in 2014.Ethereum is an open-source project 
that is not owned or operated by a single individual. 
This means that anyone,anywhere can download the 
software and begin interacting with the network.
Ethereum allows developers to make and operate smart 
contracts,a core piece of infrastructure for any 
decentralized application.
        </p>
        <div class="btn">
          <div class="btn__item">
            <span>Whitepaper</span>
            <image class="btn__item__img" src="../../../../../static/images/trade/ic_share@2x.png" />
          </div>
          <div class="btn__item">
            <span>Website</span>
            <image class="btn__item__img" src="../../../../../static/images/trade/ic_share@2x.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="tableD">
      <div class="tableD__item">
        <span class="tableD__item__name">Market Name</span>
        <span class="tableD__item__value">ETH-USD</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Tick Size</span>
        <span class="tableD__item__value">$0.1</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Step Size</span>
        <span class="tableD__item__value">0.001 ETH</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Minimum Order Size</span>
        <span class="tableD__item__value">0.001 ETH</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Maximum Leverage</span>
        <span class="tableD__item__value">25.00x</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Maintenance Margin Fraction</span>
        <span class="tableD__item__value">0.0300</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Initial Margin Fraction</span>
        <span class="tableD__item__value">0.0400</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Incremental Initial Margin Fraction</span>
        <span class="tableD__item__value">0.0100</span>
      </div>
      <div class="tableD__item">
        <span class="tableD__item__name">Incremental Position Size</span>
        <span class="tableD__item__value">15.000 ETH</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Details'
}
</script>

<style lang='scss' scoped>
.topD{
  &__title{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30rpx 40rpx;
    &__img{
      width: 80rpx;
      height: 80rpx;
    }
    &__h1{
      font-size: 44rpx;
      color: #fff;
      margin-left: 28rpx;
    }
  }
  &__content{
    font-size: 28rpx;
    color: #fff;
    box-sizing: border-box;
    padding: 0 30rpx;
    line-height: 44rpx;
    .p{
      margin-bottom: 20rpx;
    }
    .subP{
      color: #A6B5BE;
    }
    .btn{
      display: flex;
      align-items: center;
      padding-bottom: 60rpx;
      &__item{
        width: 224rpx;
        height: 60rpx;
        border-radius: 10rpx;
        background: #6B757B;
        font-size: 26rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 40rpx;
        &__img{
          width: 20rpx;
          height: 20rpx;
          margin-left: 6rpx;
        }
      }
    }
  }
}
.tableD{
  box-sizing: border-box;
  padding: 0 30rpx;
  &__item{
    height: 80rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #1F2428;
    display: flex;
    align-items: center;
    &__name{
      font-size: 26rpx;
      color: #6B757B;
      flex: 1;
    }
    &__value{
      font-size: 26rpx;
      color: #fff;
    }
  }
}
</style>
