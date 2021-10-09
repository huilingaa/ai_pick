// 节点
const Web3 = require('web3');
export default () => {
  const state = {
    connectAddressId: uni.getStorageSync('connectAddressId') || '',
  }
  const getters = {
    connectAddressId: (state) => state.connectAddressId,
  }
  const mutations = {
    connectAddressId(state, item) {
      console.log(item)
      state.connectAddressId = item;
      uni.setStorageSync('connectAddressId', item)
    }
  }
  const actions = {
    connectWallet({
      commit,
      state,
      dispatch
    }, name) {
      return new Promise(async (resolve, reject) => {
        if (window.ethereum) {
          // 连接
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          // 账户
          web3.eth.getAccounts((err, accs) => {
            commit('connectAddressId', accs[0])
            resolve(accs[0])
            return
          });
        }
      })
    },
  }
  return {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
}
