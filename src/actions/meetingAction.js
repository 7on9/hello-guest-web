import { MeetingService } from '../services/meeting';
import { MEETING } from '../constvalues/ActionTypes';

// export const MEETING_ACTIONS = {
//   meetings,
//   meetingInfo,
//   createMeeting : createMeeting
// };

export const meetingInfo = (meeting) => {
  return {
    type: MEETING.GET,
    payload: {
      meetingInfo: meeting
    }
  }
};

export const meetings = (meetings) => {
  return {
    type: MEETING.LIST,
    payload: {
      meetings: meetings
    }
  }
};

export const createMeeting = (meeting) => {
  return dispatch => {
    MeetingService.addMeeting(meeting)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch({
          type: MEETING.CREATE,
          payload: {
            status: "SUCCESS",
            newMeeting: res.newMeeting
          }
        })
      })
      .catch(() => {
        return dispatch({
          type: MEETING.CREATE,
          payload: {
            status: "FAIL"
          }
        })
      })
  }
};

export const deleteMeeting = (idMeeting) => {
  return dispatch => {
    MeetingService.deleteMeeting(idMeeting)
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: MEETING.DELETE,
          payload: {
            status: "SUCCESS",
            deletedMeeting: res.deletedMeeting
          }
        })
      })
      .catch(() => {
        return dispatch({
          type: MEETING.DELETE,
          payload: {
            status: "FAIL"
          }
        })
      })
  }
};

export const getInfoMeeting = (idMeeting) => {
  return dispatch => {
    MeetingService.getMeeting(idMeeting)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch(meetingInfo(res.meetingInfo))
      })
      .catch(() => {
        return dispatch(meetingInfo(null))
      })
  }
};

export const getsAllMeetings = () => {
  return dispatch => {
    MeetingService.getAllMeetings()
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: MEETING.LIST,
          payload: {
            allMeetings: res.allMeetings
          }
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: MEETING.LIST,
          payload: {
            allMeetings: null
          }
        });
      });
  }
}

export const setStatus = (status) => {
  return {
    type: MEETING.SET_STATUS,
    payload: {
      status: status
    }
  }
}
