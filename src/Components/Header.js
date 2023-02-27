import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import CowCoin from "../abis/CowCoin.json";
import ERC721 from "../abis/ERC721.json";
import Web3 from "web3";

class Header extends Component {
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
        // console.log(accounts,task)
        if(accounts == task[1])
        {
          // console.log("OK");
          this.setState({
            owner: task.government.toLocaleLowerCase()
          });
        }
        // this.setState({
        //   owner: [...this.state.owner, task.government.toLocaleLowerCase()],
        // });
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
      owner: [],
      loading: true,
      cowerc: [],
      cowCoin: [],
      smartdata: [],
    };
  }
  render() {
    const useraccount = this.props.account;

    let button;
    if (useraccount) {
      button = (
        <Link class="nav-link" to="/members">
          {useraccount}
        </Link>
      );
    } else {
      button = (
        <Link class="nav-link" to="/login">
          เข้าสู่ระบบ
        </Link>
      );
    }
    // console.log(this.state.owner)
    let Permission = this.state.owner
    // console.log(Permission)
    let setPermission 
    if(Permission != 0)
    {
      setPermission = <li class="nav-item"><Link class="nav-link" to="/showcowcert"> ผู้ดูแลระบบ</Link></li>
    }
    else {
      setPermission = "";
    }
    // let Permission = this.state.owner.map((admin,i) => {
    //   let setPermission = false;
    //   // console.log(useraccount,admin,i)
    //   if (useraccount == admin) {
    //     // console.log(useraccount,admin,i)
    //     setPermission = <li class="nav-item"><Link class="nav-link" to="/showcowcert"> ผู้ดูแลระบบ</Link></li>;
    //     return (
    //       setPermission
    //     //   <li class="nav-item">
    //     //     <Link class="nav-link" to="/showcowcert">
    //     //     ผู้ดูแลระบบ
    //     //     </Link>
    //     //  </li>
    //     );
    //   } else {
    //   }
    // });

    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-light shadow">
          <div class="container d-flex justify-content-between align-items-center">
            <a
              class="navbar-brand text-success logo h1 align-self-center"
              href="/"
            >
              <img
                className="logo-Header"
                src="./assets/images/NFTBlack.png"
                alt=""
              />
            </a>

            <button
              class="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#templatemo_main_nav"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
              id="templatemo_main_nav"
            >
              <div class="flex-fill">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to="/">
                      หน้าหลัก
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/search">
                      ค้นหา
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/abount">
                      เกี่ยวกับเรา
                    </Link>
                  </li>
                  {/* <li class="nav-item">
                    <Link class="nav-link" to="/showcowcert">
                      CreateCowCert
                    </Link>
                  </li> */}
                  <li class="nav-item">
                    <Link class="nav-link" to="/contact">
                      ติดต่อเรา
                    </Link>
                  </li>
                  {setPermission}
                </ul>
              </div>
              <div class="navbar align-self-center d-flex">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                  <li class="nav-item">{button}</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* <!-- Close Header --> */}
      </>
    );
  }
}

export default Header;
