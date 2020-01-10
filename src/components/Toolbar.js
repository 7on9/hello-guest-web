import React, { Component } from 'react';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    onLive = () =>{
        this.props.onLive();
    }
    onSearch = (event) => {
        this.props.onSearch(event.target.value);
        // console.log(event.target.value);
    }
    onSort = (event) => {
        this.props.onSort(event.target.value);
        // console.log(event.target.value);
    }
    onReset = () => {
        let pass = prompt("Nhập mật khẩu để đặt lại dữ liệu!", "");
        if (pass === "x")
            this.props.onReset();
        else {
            if(pass !== null)
                alert("Sai mật khẩu!");
        }
    }
    render() {
        return (
            <div className="fixed-table-toolbar">
                <div className="bars pull-left">
                    <button
                        id="alertBtn"
                        type="button"
                        className="btn btn-default"
                        onClick={this.onLive}>
                        Xem nâng cao
                        &nbsp;
                        <span className="fa fa-television" />
                    </button>
                </div>
                <div className="columns columns-right pull-right">
                    <div
                        className="keep-open btn-group"
                        title="Columns">
                        <button
                            type="button"
                            className="btn btn-default dropdown-toggle"
                            data-toggle="dropdown">
                            Sắp xếp theo
                            &nbsp;
                            <span className="fa fa-sort-amount-asc" />
                        </button>
                        <ul
                            className="dropdown-menu"
                            role="menu">
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="drone"
                                        value="*"
                                        defaultChecked={true}
                                        onClick={this.onSort} />
                                    Tất cả
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="drone"
                                        value="_id"
                                        onClick={this.onSort} />
                                    Mã đại biểu
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="drone"
                                        value="name"
                                        onClick={this.onSort} />
                                    Họ và tên
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="drone"
                                        value="department"
                                        onClick={this.onSort} />
                                    Đơn vị
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="drone"
                                        value="attendant"
                                        onClick={this.onSort} />
                                    Trạng thái
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pull-right search">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Tìm tên đại biểu..."
                        onChange={this.onSearch} />
                </div>

            </div>
        );
    }
}
export default Toolbar;
