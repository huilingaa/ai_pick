<template>
  <!-- 固定在底部的按钮 -->
	<view class="my-fixed-button" @click="handleClick">
		<my-button>
      <slot></slot>
    </my-button>
	</view>
</template>

<script>
	export default {
    methods:{
      handleClick() {
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss" scoped>
.my-fixed-button {
  width: 100%;
  height: 160rpx;
  background-color: #FFFFFF;
  padding-bottom: var(--window-bottom);
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
