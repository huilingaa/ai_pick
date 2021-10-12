<template>
  <view class="easy-select" @click.stop="trigger" :style="[easySelectSize]">




    <view class="easy-select-options-item" v-if="currentSelect.lenght!==0">
      <image class="icon" v-if="currentSelect['img']"
        :src="require(`../../static/images/wallet/${currentSelect['img']}.png`)" />
      <text v-if="currentSelect['name']">{{currentSelect.name}}</text>
      <view v-else>
        请选择
      </view>
    </view>



    <!-- 箭头 -->
    <view class="easy-select-suffix" :style="{border: '1px solid rgba（0,0,0,0)'}" :class="[showSuffix]">
      <image src="../../static/images/wallet/ic_drop@2x.png">
    </view>
    <!-- 选择列表 -->
    <view class="easy-select-options" v-if="showOptions"
      :style="{'min-width': '100%', top: optionsGroupTop, margin: optionsGroupMargin}">
      <view class="easy-select-options-item" v-for="item in options" :key="item.name" @click.stop="select(item)"
        :class="{active: currentSelect.name === item.name}">
        <image class="icon" :src="require(`../../static/images/wallet/${item.img}.png`)" />
        <text>{{item.name}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  /**
   * easy-select
   * @author Snoop zhang
   * @description Select Component
   * */
  const COMPONENT_NAME = 'easy-select'
  const MAX_OPTIONS_HEIGHT = 137 // 修改务必也修改easy-select-options的css部分
  const OPTIONS_ITEM_HEIGHT = 33 // 修改务必也修改easy-select-options-item的css部分
  const OPTIONS_MARGIN = 10
  const OPTIONS_PADDING = 6 * 2 + 2 // + 2是border
  const OPTIONS_OTHER_HEIGHT = OPTIONS_MARGIN + OPTIONS_PADDING
  const STORAGE_KEY = '_easyWindowHeight'
  const SIZE = {
    'medium': {
      width: '100%',
      height: '88rpx'
    },
    'small': {
      width: '200px',
      height: '30px'
    },
    'mini': {
      width: '160px',
      height: '30px'
    }
  }

  export default {
    name: COMPONENT_NAME,
    props: {
      windowHeight: {
        type: [Number, String],
        default: 0
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      size: {
        type: String,
        default: 'medium'
      },
      options: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        showOptions: false,
        boundingClientRect: {},
        currentSelect: {},
        optionsGroupTop: 'auto',
        optionsGroupMargin: ''
      }
    },
    computed: {
      showSuffix() {
        return this.showOptions ? 'showOptions' : 'no-showOptions'
      },
      easySelectSize() {
        let size = this.size.toLowerCase()
        if (size in SIZE) {
          return {
            width: SIZE[size].width,
            height: SIZE[size].height
          }
        } else {
          return {}
        }
      }
    },
    mounted() {
      const elQuery = uni.createSelectorQuery().in(this)
      elQuery.select('.easy-select').boundingClientRect(data => {
        console.log('浪漫时光的', data)
        this.boundingClientRect = data
      }).exec();
      try {
        if (!this.windowHeight) {
          const storageHeihgt = uni.getStorageSync(STORAGE_KEY)
          if (storageHeihgt) {
            this.easyWindowHeight = storageHeihgt
            return
          }
          const res = uni.getSystemInfoSync();
          this.easyWindowHeight = res.windowHeight
          uni.setStorageSync(STORAGE_KEY, this.easyWindowHeight)
        }
      } catch (e) {
        // error
      }
    },
    methods: {
      trigger(e) {
        const view = uni.createSelectorQuery().in(this)
        view.select('.easy-select').fields({
          rect: true
        }, data => {
          let {
            top,
            bottom
          } = data
          const thresholdHeight = Math.min(MAX_OPTIONS_HEIGHT + OPTIONS_MARGIN, (this.options.length *
              OPTIONS_ITEM_HEIGHT) +
            OPTIONS_OTHER_HEIGHT)
          bottom = Number(this.windowHeight || this.easyWindowHeight) - (top + this.boundingClientRect
            .height) // 距离底部的距离等于视口的高度减上top加select组件的高度

          // judge direction
          if (bottom < thresholdHeight) {
            this.optionsGroupDirection = 'up'
            this.optionsGroupTop = -thresholdHeight - 12 + 'px'
            this.optionsGroupMargin = '0'
          } else {
            this.optionsGroupDirection = 'down'
            this.optionsGroupTop = 'auto'
            this.optionsGroupMargin = '10px 0 0 0'
          }

          // if (this.scrollTop < )
          this.showOptions = !this.showOptions
        }).exec();
      },
      select(options) {
        this.showOptions = false
        this.currentSelect = options
        console.log('jls', this.currentSelect);
        this.$emit('selectOne', options)
      },
      hideOptions() {
        this.showOptions = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .easy-select-suffix {
    image {
      width: 16rpx;
      height: 12rpx;
    }
  }

  .easy-select {
    position: relative;
    border: 1px solid #dcdfe6;

    color: #606266;
    outline: none;

    height: 88rpx;

    border: 2rpx solid #F4F4F4;
    opacity: 1;
    border-radius: 10rpx;


  }

  .uni-input-placeholder {

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;

    color: #A6B5BE;
    opacity: 1;
  }

  .easy-select input {
    padding: 0 18rpx;
    padding-right: 60rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 100% !important;
    min-height: 100% !important;
  }

  .easy-select .easy-select-suffix {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
    right: 20rpx;
    top: 0;
    display: flex;
    align-items: center;
    transform: rotate(180deg);
    transition: all .3s;
    transform-origin: center;
  }

  .easy-select .showOptions {
    transform: rotate(0) !important;
  }

  .easy-select .no-showOptions {
    transform: rotate(180deg) !important;
  }

  .easy-select .easy-select-options {
    position: absolute;
    padding: 6px 0;
    margin-top: 10px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    transform-origin: center top;
    z-index: 2238;
    overflow: scroll;
    max-height: 274rpx;
  }

  .easy-select .easy-select-options-item {
    padding: 0 20rpx;
    position: relative;
    white-space: nowrap;
    font-size: 14px;
    color: #606266;
    height: 80rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    //   border-bottom: 1px solid #F4F4F4;
  }

  .easy-select .easy-select-options-item:last-child {
    border-bottom: 1px solid #ffffff;
  }

  .easy-select .active {
    background-color: #F5F7FA
  }

  .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 12rpx;
  }
</style>
