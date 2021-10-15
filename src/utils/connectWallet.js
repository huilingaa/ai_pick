import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  mapState,
  mapActions,
  mapGetters
} from 'vuex'
import store from '@/store';
export const connect = async (name) => {
  const bridge = "https://bridge.walletconnect.org";
  const connector = new WalletConnect({
    bridge,
    qrcodeModal: QRCodeModal
  });
  store.commit('walletName', name)
  if (!connector.connected) {
    await connector.createSession();
  }
  await subscribeToEvents(connector,name);
};

// 事件监听
const subscribeToEvents = (connector,name) => {

  if (!connector) {
    return;
  }

  connector.on("session_update", async (error, payload) => {
    console.log(`数据变化`);
    if (error) {
      throw error;
    }
    // const {
    //   chainId,
    //   accounts
    // } = payload.params[0];
    // this.onSessionUpdate(accounts, chainId); // 刷新对应资产
  });

  connector.on("connect", (error, payload) => {
    console.log(`连接上了，缓存数据`, payload);
    if (error) {
      throw error;
    }
    onConnect(payload,name);
  });

  connector.on("disconnect", (error, payload) => {
    console.log(`连接断开，清除数据数据`);
    if (error) {
      throw error;
    }
    // 清空一切
    store.dispatch('walletStore/closeWallet')
  });

  if (connector.connected) {
    const {
      chainId,
      accounts
    } = connector;
    const address = accounts[0];
    console.log('已经连接了',address)
    var name=''
    store
      .dispatch('walletStore/connectWallet', {address,name})
    // this.onSessionUpdate(accounts, chainId);
  }
};




// 连接上赋值
const onConnect = async (payload,name) => {
  const {
    chainId,
    accounts
  } = payload.params[0];
  const address = accounts[0];
  console.log('address',address)
  store
    .dispatch('walletStore/connectWallet', {address,name})
  // this.getAccountAssets(); 拿资产接口
};
