<template>
  <view class="indexWeper clearfix">
    <uni-status-bar></uni-status-bar>
    <image class="swiper-item--star1" src="/static/images/index/home_star1@2x.png" mode="aspectFit"></image>
    <image class="swiper-item--star2" src="/static/images/index/home_star2@2x.png" mode="aspectFit"></image>
    <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" @change="handleChange" :current="currentIndex">
      <swiper-item v-for="(item,index) in list" :key="index">
        <view class="swiper-item">
          <view class="swiper-item--banner">
            <image class="swiper-item--banner-img" :src="getDotaImg(item)" mode="aspectFit"></image>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="indexWeper_bottom">
      <view class="left">
        <view class="swiper-item--title">{{dotaName}}</view>
        <view class="indexWeperDot">
          <view class="indexWeperDot-item" :class="{active: currentIndex== index}" v-for="(item,index) in list" :key="'dot'+index"></view>
        </view>
      </view>

      <view class="btn">
        <image class="btn_img" src="/static/images/index/icon_home_next@3x.png" mode="aspectFit" @click="onNext"></image>
        <image class="btn_img prve" src="/static/images/index/icon_home_prev@2x.png" mode="aspectFit" v-show="currentIndex!==0"
          @click="onPrev"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      list: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    data() {
      return {
        dotaName: '',
        currentIndex: 0,
      }
    },
    mounted() {
      if (this.list.length) {
        this.dotaName = this.list[0].dotaName
      }
    },
    watch: {
      list(val) {
        if (val.length) {
          this.dotaName = val[0].dotaName
        }
      }
    },
    methods: {
      onNext() {
        if ((this.currentIndex + 1) === this.list.length) return
        this.currentIndex++
      },

      onPrev() {
        this.currentIndex--
      },

      // 切换轮播
      handleChange(e) {
        const dotaId = this.list[e.detail.current].dotaId || this.currentTowerId
        // this.$store.dispatch('indexStore/getCurrentTower', this.towerList[e.detail.current].dotaId)
        this.currentIndex = e.detail.current
        this.dotaName = this.list[e.detail.current].dotaName
        console.log('change', this.currentIndex);
        this.$emit('change', this.currentIndex)
      },

      getDotaImg(item) {
        let url = ''
        if (0 <= item.floor <= 50 && item.enabled) {
          url = '/static/images/index/ta_home_t1.png'
        } else if (51 <= item.floor <= 300 && item.enabled) {
          url = '/static/images/index/ta_home_t2.png'
        } else if (301 <= item.floor <= 500 && item.enabled) {
          url = '/static/images/index/ta_home_t3.png'
        } else if (501 <= item.floor <= 1000 && item.enabled) {
          url = '/static/images/index/ta_home_t4.png'
        } else if (1001 <= item.floor <= 1300 && item.enabled) {
          url = '/static/images/index/ta_home_t5.png'
        } else if (1301 <= item.floor <= 1600 && item.enabled) {
          url = '/static/images/index/ta_home_t6.png'
        } else if (1601 <= item.floor <= 1900 && item.enabled) {
          url = '/static/images/index/ta_home_t7.png'
        } else if (1901 <= item.floor <= 2000 && item.enabled) {
          url = '/static/images/index/ta_home_t8.png'
        } else {
          url = '/static/images/index/ta_home_t0.png'
        }
        return url
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";

  uni-swiper {
    width: 750rpx;
    height: 594rpx;
  }

  .indexWeper {
    width: 750rpx;
    // height: 718rpx;
    position: relative;
    overflow: hidden;
    padding-bottom: 15px;

    .indexWeper_bottom {
      display: flex;
      justify-content: space-between;
      padding: 0 34rpx;
      position: relative;

      .btn {
        margin-top: 30rpx;

        &_img {
          width: 156rpx;
          height: 44rpx;

          &.prve {
            position: absolute;
            right: 30rpx;
            top: -60rpx;
          }
        }
      }
    }

    .indexWeperDot {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 10px;

      &-item {
        width: 9px;
        height: 4px;
        transform: rotateZ(-30deg)skew(-70deg, 30deg);
        background: rgba(255, 255, 255, 0.2);
        margin: 0 10rpx;

        &.active {
          width: 15px;
          background: linear-gradient(22deg, #f1e4ff 0%, #a7a5ff 35%, #39b6fd 66%, #015abb 100%);
        }
      }
    }

    .swiper {
      &-item {
        position: relative;
        width: 750rpx;
        height: 528rpx;

        &--title {
          background-image: -webkit-linear-gradient(bottom, #ffffff 0%, #89c8ff 99%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 40rpx;
          font-weight: bold;
          text-align: left;
          color: #e1e6ea;
          line-height: 56rpx;
          margin-bottom: 20rpx;
        }

        &--banner {
          width: 100%;
          height: 594rpx;
          display: flex;
          align-items: center;
          justify-content: center;

          &-img {
            width: 338rpx;
            height: 297px;
          }
        }

        &--star1 {
          width: 750rpx;
          height: 528rpx;
          position: absolute;
          left: 0;
          top: 0;
          animation: star1 2s linear infinite alternate;
        }

        &--star2 {
          width: 750rpx;
          height: 528rpx;
          position: absolute;
          left: 0;
          top: 0;
          animation: star2 2s linear infinite alternate;
        }
      }
    }
  }

  @keyframes star1 {
    0% {
      opacity: 0.2;
    }

    100% {
      opacity: 0.7;
    }
  }

  @keyframes star2 {
    0% {
      opacity: 0.7;
    }

    100% {
      opacity: 0.2;
    }
  }
</style>
