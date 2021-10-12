<template>
  <view class="Overview">
    <view class="box">
      <div class="a">Portfolio Value</div>
      <div class="b">$0.00</div>
      <div class="num">
        <p></p>
        <p>$0.00(0.00%)</p>
        <p>Past Week</p>
      </div>
      <div class="dian">
        <div>
          <p>Margin Usage</p>
          <p>_</p>
        </div>
        <div>
          <p>Free Collateral</p>
          <p>_</p>
        </div>
        <div>
          <p>Leverage</p>
          <p>_</p>
        </div>
        <div>
          <p>Buying Power</p>
          <p>_</p>
        </div>
      </div>
      <div class="font">Connect your Ethereum wallet todeposit funds & start trading.</div>
      <div class="btn" v-if="!connectAddressId" @click.stop="handleSwitchPurse">Connect wallet</div>
      <div class="WithdrawalsDeposit" v-else>
        <div @click="WithdrawalsDeposit('Withdraw')">Withdrawals</div>
        <div @click="WithdrawalsDeposit('Deposit')">Deposit</div>
      </div>
    </view>
    <my-table title="Markets" :column="column" :tableData="tableData" emptyText="You have no Markets." />
    <!-- 提笔或充币 -->
    <my-drop-down-box :title="title" ref="cmpwalletpopup" :height="title=='Withdraw'?'888rpx':'828rpx'" width="690rpx" leftIcon="close"
      class="cmpwalletpopup">

      <view class="titleModel">资产</view>

      <view class="content" @click="useOutClickSide">
        <easy-select ref="easySelect" :options="options" size="medium" @selectOne="selectOne">
        </easy-select>
      </view>
      <view class="titleModel">金额</view>
      <uni-easyinput suffixIext="最大值" v-model="value" placeholder="请输入金额" @iconClick="onClick"></uni-easyinput>
      <view class="flexFont">
        <view>
          可用额度 0.000000
        </view>
        <view>
          $59.25
        </view>
      </view>

      <view class="flexFontTip" v-if="title=='Withdraw'">
        <view>
          Wallet
          <p class="blueTip">USDC</p>
        </view>
        <view>
          0.0000 <p class="arrow">→ </p>10.0000
        </view>
      </view>

      <view class='btn' @click="signOut">{{title}}</view>
    </my-drop-down-box>
    </script>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      return {
        title: '',
        value:'',
        selecValue: {},
        options: [{
          img: 'usdt@2x',
          name: 'USDT'
        }, {
          img: 'usdc@2x',
          name: 'USDC'
        }],

        activeTab: 0,
        column: ["Market", "Index Price", '24h Change', "1h Funding", "Open Interest"],
        tableData: [],


      };
    },
    computed: {
      ...mapGetters('walletStore', ['connectAddressId']),
    },

    onShow() {


    },

    methods: {
      signOut(){
         this.$refs.cmpwalletpopup.close()
      },
      selectOne(options) {
        console.log(options.name)
      },
      WithdrawalsDeposit(name) {
        this.title = name;
        this.$refs.cmpwalletpopup.open()
      },
      handleSwitchPurse() {
        console.log(' this.$refs.assetWalletPopup', this.$refs.assetWalletPopup)
      },
      changeTab(index) {
        console.log('当前选中索引：' + index)
      }
    }

  }
</script>

<style lang="scss">
  .cmpwalletpopup {
    .titleModel {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #1D2025;
      opacity: 1;
      margin-bottom: 16rpx;
      margin-top: 30rpx;
    }

    .flexFontTip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34rpx;
      color: #6B757B;
      margin-bottom: 16rpx;
      opacity: 1;

      view {
        display: flex;
        align-items: center;
      }

      .blueTip {
        width: 72rpx;
        height: 28rpx;
        background: #4DA2FA;
        opacity: 1;
        border-radius: 4rpx;
        text-align: center;
        margin-left: 16rpx;
        font-size: 20rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: #FFFFFF;
        opacity: 1;
      }

      .arrow {
        color: red;
        margin: 0 10rpx;
      }
    }

    .flexFont {
      display: flex;
      justify-content: space-between;
      margin: 10rpx 0 100rpx 0;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34rpx;
      color: #6B757B;
      opacity: 1;
    }

    .btn {
      // width: 570rpx;
      height: 88rpx;
      background: #4DA2FA;
      opacity: 1;
      border-radius: 10rpx;
      text-align: center;
      margin: auto;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 88rpx;
      color: #FFFFFF;
      opacity: 1;
    }
  }

  .box {
    margin: 60rpx auto;
    width: 690rpx;
    background: #20262A;
    border-radius: 10rpx;
    padding: 60rpx 40rpx 70rpx 40rpx;

    .a {

      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #A6B5BE;
    }

    .b {

      font-size: 52rpx;
      font-weight: 600;
      line-height: 92rpx;
      color: #FFFFFF;
      opacity: 1;
    }

    .dian {

      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #A6B5BE;

      div {
        display: inline-block;
        width: 50%;
        margin-bottom: 36rpx;
      }
    }

    .btn {
      width: 100%;
      height: 100rpx;
      border: 2rpx solid #4DA2FA;
      opacity: 1;
      border-radius: 10rpx;
      font-size: 36rpx;
      font-weight: 500;
      line-height: 100rpx;
      color: #4DA2FA;
      opacity: 1;
      text-align: center;
    }

    .font {
      width: 100%;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 44rpx;
      color: #A6B5BE;
      opacity: 1;
      margin: 40rpx 0;
    }

    .WithdrawalsDeposit {
      display: flex;
      justify-content: space-between;

      div {
        // width: 320rpx;
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #4DA2FA;
        opacity: 1;
        border-radius: 10rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        opacity: 1;
      }
    }

    .num {
      display: flex;

      font-size: 28rpx;
      font-weight: 400;
      line-height: 36rpx;
      color: #A6B5BE;
      margin-bottom: 60rpx;

      p:nth-child(2) {
        color: #23D5B3;
        margin-right: 10rpx;

      }
    }
  }
</style>
