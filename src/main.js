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
	import myheader from '@/components/my-header/index.vue'

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
Vue.prototype.$api = handleRequest


Vue.prototype.$walletNameRules = {
  rules: [{
    required: true,
    errorMessage: i18n.t('enterWalletName') || '请输入节点名称',
  },{
    validateFunction: (rule, value, data, callback) => {
      // 异步需要返回 Promise 对象
      let testStr = value.replace(/[[\u4e00-\u9fa5]/gi, 'aa');
      let reg = /^[\u4e00-\u9fa5-a-zA-Z0-9]{4,16}$/;
        if (reg.test(testStr)) {
          return true
        } else {
          callback(`${i18n.t('passwordInputError')}` || '支持4-16位字符，中文、英文大小写，数字')
        }
    }
  }]
}
Vue.prototype.$passwordsRules = {
  rules: [{
    required: true,
    errorMessage: i18n.t('enterSecurepassword' || '请输入安全密码'),
  },{
      validateFunction: (rule, value, data, callback) => {
        // 异步需要返回 Promise 对象
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
          console.log(rule, value, data, 'rule')
          if (reg.test(value)) {
            if (data.password &&
              data.checkPassword &&
              reg.test(data.password) &&
              reg.test(data.checkPassword) &&
              data.password !== data.checkPassword
            ) {
              /*
               * 如果已经输入密码和输入了密码 才会检验2次密码是否输入相同。
               * 如果只输入了一次密码， 则默认认为是在输入密码提交请求。
               * */
              if (value === data.checkPassword) {
                /*
                 * 只有在输入的密码时再次输入密码框时才会错误提示
                 * */
                callback(`${i18n.t('repeatInputError' || '两次输入密码不相同')}`)
                return
              }
              return true;
            }
            return true;
          } else {
            callback(`${i18n.t('nameInputError' || '安全密码为英文、数字组合，合计16个字符上限')}`)
          }
      }
    }
  ]
}
Vue.prototype.$mnemonicRules = {
  rules: [{
    required: true,
    errorMessage: i18n.t('importMnemonicWordTips')||'请输入正确的助记词,助记词由12个单词组成',
  },{
    validateFunction: (rule, value, data, callback) => {
      // 异步需要返回 Promise 对象
        try {
          value = value.replace(/ /ig, ' ').replace(/ +/g, ' ')
          value = value.split(' ');
          if (value.length === 12) {
            // 通过返回 resolve
            return true
          } else {
            callback(i18n.t('importMnemonicWordTips')||'请输入正确的助记词,助记词由12个单词组成')
          }
        } catch (e) {
          callback(i18n.t('importMnemonicWordTips')||'请输入正确的助记词,助记词由12个单词组成')
        }
    }
  }]
}
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
