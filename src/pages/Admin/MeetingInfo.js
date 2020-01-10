import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableGuest from '../../components/TableGuest'
import { Link, Redirect } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import * as meetingAction from '../../actions/meetingAction';
import * as socketAction from '../../actions/socketAction';
import XLSX from 'xlsx';

class MeetingInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: null,
      newMeeting: {
        guestsInvited: []
      },
      submit: false,
      all: [],
    };
  }

  toFullDateTime = timeStamp => {
    let date = new Date(timeStamp * 1000);
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
  }

  toExactDateTime = timeStamp => {
    let date = new Date(timeStamp * 1000);
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  }

  toShortDateTime = timeStamp => {
    let date = new Date(timeStamp * 1000);
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
  }

  downloadListGuest = (event) => {
    event.preventDefault();
    let createXLSLFormatObj = [];
    let xlsHeader = ['STT', "Mã khách mời", 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Đơn vị', "Số ghế"];
    let listKey = ["_id", "name", "gender", "dob", 'department', 'seat']
    createXLSLFormatObj.push(xlsHeader);
    this.props.meeting.guestsInvited.forEach((guest, id) => {
      let innerRowData = [];
      innerRowData.push(id + 1);
      listKey.forEach(key => {
        if (key === "dob")
          innerRowData.push(this.toShortDateTime(guest[key]));
        else
          if (key === "gender")
            innerRowData.push(guest[key] ? "Nữ" : "Nam");
          else
            innerRowData.push(guest[key]);
      });
      createXLSLFormatObj.push(innerRowData);
    });

    let fileName = "DANH_SACH_KHACH_MOI_" + this.props.meeting._id + ".xlsx";

    /* Sheet Name */
    let ws_name = "DANH_SACH";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, fileName);
    if (typeof console !== 'undefined') console.log(new Date());
  }

  downloadListGuestAttended = (event) => {
    event.preventDefault();
    let createXLSLFormatObj = [];
    let xlsHeader = ['STT', "Mã khách mời", 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Đơn vị', "Số ghế", "Thời gian điểm danh"];
    let listKey = ["_id", "name", "gender", "dob", 'department', 'seat']
    createXLSLFormatObj.push(xlsHeader);
    this.props.meeting.guestsInvited.forEach((guest, id) => {
      let innerRowData = [];
      innerRowData.push(id + 1);
      listKey.forEach(key => {
        if (key === "dob")
          innerRowData.push(this.toShortDateTime(guest[key]));
        else
          if (key === "gender")
            innerRowData.push(guest[key] ? "Nữ" : "Nam");
          else
            innerRowData.push(guest[key]);
      });
      let posTime = this.props.meeting.guestAttended.findIndex(val => {
        return val.toString() === guest._id.toString();
      })
      if (posTime > -1)
        innerRowData.push(this.toExactDateTime(this.props.meeting.timeLine[posTime]));
      createXLSLFormatObj.push(innerRowData);
    });

    let fileName = "DANH_SACH_DIEM_DANH_" + this.props.meeting._id + ".xlsx";

    /* Sheet Name */
    let ws_name = "DANH_SACH_DIEM_DANH";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, fileName);
    if (typeof console !== 'undefined') console.log(new Date());
  }

  render() {
    if (this.props.status !== 'NOT_SET') {
      this.setState({
        submit: false
      })
      this.props.setStatus("NOT_SET");
    }
    let { meeting } = this.props;
    let { guestsInvited } = meeting;

    let { from } = this.props.location.state || { from: { pathname: "/admin/meetings" } };

    if (!guestsInvited) {
      return <Redirect to={from} />
    }
    return (
      <div>
        <Link className="btn btn-primary btn-icon-split  mb-4" to="/admin/meetings">
          <span className="icon">
            <i className="fas fa-chevron-left" />
          </span>
          <span style={{ padding: ".375rem .75rem" }}>
            Quay lại
          </span>
        </Link>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Tác vụ</h6>
          </div>
          <div className="card-body row">
            <div style={{ marginLeft: "10px" }} />
            {
              meeting.status === -1 ?
                <Link
                  className="btn btn-success btn-icon-split"
                  to="/admin/meetings"
                  onClick={(e) => {
                    this.props.startMeeting(meeting._id)
                  }}>
                  <span className="icon">
                    <i className="fas fa-play-circle" />
                  </span>
                  <span style={{ padding: ".375rem .75rem" }}>
                    Bắt đầu điểm danh
                    </span>
                </Link> :
                meeting.status === 1 ?
                  <Link className="btn btn-success btn-icon-split" to="#" onClick={this.downloadListGuestAttended}>
                    <span className="icon">
                      <i className="fas fa-download" />
                    </span>
                    <span style={{ padding: ".375rem .75rem" }}>
                      Tải file báo cáo
                    </span>
                  </Link> :
                  <Link className="btn btn-danger btn-icon-split" to="/admin/meetings" onClick={() => this.props.endMeeting(meeting._id)}>
                    <span className="icon">
                      <i className="fas fa-stop-circle" />
                    </span>
                    <span style={{ padding: ".375rem .75rem" }}>
                      Dừng điểm danh
                  </span>
                  </Link>
            }
            <div style={{ marginLeft: "10px" }} />
            <Link className="btn btn-info btn-icon-split" to="#" onClick={this.downloadListGuest}>
              <span className="icon">
                <i className="fas fa-file-download" />
              </span>
              <span style={{ padding: ".375rem .75rem" }}>
                Tải danh sách khách mời
              </span>
            </Link>
            <div style={{ marginLeft: "10px" }} />
            <a className="btn btn-primary btn-icon-split" target="_blank" href="https://qrexplore.com/generate/">
              <span className="icon">
                <i className="fas fa-qrcode" />
              </span>
              <span style={{ padding: ".375rem .75rem" }}>
                Tạo mã QR khách mời
              </span>
            </a>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Thông tin cuộc họp / đại hội </h6>
          </div>
          <div className="card-body">
            <div className="user">
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <h4 className="small font-weight-bold">Tên sự kiện</h4>
                  <div className="form-control form-control-user">
                    {meeting.name}
                  </div>
                </div>
                <div className="col-sm-6">
                  <h4 className="small font-weight-bold">Địa điểm tổ chức</h4>
                  <div className="form-control form-control-user">
                    {meeting.address}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <h4 className="small font-weight-bold">Mô tả sự kiện</h4>
                <div className="form-control form-control-user">
                  {meeting.decription}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <h4 className="small font-weight-bold">Biểu ngữ chào mừng</h4>
                  <div className="form-control form-control-user">
                    {meeting.welcomeTitle}
                  </div>
                </div>
                <div className="col-sm-2 mb-2 mb-sm-0">
                  <h4 className="small font-weight-bold">Thời gian bắt đầu</h4>
                  <div className="col-sm-12 form-control form-control-user">
                    {this.toFullDateTime(meeting.time)}
                  </div>
                </div>
                <div className="col-sm-2 mb-2 mb-sm-0">
                  <h4 className="small font-weight-bold">Thời gian diễn ra</h4>
                  <div className="col-sm-12 form-control form-control-user">
                    {meeting.duration ? `${meeting.duration/3600000} giờ` : "Không đặt"}
                  </div>
                </div>
                <div className="col-sm-1 mb-1 mb-sm-0">
                  <h4 className="small font-weight-bold">Trạng thái</h4>
                  {
                    meeting.status === 1 ?
                      <span className="label label-warning">Đã diễn ra</span> :
                      meeting.status === 0 ?
                        <span className="label label-success">Đang diễn ra</span> :
                        <span className="label label-primary">Chưa diễn ra</span>
                  }
                </div>
                <div className="col-sm-1 mb-1 mb-sm-0">
                  <h4 className="small font-weight-bold">Mã sự kiện</h4>
                  <span className="label label-success">{meeting.code}</span>
                </div>
              </div>
              {/* allGuests of this account unselected */}
              <TableGuest
                tableFor=""
                tableTitle="Danh sách khách mời"
                allGuests={guestsInvited}
                listHeader={['STT', "Mã khách mời", 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Đơn vị', "Số ghế"]}
                listKey={["_id", "name", "gender", "dob", 'department', 'seat']}
              />
              <hr />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allGuests: state.guests.allGuests,
    status: state.meetings.status,
    meeting: state.meetings.meetingInfo,
    code: state.socket.code
  }
}

const mapDispatchToProps = {
  setStatus: meetingAction.setStatus,
  startMeeting: socketAction.startMeeting,
  endMeeting: socketAction.endMeeting
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingInfo)


