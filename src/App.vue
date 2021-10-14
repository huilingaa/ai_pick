<script>
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    computed: {
      ...mapState('walletStore', ['walletList', 'currentWallet']),
    },
    async onLaunch() {
      uni.onNetworkStatusChange((res)=> {
          this.$store.dispatch('saveNetworkType', res.networkType)
      });


      // commit('SET_CUURRENTTOWER_ID', '')
      // this.$store.commit('indexStore/SET_CUURRENTTOWER_ID')

      // console.log('App onLaunch')
      // 如果没有当前激活节点和节点列表时， 直接进入节点首页。 关闭所有其他
      // #ifdef APP-PLUS
      if (!this.walletList.length) {
        uni.reLaunch({
          url: "/pages/wallet/index",
          success: ()=>{
            this.$store.dispatch('getHotUpload')
          }
        })
      } else {
        uni.reLaunch({
          url: "/pages/index/index",
          success: ()=>{
            this.$store.dispatch('getHotUpload')
          }
        })
      }
      //app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
      setTimeout(() => {
        plus.navigator.closeSplashscreen()
      }, 1200)
      // #endif


      uni.preloadPage({
        url: '/pages/communication/index'
      })
      uni.preloadPage({
        url: '/pages/exchange/index'
      })
      uni.preloadPage({
        url: '/pages/asset/index'
      })
      uni.preloadPage({
        url: '/pages/mine/index'
      })

      // 全局获取数字货币数据
      this.setPrice()
    },
    onShow: function() {
      uni.getNetworkType({
        success: (res) => {
          // console.log('获取网络状态', res.networkType);
          this.$store.dispatch('saveNetworkType', res.networkType)
        }
      });
    },
  
    methods: {
			// tarbar国际化处理扩展
      // setTabbarLang() {
      //   ['home', 'communication', 'refining', 'assets', 'mine'].forEach((item, index) => {
      //     uni.setTabBarItem({
      //       index: index,
      //       "text": this.$t(item)
      //     })
      //   })
      // }
      ...mapActions('priceStore',['setPrice'])
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  
  @import url("./styles/reset.scss");


  uni-page-head .uni-page-head__title {
    font-weight: 500;
    color: #E1E6EA;
  }

  uni-page-head .uni-btn-icon {
    color: #E1E6EA !important;
    font-size: 36rpx;
  }

  uni-toast .uni-simple-toast__text {
    background: rgba(99, 113, 146, 0.50);
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    color: #e1e6ea;
  }

  uni-toast .uni-sample-toast {
    /* background: rgba(99,113,146,0.50); */
  }
</style>
