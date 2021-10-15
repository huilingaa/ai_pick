// 节点

const Web3 = require('web3');

import {
  getBalanceNumber
} from '../../utils/formatBalance.js'

// 钱包连接，目前只测试连接mackmask
export const useWeb3 = () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    return web3
  }
}

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
    getBannce(){
      var web3 = useWeb3();
      web3.eth.getBalance("0x5975776D149bDd8d9d72951590393611C316c8e8")
    },
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
        if (window.ethereum) {
          var web3 = useWeb3();
          // 连接
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
