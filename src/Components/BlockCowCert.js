import React, { Component } from "react";
import { CustomDialog } from "react-st-modal";
import axios from "axios";
import Web3 from "web3";
import CowCoin from "../abis/CowCoin.json";
import ERC721 from "../abis/ERC721.json";
// import QrReader from "react-qr-reader";
import "./BlockCowCert.css";
import {
  makeStyles,
} from "@material-ui/core";

class BlockCowCert extends Component {
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
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async loadBlockchainData() {
    if (window.web3) {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
      //   0xccf359752b0411133c9DbdD3774e37b21CDF8969
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

      axios
        .get(
          // `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x82eaDcf8504F893993cf075b98f11465078B240E&address=${accounts}`
          `https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x73DF02B5a8AB94932343d7259d5002b329050659&address=${accounts}`
        )
        .then((response) => {
          const getDataAll = response.data.result.map((cow, key) => {
            const task = cowCoin.methods.blacklistedCowCert(cow.tokenID).call();
            task.then((hist) => {
              this.setState({
                tasks: [...this.state.tasks, hist],
              });
            });
          });
        });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      datas: this.props.data,
      login: "",
      toAddress: "",
      tokenId: 0,
      account: "",
      tasks: [],
      result: "No result",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.TransFromTo = this.TransFromTo.bind(this);
  }
  handleChange(event) {
    this.setState({ login: event.target.value });
  }

  TransFromTo(event) {
    // console.log(this.state.cowCoin.methods);
    // console.log(this.state.cowCoin.methods.enableTransfer(this.state.datas.ID).call())
    // const check = this.state.cowCoin.methods.enableTransfer(this.state.datas.ID)
    // event.preventDefault()
    const fromCert = this.state.account;
    // const to = event.toAddress;
    const tokend = this.state.datas.ID;
    // console.log(tokend)
    // console.log(fromCert,to,tokend);
    // const CowCoinNo = content.cowcert_no;
    // const account = content.account_Employee;
    // const objectArray = Object.values(content);

    const addCert = this.state.cowCoin.methods
      .disableTransfer(tokend)
      .send({ from: fromCert })
      .once("receipt", (receipt) => {
        // console.log(
        //   "Disable Success",
        //   this.state.cowCoin.methods.disableTransfer(tokend).call()
        // );
        // document.getElementById("contentCowCoin").innerHTML = "";
        window.location.reload();
      });
  }
  TransFromToUnblock(event){
    // console.log(this.state.cowCoin.methods);
    // console.log(this.state.cowCoin.methods.enableTransfer(this.state.datas.ID).call())
    // const check = this.state.cowCoin.methods.enableTransfer(this.state.datas.ID)
    // event.preventDefault()
    const fromCert = this.state.account;
    const to = event.toAddress;
    const tokend = this.state.datas.ID;
    // console.log(tokend)
    // console.log(fromCert,to,tokend);
    // const CowCoinNo = content.cowcert_no;
    // const account = content.account_Employee;
    // const objectArray = Object.values(content);

    const addCert = this.state.cowCoin.methods
      .enableTransfer(tokend)
      .send({ from: fromCert })
      .once("receipt", (receipt) => {
        // console.log(
        //   "Disable Success",
        //   this.state.cowCoin.methods.enableTransfer(tokend).call()
        // );
        // document.getElementById("contentCowCoin").innerHTML = "";
        window.location.reload();
      });
  }
  handleScan(data) {
    const getdata = data;
    const Sdata = getdata.split(":");
    // console.log(Sdata[1].toLocaleLowerCase())
    this.setState({
      toAddress: Sdata[1].toLocaleLowerCase(),
    });
  }
  handleError(err) {
    console.error(err);
  }
  openImageDialog() {
    document.getElementById("contentCow").innerHTML = "";
    this.refs.qrReader1.openImageDialog();
  }
  render() {
    //console.log(this.state)
    const image = this.state.datas.images;
    const smart = this.state.datas.smart;
    const sprit = smart.split(",");
    const block = this.state.datas.status;
    // console.log(sprit)
    return (
      <>
        <from id="contentCowCoin" className="search-item">
          <br />
          <div className="row s-im">
            <img
              className="s-CowCoin"
              src={`https://ipfs.io/ipfs/${image}`}
              alt=""
            />
          </div>
          <br />
          <div class="row s-item">
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputname">ทะเบียนโคเลขที่ : {sprit[2]}</label>
            </div>
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputemail">ชื่อโค : {sprit[3]}</label>
            </div>
          </div>
          <div class="row s-item">
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputname">เพศ : {sprit[1]}</label>
            </div>
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputemail">เลขประจำตัวโค : {sprit[5]}</label>
            </div>
          </div>
          <div class="row s-item">
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputname">วัน/เดือน/ปี เกิด : {sprit[4]}</label>
            </div>
            <div class="form-group col-md-6 mb-3">
              <label htmlFor="inputemail">ผู้บำรุงพันธุ์ : {sprit[7]}</label>
            </div>
          </div>
          <div class="row s-item">
            <div class="col text-end mt-2">
              {block == false ?
              <input
                type="submit"
                value="บล็อก"
                class="btn btn-success btn-lg px-3"
                onClick={(event) => {
                  event.preventDefault();
                  // console.log(this.state)
                  this.TransFromTo(this.state);
                }}
              />
              :
              <input
                type="submit"
                value="ยกเลิกบล็อก"
                class="btn btn-success btn-lg px-3"
                onClick={(event) => {
                  event.preventDefault();
                  // console.log(this.state)
                  this.TransFromToUnblock(this.state);
                }}
              />
            }
            </div>
          </div>
          <br />
        </from>
      </>
    );
  }
}

function ShowBlockCowCoin(props) {
  // console.log(props);
  const sbool = props.status;
  return (
    <>
      {sbool == false ? (
        <button
          className="btn btn-outline-secondary"
          onClick={async () => {
            // console.log(props)
            //   const smartshow = props.smart.split(",");
            const result = await CustomDialog(<BlockCowCert data={props} />, {
              title: "บล็อกเหรียญ : ",
              showCloseIcon: true,
            });
          }}
        >
          <i class="fa fa-eraser"></i>
          &nbsp; บล็อก
        </button>
      ) : (
        <button
          className="btn btn-outline-secondary"
          onClick={async () => {
            // console.log(props)
            //   const smartshow = props.smart.split(",");
            const result = await CustomDialog(<BlockCowCert data={props} />, {
              title: "บล็อกเหรียญ : ",
              showCloseIcon: true,
            });
          }}
        >
          <i class="fa fa-eraser"></i>
          &nbsp; ยกเลิกบล็อก
        </button>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 20,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default ShowBlockCowCoin;
