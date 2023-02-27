import React, { Component } from "react";
import axios from "axios";
import Web3 from "web3";
import CowCoin from "./abis/CowCoin.json";
import ERC721 from "./abis/ERC721.json";
import { Link, Route } from "react-router-dom";
import "./Member.css";
import SearchItem from "./SearchItem";
import ReportCert from "./Components/ReportCert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ShowMember from "./ShowMember";
import MemberTranfer from "./MemberTranfer";
import MemberBlock from "./MemberBlock";
import MemberHis from "./MemberHis";
// import ShowItemCowCert from "./Components/ShowItemCowCert";

class Member extends Component {
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
      // console.log(accounts)
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
          // `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x73DF02B5a8AB94932343d7259d5002b329050659`
        )
        .then((response) => {
          const getDataAll = response.data.result.map((cow, key) => {
            // console.log(cow)
            const getacc = this.state.account.toLocaleLowerCase();
            // console.log(getacc,cow.to)
            if (cow.to != getacc) {
              // console.log(getacc,cow.to,cow.tokenID)
              this.setState({
                balance: [...this.state.balance, cow.tokenID],
                hash: [...this.state.hash, cow],
              });
            }
            
            const task = cowCoin.methods.blacklistedCowCert(cow.tokenID).call();
            
            // const getadd = cowerc.methods.ownerOf(cow.tokenID).call();
            // // // console.log(task)
            // getadd.then((name) =>{
            //   // console.log(name)
            //   // if (cow.to != getacc) {
            //   this.setState({
            //     owner : name,
            //     // balance: [...this.state.balance, cow.tokenID],
            //   })
            //   // }
            // });
            // task.then((hist) => {
            // //   // console.log(hist)
            // // //   const showaddress = cowerc.methods.ownerOf(hist.id).call();
            // // //   // showaddress.then((name) => {
            // // //   //     this.setState({
            // // //   //       owner:[...this.state.owner,name],
            // // //   //       tasks: [...this.state.tasks, hist],
            // // //   //     });
            // // //   // });
            // // //   // console.log(showaddress.name)
            //   this.setState({
            //     tasks: [...this.state.tasks, hist],

            //   });
            // });
            // this.setState({
            //   hash: [...this.state.hash, cow],
            //   // tasks: [...this.state.tasks, task],
            // });
          });
        });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
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
    // this.getEmployeestest = this.getEmployeestest.bind(this);
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  // SendView;
  render() {
    return (
      <>
        <div class="container-fluid bg-light py-5">
          <div class="col-md-6 m-auto text-center">
            <img
              className="imgPreview"
              src="../assets/images/NFTBlack.png"
              alt=""
            />
            {/* <p class="inputname">{this.state.account.toLocaleLowerCase()}</p> */}
            <p class="inputname">{this.state.account}</p>
          </div>
        </div>
        <div className="container py-5">
          <div className="row py-5">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={this.state.value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={this.handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="เหรียญ NFT" value="1" />
                    <Tab label="เหรียญถูกยกเลิก" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <table class="table table-responsive-md">
                    <thead>
                      <tr>
                        <th scope="col">รหัสโค</th>
                        <th scope="col">รูปโค</th>
                        <th scope="col">ชื่อโค</th>
                        <th scope="col">เจ้าของวัว</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <MemberTranfer/>
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="2">
                  <MemberBlock/>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
        <div class="container py-5">
          <div class="row py-5">
            <div class="row">
              <p>รายการที่ถูกโอนแล้ว</p>
            </div>
            <MemberHis/>
          </div>
        </div>
        {/* <ShowMember/> */}
      </>
    );
  }
}

export default Member;
