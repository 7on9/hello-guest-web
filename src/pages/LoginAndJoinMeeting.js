import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as socketAction from '../actions/socketAction';
import * as authentiactionAction from '../actions/authenticationAction';
import { Redirect } from 'react-router-dom';

import '../App.css'
import { ERROR } from '../constvalues/ActionTypes';

class LoginAndJoinMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // email: '',
      // password: '',
      renderLogin: false,
      submited: false
    }
  }
  onType = (event) => {
    this.setState({
      submit: false,
      [event.target.name]: event.target.value
    })
  }

  onSubmit = (event) => {
    this.setState({
      submited: true
    });
    event.preventDefault();
    if (this.state.renderLogin)
      this.props.login(this.state.email, this.state.password);
    else {
      this.props.joinMeeting(this.state.meetingCode)
    }
  }

  toggleRenderLogin = () => {
    this.setState({
      renderLogin: !this.state.renderLogin
    })
  }

  redirectToViewGuest = () => {
    if (this.state.submited && !this.state.renderLogin) {
      let { from } = this.props.location.state || { from: { pathname: "/home" } };
      if (this.props.socket.guests === ERROR.NOT_EXIST) {
        alert("Mã cuộc họp / đại hội không tồn tại");
        this.setState({
          submited: false
        })
        this.props.resetJoinMeetingStatus();
      } else {
        if (this.props.socket.guests !== null) {
          if(this.props.socket.guests.length > 0)
            return <Redirect to={from} />
        }
      }
    }
  }

  redirectToConfigMeeting = () => {
    if (this.state.submited && this.state.renderLogin) {
      let { from } = this.props.location.state || { from: { pathname: "/admin" } };
      if (this.props.account.token === ERROR.NOT_EXIST) {
        alert("Sai email hoặc mật khẩu!");
        this.setState({
          submited: false
        })
        this.props.resetLoginStatus();
      } else {
        if (this.props.account.token != null && localStorage.getItem('token')) {
          return <Redirect to={from} />
        }
      }
    }
  }

  onRenderLoginForm = () => {
    return this.state.renderLogin ?
      <div>
        <div className="wrap-input100 m-b-20">
          <input className="input100" type="text" name="email" placeholder="Tên đăng nhập" onChange={this.onType} disabled={this.state.submited}/>
          <span className="focus-input100" />
        </div>
        <div className="wrap-input100 m-b-25">
          <input className="input100" type="password" name="password" placeholder="Mật khẩu" onChange={this.onType} disabled={this.state.submited} />
          <span className="focus-input100" />
        </div>
        <div className="container-login100-form-btn">
          <button className="login100-form-btn" onClick={this.onSubmit} disabled={this.state.submited}>
            Đăng nhập
          </button>
        </div>
      </div> :
      <div>
        <div className="wrap-input100 m-b-20">
          <input className="input100 text-center" type="text" name="meetingCode" placeholder="Mã cuộc họp / đại hội" onChange={this.onType} disabled={this.state.submited}/>
          <span className="focus-input100" />
        </div>
        <div className="container-login100-form-btn">
          <button
            className="login100-form-btn"
            onClick={this.onSubmit}
            disabled={this.state.submited}>
            Xem cuộc họp / đại hội
          </button>
        </div>
      </div>
  }

  renderSpinner = () => {
    return this.state.submited ?
      <div className="linear-activity">
        <div className="indeterminate"></div>
      </div>
      : null
  }
  render() {
    return (
      <div>
        <div>
          {/* <meta charSet="UTF-8" /> */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/vendor/bootstrap/css/bootstrap.min.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/fonts/iconic/css/material-design-iconic-font.min.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/vendor/animate/animate.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/vendor/css-hamburgers/hamburgers.min.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/vendor/animsition/css/animsition.min.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/vendor/select2/select2.min.css" />
          {/*==============================================================================================================*/}
          <link rel="stylesheet" type="text/css" href="/assetsLogin/css/util.css" />
          <link rel="stylesheet" type="text/css" href="/assetsLogin/css/main.css" />
          {/*==============================================================================================================*/}
          {this.redirectToViewGuest()}
          <div className="container-login100">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
              <form className="login100-form validate-form">
                <img src="/assets/img/Bamboologo.png" alt="Logo" className="m-b-37 w-100" />
                <span className="login100-form-title p-b-37">
                  {this.state.renderLogin ? "Đăng nhập" : "Nhập mã"}
                </span>
                {this.onRenderLoginForm()}
                {this.redirectToConfigMeeting()}
                {this.renderSpinner()}
              </form>
            </div>
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
                Thông tin liên hệ: tamdaulong207@yahoo.com
              </div>
              <div className="m-t-10">
                <label>
                  <input ref="switch" checked={this.state.renderLogin} onChange={this.toggleRenderLogin} className="switch" type="checkbox" />
                  <div>
                    <div />
                  </div>
                </label>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (email, password) => {
      dispatch(authentiactionAction.login(email, password));
    },
    joinMeeting: (code) => {
      dispatch(socketAction.joinMeeting(code))
    },
    resetJoinMeetingStatus: () => {
      dispatch(socketAction.resetGuests());
    },
    resetLoginStatus: () => {
      dispatch(authentiactionAction.resetToken());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAndJoinMeeting);
