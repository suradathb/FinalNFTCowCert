import React,{Component} from "react";
import axios from "axios";
import Web3 from "web3";
import CowCoin from "./abis/CowCoin.json";
import ERC721 from "./abis/ERC721.json";
import { Link, Route } from "react-router-dom";
import ReportCert from "./Components/ReportCert";
import SearchItem from "./SearchItem";

class MemberHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: "",
            contractaddress:"",
            cowCoin: [],
            coinCow: 0,
            cowerc: [],
            tasks: [],
            arrayCow: "",
            dataall: [],
            selectDrop: "1",
            search: "",
            searchShow: [],
            hash: [],
            getapi: [],
            owner: [],
            balance: [],
            isReadMore: true,
            isowner: false,
            status: [],
            value: "1",
            transfer:[]
          };
    }
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
        // await this.getEmployeestest();
      }
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
        } else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
        } else {
          // window.alert(
          //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
          // );
        }
      }
    
      async loadBlockchainData() {
        if (window.web3) {
          const web3 = window.web3;
          // Load account
          const accounts = await web3.eth.getAccounts();
          this.setState({ account: accounts[0] });
          const networkId = await web3.eth.net.getId();
          const networkData = CowCoin.networks[networkId];
          const abi = CowCoin.abi;
          const abiERC = ERC721.abi;
          const address = networkData.address;
          const cowCoin = new web3.eth.Contract(abi, address);
          const cowerc = new web3.eth.Contract(abiERC, address);
          this.setState({ cowCoin });
          this.setState({ cowerc });
          const coinCow = await cowCoin.methods.cowCertCount().call();
          this.setState({ coinCow });
          const conaddress = cowCoin._address;
          this.setState({contractaddress:conaddress});
          // console.log(cowCoin._address)
          for (var i = 1; i <= coinCow; i++) {
            const task = await cowCoin.methods.blacklistedCowCert(i).call();
            const getadd = await cowerc.methods.ownerOf(i).call();
            const checkblock = await cowCoin.methods.blockCowcert(i).call();
            // const check = await cowCoin.methods
            // console.log(checkblock)
            this.setState({
              tasks: [...this.state.tasks, task],
              owner: [...this.state.owner, getadd],
              status: [...this.state.status, checkblock],
            });
          }
          axios
            .get(
              // `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x82eaDcf8504F893993cf075b98f11465078B240E&address=${accounts}`
              `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=${conaddress}&address=${accounts}`
              // `https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${conaddress}&address=${accounts}`
            )
            .then((response) => {
              const getDataAll = response.data.result.map((cow, key) => {
                const getacc = this.state.account.toLocaleLowerCase();
                // console.log(cow)
                // if else  นี้ใช้กรณีโคถูกโอนเปลี่ยนมือแล้ว Start
                if (cow.to === getacc) {
                  this.setState({
                    hash: [...this.state.hash, cow],
                    // balance: [...this.state.balance, cow.tokenID],
                    // tasks: [...this.state.tasks, task],
                  });
                }
                else if(cow.to !== getacc)
                {
                  // console.log(getacc,cow.to,cow.tokenID)
                  this.setState({
                    transfer:[...this.state.transfer,cow],
                  })
                }
                // if else  นี้ใช้กรณีโคถูกโอนเปลี่ยนมือแล้ว End
              });
            });
        }
      }
    render() { 
        const getdata = this.state.tasks.map(showtask => (
            this.state.hash.map((showhash)=>{
                if(showtask.id === showhash.tokenID)
                {
                    // console.log(showtask.tokendId)
                    let transNo;
                    this.state.transfer.map((tNo) =>{
                      transNo = tNo.tokenID;
                    })
                    
                    let num;
                    const depArray = this.state.balance.map((j) => {
                        // console.log(j)
                        num = j;
                        return num;
                    });
                    let owner = ""
                    if(showhash.to === this.state.owner)
                    {
                        owner = showhash.to;
                    }
                    const status = this.state.cowCoin.methods.blockCowcert(showhash.tokenID).call();
                    const histshow = showtask.cowCertlist;
                    const afterSp = histshow.split(",");
                    let number = showhash.tokenID - 1;

                  if(this.state.status[number] === false && showhash.tokenID === transNo)
                  {
                    return (
                        <div className="col-12 col-md-4 mb-4">
                          <div className="card h-100">
                          <Link
                                to={`/hiscowcoin/${showhash.hash}`}
                                title={
                                    showhash.tokendId +
                                    "," +
                                    afterSp[3]
                                }
                                >
                              <img
                                src={`https://ipfs.io/ipfs/${showtask.imgPath}`}
                                class="card-img-top"
                                alt="..."
                              />
                            
                            <div class="card-body">
                              <ul class="list-unstyled d-flex justify-content-between">
                                <li>
                                  {/* <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i> */}
                                </li>
                                <li class="text-muted text-right">
                                  โอนแล้ว
                                </li>
                              </ul>
                              <a
                                href="shop-single.html"
                                class="h2 text-decoration-none text-dark"
                              >
                                {afterSp[2]} &nbsp;
                                {afterSp[3]}
                              </a>
                              <p class="card-text">
                              {`โคบราห์มัน : ${afterSp[0]} สี : ${afterSp[6]} เลขประจำตัว : ${afterSp[5]}`}
                              </p>
                              <p class="card-text">{`เจ้าของปัจจุบัน : ${this.state.owner[showhash.tokenID].toLocaleLowerCase()}`}</p>
                            </div>
                            </Link>
                          </div>
                        </div>
                      );
                  }
                
                //  return(
                //     <tr key={showhash.tokenID}>
                //         <td>{showtask.tokendId}</td>
                //         <td>
                //         <img
                //             className="CowCoin"
                //             src={`https://ipfs.io/ipfs/${showtask.imgPath}`}
                //             alt=""
                //         />
                //         </td>
                //         <td>{afterSp[3]}</td>
                //         <td>
                //         <Link
                //             to={`/hiscowcoin/${showhash.hash}`}
                //             title={
                //             showtask.tokendId +
                //             "," +
                //             afterSp[3]
                //             }
                //         >
                //             {showhash.hash}
                //         </Link>
                //         </td>
                //         <td>
                //         <ReportCert
                //             key={showhash.id}
                //             hash={showhash}
                //             smart={histshow}
                //             pad={depArray}
                //             accessKey={showhash.id}
                //             account={this.state.account}
                //             images={showtask.imgPath}
                //             ERC721={this.state.cowerc}
                //             owner_account={owner}
                //         />
                //         </td>
                //         <td>
                //         <SearchItem
                //             key={showhash.id}
                //             hash={showhash}
                //             smart={histshow}
                //             pad={depArray}
                //             accessKey={showhash.id}
                //             account={this.state.account}
                //             images={showtask.imgPath}
                //             ERC721={this.state.cowerc}
                //         />
                //         </td>
                //     </tr>
                //  )
                }
            })
        ))
        return ( 
            <>
            {getdata}
            </>
         );
    }
}
 
export default MemberHis;