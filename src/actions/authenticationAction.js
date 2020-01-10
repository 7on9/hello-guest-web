import { AuthenticationService } from "../services/authentication";
import { ACCOUNT, ERROR } from '../constvalues/ActionTypes'

const authenAction = (type, token, email) => {
  return {
    type: type,
    payload: {
      token: token,
      email: email
    }
  }
}

export const login = (email, password) => {
  return (dispatch) => {
    AuthenticationService.login(email, password)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.success) {
          return dispatch(authenAction(ACCOUNT.LOGIN, ERROR.NOT_EXIST, null));
        } else {
          localStorage.setItem("token", res.token);
          return dispatch(authenAction(ACCOUNT.LOGIN, res.token, res.email))
        }
      })
      .catch(err => console.log(err));
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    AuthenticationService.logout()
      .catch(() => {
        return dispatch(authenAction(ACCOUNT.LOGOUT, null, null))
      })
  }
}

export const verify = () => {
  return (dispatch) => {
    AuthenticationService.verify()
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.success) {
          localStorage.removeItem('token');
          return dispatch(authenAction(ACCOUNT.VERIFY, ERROR.NOT_EXIST, null))
        } else {
          localStorage.setItem("email", res.email);
          return dispatch(authenAction(ACCOUNT.VERIFY, res.token, res.email))
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        return dispatch(authenAction(ACCOUNT.VERIFY, ERROR.NOT_EXIST, null))
      });
  }
}

export const resetToken = () => {
  return authenAction(ACCOUNT.LOGIN, null, null)
}
