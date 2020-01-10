import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import TableGuest from '../../components/TableGuest'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as meetingAction from '../../actions/meetingAction';

class Meeting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      img: null,
      newMeeting: {
        duration: 0,
        guestsInvited: []
      },
      submit: false,
      all: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { allGuests } = nextProps;
    let all = allGuests.map((guest) => {
      return (prevState.newMeeting.guestsInvited.indexOf(guest) === -1) ? guest : null
    });
    return {
      ...prevState,
      all
    }
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date,
      newMeeting: {
        ...this.state.newMeeting,
        time: new Date(date) / 1000.0 //.setHours(0, 0, 0, 0) / 1000.0)
      }
    });
  }

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date,
      newMeeting: {
        ...this.state.newMeeting,
        end_time: new Date(date) / 1000.0 //.setHours(0, 0, 0, 0) / 1000.0)
      }
    });
  }

  onType = (event) => {
    this.setState({
      newMeeting: {
        ...this.state.newMeeting,
        [event.target.name]: event.target.value
      }
    })
  }

  onCreateMeeting = (event) => {
    event.preventDefault();
    let { welcomeTitle, time, decription, name, guestsInvited, address, duration } = this.state.newMeeting;

    if (welcomeTitle && guestsInvited && time && decription && name && address && (duration !== 0)) {
      this.props.createMeeting(this.state.newMeeting);
      this.setState({
        submit: true
      })
    } else {
      alert("Hãy điền đủ tất cả các trường");
    }
  }

  onInvite = (pos) => {
    let { all } = this.state;
    let { guestsInvited } = this.state.newMeeting;
    all[pos].seat = guestsInvited.length + 1;
    guestsInvited.push(all[pos]);
    this.setState({
      guestsInvited
    });
  }

  onChangeSeat = (pos, seat) => {
    let { guestsInvited } = this.state.newMeeting;
    guestsInvited[pos].seat = seat;
  }

  onUnInvite = (pos) => {
    let { guestsInvited } = this.state.newMeeting;
    guestsInvited.splice(pos, 1);
    this.setState({
      newMeeting: {
        ...this.state.newMeeting,
        guestsInvited
      }
    });
  }

  handleChangeDurationTime = (duration) => {
    this.setState({
      newMeeting: {
        ...this.state.newMeeting,
        duration
      }
    });
  }

  render() {
    if (this.props.status !== 'NOT_SET') {
      this.setState({
        submit: false
      })
      if (this.props.status === "SUCCESS") {
        alert("Tạo thành công!");
        this.props.setStatus("NOT_SET");
        let { from } = this.props.location.state || { from: { pathname: "/admin/meetings" } };
        return <Redirect to={from} />
      } else {
        alert("Tạo thất bại! Hãy thử lại!")
      }
    }
    let { guestsInvited } = this.state.newMeeting;

    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Tạo cuộc họp / đại hội mới</h6>
        </div>
        <div className="card-body">
          <div className="user">
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  name="name"
                  placeholder="Tên sự kiện"
                  onChange={this.onType} />
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  name="address"
                  placeholder="Địa điểm tổ chức"
                  onChange={this.onType} />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                name="decription"
                placeholder="Thông tin"
                onChange={this.onType} />
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  name="welcomeTitle"
                  placeholder="Biểu ngữ chào mừng"
                  onChange={this.onType} />
              </div>
              <div className="col-sm-3 mb-3 mb-sm-0">
                <DatePicker
                  className="form-control form-control-user"
                  selected={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                  dateFormat="dd/MM/yyyy HH:mm"
                  timeFormat="HH:mm"
                  showTimeSelect
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={10}
                  placeholderText="Thời gian bắt đầu"
                />
              </div>
              <div className="col-sm-3 mb-3 mb-sm-0">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown">
                    Thời gian diễn ra:&nbsp;
                    {
                      this.state.newMeeting.duration == 0 ? '0' : this.state.newMeeting.duration / 3600000
                    } giờ
                    {/* <span className="caret" /> */}
                  </button>
                  <ul className="dropdown-menu">
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(60 * 60000) }}>1 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(120 * 60000) }}>2 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(180 * 60000) }}>3 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(240 * 60000) }}>4 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(300 * 60000) }}>5 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(360 * 60000) }}>6 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(420 * 60000) }}>7 giờ</a></li>
                    {/* eslint-disable-next-line  */}
                    <li><a href="#" onClick={e => { this.handleChangeDurationTime(480 * 60000) }}>8 giờ</a></li>
                  </ul>
                </div>
              </div>
            </div>
            {/* allGuests of this account unselected */}
            <div className="row">
              <div className="col-sm-6">
                <TableGuest
                  onInvite={this.onInvite}
                  tableFor="SELECT_FOR_MEETING"
                  tableTitle="Danh sách khách mời"
                  allGuests={this.state.all}
                  listHeader={['STT', 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Đơn vị', ""]}
                  listKey={["name", "gender", "dob", 'department']}
                />
              </div>
              {/* invited guests */}
              <div className="col-sm-6">
                <TableGuest
                  onChangeSeat={this.onChangeSeat}
                  tableFor="SELECTED_FOR_MEETING"
                  tableTitle="Danh sách khách mời tham dự"
                  allGuests={guestsInvited}
                  listHeader={['STT', 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Đơn vị', "Số ghế", ""]}
                  listKey={["name", "gender", "dob", 'department']}
                  onUnInvite={this.onUnInvite}
                />
              </div>
            </div>
            <button href="#"
              className="btn btn-success btn-user btn-block"
              onClick={this.onCreateMeeting}
              disabled={this.state.submit}
            >
              {this.props.status === 'NOT_SET' ? "Tạo cuộc họp / đại hội" : "Xin đợi..."}
            </button>
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allGuests: state.guests.allGuests,
    status: state.meetings.status
  }
}

const mapDispatchToProps = {
  setStatus: meetingAction.setStatus,
  createMeeting: meetingAction.createMeeting
}

export default connect(mapStateToProps, mapDispatchToProps)(Meeting)


