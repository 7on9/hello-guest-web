import React, { Component } from 'react';
import './App.css';

import XLSX from 'xlsx';

//const values
import * as consts from './constvalues/ConstValues';

//components
import Toolbar from './components/Toolbar';
import Table from './components/Table';
import StatusBar from './components/StatusBar';
import LiveView from './components/LiveView';

//redux
import { connect } from 'react-redux';
import * as actions from './actions/guestAction';
import { Redirect } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: [],
      defGuests: [],
      live: false,
      absent: 0,
      attendanted: 0,
      search: {
        name: ""
      },
      sort: {
        type: ""
      },
      selectedFile: null,
      loaded: 0,
      uploadFormShow: false,
      joinedRoom: false
    }
  }

  getAttendant = (data) => {
    data.forEach(val => {
      if (val.attendant === true)
        this.setState({
          attendanted: this.state.attendanted + 1
        });
      else {
        this.setState({
          absent: this.state.absent + 1
        })
      }
      val.winner = false;
    });
  }

  onReset = () => {
    this.setState({
      uploadFormShow: true
    })
  }

  onSearch = (name) => {
    this.setState({
      search: {
        name: name
      }
    })
  }

  onSort = (type) => {
    this.setState({
      sort: {
        type: type
      }
    })
  }

  onLive = () => {
    this.props.setTitleOnLiveView("CHÀO MỪNG");
    this.setState({
      live: !this.state.live
    })
  }

  handleUpload = () => {
    if (this.state.selectedFile == null)
      return;
    let file = this.state.selectedFile;
    // console.log(file.name);

    const reader = new FileReader();

    if (reader.readAsBinaryString) {
      reader.onload = async function (e) {
        /* Parse data */

        const bstr = e.target.result;

        const wb = XLSX.read(bstr, {
          type: 'binary'
        });
        /* Get first worksheet */

        const wsname = wb.SheetNames[0];
        // console.log(wsname);

        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        // console.log(JSON.stringify(data));

        let req = await fetch(consts.URL.PUBLIC + "guests/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            // console.log(data);
            // x = res.clone();
            return res.json();
          })
          .catch(err => {
            console.log(err);
          });
        if (req.receipted) {
          this.setData(data);
        } else {
          // res = null;
        }
      }.bind(this);
      reader.readAsBinaryString(file);
    }

    this.setState({
      uploadFormShow: false
    })
  }

  setData = data => {
    if (data) {
      this.setState({
        guests: data,
        defGuests: JSON.parse(JSON.stringify(data)),
      });
      this.getAttendant(data);
    }
  }

  componentWillMount() {
      if (this.props.socket.guests) {
        this.setState({
          joinedRoom: true
        })
      } else {
        this.setState({
          joinedRoom: false
        })
      }
  }

  componentWillUnmount() {
    localStorage.removeItem("roomCode");
  }

  render() {

    let { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.joinedRoom === false) {
      return <Redirect to={from} />
    }
    let { guests, sort, search, defGuests } = this.state;

    if (search) {
      try {
        if (search.name.length > 0)
          sort.type = "";
      } catch (error) {

      }
      if (search.name) {
        guests = guests.filter((guest) => {
          return guest.name.toLowerCase().indexOf(search.name.toLowerCase()) !== -1;
        });
      }
    }

    if (sort !== null) {
      try {
        if (sort.type === "*")
          guests = JSON.parse(JSON.stringify(defGuests));
        else {
          if (sort.type !== "") {
            guests.sort((a, b) => {
              if (a[sort.type] >= b[sort.type])
                return 1;
              return -1;
            });
          }
        }
      } catch (error) {
        guests = JSON.parse(JSON.stringify(defGuests));
      }
    }

    return (
      <div>
        <div className="wrapper mr-at">
          <h1 className="pd-at col-md-8 col-lg-8 col-md-offset-2">
          {this.props.socket.name}
          </h1>

          <StatusBar />
          {this.state.live ?
            <LiveView
            /> : null
          }
          <div className="container-fluid mrt-10">
            <div className="row">
              <div className="col-md-8 col-lg-8 col-md-offset-2">
                <div className="fresh-table full-color-azure">
                  {/*    Available colors for the full background: full-color-blue, full-color-azure, full-color-green, full-color-red, full-color-orange
                                    Available colors only for the toolbar: toolbar-color-blue, toolbar-color-azure, toolbar-color-green, toolbar-color-red, toolbar-color-orange
                                  */}
                  <Toolbar
                    onSearch={this.onSearch}
                    onSort={this.onSort}
                    onReset={this.onReset}
                    onLive={this.onLive}
                  />
                  {guests[0] !== 'N' ? <Table /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Return to Top */}
        {/* eslint-disable-next-line */}
        <a id="return-to-top"><i className="fa fa-chevron-up" /></a>
        <br />
        <hr />
        {/* ---------------------Information--------------------- */}
        <div className="container-fluid pd-at text-gray">
          <br />
          <div>
            Website quản lý tình trạng điểm danh của ứng dụng XCĐC Version 2.0.
          </div>
          <div>
            Bản gốc dùng lần đầu tiên tại<br />
            Đại hội Đại biểu Hội LHTN Phường Tam Bình lần thứ V nhiệm kỳ 2019-2024
          </div>
          <div>
            Được phát triển bởi Bamboo©2019
          </div>
          <div>
            Thông tin liên hệ : tamdaulong207@yahoo.com
          </div>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setGuest: (guest) => {
      dispatch(actions.guestAttending(guest));
    },
    setTitleOnLiveView: (title) => {
      dispatch(actions.setTitleOnLiveView(title));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
