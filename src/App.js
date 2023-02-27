import Footer from "./Components/Footer";
import Header from "./Components/Header";
// import newcowdams from "./data/NewCowDam";
// import NewCowcert from "./Components/NewCowcert";
import Banner from "./Components/Banner";
import { Route, Switch } from "react-router-dom";
import Abount from "./Abount";
import Contract from "./Contract";
import Login from "./Login";
import Page404 from "./Page404";
import Search from "./Search";
import ReportCert from "./Components/ReportCert";
import CowCoin from "./abis/CowCoin.json";
import ERC721 from "./abis/ERC721.json";
import Web3 from "web3";
import AddCowCert from "./AddCowCert";
import React, { Component } from "react";
import Home from "./Home";
import ShowCowCert from "./Components/ShowCowCert";
import BlockCowCert from "./Components/BlockCowCert";
// import axios from "axios";
// import CreateMember from "./Components/CreateMember";
import AddOwner from "./AddMember";
// import Example from "./Components/ReportCert";
import Member from "./Member";
import ShowItemCowCert from "./Components/ShowItemCowCert";
import UploadImg from "./UploadImg";




// const str = "F1|009255|F|PX|MrKOK201|04/10/2556|แดง|100001|100002|สวาท บังนิไกร|10/4/2556|0|007255|Mr.MOT 09|ZX|แดง|90|10/04/2554|100002|0|003255|Ms.SXT 02|SX|แดง|2|10/4/2555|100003|0";
// const arrayCow = str.split("|");

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
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
      // console.log(CowCertificate)
      const abi = CowCoin.abi;
      const abiERC = ERC721.abi;
      const address = networkData.address;
      const cowCoin = new web3.eth.Contract(abi, address);
      const cowerc = new web3.eth.Contract(abiERC, address);
      this.setState({ cowCoin });
      this.setState({ cowerc });
      const taskCount = await cowCoin.methods.cowCertCount().call();
      this.setState({ taskCount });
      // console.log(cowCoin.methods)
      for (var i = 0; i <= taskCount; i++) {
        const task = await cowCoin.methods.taskcows(i).call();
        // console.log(task)
        this.setState({
          owner: [...this.state.owner, task.government.toLocaleLowerCase()],
        });
      }
      // this.setState({ loading: false });
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
      owner:[],
      loading: true,
      cowerc: [],
      cowCoin: [],
      smartdata: [],
    };
  }

  render() {
    // console.log(this.state.tasks)
    let Permission = this.state.owner.map((admin) => {
      // console.log(this.state.account.toLocaleLowerCase(),admin)
      if(this.state.account.toLocaleLowerCase() == admin)
      {
        return (
          <>
          <Route path="/showcowcert">
            {/* <AddCowCert value={this.state.account}/> */}
            <ShowCowCert />
          </Route>
          <Route path="/addcowcert">
            <AddCowCert />
          </Route>
          <Route path="/addowner">
            <AddOwner />
          </Route>
          <Route path="/hiscowcoin">
            <ShowItemCowCert />
          </Route>
          <Route path="/members">
            <Member/>
          </Route>
          {/* <Route path="/hiscowcoin">
            <ShowItemCowCert />
          </Route> */}
          <Route path="/contact">
            <Contract />
          </Route>
          </>
        )
      }
      else{
        // return (
        //   <Route path="*">
        //     <Page404 />
        //   </Route>
        // )
      }
    });
    return (
      <>
        <Header account={this.state.account.toLocaleLowerCase()} />
        <Switch>
          <Route path="/" exact>
            <Banner />
            <section class="bg-light">
              <div class="container py-5">
                <div class="row text-center py-3">
                  <div class="col-lg-6 m-auto">
                    <h1 class="h1">ทำเนียบพ่อบราห์มัน</h1>
                    <p>
                      Curabitur ac mi sit amet diam luctus porta. Phasellus
                      pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
                    </p>
                  </div>
                </div>
                <div class="row">
                  <Home />
                </div>
                {/* <div class="row">
                      {tattooElements}
                  </div> */}
              </div>
            </section>
          </Route>
          <Route path="/search">
            <Search tasks={this.state.tasks} />
          </Route>
          <Route path="/abount">
            <Abount />
          </Route>
          <Route path="/ReportCert">
              <ReportCert/>
          </Route>
          <Route path="/upload">
            <UploadImg/>
          </Route>
          {/* <Route path="/showcowcert">
            <ShowCowCert />
          </Route>
          <Route path="/addcowcert">
            <AddCowCert />
          </Route>
          <Route path="/addowner">
            <AddOwner />
          </Route> */}
          {Permission}
          <Route path="/contact">
            <Contract />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/members">
            <Member/>
          </Route>
          <Route path="/hiscowcoin">
            <ShowItemCowCert />
          </Route>
          <Route path="blockcowcoin">
            <BlockCowCert/>
          </Route>
          <Route path="/cowcertPDF">
              <ReportCert/>
         </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        <Footer account={this.state.account} />
      </>
    );
  }
}

export default App;
