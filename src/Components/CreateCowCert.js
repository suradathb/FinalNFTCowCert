import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowCowCert from "./ShowCowCert";
import "./CreateCowCert.css";
import { CustomDialog, useDialog } from "react-st-modal";
import QrReader from "react-qr-reader";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

// function createCowCert() {
class CreateCowCert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cow_type: "",
      cow_sax: "",
      cowcert_no: "", //Key
      cowcert_name: "",
      cowcert_birth: "",
      cowcert_number: "",
      cowcert_color: "",
      cowcert_breeder: "",
      cowcert_owner_no: "",
      cowcert_owner_name: "",
      cowcert_trans_date: "",
      cowcert_ref_hash: "",
      account_Employee: "",
      fac_type: "0",
      // file:"",
      // imagePreviewUrl:"",
      /* start All detail F1 */
      //
      sire_no: "",
      sire_name: "",
      sire_color: "",
      sire_number: "",
      sire_ownerno: "",
      //
      dam_no: "",
      dam_name: "",
      dam_color: "",
      dam_number: "",
      dam_ownerno: "",
      /* End All detail F1 */
      // Start  dad
      no_dad: "", //No: พ่อ
      has_dad: "", //Hash: พ่อ
      no_dad_1: "", //No: ปู่สายพ่อ
      has_dad_1: "", //Hash: ปู่สายพ่อ
      no_dad_2: "", //No: ย่าสายพ่อ
      has_dad_2: "", //Hash: ย่าสายพ่อ
      no_dad_3: "", //No: ปู่ทวดสายปู่
      has_dad_3: "", //Hash: ปู่ทวดสายปู่
      no_dad_4: "", //No: ย่าทวดสายปู่
      has_dad_4: "", //Hash: ย่าทวดสายปู่
      no_dad_5: "", //No: ตาทวดสายย่า
      has_dad_5: "", //Hash: ตาทวดสายย่า
      no_dad_6: "", //No: ยายทวดสายย่า
      has_dad_6: "", //Hash: ยายทวดสายย่า
      // End dad

      // Start  mom
      no_mom: "", //No: แม่
      has_mom: "", //Hash: แม่
      no_mom_1: "", //No: ตาสายแม่
      has_mom_1: "", //Hash: ตาสายแม่
      no_mom_2: "", //No: ยายสายแม่
      has_mom_2: "", //Hash: ยายสายแม่
      no_mom_3: "", //No: ปู่ทวดสายตา
      has_mom_3: "", //Hash: ปู่ทวดสายตา
      no_mom_4: "", //No: ย่าทวดสายตา
      has_mom_4: "", //Hash: ย่าทวดสายตา
      no_mom_5: "", //No: ตาทวดสายยาย
      has_mom_5: "", //Hash: ตาทวดสายยาย
      no_mom_6: "", //No: ยายทวดสายยาย
      has_mom_6: "", //Hash: ยายทวดสายยาย
      // End dad

      buffer: null,
      result: "No result",
    };
    this.handleChange = this.handleChange.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }
  handleChange = (e) => {
    this.setState({ cow_type: e.target.value });
  };
  captureFile(event) {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      // console.log('buffer', this.state.buffer)
    };
  }
  handleScan(data) {
    const getdata = data;
    const Sdata = getdata.split(":");
    // console.log(Sdata[1].toLocaleLowerCase())
    this.setState({
      // account_Employee: Sdata[1].toLocaleLowerCase(),
      account_Employee: Sdata[1],
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
    const getType = this.state.cow_type;
    if (getType != "F1") {
      this.state.fac_type = "1";
    } else {
      this.state.fac_type = "0";
    }

    return (
      <>
        <div class="container-fluid bg-light py-5">
          <div class="col-md-6 m-auto text-center">
            <h1 class="h1">Create Cowcert</h1>
            <div class="input-group mb-3">
              <p>
                โปรดทราบการสร้างข้อมูล CowCert
                ไม่สามารถเปลี่ยนแปลงข้อมูลได้หากบันทึกแล้ว
                โปรดตรวจสอบข้อมูลก่อนการบันทึกทุกครั้ง
              </p>
            </div>
          </div>
        </div>

        <div class="container py-5">
          <div class="row py-5">
            <form
              class="col-md-9 m-auto"
              role="form"
              // onSubmit={() => alert(JSON.stringify(this.state))}
              onSubmit={(event) => {
                event.preventDefault();
                // console.log(this.state)
                this.props.createTask(this.state);
              }}
            >
              <div class="row">
                <div class="form-group col-md-9 mb-3">
                  <div class="form-group">
                    <div class="custom-file">
                      <input type="file" onChange={this.captureFile} />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <h3>ข้อมูลโคบราห์มัน</h3>
                  <select
                    name="fac_type"
                    class="custom-select custom-select-sm  custom-arrow-select input-group-text font-size-base "
                    onChange={(e) => {
                      this.setState({ cow_type: e.target.value });
                    }}
                  >
                    <option selected="0">โปรดเลือกประเภท</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                    <option value="F3">F3</option>
                    <option value="F4">F4</option>
                    <option value="F5">F5</option>
                    <option value="100">เลือด 100 %</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <QrReader
                    ref="qrReader1"
                    delay={this.state.delay}
                    // previewStyle={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    legacyMode={true}
                  />
                </div>
                <div class="input-group mb-3 s-box">
                  {/* <label for="inputname">Address</label> */}
                  <input
                    readOnly
                    required
                    id="contentCow"
                    class="form-control  form-control-lg"
                    type="text"
                    placeholder="Address"
                    name="account_Employee"
                    value={this.state.account_Employee}
                    onChange={(e) => {
                      this.setState({ account_Employee: e.target.value });
                    }}
                  />
                  <Button
                    className="btn btn-success btn-lg px-3"
                    variant="contained"
                    color="secondary"
                    onClick={this.openImageDialog.bind(this)}
                  >
                    Scan Qr Code
                  </Button>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <label for="inputname">เพศ</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cow_sax"
                    name="cow_sax"
                    value={this.state.cow_sax}
                    onChange={(e) => {
                      this.setState({ cow_sax: e.target.value });
                    }}
                    placeholder="เพศ"
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">เลขทะเบียนโคบราห์มัน</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_no"
                    name="cowcert_no"
                    value={this.state.cowcert_no}
                    onChange={(e) => {
                      this.setState({ cowcert_no: e.target.value });
                    }}
                    placeholder="เช่น 009255"
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">ชื่อโคบราห์มัน</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_name"
                    name="cowcert_name"
                    value={this.state.cowcert_name}
                    onChange={(e) => {
                      this.setState({ cowcert_name: e.target.value });
                    }}
                    placeholder="ชื่อโคบราห์มัน"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <label for="inputname">วันเกิดโคบราห์มัน</label>
                  <input
                    type="date"
                    class="form-control mt-1"
                    id="cowcert_birth"
                    name="cowcert_birth"
                    value={this.state.cowcert_birth}
                    onChange={(e) => {
                      this.setState({ cowcert_birth: e.target.value });
                    }}
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">เลขประจำตัว</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_number"
                    name="cowcert_number"
                    value={this.state.cowcert_number}
                    onChange={(e) => {
                      this.setState({ cowcert_number: e.target.value });
                    }}
                    placeholder="เช่น 20"
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">สีโคบราห์มัน</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_color"
                    name="cowcert_color"
                    value={this.state.cowcert_color}
                    onChange={(e) => {
                      this.setState({ cowcert_color: e.target.value });
                    }}
                    placeholder="ระบุสีของโคบราห์มัน"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <label for="inputname">เลขผู้บำรุงพันธุ์</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_breeder"
                    name="cowcert_breeder"
                    value={this.state.cowcert_breeder}
                    onChange={(e) => {
                      this.setState({ cowcert_breeder: e.target.value });
                    }}
                    placeholder="เช่น 1000001"
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">เลขเจ้าของปัจจุบัน</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_owner_no"
                    name="cowcert_owner_no"
                    value={this.state.cowcert_owner_no}
                    onChange={(e) => {
                      this.setState({ cowcert_owner_no: e.target.value });
                    }}
                    placeholder="เช่น 1000002"
                  />
                </div>
                <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">ชื่อเจ้าของปัจจุบัน</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_owner_name"
                    name="cowcert_owner_name"
                    value={this.state.cowcert_owner_name}
                    onChange={(e) => {
                      this.setState({ cowcert_owner_name: e.target.value });
                    }}
                    placeholder="โปรดระบุ ชื่อเจ้าของโค"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4 mb-3">
                  <label for="inputname">วันที่โอน</label>
                  <input
                    type="date"
                    class="form-control mt-1"
                    id="cowcert_trans_date"
                    name="cowcert_trans_date"
                    value={this.state.cowcert_trans_date}
                    onChange={(e) => {
                      this.setState({ cowcert_trans_date: e.target.value });
                    }}
                  />
                </div>
                {/* <div class="form-group col-md-8 mb-3">
                  <label for="inputemail">REF.เปลี่ยนมือ</label>
                  <input
                    type="text"
                    class="form-control mt-1"
                    id="cowcert_ref_hash"
                    name="cowcert_ref_hash"
                    value={this.state.cowcert_ref_hash}
                    onChange={(e) => {
                      this.setState({ cowcert_ref_hash: e.target.value });
                    }}
                    placeholder="REF.Hash"
                  />
                </div> */}
              </div>
              <div class="row">
                <div class="form-group col-md-6 mb-3">
                  <h3>ข้อมูลสายพ่อ</h3>
                </div>
              </div>
              {this.state.cow_type !== "F1" ? (
                // console.log("ShowNot F1")
                <div>
                  <div class="row">
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียนพ่อโคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad"
                        name="no_dad"
                        value={this.state.no_dad}
                        onChange={(e) => {
                          this.setState({ no_dad: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      {/* <input
                    type="hidden"
                    class="form-control mt-1"
                    id="fac_type"
                    name="fac_type"
                    value="1"
                    onChange={(e) => {
                      this.setState({ fac_type: e.target.value });
                    }}
                    placeholder="เช่น 1000001"
                  /> */}
                      <label for="inputemail">Hash : พ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="hash_dad"
                        name="hash_dad"
                        value={this.state.has_dad}
                        onChange={(e) => {
                          this.setState({ has_dad: e.target.value });
                        }}
                        placeholder="Hash : พ่อ"
                      />
                    </div>
                    {/* Hash: ปู่สายพ่อ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ปู่สายพ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_1"
                        name="no_dad_1"
                        value={this.state.no_dad_1}
                        onChange={(e) => {
                          this.setState({ no_dad_1: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ปู่สายพ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_1"
                        name="has_dad_1"
                        value={this.state.has_dad_1}
                        onChange={(e) => {
                          this.setState({ has_dad_1: e.target.value });
                        }}
                        placeholder="Hash: ปู่สายพ่อ"
                      />
                    </div>
                    {/* Hash: ย่าสายพ่อ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ย่าสายพ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_2"
                        name="no_dad_2"
                        value={this.state.no_dad_2}
                        onChange={(e) => {
                          this.setState({ no_dad_2: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ย่าสายพ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_2"
                        name="has_dad_2"
                        value={this.state.has_dad_2}
                        onChange={(e) => {
                          this.setState({ has_dad_2: e.target.value });
                        }}
                        placeholder="Hash: ย่าสายพ่อ"
                      />
                    </div>
                    {/* Hash: ปู่ทวดสายปู่ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ปู่ทวดสายปู่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_3"
                        name="no_dad_3"
                        value={this.state.no_dad_3}
                        onChange={(e) => {
                          this.setState({ no_dad_3: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ปู่ทวดสายปู่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_3"
                        name="has_dad_3"
                        value={this.state.has_dad_3}
                        onChange={(e) => {
                          this.setState({ has_dad_3: e.target.value });
                        }}
                        placeholder="Hash: ปู่ทวดสายปู่"
                      />
                    </div>
                    {/* Hash: ย่าทวดสายปู่ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ย่าทวดสายปู่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_4"
                        name="no_dad_4"
                        value={this.state.no_dad_4}
                        onChange={(e) => {
                          this.setState({ no_dad_4: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ย่าทวดสายปู่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_4"
                        name="has_dad_4"
                        value={this.state.has_dad_4}
                        onChange={(e) => {
                          this.setState({ has_dad_4: e.target.value });
                        }}
                        placeholder="Hash: ย่าทวดสายปู่"
                      />
                    </div>
                    {/* Hash: ตาทวดสายย่า */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ตาทวดสายย่า</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_5"
                        name="no_dad_5"
                        value={this.state.no_dad_5}
                        onChange={(e) => {
                          this.setState({ no_dad_5: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ตาทวดสายย่า</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_5"
                        name="has_dad_5"
                        value={this.state.has_dad_5}
                        onChange={(e) => {
                          this.setState({ has_dad_5: e.target.value });
                        }}
                        placeholder="Hash: ตาทวดสายย่า"
                      />
                    </div>
                    {/* Hash: ยายทวดสายย่า */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ยายทวดสายย่า</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_dad_6"
                        name="no_dad_6"
                        value={this.state.no_dad_6}
                        onChange={(e) => {
                          this.setState({ no_dad_6: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ยายทวดสายย่า</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_dad_6"
                        name="has_dad_6"
                        value={this.state.has_dad_6}
                        onChange={(e) => {
                          this.setState({ has_dad_6: e.target.value });
                        }}
                        placeholder="Hash: ยายทวดสายย่า"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6 mb-3">
                      <h3>ข้อมูลสายแม่</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียนแม่โคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom"
                        name="no_mom"
                        value={this.state.no_mom}
                        onChange={(e) => {
                          this.setState({ no_mom: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: แม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom"
                        name="has_mom"
                        value={this.state.has_mom}
                        onChange={(e) => {
                          this.setState({ has_mom: e.target.value });
                        }}
                        placeholder="Hash: แม่"
                      />
                    </div>
                    {/* Hash: ปู่สายพ่อ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ตาสายแม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_1"
                        name="no_mom_1"
                        value={this.state.no_mom_1}
                        onChange={(e) => {
                          this.setState({ no_mom_1: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ตาสายแม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_1"
                        name="has_mom_1"
                        value={this.state.has_mom_1}
                        onChange={(e) => {
                          this.setState({ has_mom_1: e.target.value });
                        }}
                        placeholder="Hash: ตาสายแม่"
                      />
                    </div>
                    {/* Hash: ยายสายแม่ */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ยายสายแม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_2"
                        name="no_mom_2"
                        value={this.state.no_mom_2}
                        onChange={(e) => {
                          this.setState({ no_mom_2: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ยายสายแม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_2"
                        name="has_mom_2"
                        value={this.state.has_mom_2}
                        onChange={(e) => {
                          this.setState({ has_mom_2: e.target.value });
                        }}
                        placeholder="Hash: ยายสายแม่"
                      />
                    </div>
                    {/* Hash: ปู่ทวดสายตา */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ปู่ทวดสายตา</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_3"
                        name="no_mom_3"
                        value={this.state.no_mom_3}
                        onChange={(e) => {
                          this.setState({ no_mom_3: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ปู่ทวดสายตา</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_3"
                        name="has_mom_3"
                        value={this.state.has_mom_3}
                        onChange={(e) => {
                          this.setState({ has_mom_3: e.target.value });
                        }}
                        placeholder="Hash: ปู่ทวดสายตา"
                      />
                    </div>
                    {/* Hash: ย่าทวดสายตา */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ย่าทวดสายตา</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_4"
                        name="no_mom_4"
                        value={this.state.no_mom_4}
                        onChange={(e) => {
                          this.setState({ no_mom_4: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ย่าทวดสายตา</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_4"
                        name="has_mom_4"
                        value={this.state.has_mom_4}
                        onChange={(e) => {
                          this.setState({ has_mom_4: e.target.value });
                        }}
                        placeholder="Hash: ย่าทวดสายตา"
                      />
                    </div>
                    {/* Hash: ตาทวดสายยาย */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ตาทวดสายยาย</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_5"
                        name="no_mom_5"
                        value={this.state.no_mom_5}
                        onChange={(e) => {
                          this.setState({ no_mom_5: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ตาทวดสายยาย</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_5"
                        name="has_mom_5"
                        value={this.state.has_mom_5}
                        onChange={(e) => {
                          this.setState({ has_mom_5: e.target.value });
                        }}
                        placeholder="Hash: ตาทวดสายยาย"
                      />
                    </div>
                    {/* Hash: ยายทวดสายยาย */}
                    <div class="form-group col-md-6 mb-3">
                      <label for="inputname">ทะเบียน ยายทวดสายยาย</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="no_mom_6"
                        name="no_mom_6"
                        value={this.state.no_mom_6}
                        onChange={(e) => {
                          this.setState({ no_mom_6: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                      <label for="inputemail">Hash: ยายทวดสายยาย</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="has_mom_6"
                        name="has_mom_6"
                        value={this.state.has_mom_6}
                        onChange={(e) => {
                          this.setState({ has_mom_6: e.target.value });
                        }}
                        placeholder="Hash: ยายทวดสายยาย"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div class="row">
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputname">ทะเบียนพ่อโคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="sire_no"
                        name="sire_no"
                        value={this.state.sire_no}
                        onChange={(e) => {
                          this.setState({ sire_no: e.target.value });
                        }}
                        placeholder="เช่น 1000001"
                      />
                    </div>
                    {/* <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">วันเกิด พ่อ</label>
                  <input
                    type="date"
                    class="form-control mt-1"
                    id="sire_birtdate"
                    name="sire_birtdate"
                    value={this.state.sire_birtdate}
                    onChange={(e) => {
                      this.setState({ sire_birtdate: e.target.value });
                    }}
                  />
                </div> */}
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">ชื่อพ่อโคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="sire_name"
                        name="sire_name"
                        value={this.state.sire_name}
                        onChange={(e) => {
                          this.setState({ sire_name: e.target.value });
                        }}
                        placeholder="โปรดระบุ ชื่อเจ้าของโค"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputname">สีพ่อโคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="sire_color"
                        name="sire_color"
                        value={this.state.sire_color}
                        onChange={(e) => {
                          this.setState({ sire_color: e.target.value });
                        }}
                        placeholder="ระบุสีพ่อโคบราห์มัน"
                      />
                    </div>
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">เลขประจำตัว</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="sire_number"
                        name="sire_number"
                        value={this.state.sire_number}
                        onChange={(e) => {
                          this.setState({ sire_number: e.target.value });
                        }}
                        placeholder="เช่น 02"
                      />
                    </div>
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">เจ้าของปัจจุบัน สายพ่อ</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="sire_ownerno"
                        name="sire_ownerno"
                        value={this.state.sire_ownerno}
                        onChange={(e) => {
                          this.setState({ sire_ownerno: e.target.value });
                        }}
                        placeholder="โปรดระบุ ชื่อเจ้าของโค"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6 mb-3">
                      <h3>ข้อมูลสายแม่</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputname">ทะเบียนแม่โคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="dam_no"
                        name="dam_no"
                        value={this.state.dam_no}
                        onChange={(e) => {
                          this.setState({ dam_no: e.target.value });
                        }}
                        placeholder="เช่น 003255"
                      />
                    </div>
                    {/* <div class="form-group col-md-4 mb-3">
                  <label for="inputemail">วันเกิด แม่</label>
                  <input
                    type="date"
                    class="form-control mt-1"
                    id="dam_birtdate"
                    name="dam_birtdate"
                    value={this.state.dam_birtdate}
                    onChange={(e) => {
                      this.setState({ dam_birtdate: e.target.value });
                    }}
                  />
                </div> */}
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">ชื่อแม่โคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="dam_name"
                        name="dam_name"
                        value={this.state.dam_name}
                        onChange={(e) => {
                          this.setState({ dam_name: e.target.value });
                        }}
                        placeholder="โปรดระบุ ชื่อเจ้าของโค"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputname">สีแม่โคบราห์มัน</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="dam_color"
                        name="dam_color"
                        value={this.state.dam_color}
                        onChange={(e) => {
                          this.setState({ dam_color: e.target.value });
                        }}
                        placeholder="เช่น แดง"
                      />
                    </div>
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">เลขประจำตัว</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="dam_number"
                        name="dam_number"
                        value={this.state.dam_number}
                        onChange={(e) => {
                          this.setState({ dam_number: e.target.value });
                        }}
                        placeholder="เช่น 02"
                      />
                    </div>
                    <div class="form-group col-md-4 mb-3">
                      <label for="inputemail">เจ้าของปัจจุบัน สายแม่</label>
                      <input
                        type="text"
                        class="form-control mt-1"
                        id="dam_ownerno"
                        name="dam_ownerno"
                        value={this.state.dam_ownerno}
                        onChange={(e) => {
                          this.setState({ dam_ownerno: e.target.value });
                        }}
                        placeholder="โปรดระบุ ชื่อเจ้าของโค"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div class="row">
                <div class="col text-end mt-2">
                  <Link class="btn btn-light btn-lg px-3" to="/showcowcert">
                    ยกเลิก
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="submit"
                    value="บันทึก"
                    class="btn btn-success btn-lg px-3"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <ul id="completedTaskList" className="list-unstyled"></ul>
      </>
    );
  }
}

export default CreateCowCert;
