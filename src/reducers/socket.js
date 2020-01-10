import { GUEST, MEETING, ERROR } from "../constvalues/ActionTypes";

//reducer socket
let initialState = {
  guests: null,
  guestAttending: {
    _id: "_______",
    name: "Đang đợi...",
    imagePath: "./assets/img/Bamboologo.png",
    dob: "Đang đợi...",
    department: "Đang đợi..."
  },
  absent: 0,
  attendanted: 0,
  attendance: {}
};

let socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETING.CODE:
      let { meeting } = action.payload;
      state = {
        ...state,
        code: meeting.code
      }
      break;
    case MEETING.JOIN:
      if(!action.payload.guests){
        state = {
          ...state,
          guests: null
        }
      }else{
        if (action.payload.guests.length > 0) {
          state = {
            ...state,
            guests: [...action.payload.guests],
            absent: action.payload.guests.length - action.payload.attendance.guestAttended.length,
            attendance: { ...action.payload.attendance },
            attendanted: action.payload.attendance.guestAttended.length,
          };
        }else{
          state = {
            ...state,
            guests: ERROR.NOT_EXIST
          }
        }
      }
      break;
    case MEETING.START:
      state = {
        ...state,
        guests: [...action.payload.guests],
        absent: [action.payload.guests.length],
        attendanted: 0,
      };
      break;
    case GUEST.ATTENDING:
    case GUEST.UNDEFINED:
      state = {
        ...state,
        guestAttending: {...action.payload.guestAttending}
      };
      break;
    case MEETING.TITLE:
      state = {
        ...state,
        welcomeTitle: action.payload.titles.welcomeTitle,
        name: action.payload.titles.name,
      }
    break;
    case GUEST.CHECKIN:
      let idGuestAttending = action.payload.idGuestAttending;
      let posGuest = state.guests.findIndex(guest => {
        return guest._id.toString() === idGuestAttending
      });
      let {absent, attendanted, guests} = state;
      state.guests[posGuest].attendant = true;
      // if(!action.payload.attendance.guestAttended.includes(idGuestAttending)){
      // }
      attendanted = action.payload.attendance.guestAttended.length;
      absent = guests.length - attendanted;
      state = {
        ...state,
        guestAttending: state.guests[posGuest],
        absent,
        attendanted,
        attendance: { ...action.payload.attendance },
      }
      break;
    default:
      break;
  }
  return state;
}
export default socketReducer;
