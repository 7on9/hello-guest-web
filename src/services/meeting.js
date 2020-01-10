import { FETCH_TYPE } from '../constvalues/ConstValues'
import { FETCH, MAKE_FROM_BODY } from './fetchURL';

export const MeetingService = {
  getAllMeetings: () => {
    return FETCH(FETCH_TYPE.GET, "meeting/", null);
  },
  getMeeting: (idMeeting) => {
    return FETCH(FETCH_TYPE.GET, "meeting/" + idMeeting, null);
  },
  startMeeting: (idMeeting) => {
    let formBody = MAKE_FROM_BODY({
      idMeeting: idMeeting
    });
    return FETCH(FETCH_TYPE.POST, "meeting/start", formBody);
  },
  addMeeting: (newMeeting) => {
    let formBody = MAKE_FROM_BODY({
      newMeeting: JSON.stringify(newMeeting)
    });
    return FETCH(FETCH_TYPE.POST, "meeting/", formBody);
  },
  deleteMeeting: (idMeeting) => {
    let formBody = MAKE_FROM_BODY({
      idMeeting: idMeeting
    });
    return FETCH(FETCH_TYPE.POST, "meeting/delete", formBody);
  },
}
