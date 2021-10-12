<template>
    <view class="trade">
        <view class="box1">
            <view class="box1__menu" @click="show_ethOrBtc=!show_ethOrBtc">
                <image class="box1__menu__img" src="../../static/images/trade/bt_sec.png" />
                <span class="box1__menu__title">BTC/USDT</span>
                <image class="box1__menu__img2" src="../../static//images/trade/ic_b_h.png" />
            </view>
            <span class="box1__money">$81155.3</span>
        </view>
        <view class="bz" :class="{'bz--show':show_ethOrBtc}" @click="show_ethOrBtc=false">
            <view class="bz__wrap" :class="{'bz__wrap--show':show_ethOrBtc}">
                <view class="bz__item">
                    <image class="bz__item__img" src='../../static/images/trade/eth.png'/>
                    <view class="bz__item__titleBox">
                        <span class="bz__item__titleBox__title">Ethereum</span>
                        <span class="bz__item__titleBox__subTitle">ETH-USD</span>
                    </view>
                    <span class="bz__item__money">$2,013.52</span>
                    <view class="bz__item__rate">+5.35%</view>
                </view>
                <view class="bz__item bz__item--btc">
                    <image class="bz__item__img" src='../../static/images/trade/btc.png'/>
                    <view class="bz__item__titleBox">
                        <span class="bz__item__titleBox__title">Bitcoin</span>
                        <span class="bz__item__titleBox__subTitle">BTC-USD</span>
                    </view>
                    <span class="bz__item__money">$2,013.52</span>
                    <view class="bz__item__rate">-0.24%</view>
                </view>
            </view>
        </view>

        <view class="box2">
            <view class="box2__left">
                <view class="bsbtn">
                    <view class="bsbtn__btc" :class="{'bsbtn__btc--active':buyOrSell=='buy'}"
                        @click="buyOrSell='buy'">
                        Buy
                    </view>
                    <view class="bsbtn__usdt" :class="{'bsbtn__usdt--active':buyOrSell=='sell'}"
                        @click="buyOrSell='sell'">
                        Sell
                    </view>
                </view>
                <view class="wrapInput">
                    <image class="selectImg" src="../../static/images/trade/ic_drop.png" />
                    <picker class="picker" :value='index_list' :range='list' range-key='name'
                        id='limitOrMarket' @change='pickerChange'>
                        <view class="option">{{list[index_list].name}}</view>
                    </picker>
                </view>

                <view class="wrapTitle" v-show="limitOrMarket=='limit'">Limit</view>
                <view class="wrapInput" v-show="limitOrMarket=='limit'">
                    <input class="input" value="0.0000" />
                    <view class="wrapInput__rbtn">USD</view>
                </view>

                <view class="wrapTitle">Size</view>
                <view class="wrapInput">
                    <input class="input" value="0.0000" />
                    <view class="wrapInput__rbtn">ETH</view>
                </view>

                <view class="wrapTitle" v-show="limitOrMarket=='market'">
                    Leverage<span class="wrapTitle__sub">Up To 25X</span>
                </view>
                <view class="leverage" v-show="limitOrMarket=='market'">
                    <view class="leverage__show">0.00X</view>
                    <view class="leverage__choose">2X</view>
                    <view class="leverage__choose">5X</view>
                    <view class="leverage__choose">10X</view>
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
                    <view class="table__button" v-show="limitOrMarket=='limit'">Place limit order</view>
                    <view class="table__button" v-show="limitOrMarket=='market'">Place market order</view>
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
                        <span class="table2__item__name table2__item__name--green">39611.07</span>
                        <span class="table2__item__value">0.2512</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name table2__item__name--green">39572.02</span>
                        <span class="table2__item__value">0.229</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name table2__item__name--green">39546.32</span>
                        <span class="table2__item__value">0.3127</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name table2__item__name--green">39500</span>
                        <span class="table2__item__value">0.0041</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name table2__item__name--green">39949.42</span>
                        <span class="table2__item__value">0.1952</span>
                    </view>
                </view>
                <view class="table2 table3" :class="{'table3--more':more_table}">
                    <view class="table2__item">
                        <span class="table2__item__name">Index Price</span>
                        <span class="table2__item__value">$44,568.14</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">Oracle Price</span>
                        <span class="table2__item__value">$44,568.35</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">24h Change</span>
                        <span class="table2__item__value">5.35%</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">Next Funding</span>
                        <span class="table2__item__value">00:32:34</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">Open Interest</span>
                        <span class="table2__item__value">3,385.02ETH</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">1h Funding</span>
                        <span class="table2__item__value">0.000888%</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">24h Volume</span>
                        <span class="table2__item__value">$3,991,882.062</span>
                    </view>
                    <view class="table2__item">
                        <span class="table2__item__name">24h Trades</span>
                        <span class="table2__item__value">284,487</span>
                    </view>
                </view>
                <view class="moreBox" @click="more_table=!more_table">
                    <view class="moreBox__line"></view>
                    <image class="moreBox__img"
                        :class="{'moreBox__img--reverse':more_table}"
                        src='../../static/images/trade/ic_drop.png'
                    />
                    <view class="moreBox__line"></view>
                </view>
            </view>
        </view>
        <scroll-view scroll-x class="nav">
            <view class="nav__item"
                :class="{'nav__item--active':show_content=='0'}"
                @click="show_content='0'">
                Position
            </view>
            <view class="nav__item"
                :class="{'nav__item--active':show_content=='1'}"
                @click="show_content='1'">
                Order
            </view>
            <view class="nav__item"
                :class="{'nav__item--active':show_content=='2'}"
                @click="show_content='2'">
                Fills
            </view>
            <view class="nav__item"
                :class="{'nav__item--active':show_content=='3'}"
                @click="show_content='3'">
                Payments
            </view>
        </scroll-view>
        
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='0'">
            <view class="content">
                <Position />
            </view>
        </uni-transition>
		<uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='1'">
            <view class="content">
                <Order />
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='2'">
            <view class="content">
                <Fills />
            </view>
        </uni-transition>
        <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']" :show="show_content=='3'">
            <view class="content payments">
                <!-- <view class="payments">
                    <view class="test" v-for="index of 100" :key="index">payments---{{index}}</view>
                </view> -->
                <Payments />
            </view>
        </uni-transition>
        
    </view>
