// import { useRouter } from 'vue-router'
import axios from 'axios'
import Store from '../store'
import {
  BASE_URL,
  LANG_KEY,
  TOKEN_KEY,
  CODE_OK
} from '../api/config'
import {handleExchangeJWT} from '../store/modules/walletStore'
const handleErr = (err) => {
  return Promise.reject(err)
}
// 默认配置
axios.defaults.timeout = 5000 // 超时时间
axios.defaults.timeoutErrorMessage = '网络请求超时' // 超时错误提示
//#ifdef APP-PLUS
/*如果在app 环境下 需要baseURL， 如果是在h5开发环境下， 不使用baseURL 直接用代理*/
axios.defaults.baseURL = BASE_URL
//#endif

axios.defaults.adapter = (config) => {
  console.log(config,'-----adapter-----')
  return new Promise((resolve, reject) => {
    let settle = require('axios/lib/core/settle');
    let buildURL = require('axios/lib/helpers/buildURL');
    const baseURL = config.baseURL || ''
    let token = config.headers[TOKEN_KEY];
    try{
      if (!token){
        let currentWallet = uni.getStorageSync('walletList').find(item=>String(item.id) === String(uni.getStorageSync('currentWallet')));
        token = currentWallet.token
      }
    } catch(e){

    }
    uni.request({
        method: config.method.toUpperCase(),
        url: baseURL + buildURL(config.url, config.params, config.paramsSerializer),
        header: {
          [TOKEN_KEY]: token || config.headers[TOKEN_KEY] || 'no-token',
          [LANG_KEY]: uni.getStorageSync('lang') ? 'zh': 'en',
          // 'Content-Range': '0-0,-1',
          ...config.headers
        },
        data: config.data,
        dataType: config.dataType,
        responseType: config.responseType,
        sslVerify: false,
        complete: function complete(response) {
            response = {
                data: response.data,
                status: response.statusCode,
                errMsg: response.errMsg,
                header: response.header,
                config: config
            };
            settle(resolve, reject, response);
        }
    })
  })
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    console.log(config,'-----request-----')
    let token = config.headers[TOKEN_KEY];
    try{
      if (!token){
        let currentWallet = uni.getStorageSync('walletList').find(item=>String(item.id) === String(uni.getStorageSync('currentWallet')));
        token = currentWallet.token
      }
    } catch(e){

    }
    config.headers[TOKEN_KEY] = token||config.headers[TOKEN_KEY]||'no-token'
    config.headers[LANG_KEY] = config.headers[LANG_KEY] || uni.getStorageSync('lang') || 'zh'
    // 是否进行加载中loading提示
    return config
  },
  handleErr
)

// 路由响应拦截
axios.interceptors.response.use(
  async res => {
    console.log('这里是响应拦截 >>>>>>>>>', res);
    if (res.data.code === 'invalid_token' || res.data.status === 40101){
      const form = await handleExchangeJWT(Store.getters['walletStore/currentWallet'])
      Store.commit('walletStore/login', form)
      // axios(res.config);
    }
    // todo: 如果有加载loading, 在此清除
    /*
    * 需要修改throw返回错误逻辑
    * */
    return new Promise((resolve, reject)=>{
      const data = res.data || {}
      if (data.status && data.status !== 200){
        let errorCode = Store.state.langData[res.data.code || res.data || res.code] || res.data.code || res.data || res.code;
        throw {
          data: null,
          code: errorCode,
          status:data.status
        }
        return;
      }
      resolve(res.data)
    })
  },
  error => {
    console.log('error >>>>>>>>>>>>>>>>>>>>>', error.response)
    let errorCode = error.response.data.code || error.response.data || error.response.code;
    throw {
      data: null,
      code: errorCode,
      message: Store.state.langData[errorCode] || errorCode,
      status: error.response.status
    }
  }
)

// deploy: {err: 是否显示错误信息, loading: 是否显示loading, id: 为当前请求赋值id,用于打断请求}
export default {
  /**
   * get请求
   * @param url {String} 请求地址
   * @param params {Object} 请求参数
   * @param header {Object} 请求头参数
   * @param deploy {Object} 接口配置
   * @returns {Promise<AxiosResponse<any>>}
   */
  get: (url, params, headers) => {
    const config = {
      params,
      headers
    }
    return axios.get(url, config)
  },
  post: (url, params, headers) => {
    const config = {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }
    return axios.post(url, params, config)
  },
  postForm: (url, params,header) => {
    const config = {
      headers: {
        ...header,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    let sData = ''
    for (const k in params) {
      if (Object.prototype.hasOwnProperty.call(params, k)) {
        sData += encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + '&'
      }
    }                                                                                                                                                                                               
    return axios.post(url, sData, config)
  },
  postFormData: (url, params, header) => {
    const config = {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    }
    return axios.post(url, params, config)
  }
}
