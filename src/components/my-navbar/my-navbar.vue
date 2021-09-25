<template>
  <!-- 自定义导航栏 -->
  <view class="uni-navbar" :style="{height: `${titleHeight}px`}">
    <view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ backgroundColor, height: `${titleHeight}px` }"
      class="uni-navbar__content">
      <uni-status-bar v-if="statusBar" />
      <view :style="{ color,backgroundColor,height: `${navBarHeight}px` }" class="uni-navbar__header uni-navbar__content_view">
        <view @tap="handleClickLeft" class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view">
          <view class="uni-navbar__content_view" v-if="leftIcon.length && !$slots.left">
            <uni-icons :color="color" :type="leftIcon" size="24" />
          </view>
          <view :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length }" class="uni-navbar-btn-text uni-navbar__content_view"
            v-if="leftText.length && !$slots.left">
            <text :style="{ color, fontSize: '14rpx' }">{{ leftText }}</text>
          </view>
          <slot name="left" />
        </view>

        <view class="uni-navbar__header-container uni-navbar__content_view">
          <view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
            <text class="uni-nav-bar-text" :style="{color}">{{ title }}</text>
          </view>
          <!-- 标题插槽 -->
          <slot />
        </view>

        <view :class="title.length ? 'uni-navbar__header-btns-right' : ''" @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__content_view">
          <view class="uni-navbar__content_view" v-if="rightIcon.length && !$slots.right">
            <uni-icons :color="color" :type="rightIcon" size="22" />
          </view>
          <!-- 优先显示图标 -->
          <view class="uni-navbar-btn-text uni-navbar__content_view" v-if="rightText.length && !rightIcon.length && !$slots.right">
            <text class="uni-nav-bar-right-text">{{ rightText }}</text>
          </view>
          <slot name="right" />
        </view>
      </view>
    </view>
    <view class="uni-navbar__placeholder" v-if="fixed">
      <uni-status-bar v-if="statusBar" />
      <view class="uni-navbar__placeholder-view" />
    </view>
  </view>
</template>

<script>
  import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
  import uniIcons from "../uni-icons/uni-icons.vue";

  export default {
    name: "UniNavBar",
    components: {
      uniStatusBar,
      uniIcons
    },
    props: {
      onClickLeft: {
        type: Function
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: true
      },
      color: {
        type: String,
        default: "#FFFFFF"
      },
      backgroundColor: {
        type: String,
        default: "#13131d"
      },
      statusBar: {
        type: [Boolean, String],
        default: true
      },
      shadow: {
        type: [String, Boolean],
        default: false
      },
      border: {
        type: [String, Boolean],
        default: true
      }
    },
    data(){
      return {
        titleHeight: 0,
        statusBarHeight: 0,
        navBarHeight: 0
      }
    },
    created(){
      const res = uni.getSystemInfoSync()
      const system = res.platform
      this.statusBarHeight = res.statusBarHeight
      if (system === 'android') {
        this.titleHeight = (48 + this.statusBarHeight)
      } else if (system === 'ios') {
        this.titleHeight = (44 + this.statusBarHeight)
      }
      this.navBarHeight = this.titleHeight - this.statusBarHeight
    },
    mounted() {
      if (uni.report && this.title !== '') {
        uni.report('title', this.title)
      }
    },
    methods: {
      handleClickLeft() {
        if (this.onClickLeft) {
          this.onClickLeft()
        } else {
          uni.navigateBack()
        }
      },
      onClickRight() {
        this.$emit("clickRight");
      }
    }
  };
</script>

<style lang="scss" scoped>
  //$nav-height: 88rpx;

  .uni-nav-bar-text {
    /* #ifdef APP-PLUS */
    font-size: 32rpx;
    /* #endif */
    /* #ifndef APP-PLUS */
    font-size: 32rpx;
    /* #endif */
    font-weight: 500;
    color: #FFFFFF;
    font-weight: normal;
  }

  image {
    width: 36rpx;
    height: 36rpx;
  }

  .uni-nav-bar-right-text {

    font-size: 28rpx;
    font-weight: 400;
    text-align: right;
    color: #429afb;
    line-height: 40rpx;
  }

  .uni-navbar {
    width: 750rpx;
  }

  .uni-navbar__content {
    position: relative;
    width: 750rpx;
    background-color: $uni-bg-color;
    overflow: hidden;
  }

  .uni-navbar__content_view {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    flex-direction: row;
    // background-color: #FFFFFF;
  }

  .uni-navbar__header {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    width: 750rpx;
    //height: $nav-height;
    //line-height: $nav-height;
    font-size: 16rpx;
    // background-color: #ffffff;
  }

  .uni-navbar__header-btns {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-wrap: nowrap;
    width: 120rpx;
    padding: 0 30rpx;
    justify-content: center;
    align-items: center;
  }

  .uni-navbar__header-btns-left {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    width: 180rpx;
    justify-content: flex-start;
  }

  .uni-navbar__header-btns-right {
    white-space: nowrap;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    width: 180rpx;
    padding-right: 32rpx;
    justify-content: flex-end;
  }

  .uni-navbar__header-container {
    flex: 1;
  }

  .uni-navbar__header-container-inner {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: $uni-font-size-base;
  }


  .uni-navbar__placeholder-view {
    //height: $nav-height;
  }

  .uni-navbar--fixed {
    position: fixed;
    z-index: 998;
  }

  .uni-navbar--shadow {
    /* #ifndef APP-NVUE */
    box-shadow: 0 1rpx 6rpx #ccc;
    /* #endif */
  }

  .uni-navbar--border {
    border-bottom-width: 0;
    border-bottom-style: solid;
    border-bottom-color: $uni-border-color;
  }
</style>
