import React, { Component } from 'react'
import RowMeeting from './RowMeeting';

class TableMeeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { listHeader, listKey, allMeetings } = this.props;
    listHeader = listHeader ? listHeader : ["STT", "Tên", "Tác vụ"];
    listKey = listKey ? listKey : (allMeetings ? Object.getOwnPropertyNames(allMeetings[0]) : null);

    let renderRows = () => {
      if (allMeetings)
        return allMeetings.map((row, index) => {
          return <RowMeeting
            listKey={listKey}
            meeting={row}
            index={index}
            key={index} />
        })
    }

    return (
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">{this.props.tableTitle}</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive ws-nw">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    {
                      listHeader.map((header, index) => {
                        return (
                          <th key={index}>
                            {header}
                          </th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    allMeetings ? renderRows() :
                      <tr>
                        <td>
                          Không có dữ liệu
                        </td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TableMeeting;

