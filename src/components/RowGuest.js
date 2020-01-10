import React, { Component } from 'react'
import * as guestActions from '../actions/guestAction';
import { connect } from 'react-redux'
import { isNull } from 'util';

class RowGuest extends Component {
  onDelete = (idGuest) => {
    if (!window.confirm("Xác nhận xóa khách mời?"))
      return;
    this.props.deleteGuest(idGuest);
  }

  onInfo = (idGuest) => {
    this.props.getInfo(idGuest);
    this.props.openForm();
  }

  onInvite = (pos) => {
    this.props.onInvite(pos);
  }

  onChangeSeat = (index, event) => {
    this.props.onChangeSeat(index, event.target.value);
  }

  render() {
    let { guest, index, listKey, tableFor, lengthOfArr } = this.props;

    let getDob = (timeStamp) => {
      let date = new Date(timeStamp * 1000);
      return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
    }
    
    return (
      guest ?
      <tr key={index}>
        <td>
          {index + 1}
        </td>
        {
          listKey.length ?
            listKey.map((key, pos) => {
              return (
                <td key={pos}>
                  {key === 'gender' ?
                    (guest[key] ? "Nữ" : "Nam") :
                    (key === 'dob' ? getDob(guest.dob) : guest[key])
                  }
                </td>)
            }) : null
        }
        {
          tableFor === "SELECTED_FOR_MEETING" ?
            <td>
              <input
                type="number"
                min="1"
                max={lengthOfArr}
                defaultValue={ index + 1}
                onChange={(e) => this.onChangeSeat(index, e)}
                style={{ width: "50px" }}
                />
            </td> :
            null
        }
        {
          tableFor === "SELECT_FOR_MEETING" ?
            <td>
            {/* eslint-disable-next-line */}
              <a href="#"
                className="btn btn-success btn-circle btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  this.onInvite(index)
                }
                }>
                <i className="fas fa-user-plus" />
              </a>
            </td> :
          //un invite
          tableFor === "SELECTED_FOR_MEETING" ?
            <td>
            {/* eslint-disable-next-line */}
              <a href="#"
                className="btn btn-danger btn-circle btn-sm"
                onClick={(event) => {
                  event.preventDefault();
                  this.props.onUnInvite(index)
                }
                }>
                <i className="fas fa-user-minus" />
              </a>
            </td> :
            tableFor === "NORMAL" ?
            (
              <td>
              {/* eslint-disable-next-line */}
                <a href="#"
                  className="btn btn-info btn-circle btn-sm"
                  style={{ marginRight: "10px" }}
                  onClick={(event) => {
                    event.preventDefault();
                    this.onInfo(guest._id)
                  }
                  }>
                  <i className="fas fa-info-circle" />
                </a>
                {/* eslint-disable-next-line */}
                <a href="#"
                  className="btn btn-danger btn-circle btn-sm"
                  onClick={(event) => {
                    event.preventDefault();
                    this.onDelete(guest._id)
                  }
                  }>
                  <i className="fas fa-trash" />
                </a>
              </td>
            ) : null
        }
      </tr> : null
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  deleteGuest: guestActions.deleteGuest,
  setStatus: guestActions.setStatus,
  getInfo: guestActions.getInfoGuest
}

export default connect(mapStateToProps, mapDispatchToProps)(RowGuest)
