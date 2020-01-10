import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/guestAction';

class LiveView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      randomTitle: "",
      winners: []
    }
  }
  onLive = () => {
    if (this.state.random) {
      if (!window.confirm("Bật chế độ xem trực tiếp?"))
        return;
      // this.props.setTitleOnLiveView("CHÀO MỪNG ĐẠI BIỂU");
      this.setState({
        random: false
      })
      this.props.undefinedGuest();
    }
  }

  onReset = () => {
    if (!window.confirm("Xác nhận đặt lại dữ liệu người trúng thưởng?"))
      return;
      if(this.props.guests) {
        this.props.guests.forEach(element => {
          element.winner = false;
        });
      }
    alert("Đã đặt lại dữ liệu người dùng.");
  }

  onRandom = () => {
    let arrRoll = [];
    let {winners} = this.state;
    if(this.props.guests.length == 0){
      console.log('Ok');
      alert("Danh sách rỗng");
      return;
    }

    this.props.guests.forEach(guest => {
      if(winners.indexOf(guest._id) == -1)
        arrRoll.push(guest)
    })

    this.setState({
      random: true,
      randomTitle: "BỐC THĂM MAY MẮN"
    })

    let random = 69;
    let randomID = 0;
    if (arrRoll.length > 0) {
      try {
        let runRandom = setInterval(() => {
          randomID = Math.floor(Math.random() * 100) % arrRoll.length;

          this.props.setGuest(arrRoll[randomID]);
          random--;
          if (random <= 0) {
            this.setState({
              randomTitle: "CHÚC MỪNG"
            })

            winners.push(arrRoll[randomID]._id);
            this.setState({
              winners
            })
            clearInterval(runRandom);
          }
        }, 100);
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert("Danh sách rỗng")
    }
  }
  render() {
    let { guestAttending, liveViewTitle } = this.props;
    let { random, randomTitle} = this.props;
    let { dob } = guestAttending
    let dobP = dob ? new Date(dob*1000) : null
    dobP = dobP ? `${dobP.getDate()}/${dobP.getMonth()}/${dobP.getYear()}` : null
    return (
      <div className="container-fluid" >
        <div
          id="mySidenav" className="sidenav flex-container">
          {/* eslint-disable-next-line */}
          <a id="about" onClick={this.onReset}>Reset data <span className="fa fa-refresh mrl-15" /></a>
          {/* eslint-disable-next-line */}
          <a id="blog" onClick={this.onRandom}>Quay số &nbsp; <span className="fa fa-random mrl-25" /></a>
          {/* eslint-disable-next-line */}
          <a id="live" onClick={this.onLive}>Trực tiếp &nbsp; <span className="fa fa-video-camera mrl-15" /></a>
        </div>
        <h1 className="pd-at">{random ? randomTitle : liveViewTitle}</h1>
        <div className="row dp-flex">
          <div id="img-border" className="col-md-4 col-md-offset-2">
            <img
              style={{ objectFit: guestAttending.imagePath === "./assets/img/Bamboologo.png"? "contain" : "cover"}}
              src={guestAttending.imagePath}
              className="img-thumbnail img-avatar"
              alt="img-avatar"
          />
          </div>
          <div className="col-md-6 col-lg-6 container-table">
            <table className="table center" id="table">
              <tbody>
                <tr>
                  <td className="w-50 title">Họ & Tên :</td>
                  <td className="text">{guestAttending.name}</td>
                </tr>
                <tr>
                  <td className="w-50 title">Năm sinh :</td>
                  <td className="text">{dobP}</td>
                </tr>
                <tr>
                  <td className="w-50 title">Đơn vị :</td>
                  <td className="text">{guestAttending.department}</td>
                </tr>
                <tr>
                  <td className="w-50 title">Số ghế :</td>
                  <td className="text">{guestAttending.seat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guests: state.socket.guests,
    guestAttending: state.socket.guestAttending,
    liveViewTitle: state.socket.welcomeTitle
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    setGuest: (guestAttending) => {
      dispatch(actions.guestAttending(guestAttending));
    },
    undefinedGuest: () => {
      dispatch(actions.undefinedGuest());
    },
    setTitleOnLiveView: (title) => {
      dispatch(actions.setTitleOnLiveView(title));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveView);
