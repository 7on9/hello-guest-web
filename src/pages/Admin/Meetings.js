import React, { Component } from 'react'
import { connect } from 'react-redux'
import TableMeeting from '../../components/TableMeeting'

class Meetings extends Component {
  render() {
    return (
      <div>
        <TableMeeting
          tableFor=""
          tableTitle="Danh sách tất cả sự kiện"
          allMeetings={this.props.allMeetings}
          listHeader={['STT', 'Tên sự kiện', 'Địa điểm', 'Thời gian diễn ra', 'Thông tin', 'Trạng thái', 'Tác vụ']}
          listKey={["name", "address", "time", "decription", "status"]}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allMeetings: state.meetings.allMeetings
})

const mapDispatchToProps = (dispatch, props) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meetings)
