import { FETCH_TYPE } from '../constvalues/ConstValues'
import { FETCH, MAKE_FROM_BODY } from './fetchURL';

export const GuestService = {
  getAllGuests: () => {
    return FETCH(FETCH_TYPE.GET, "guest/", null);
  },
  getMeetingGuests: (idMeeting) => {
    return FETCH(FETCH_TYPE.GET, "guest/" + idMeeting, null);
  },
  getGuest: (idGuest) => {
    return FETCH(FETCH_TYPE.GET, "guest/" + idGuest, null);
  },
  addGuest: (newGuest) => {
    let formBody = MAKE_FROM_BODY({
      newGuest: JSON.stringify(newGuest)
    });
    return FETCH(FETCH_TYPE.POST, "guest/", formBody);
  },
  updateGuest: (guest) => {
    let formBody = MAKE_FROM_BODY({
      guest: JSON.stringify(guest)
    });
    return FETCH(FETCH_TYPE.POST, "guest/update", formBody);
  },
  deleteGuest: (idGuest) => {
    let formBody = MAKE_FROM_BODY({
      idGuest: idGuest
    });
    return FETCH(FETCH_TYPE.POST, "guest/delete", formBody);
  },
}
