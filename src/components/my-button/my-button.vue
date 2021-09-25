<template>
  <button class="my_button" :class="{disabled,solid}" :style="wrapStyle" type="default" @click="handleClick">
    <view class="text">
      <slot></slot>
    </view>
  </button>
</template>

<script>
  export default {
    props: {
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: '100%'
      },
      height: {
        type: [Number, String],
        default: '46px'
      },
      radius: {
        type: [Number, String],
        default: '46px'
      },
      top: {
        type: [Number, String],
        default: '0'
      },
      text: {
        type: String,
        default: ''
      },
      solid:{
        /*
        * 按钮颜色是否实心
        * */
        type: Boolean,
        default: false
      }
    },
    computed: {
      wrapStyle() {
        let lineHeight = this.height
        if(this.disabled) {
          lineHeight = lineHeight + 2
        }
        return {
          width: typeof this.width === 'number' ? this.width + 'px' : this.width,
          height: typeof this.height === 'number' ? this.height + 'px' : this.height,
          lineHeight: typeof this.height === 'number' ? this.height + 'px' : this.height,
          marginTop: typeof this.top === 'number' ? this.top + 'px' : this.top,
          borderRadius: typeof this.radius === 'number' ? this.radius + 'px' : this.radius,
        }
      }
    },
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my_button {
    width: 100%;
    font-size: 32rpx;
    font-weight: 500;
    color: #e1e6ea;
    text-align: center;
    padding: 1px;
    position: relative;
    background-image: linear-gradient(270deg, #a6bcfb 0%, #989efd 19%, #53b1fe 47%, #188fda 83%, #009aff 100%);
    &.disabled {
      background-image: none;
      background-color: #010a15;
      padding: 0;
      overflow: hidden;
      color: rgba(225, 230, 234, 0.5);
      pointer-events: none;
    }

    &:active {
      opacity: 0.8;
    }

    .text {
      color:#E1E6EA;
      border-radius: 46rpx;
      width: 100%;
      height: 100%;
      display: inline-block;
      background: #010A15;
    }
    &.solid{
      background-image: linear-gradient(306deg,#f1e4ff 0%, #a7a5ff 27%, #39b6fd 58%, #015abb 97%);
      .text{
        color:#000000;
        background-image: linear-gradient(306deg,#f1e4ff 0%, #a7a5ff 27%, #39b6fd 58%, #015abb 97%);
      }
    }
  }
</style>
