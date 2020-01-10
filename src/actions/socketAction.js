import io from 'socket.io-client';
import { URL } from '../constvalues/ConstValues';
import { MEETING, GUEST, STATUS } from '../constvalues/ActionTypes';
import { MeetingService } from '../services/meeting';

const socket = io(URL.DEV);

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected to server');
  });
  socket.on(MEETING.JOIN, (status, guests, attendance) => {
    if(status === STATUS.SUCCESS){
      return dispatch({
        type: MEETING.JOIN,
        payload: {
          guests,
          attendance
        }
      });
    }else{
      return dispatch({
        type: MEETING.JOIN,
        payload: {
          guests: []
        }
      });
    }

  });
  socket.on(MEETING.START, (status, guests) => {
    if (status === STATUS.SUCCESS)
      return dispatch({
        type: MEETING.START,
        payload: {
          guests: JSON.parse(guests)
        }
      });
  });
  socket.on(MEETING.TITLE, (titles) => {
    return dispatch({
      type: MEETING.TITLE,
      payload: {
        titles
      }
    })
  });
  socket.on(GUEST.CHECKIN, (idGuest, attendance) => {
      return dispatch({
        type: GUEST.CHECKIN,
        payload: {
          idGuestAttending: idGuest,
          attendance
        }
      })
  });
  return socket;
};

export const joinMeeting = code => {
  localStorage.setItem("roomCode", code);
  return dispatch => {
    socket.emit(MEETING.JOIN, code);
  }
}

export const startMeeting = (idMeeting) => {
  return dispatch => {
    MeetingService.startMeeting(idMeeting)
      .then(res => res.json())
      .then(res => {
        socket.emit(MEETING.START, res.meeting.code);
        return dispatch({
          type: MEETING.CODE,
          payload: {
            meeting: res.meeting
          }
        })
      })
      .catch(err => console.log(err))
    }
}
export const endMeeting = (idMeeting) => {
  return dispatch => {
      socket.emit(MEETING.END, idMeeting);
    }
}

export const resetGuests = () => {
  return {
    type: MEETING.JOIN,
    payload: {
      guests: null
    }
  }
}

export default configureSocket;
