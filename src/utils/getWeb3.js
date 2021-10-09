import Web3 from "web3";


export const getWeb3 = async (form) => {
  if (window.ethereum) {
    // 连接
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    // 账户
    web3.eth.getAccounts((err, accs) => {
      console.log('999',accs)
       return accs[0]
    });

  } else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log("Injected web3 detected.");
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:9545"
    );
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
  }
};
//