</template>

<script>
  import Position from './components/Position.vue'
  import Order from './components/Order.vue'
  import Fills from './components/Fills.vue'
  import Payments from './components/Payments'
  export default {
    components: { Position, Order, Fills, Payments },
    data() {
      return {
          buyOrSell: 'buy',

          show_content: '0',

          show_ethOrBtc: false,

          list: [{name:'Limit',value:1},{name:'Market',value:2}],
          index_list: 0,

          more_table: false
      }
    },
    onShow() {},
    methods: {
        pickerChange(e){
			// if(e.currentTarget.id=='type')
            this.index_list = e.detail.value
		}
    },
    computed: {
        limitOrMarket(){
            return this.list[this.index_list].name.toLowerCase()
        }
    }
  }
</script>

<style lang='scss' scoped>
@import './common/uni-nvue.scss';
.trade{
    background: #181C1F;
    // &--fixed{
    //     padding-top: 100rpx;
    // }
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
                transition: all 0.3s;
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
            position: relative;
            .selectImg{
                width: 16rpx;
                height: 12rpx;
                position: absolute;
                top: 36rpx;
                right: 20rpx;
                z-index: 1;
            }
            .input{
                width: calc(100% - 100rpx);
                height: 100%;
                display: flex;
                align-items: center;
                font-size: 28rpx;
                color: #fff;
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
            &__sub{
                font-size: 24rpx;
                color: #A6B5BE;
                margin-left: 8rpx;
            }
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
                    &--green{
                        color: #13A467;
                    }
                }
            }
        }
        .moreBox{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .moreBox__line{
                width: 96rpx;
                height: 1rpx;
                background: #1C252A;
            }
            .moreBox__img{
                width: 16rpx;
                height: 12rpx;
                margin: 0 8rpx;
                &--reverse{
                    transform: rotate(180deg);
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
        .table3{
            height: 200rpx;
            overflow-y: hidden;
            .table2__item{
                position: relative;
                &__name{
                    position: absolute;
                    top: 0;
                    left: 0;
                    color: #6B757B;
                    font-size: 40rpx;
                    transform-origin: 0 0;
                    transform: scale(0.5,0.5);
                    line-height: 50rpx;
                }
                &__value{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #AEB9C6;
                    font-size: 36rpx;
                    transform-origin: 100% 0;
                    transform: scale(0.5,0.5);
                    line-height: 50rpx;
                    margin-top: 4rpx;
                }
            }
            &--more{
                height: auto;
            }
        }
    }
}
.picker{
    width: calc(100% - 20rpx);
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 20rpx;
}
.leverage{
    height: 10rpx;
    display: flex;
    height: 80rpx;
    margin-bottom: 28rpx;
    &__show{
        height: 100%;
        flex: 1;
        border-radius: 10rpx;
        background: #0D1012;
        font-size: 28rpx;
        color: #A6B5BE;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20rpx;
    }
    &__choose{
        margin-left: 16rpx;
        border-radius: 10rpx;
        background: #282E33;
        font-size: 24rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20rpx;
    }
}
.nav{
    height: 100rpx;
    background: #20262A;
    white-space: nowrap;
    display: flex;
    position: sticky;
    top: 88rpx;
    left: 0;
    z-index: 999;
    &__item{
        height: 100rpx;
        box-sizing: border-box;
        padding: 0 30rpx;
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
    // height: calc(100vh - 100rpx);
    // overflow-y: hidden;
    // &--fixed{
    //     overflow-y: scroll;
    // }
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
}
.greenColor{
    color: #13A467 !important;
}
.redColor{
    color: #CF4D65;
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
