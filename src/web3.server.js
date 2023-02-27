import Web3 from "web3";
import CowCoin from "../src/abis/CowCoin.json";

class Web3Service {
  constructor() {
    this.web3 = null;
    this.state = {
      account: "",
      CowCoin: null,
    };
  }

  async loadWeb3() {
    if (window.web3) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.listenForAccountChanges();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    this.web3 = window.web3;
  }

  listenForAccountChanges() {
    window.ethereum.on('accountsChanged', (accounts) => {
      this.state.account = accounts[0];
      this.loadBlockchainData();
    });
  }

  async loadBlockchainData() {
    if (this.web3) {
      const accounts = await this.web3.eth.getAccounts();
      this.state.account = accounts[0];
      const networkId = await this.web3.eth.net.getId();
      const networkData = CowCoin.networks[networkId];
      const abi = CowCoin.abi;
      const address = networkData.address;
      const cowCoin = new this.web3.eth.Contract(abi, address);
      this.state.CowCoin = cowCoin;
    }
  }

}


const web3Service = new Web3Service();
export default web3Service;