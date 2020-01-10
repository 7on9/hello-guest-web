import { GUEST } from "../constvalues/ActionTypes";

//reducer socket
let initialState = {
  allGuests: [],
  status: "NOT_SET"
};

let guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GUEST.LIST_ALL:
      state = {
        ...state,
        allGuests: action.payload.allGuests ? [...action.payload.allGuests] : []
      };
      break;
    case GUEST.ADD:
      state = {
        ...state,
        status: "SUCCESS",
        allGuests: action.payload.allGuests ? [...action.payload.allGuests] : []
      };
      break;
    case GUEST.DELETE:
      state = {
        ...state,
        status: "SUCCESS",
        allGuests: action.payload.allGuests ? [...action.payload.allGuests] : []
      };
      break;
    case GUEST.SET_STATUS:
      state = {
        ...state,
        status: action.payload.status
      }
      break;
    case GUEST.GET:
      state = {
        ...state,
        guestInfo: action.payload.guestInfo
      }
      break;
    default:
      break;
  }
  return state;
}
export default guestsReducer;
