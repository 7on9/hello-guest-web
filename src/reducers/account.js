//reducer account
import { ACCOUNT } from "../constvalues/ActionTypes";
let initialState = {
  token: '',
  email: ''
};

let accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT.LOGIN:
    case ACCOUNT.LOGOUT:
    case ACCOUNT.VERIFY:
      state = {
        ...state,
        token: action.payload.token,
        email: action.payload.email
      };
      break;
    default:
      break;
  }
  return state;
}
export default accountReducer;
