import Vue from 'vue'
import App from './App'
import * as filters from './filters'
import locals from './locals/index.js'
import VueI18n from 'vue-i18n'
import store from './store'
import handleRequest from './utils/request.js'
import BigNumber from 'bignumber.js'
// import clipboard from './js_sdk/dc-clipboard/clipboard'
import debounce from './directive/index.js'
BigNumber.config({
  /*向下取  不四舍五入*/
  ROUNDING_MODE: 1
})
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import myheader from '@/components/my-header/my-header.vue'

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('my-header', myheader)

Vue.use(VueI18n)

const i18n = new VueI18n(locals)

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$bigNumber = BigNumber
// Vue.prototype.$clipboard = clipboard
Vue.prototype._i18n = i18n
Vue.prototype.$bus = new Vue();
Vue.prototype.$api = handleRequest




store.dispatch('setLangData');
App.mpType = 'app'


// 为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
// let main = plus.android.runtimeMainActivity();
// plus.runtime.quit = function() {
//   main.moveTaskToBack(false);
// };

// // 重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast
// plus.nativeUI.toast = (function(str) {
//   if (str == '再按一次退出應用') {
//     main.moveTaskToBack(false);
//     return false;
//   } else {
//     uni.showToast({
//       position: 'bottom',
//       title: '再按一次退出應用',
//       icon: 'none',
//     })
//   }
// });



const app = new Vue({
  store,
  ...App
})
app.$mount()








export default app
