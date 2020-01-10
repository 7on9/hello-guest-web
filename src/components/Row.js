import React, { Component } from 'react';

class Row extends Component {
  render() {
    // let { index } = this.props;
    let { guest, index, attendant } = this.props;
    return (
      <tr>
        <td> {index} </td>
        <td> {guest._id} </td>
        <td> {guest.name} </td>
        <td> {guest.department} </td>
        <td> {!Boolean(guest.gender) ? "Nam" : "Nữ"} </td>
        <td> {guest.seat}</td>
        <td>
          {!attendant ?
            <span className="label label-warning">Chưa có mặt</span> :
            <span className="label label-success">Đã có mặt</span>}
        </td>
      </tr>
    );
  }
}
export default Row;
