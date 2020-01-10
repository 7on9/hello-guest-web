import { combineReducers } from "redux";
import title from './title';
import account from './account';
import socket from './socket';
import guests from './guests';
import meetings from "./meeting";
//import all reducers

let myReducer = combineReducers({
  title,
  account,
  socket,
  guests,
  meetings
});

export default myReducer;
