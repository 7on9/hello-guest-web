import React, { Component } from 'react'
import RowGuest from './RowGuest';

class TableGuest extends Component {
  openForm = () => {
    return this.props.openForm();
  }

  onInvite = (pos) => {
    this.props.onInvite(pos);
  }

  render() {
    let { listHeader, listKey, allGuests } = this.props;
    listHeader = listHeader ? listHeader : ["STT", "Tên", "Tác vụ"];

    let renderRows = () => {
      if (allGuests)
        return allGuests.map((row, index) => {
          return <RowGuest
            onChangeSeat={this.props.onChangeSeat}
            onInvite={this.props.onInvite}
            onUnInvite={this.props.onUnInvite}
            lengthOfArr={allGuests.length}
            tableFor={this.props.tableFor}
            openForm={this.openForm}
            guest={row}
            index={index}
            key={index}
            listKey={listKey} />
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
                    allGuests ? renderRows() :
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

export default TableGuest

