import React,{ Component } from 'react'
import web3Service from './web3.server';
import axios from 'axios';

 class ShowMember extends React.Component {
    async componentWillMount() {
        await web3Service.loadWeb3();
        await web3Service.loadBlockchainData();
        const addresscon = await web3Service.state.CowCoin._address;
        // console.log(web3Service.state.CowCoin.methods.blacklistedCowCert(4).call())
        this.state = {
            account:web3Service.state.account,
            CowCoin:web3Service.state.cowCoin
        }
        axios
        .get(
          // `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x82eaDcf8504F893993cf075b98f11465078B240E&address=${accounts}`
          // `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x73DF02B5a8AB94932343d7259d5002b329050659&address=${accounts}`
          `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=${addresscon}&address=${this.state.account}`
        )
        .then((response) => {
          const getDataAll = response.data.result.map((cow,key) => {
            // console.log(cow)
            const getacc = this.state.account.toLocaleLowerCase();
     
            // console.log(getacc,cow.to,cow.tokenID)
            for(var i = 0;i <= key;i++){
            const  blocklist = [web3Service.state.CowCoin.methods.blacklistedCowCert(cow.tokenID).call()];
            // console.log(blocklist)
            this.setState({
                balance: cow.tokenID,
                });
            }
            // this.setState({
            //   hash: [...this.state.hash, cow],
            //   // tasks: [...this.state.tasks, task],
            // });
          });
        });
      }
    
      constructor(props) {
        super(props);
        this.state = {
         account:"",
         addresscontract:"",
         CowCoin:null,
         hash:[],
         balance: [],
        }
      }
  render() {
    return (
      <>
        <div class="container py-5">
          <div class="row py-5">
            <div class="row">
            <p>รายการที่ถูกโอนแล้ว</p>
            </div>
            {this.state.hash.map((his,key)=>{
                console.log(his)
            })}
          </div>
        </div>
      </>
    )
  }
}

export default ShowMember;