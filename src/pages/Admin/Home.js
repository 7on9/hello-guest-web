import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {

  render() {
    let attending = 0, end = 0;
    this.props.allMeetings.forEach(meeting => {
      if (meeting.status === 1) {
        end++;
      }
      if (meeting.status === 0) {
        attending++;
      }

    });
    return (
      <div>
        <div className="row">
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-6 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="f-md font-weight-bold text-primary text-uppercase mb-1">Sự kiện đã tạo</div>
                    <div className="f-md mb-0 font-weight-bold text-gray-800">{this.props.allMeetings ? this.props.allMeetings.length : 0}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar-alt fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-6 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="f-md font-weight-bold text-info text-uppercase mb-1">Khách mời đã tạo</div>
                    <div className="f-md mb-0 font-weight-bold text-gray-800">{this.props.allGuests ? this.props.allGuests.length : 0}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings (Monthly) Card Example */}
          <div className="col-xl-6 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="f-md font-weight-bold text-success text-uppercase mb-1">Sự kiện đang diễn ra</div>
                    <div className="f-md mb-0 font-weight-bold text-gray-800">{attending}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-bullhorn fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Requests Card Example */}
          <div className="col-xl-6 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="f-md font-weight-bold text-warning text-uppercase mb-1">Sự kiện đã kết thúc</div>
                    <div className="f-md mb-0 font-weight-bold text-gray-800">{end}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-check-double fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
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
    allMeetings: state.meetings.allMeetings,
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
