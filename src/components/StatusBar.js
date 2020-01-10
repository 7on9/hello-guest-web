import React, { Component } from 'react';
import { connect } from 'react-redux'

class StatusBar extends Component {

  render() {
    let { guests, attendanted, absent } = this.props;
    attendanted = attendanted == null ? 0 : attendanted;
    absent = absent === null ? 0 : absent;

    let getWidth = (id) => {

      if (id === 1) {
        return guests ?
        {
          width: guests.length === 0 ?
            '0%' : (attendanted / guests.length * 1.0) * 100 + '%'
        } : null
      }
      else {
        return guests ?
        {
          width: guests.length === 0 ?
            '0%' : (absent / guests.length * 1.0) * 100 + '%'
        } : null
      }
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h6>Tổng số đại biểu : {guests ? guests.length : 0}</h6>
            <div className="progress">
              <div className="progress-bar progress-bar-success" role="progressbar" style={getWidth(1)}>
                Đã có mặt: {attendanted}
              </div>
              <div className="progress-bar progress-bar-warning" role="progressbar" style={getWidth(0)}>
                Chưa có mặt: {absent}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
const mapStateToProps = (state) => {
  let { guests, attendanted, absent } = state.socket;

  return {
    guests,
    absent,
    attendanted
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
