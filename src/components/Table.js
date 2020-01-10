import React, { Component } from 'react';
import Row from './Row';
import { connect } from 'react-redux'

class Table extends Component {
  render() {
    // let { index } = this.props;
    let { guests, guestAttended } = this.props;
    console.log(guests);

    let renderRows = () => {
      if (guests) {
      return guests.map((guest, index) => {
          return <Row
            index={index}
            guest={guest}
            key={guest._id}
            attendant={ guestAttended.indexOf(guest._id.toString()) !== -1 ? true : false}
          />
        });
      }
    }

    return (
      <table
        id="fresh-table"
        className="table">
        <thead>
          <tr>
            <th data-field="id">STT</th>
            <th data-field="_id">Mã đại biểu</th>
            <th data-field="name">Họ và Tên</th>
            <th data-field="department">Đơn Vị</th>
            <th data-field="gender">Giới tính</th>
            <th data-field="seat">Số ghế</th>
            <th data-field="status">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {guests ? renderRows() : null}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    guests: state.socket.guests,
    guestAttended: state.socket.attendance.guestAttended,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);
