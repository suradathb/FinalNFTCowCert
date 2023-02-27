import React,{Component} from "react";
import axios from "axios";
import Web3 from "web3";
import CowCoin from "./abis/CowCoin.json";
import ERC721 from "./abis/ERC721.json";
import { Link, Route } from "react-router-dom";
import ReportCert from "./Components/ReportCert";
import SearchItem from "./SearchItem";

class MemberBlock extends Component {
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
                // const getacc = this.state.account.toLocaleLowerCase();
                this.setState({
                  hash: [...this.state.hash, cow],
                  // tasks: [...this.state.tasks, task],
                });
              });
            });
        }
      }
    render() { 
        const getdata = this.state.tasks.map(showtask => (
            this.state.hash.map((showhash)=>{
                if(showtask.id === showhash.tokenID)
                {
                    // console.log(this.state.status)
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
                      
                    
                  if(this.state.status[number] === true)
                  {
                    return (
                        <div className="col-12 col-md-4 mb-4">
                          <div className="card h-100">
                            <a href="shop-single.html">
                              <img
                                src={`https://ipfs.io/ipfs/${showtask.imgPath}`}
                                class="card-img-top"
                                alt="..."
                              />
                            </a>
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
                                  {afterSp[3]}
                                </li>
                              </ul>
                              <a
                                href="shop-single.html"
                                class="h2 text-decoration-none text-dark"
                              >
                                {afterSp[3]}
                              </a>
                              <p class="card-text"></p>
                              {(afterSp[3], afterSp[2])}
                              {/* <p class="text-muted">Reviews (24)</p> */}
                            </div>
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
 
export default MemberBlock;