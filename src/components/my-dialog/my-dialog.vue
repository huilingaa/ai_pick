<template>
  <!-- 公共弹窗 -->
  <uni-popup ref="popup" v-bind="$attrs" type="center" :style="{zindex: 99999}">
    <view class="base_popup" :class="{isCheck: !!check, isInnerShadow: !!icon}">
      <view class="iconBox" v-if="icon">
        <image class="iconBox_img" :src="icon" mode="aspectFill"></image>
      </view>
      <view class="base_popup--title" :class="{noValue: !value && !$slots.value}"><text>{{title}}</text></view>
      <view class="base_popup--value">
        <text>{{value}}</text>
        <slot name="value"></slot>
      </view>
      <view class="base_popup-btns" :class="{odd: !isCancel || !isConfirm,even: isCancel && isConfirm}">
        <button v-if="isCancel" class="base_popup-btns--cancel btn" type="default" @click="handleCancel">{{cancelText}}</button>
        <button v-if="isConfirm" class="base_popup-btns--confirm btn" type="default" @click="handleConfirm">{{confirmText}}</button>
      </view>
      <view class="checkbox" v-if="check">
        <evan-checkbox v-model="checked" primaryColor="#00C59F" :icon-size="12" @change="handleChangeCheck">
          <view class="checkbox_text"><text>不再提示</text></view>
        </evan-checkbox>
      </view>
    </view>
    </view>
  </uni-popup>
</template>

<script>
  export default {
    name: 'base-popup',
    inheritAttrs: false,
    props: {
      // 是否铺满,(是否遮盖住导航栏)
      isbespread: {
        type: Boolean,
        default: true
      },
      // 顶部图标
      icon: {
        type: String,
        default: ''
      },
      // 底部复选框回调时间
      check: {
        type: Function
      },
      // 是否显示取消按钮
      isCancel: {
        type: Boolean,
        default: true
      },
      // 是否显示确定按钮
      isConfirm: {
        type: Boolean,
        default: true
      },
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 提示内容
      value: {
        type: String,
        default: ''
      },
      // 取消按钮文字
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确定按钮文字
      confirmText: {
        type: String,
        default: '确定'
      },
    },
    data() {
      return {
        checked: true
      }
    },
    methods: {
      // 底部复选框选中事件
      handleChangeCheck() {
        if (this.check) {
          this.check(this.checked)
        }
      },

      // 打开弹窗
      open() {
        this.$refs.popup.open()
      },

      // 关闭弹窗
      close() {
        this.$refs.popup.close()
      },

      // 点击取消
      handleCancel() {
        this.$emit('cancel')
      },

      // 点击确定
      handleConfirm() {
        this.$emit('confirm')
      }
    }
  }
</script>

<style scoped lang="scss">
  .base_popup {
    width: 560rpx;
    height: 312rpx;
    opacity: 1;
    background: #2a3145;
    border-radius: 30rpx;
    padding: 42rpx;
    &.isCheck {
      padding-bottom: 28rpx;
    }

    &.isInnerShadow {
      box-shadow: 0px -3px 1px 0px #dddddd inset;
    }

    .iconBox {
      position: relative;
      margin-top: -136rpx;
      left: 50%;
      margin-left: -93rpx;
      margin-bottom: 18rpx;

      &_img {
        width: 186rpx;
        height: 190rpx;
      }
    }

    &--title {
      opacity: 1;
      font-size: 36rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: center;
      color: #e1e6ea;
      &.noValue {
        margin-bottom: 60rpx;
        margin-top: 18rpx;
      }
    }

    &--value {
      font-size: 28rpx;
      text-align: center;
      color: #6f6f6f;
      line-height: 44rpx;
      margin-bottom: 36rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
    }

    &-btns {
      width: 100%;
      display: flex;
      justify-content: space-between;

      // 奇数
      &.odd {
        padding: 0 8rpx;
        box-sizing: border-box;
      }

      &.even {
        .btn {
          &:nth-child(2n+2) {
            margin-left: 24rpx;
          }
        }
      }

      &--cancel,
      &--confirm {
        width: 236rpx;
        height: 76rpx;
        line-height: 76rpx;
        opacity: 1;
        border-radius: 46rpx;
      }

      &--cancel {
        background: #010a15;
        opacity: 1;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #637192;
        &::after {
          border-radius: 2000rpx;
        }
      }

      &--confirm {
        opacity: 1;
        opacity: 1;
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #000000;
        background-image: linear-gradient(270deg, #a6bcfb 0%, #989efd 19%, #53b1fe 47%, #188fda 83%, #009aff 100%);
      }
    }

    .checkbox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 12rpx;

      &_text {
        font-size: 26rpx;
        text-align: right;
        color: #a2a2a2;
        line-height: 36rpx;
      }
    }
  }
</style>
