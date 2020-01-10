import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import * as authenticationAction from '../../actions/authenticationAction';
import * as guestActions from '../../actions/guestAction';
import * as meetingActions from '../../actions/meetingAction';
import Guests from './Guests';
import Meeting from './Meeting';
import MeetingInfo from './MeetingInfo';
import Home from './Home';
import Meetings from './Meetings';

class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: null
    }
  }
  componentWillMount(){
    if (localStorage.getItem("token")) {
      if (!this.props.account.email) {
        this.props.verify();
        if (this.props.account.token === null) {
          this.setState({
            authenticated: false
          })
        }else{
          this.props.getAllGuests();
          this.props.getAllMeetings();
          this.setState({
            authenticated: true
          })
        }
      }
    } else {
      this.setState({
        authenticated: false
      })
      console.log("tạch");
    }
  }

  // componentDidMount(){
  // }

  logout = () => {
    if(window.confirm("Bạn muốn đăng xuất?")){
      this.props.logout();
      this.setState({
        authenticated: false
      })
    }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    if(this.state.authenticated === false){
      return <Redirect to={from} />
    }
    return (
      <div>
        {/* Custom fonts for this template */}
        <link href="/assetsAdmin/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link href="/assetsAdmin/css/sb-admin-2.min.css" rel="stylesheet" />
        <link href="/assetsAdmin/css/temp.css" rel="stylesheet" />
        <link href="/assetsAdmin/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
              <div className="sidebar-brand-text mx-3">Trang quản lý</div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/meetings">
                <i className="fas fa-fw fa-calendar-alt" />
                <span className="f-sm"> Tất cả sự kiện </span>
              </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/meeting">
                <i className="fas fa-fw fa-calendar-plus" />
                <span className="f-sm">Thêm cuộc họp / đại hội</span></Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/guests">
                <i className="fas fa-fw fa-users" />
                <span className="f-sm">Quản lý khách mời</span></Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
          </ul>
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars" />
                </button>
                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - User Information */}
                  <li className="nav-item no-arrow" style={{ margin: "auto" }}>
                    <div className="nav-link">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.account.email}</span>
                      <img className="img-profile rounded-circle" src="/assets/img/Bamboologo.png" alt="imgAvatar" />
                    </div>
                  </li>
                  <div className="topbar-divider d-none d-sm-block" />
                  <li className="nav-item" style={{ margin: "auto" }}>
                    <Link className="dropdown-item" to="#" onClick={this.logout}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      <div className="mr-2 d-none d-lg-inline text-gray-600 small">Đăng xuất</div>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* End of Topbar */}
              {/* Begin Page Content */}
              <div className="container-fluid">
                <Switch>
                  <Route path="/admin" exact component={Home} />
                  <Route path="/admin/meetings" component={Meetings} />
                  <Route path="/admin/guests" component={Guests} />
                  <Route path="/admin/meeting" component={Meeting} />
                  <Route path="/admin/meetinginfo" component={MeetingInfo} />
                </Switch>
                {/* DataTales Example */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright © Bamboo 2019</span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
        </div>
        {/* <script type="text/javascript" src="/assets/js/jquery-1.11.2.min.js"></script> */}
        {/* <script type="text/javascript" src="/assets/js/bootstrap.js"></script> */}
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = {
  getAllGuests: guestActions.getsAllGuests,
  getAllMeetings: meetingActions.getsAllMeetings,
  verify: authenticationAction.verify,
  logout: authenticationAction.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
