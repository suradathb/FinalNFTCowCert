import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import web3server from "../web3.server";
import axios from "axios";
import "./ShowCowCert.css";
import BlockCowCert from "./BlockCowCert";

class ShowCowCert extends Component {
  async componentWillMount() {
    await web3server.loadWeb3();
    await web3server.loadBlockchainData();
    const coinCow = await web3server.state.CowCoin.methods.cowCertCount().call();
    for (var i = 1; i <= coinCow; i++) {
      const task = await web3server.state.CowCoin.methods.blacklistedCowCert(i).call();
      const shwaddress = await web3server.state.CowCoin.methods.ownerOf(i).call();
      const checkblock = await web3server.state.CowCoin.methods.blockCowcert(i).call();
      this.setState({
        tasks: [...this.state.tasks, task],
        owner: [...this.state.owner, shwaddress],
        status: [...this.state.status,checkblock],
      });
    }
    axios
        .get(
          // "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0x82eaDcf8504F893993cf075b98f11465078B240E&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken"
          "https://api-testnet.bscscan.com/api?module=account&action=tokennfttx&contractaddress=0x73DF02B5a8AB94932343d7259d5002b329050659"
        )
        .then((response) => {
          const getDataAll = response.data.result.map((cow, key) => {
            const hashs = {
              hash: cow.hash,
              token: cow.tokenID,
              from: cow.from,
              to: cow.to,
            };
            this.setState({
              hash: [...this.state.hash, hashs],
            });
          });
        });
    this.setState({
      cowCoin:web3server.state.CowCoin,
      account:web3server.state.account,
      coinCow:coinCow,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      cowCoin: [],
      taskCount: 0,
      tasks: [],
      loading: true,
      setDataAll: [],
      hash: [],
      getdata: [],
      searchShow: [],
      search: "",
      blocks: [],
      owner: "",
      status: [],
    };
  }
  searchChanged = (event) => {
    // console.log(event)
    const search = this.state.search;
    const selectDrop = this.state.selectDrop;
    const hash = this.state.hash;
    //  console.log(this.state.coinCow);
    for (var c = 0; c <= this.state.coinCow; c++) {
      const getdata = this.state.cowCoin.methods.blacklistedCowCert(c).call();
      // console.log(getdata)
      getdata.then((result) =>
        this.setState({
          searchShow: result,
        })
      );
    }
  };
  setBlockcowcoin = (gard) => {
    console.log(gard);
  };
  copyCodeToClipboard = (e) => {
    const el = e;
    document.execCommand("copy");
  };

  render() {
    return (
      <>
        <div class="container-fluid bg-light py-5">
          <div class="col-md-12 m-auto text-center">
            <h1 class="h1">ผู้ดูแลระบบ</h1>
            <div class="input-group mb-3">
              <p></p>
            </div>
          </div>
        </div>
        <div class="container py-5">
          <div class="row py-5">
            <form
              class="col-md-12 m-auto"
              role="form"
              // onSubmit={() => alert(JSON.stringify(this.state))}
              onSubmit={(event) => {
                event.preventDefault();
                // console.log(this.state)
                this.searchChanged();
              }}
            >
              <div className="Add-app">
                <Link class="btn btn-success btn-lg px-3" to="/addowner">
                  สร้างผู้ดูแล &nbsp;
                  <i className="fa fa-plus-circle"></i>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link class="btn btn-success btn-lg px-3" to="/AddCowCert">
                  สร้าง CowCert &nbsp;
                  <i className="fa fa-plus-circle"></i>
                </Link>
                <hr />
                <p>Totals : {this.state.coinCow} รายการ</p>
              </div>

              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th scope="col">รหัสวัว</th>
                    <th scope="col">รูป</th>
                    <th scope="col">ชื่อวัว</th>
                    <th scope="col">เจ้าของวัว</th>
                    <th scope="col">สถานะเหรียญ</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task, keyTask) => {
                    const beforAr = task.cowCertlist;
                    const afterSp = beforAr.split(",");
                    const owner = this.state.owner;
                    // console.log(this.state.status)
                    const boolst = this.state.status
                    // console.log(boolst)
                    return (
                      <>
                        <tr key={keyTask}>
                          <td>{task.tokendId}</td>
                          <td>
                            <img
                              className="CowCoin"
                              src={`https://ipfs.io/ipfs/${task.imgPath}`}
                              alt=""
                            />
                          </td>
                          <td>{afterSp[3]}</td>
                          <td>
                            {owner[keyTask].toLocaleLowerCase()}
                            <br />
                            Hash :{" "}
                            {this.state.hash.map((hash, key) => {
                              // console.log(hash.status)
                              if (
                                hash.to == owner[keyTask].toLocaleLowerCase() &&
                                hash.token == task.id
                              ) {
                                return (
                                  <td>
                                    <Link to={`/hiscowcoin/${hash.hash}`}>
                                      {hash.hash}
                                    </Link>
                                  </td>
                                );
                              }
                            })}
                          </td>
                          {this.state.hash.map((hashd, keyd) => {
                            const checkblock = this.state.cowCoin.methods
                              .blockCowcert(task.id)
                              .call();
                            if (
                              this.state.cowCoin.methods
                                .blockCowcert(task.id)
                                .call() == false
                            ) {
                              console.log("OK");
                            }
                            if (
                              hashd.to == owner[keyTask].toLocaleLowerCase() &&
                              hashd.token == task.id
                            ) {
                              return (
                                <>
                                <td>
                                  <BlockCowCert
                                    ERC721={this.state.cowCoin}
                                    images={task.imgPath}
                                    smart={beforAr}
                                    ID={task.id}
                                    status = {boolst[keyTask]}
                                  />
                                  </td>
                                  <td>
                                  <Link
                                    class="btn btn-outline-secondary"
                                    value={task.tokendId}
                                    to={`/hiscowcoin/${hashd.hash}`}
                                  >
                                    <i class="fa fa-eye"></i>
                                    &nbsp; เพิ่มเติม
                                  </Link>
                                </td>
                                </>
                              );
                            }
                          })}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ShowCowCert;
