import zhTW from '@/locals/zh-TW.js'
import en from '@/locals/en.js'


// 意大利语“italiano” it
// 法语“français” tr
// 阿拉伯语“عربى”  ar
// 韩语“한국어” ko
// 日语“日本語” ja

export default {
  locale: uni.getStorageSync('lang') || 'zh-TW',
  messages: {
    en,
    'zh-TW': zhTW,
  }
}
