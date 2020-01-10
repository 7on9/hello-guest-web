import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as guestActions from '../actions/guestAction';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class FormCreateGuest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      img: null,
      newGuest: {
        name: '',
        dob: null,
        department: '',
        address: '',
        gender: false,
        img: ''
      },
      isUpdate: false,
      submit: false,
      guest: {},
    };
  }

  componentWillUnmount() {
    this.props.resetGuestInfo(null)
  }

  handleChangeDob = (date) => {
    this.setState({
      startDate: date,
      newGuest: {
        ...this.state.newGuest,
        dob: ((new Date(date)).setHours(0, 0, 0, 0) / 1000.0) //.getTime() / 1000.0
      }
    });
  }

  onType = (event) => {
    this.setState({
      newGuest: {
        ...this.state.newGuest,
        [event.target.name]: event.target.value
      }
    })
  }

  onChangeGender = (event) => {
    this.setState({
      newGuest: {
        ...this.state.newGuest,
        gender: event.target.value
      }
    })
  }

  onUploadImage = async (event) => {
    if (event.target.files[0]) {
      this.setState({
        img: URL.createObjectURL(event.target.files[0])
      })
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        newGuest: {
          ...this.state.newGuest,
          img: reader.result
        }
      })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onAddGuest = (event) => {
    event.preventDefault();
    let { guest } = this.props;
    let { name, dob, department, address, img, gender } = this.state.newGuest;
    if (this.props.guest) {
      this.setState({
        newGuest: {
          _id: guest._id,
          name: name ? name : guest.name,
          dob: dob ? dob : guest.dob,
          department: department ? department : guest.department,
          address: address ? address : guest.address,
          gender: gender != guest.gender ? (gender == 'true') : (guest.gender == 'true'),
          img: img ? img : null
        }
      }, () => {
        // console.log(this.state.newGuest);
        this.props.updateGuest(this.state.newGuest);
      })
    } else {
      if (name && dob && department && address && img) {
        this.props.addGuest(this.state.newGuest);
      } else {
        alert("Hãy điền đủ tất cả các trường");
      }
    }
    this.setState({
      submit: true
    })
  }

  render() {
    if (this.props.status !== 'NOT_SET') {
      this.setState({
        submit: false
      })
    }
    let { guest } = this.props;

    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Tạo khách mời cho tài khoản của bạn</h6>
        </div>
        <div className="card-body">
          <div className="user">
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input type="text" className="form-control form-control-user" name="name" placeholder="Họ và tên" onChange={this.onType} defaultValue={guest ? guest.name : ''} />
              </div>
              <div className="col-sm-6">
                <input type="text" className="form-control form-control-user" name="department" placeholder="Đơn vị" onChange={this.onType} defaultValue={guest ? guest.department : ''} />
              </div>
            </div>
            <div className="form-group">
              <input type="text" className="form-control form-control-user" name="address" placeholder="Địa chỉ" onChange={this.onType} defaultValue={guest ? guest.address : ''} />
            </div>
            <div className="form-group">
              <DatePicker
                className="form-control form-control-user"
                selected={this.state.startDate ? this.state.startDate : guest ? guest.dob * 1000 : null}
                onChange={this.handleChangeDob}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                placeholderText="Năm sinh"
              />
            </div>
            <div className="form-group row">
              <div className="col-sm-6" style={{ marginLeft: "7.5px" }} >Giới tính</div>
              <input type="radio" name="gender" defaultChecked={guest ? ((guest.gender ? 'woman' : 'man') == 'man' ? true : false) : null} value={false} style={{ marginRight: "15px" }} onChange={this.onChangeGender} /> Nam
              <div className="col-sm-1" />
              <input type="radio" name="gender" defaultChecked={guest ? ((guest.gender ? 'woman' : 'man') == 'woman' ? true : false) : null} value={true} style={{ marginRight: "15px" }} onChange={this.onChangeGender} /> Nữ
            </div>
            <div className="form-group">
              <div className="col-sm-12">Ảnh khách mời</div>
              <div className="col-sm-12 text-center">
                <img
                  className="img-thumbnail img-imagePath"
                  src={(this.state.img ? this.state.img : guest ? guest.imagePath : "../assets/img/Bamboologo.png")}
                  alt="img"
                  style={{
                    objectFit: !this.state.img && !guest ? "contain" : "cover",
                    width: "300px",
                    height: "400px"
                  }} />
              </div>
              <div className="col-sm-12">Chọn ảnh để tải lên</div>
              <input
                className="form-control col-sm-3"
                type="file"
                onChange={this.onUploadImage}
                accept=".jpg, .jpeg, .png"
                style={{ marginBottom: '10px' }}
              />
            </div>
            <button href="#"
              className="btn btn-success btn-user btn-block"
              onClick={this.onAddGuest}
              disabled={this.state.submit}
            >
              {this.props.status === 'NOT_SET' ? (this.props.guest ? "Cập nhật thông tin khách mời" : "Thêm khách mời") : "Xin đợi..."}
            </button>
            <hr />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.guests.status
  }
}

const mapDispatchToProps = {
  addGuest: guestActions.addGuest,
  updateGuest: guestActions.updateGuest,
  setStatus: guestActions.setStatus,
  resetGuestInfo: guestActions.guestInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGuest)
