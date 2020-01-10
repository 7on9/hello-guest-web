import React, { Component } from 'react'
import * as meetingActions from '../actions/meetingAction';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RowMeeting extends Component {
  onDelete = (idMeeting) => {
    if (!window.confirm("Xác nhận xóa sự kiện này?"))
      return;
    if (prompt("Hãy gõ \"Xác nhận\" để xóa sự kiện.") === "Xác nhận")
      this.props.deleteMeeting(idMeeting);
    else {
      alert("Xác nhận lỗi!")
    }
  }

  onInfo = (idMeeting) => {
    this.props.setInfo(idMeeting);
  }

  render() {
    let { meeting, index, listKey } = this.props;

    let getTimeStart = (timeStamp) => {
      let date = new Date(timeStamp * 1000);
      return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes());
    }

    return (
      meeting ?
        <tr key={index}>
          <td>
            {index + 1}
          </td>
          {
            listKey.length ?
              listKey.map((key, pos) => {
                return (
                  <td key={pos}>
                    {
                      key === 'status' ?
                        meeting[key] === 1 ? <span className="label label-warning">Đã diễn ra</span> :
                          meeting[key] === -1 ? <span className="label label-primary">Chưa diễn ra</span> :
                            <span className="label label-success">Đang diễn ra</span> :
                        (key === 'time' ? getTimeStart(meeting.time) : meeting[key])
                    }
                  </td>)
              }) : null
          }
          <td>
            <Link to="/admin/meetinginfo"
              className="btn btn-info btn-circle btn-sm"
              style={{ marginRight: "10px" }}
              onClick={() => this.onInfo(meeting)}>
              <i className="fas fa-info-circle" />
            </Link>
            <Link to="#"
              className="btn btn-danger btn-circle btn-sm"
              onClick={(event) => {
                event.preventDefault();
                this.onDelete(meeting._id)
              }
              }>
              <i className="fas fa-trash" />
            </Link>
          </td>
        </tr> : null
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  deleteMeeting: meetingActions.deleteMeeting,
  setStatus: meetingActions.setStatus,
  setInfo: meetingActions.meetingInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(RowMeeting)
