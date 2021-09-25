<template>
  <view class="myCountdown">
    <view class='myCountdown-time' v-html='endTimeLable'></view>
  </view>
</template>

<script>
  /**
   * $emit: 倒计时结束
   */

  export default {
    props: {
      // 结束时间
      endTime: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        endTimeLable: '',
        timer: null
      };
    },
    watch:{
      endTime(val) {
        this.countTime()
      }
    },
    mounted() {
      this.countTime()
    },
    beforeDestroy() {
      if (this.timer) clearTimeout(this.timer)
    },
    methods: {
      // 倒计时
      countTime() {
        let _this = this;
        // 获取当前时间
        let now = new Date().getTime();
        // 设置截止时间
        let end = new Date(this.endTime).getTime();
        // 时间差
        let leftTime = end - now;
        if (_this.timer) {
          clearTimeout(_this.timer)
        }
        if (_this.endTime === null || _this.endTime === "") return;

        // 定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          let d = Math.floor(leftTime / 1000 / (60 * 60) / 24)
          let h = Math.floor(leftTime / 1000 / (60 * 60))
          let m = Math.floor(leftTime / 1000 / 60 % 60)
          let s = Math.floor(leftTime / 1000 % 60)
          if (s < 10) {
            s = '0' + s
          }
          if (m < 10) {
            m = '0' + m
          }
          if (h < 10) {
            h = '0' + h
          }
          
          _this.endTimeLable = "<span class=\"minute\">" + h + "</span>:<span class=\"minute\">" + m +
            "</span>:<span class=\"minute\">" + s + "</span>"
        }

        // 剩余时间大于0,开启倒计时
        if (leftTime > 0) {
          _this.timer = setTimeout(_this.countTime, 1000);
        }

        if (leftTime < 0) {
          clearTimeout(_this.timer)
          // 倒计时完成
          _this.$emit('end')
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .myCountdown {
    &-time {
      font-size: 36rpx;
      font-family: DIN-Medium;
      font-weight: normal;
      text-align: center;
      color: #ffe059;
      line-height: 44rpx;
    }
  }
</style>
