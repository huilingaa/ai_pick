var pako = require('pako');
export default () => {
  const state = {
      btcData: {
          high: '$0',
          low: '$0',
          open: '$0',
          close: '$0',
          chg: '0%',   //   涨跌幅=(今日收盘价-昨日收盘价)/昨日收盘价*100% // (57979.32 - 56161.55) / 56161.55 = 3.24
          chgPrice: '$0', //上涨或下跌的金额  今日收盘价-昨日收盘价
          price: '$0'  //成交价
      },
      ethData: {
          high: '$0',
          low: '$0',
          open: '$0',
          close: '$0',
          chg: '0%',
          chgPrice: '$0',
          price: '$0'
      },
      socketGlobal: null
  }
  const getters = {
  }
  const mutations = {
      setBtcData(state, obj){
          state.btcData = {
            high: `$${obj.high.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            low: `$${obj.low.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            open: `$${obj.open.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            close: `$${obj.close.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            chg: `${obj.chg}%`,
            chgPrice: `$${obj.chgPrice.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            price: `$${obj.price.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`
          }
      },
      setEthData(state, obj){
          state.ethData = {
            high: `$${obj.high.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            low: `$${obj.low.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            open: `$${obj.open.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            close: `$${obj.close.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            chg: `${obj.chg}%`,
            chgPrice: `$${obj.chgPrice.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`,
            price: `$${obj.price.replace(/(?=\B(?:\d{3})+\b)(\d{3}(?:\.\d+$)?)/g,',$1')}`
          }
      },
      setSocketGlobal(state, val){
          state.socketGlobal = val
      }
  }
  const actions = {
      async setPrice({ dispatch, commit, state }){
        console.log('sspp')
          await dispatch('getPrice',{type:'btc'})
          await dispatch('getPrice',{type:'eth'})
      },
      getPrice({ commit, state }, param){
          return new Promise((resolve,reject)=>{
              let message = JSON.stringify({"req":"market.btcusdt.kline.1day","symbol":"btcusdt","period":"1day"})
              if(param?.type=='eth'){
                message = JSON.stringify({"req":"market.ethusdt.kline.1day","symbol":"ethusdt","period":"1day"})
              }

              if(!state.socketGlobal){
                  uni.connectSocket({url:'ws://p_hb_ws.ratafee.nl/'})
                  uni.onSocketOpen((event)=>{
                    commit('setSocketGlobal', true)
                    uni.sendSocketMessage({data:message})
                  })
              }else{
                uni.sendSocketMessage({data:message})
              }
              uni.onSocketMessage((event)=>{
                  let ploydata = new Uint8Array(event.data);
                  let msg = pako.inflate(ploydata, {to: 'string'});
                  var recvData=JSON.parse(msg);
                  console.log('recvData:')
                  console.log(recvData)
                  if(recvData?.data?.length){
                      uni.closeSocket() //接收到数据后关闭scoket连接
                      commit('setSocketGlobal', null)

                      let todayMsg = recvData.data[recvData.data.length - 1]
                      let yesterdayMsg = recvData.data[recvData.data.length - 2]
                      let obj = {
                        high: todayMsg.high.toFixed(2),
                        low: todayMsg.low.toFixed(2),
                        open: todayMsg.open.toFixed(2),
                        close: todayMsg.close.toFixed(2),
                        chg: ((todayMsg.close - yesterdayMsg.close).toFixed(2) / (yesterdayMsg.close.toFixed(2)) * 100).toFixed(2),
                        chgPrice: (todayMsg.close - yesterdayMsg.close).toFixed(2),
                        price: todayMsg.count.toFixed(2)
                      }
                      if(param?.type=='eth'){
                          commit('setEthData', obj)
                      }else{
                        commit('setBtcData', obj)
                      }

                      resolve()
                  }
              })
              uni.onSocketError((evnet)=>{
                console.log('连接失败')
                commit('setSocketGlobal', null)
                resolve()
            })
          })

      }
  }
  return {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
}
