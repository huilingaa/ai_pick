// 节点



import {connect} from '../../utils/connectWallet.js'
import {
  getBalanceNumber
} from '../../utils/formatBalance.js'



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
    // getBannce(){
    //   var web3 = useWeb3();
    //   web3.eth.getBalance("0x5975776D149bDd8d9d72951590393611C316c8e8")
    // },
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
    }, {address,name}
    ) {
      return new Promise(async (resolve, reject) => {
        console.log(address);

            console.log(name);
            commit('connectAddressId', address)
            commit('walletName', name)
            // resolve(accs[0])
            return



  
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
