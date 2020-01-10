import { MEETING } from "../constvalues/ActionTypes";

//reducer socket
let initialState = {
  meetingInfo: {},
  allMeetings: [],
  newMeeting: [],
  status: "NOT_SET"
};

let meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETING.LIST:
      state = {
        ...state,
        allMeetings: action.payload.allMeetings ? [...action.payload.allMeetings] : []
      }
      break;
    case MEETING.CREATE:
      let { allMeetings } = state;
      if (action.payload.newMeeting) {
        allMeetings.push(action.payload.newMeeting);
        state = {
          ...state,
          status: action.payload.status,
          allMeetings: [...allMeetings]
        };
      } else {
        state = {
          ...state,
          status: action.payload.status
        };
      }
      break;
    case MEETING.DELETE:
      let deletedArr = state.allMeetings.map(meeting => {
        if(meeting._id !== action.payload.deletedMeeting._id){
          return meeting;
        }
      })
      state = {
        ...state,
        status: "SUCCESS",
        allMeetings: [...deletedArr]
      };
      break;
    case MEETING.SET_STATUS:
      state = {
        ...state,
        status: action.payload.status
      }
      break;
    case MEETING.GET:
      state = {
        ...state,
        meetingInfo: action.payload.meetingInfo
      }
      break;
    default:
      break;
  }
  return state;
}
export default meetingsReducer;
