import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableGuest from '../../components/TableGuest'
import {
  Link
} from 'react-router-dom';
import FormCreateGuest from '../../components/FormCreateGuest';
import * as guestActions from '../../actions/guestAction';

class Guests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCreateGuest: false
    }
  }
  onToggleShowForm = () => {
    this.setState({
      formCreateGuest: !this.state.formCreateGuest
    })
  }

  openForm = () => {
    this.setState({
      formCreateGuest: true
    })
  }

  onResetGuestInfo = () => {
    this.props.resetGuestInfo(null)
  }
  render() {
    if (this.props.status === 'SUCCESS') {
      alert("Thành công");
      this.setState({
        formCreateGuest: false
      })
      this.props.setStatus("NOT_SET");
    } else {
      if (this.props.status === 'FAIL') {
        alert("Thất bại");
      }
    }
    return (
      <div>
        <div>
          <div className="form-group row" style={{marginLeft: "0px"}}>
            <Link className="btn btn-success btn-icon-split" to="#" onClick={this.onToggleShowForm}>
              <span className="icon">
                <i className={this.state.formCreateGuest ? "fas fa-times-circle" : "fas	fa-plus-circle"} />
              </span>
              <span style={{ padding: ".375rem .75rem" }}>
                {this.state.formCreateGuest ? "Đóng" : "Thêm khách mời"}
              </span>
            </Link>
            <div style={{ marginLeft: "10px" }} />
            <Link className="btn btn-primary btn-icon-split" to="#" onClick={this.onResetGuestInfo}>
              <span className="icon">
                <i className="fas	fa-sync-alt" />
              </span>
              <span style={{ padding: ".375rem .75rem" }}>Đặt lại</span>
            </Link>
          </div>
          <div className="my-4"></div>
          {this.state.formCreateGuest ? <FormCreateGuest guest={this.props.guestInfo} /> : null}
        </div>
        <TableGuest
          tableFor="NORMAL"
          tableTitle="Danh sách khách mời"
          allGuests={this.props.allGuests}
          listHeader={['STT', 'Tên khách mời', 'Giới tính', 'Năm sinh', 'Địa chỉ', 'Đơn vị', 'Tác vụ']}
          listKey={["name", "gender", "dob", "address", 'department']}
          openForm={this.openForm}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allGuests: state.guests.allGuests,
    status: state.guests.status,
    guestInfo: state.guests.guestInfo
  }
}

const mapDispatchToProps = {
  setStatus: guestActions.setStatus,
  resetGuestInfo: guestActions.guestInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Guests)

