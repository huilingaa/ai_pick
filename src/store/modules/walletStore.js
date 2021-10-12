// 节点
const Web3 = require('web3');
export default () => {
  const state = {
    connectAddressId: uni.getStorageSync('connectAddressId') || '',
    walletName: uni.getStorageSync('walletName') || '',
  }
  const getters = {
    connectAddressId: (state) => state.connectAddressId,
    walletName: (state) => state.walletName,
  }
  const mutations = {
    connectAddressId(state, id) {
      state.connectAddressId = id;
      uni.setStorageSync('connectAddressId', id)
    },
    walletName(state, name) {
      state.walletName = name;
      uni.setStorageSync('walletName', name)
    },
    closeWallet(state) {
      state.walletName = ''
      state.connectAddressId = ''
      uni.clearStorageSync();
    },
  }
  const actions = {
    closeWallet({
      commit
    }) {
      commit('closeWallet')
    },
    connectWallet({
      commit,
      state,
      dispatch
    }, name) {
      return new Promise(async (resolve, reject) => {
        console.log('name1',name)
        if (window.ethereum) {
          // 连接
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          // 账户
          web3.eth.getAccounts((err, accs) => {

            commit('connectAddressId', accs[0])
            commit('walletName', name)

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
