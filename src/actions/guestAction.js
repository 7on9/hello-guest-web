import { GuestService } from '../services/guest';
import { GUEST, TITLE } from '../constvalues/ActionTypes';

export const guestAttending = (guest) => {
  return {
    type: GUEST.ATTENDING,
    payload: {
      guestAttending: guest
    }
  }
};

export const guestInfo = (guest) => {
  return {
    type: GUEST.GET,
    payload: {
      guestInfo: guest
    }
  }
};

export const undefinedGuest = () => {
  return {
    type: GUEST.UNDEFINED,
    payload: {
      guestAttending: {
        _id: "_______",
        name: "Đang đợi...",
        imagePath: "./assets/img/Bamboologo.png",
        dob: "Đang đợi...",
        department: "Đang đợi..."
      }
    }
  }
};

export const guests = (guests) => {
  return {
    type: GUEST.LIST,
    payload: {
      guests: guests
    }
  }
};

export const setStatus = (status) => {
  return {
    type: GUEST.SET_STATUS,
    payload: {
      status: status
    }
  }
}

export const addGuest = (guest) => {
  return dispatch => {
    GuestService.addGuest(guest)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch({
          type: GUEST.ADD,
          payload: {
            status: "SUCCESS",
            allGuests: res.allGuests
          }
        })
      })
      .catch(() => {
        return dispatch({
          type: GUEST.ADD,
          payload: {
            status: "FAIL"
          }
        })
      })
  }
};

export const updateGuest = (guest) => {
  return dispatch => {
    GuestService.updateGuest(guest)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch({
          type: GUEST.ADD,
          payload: {
            status: "SUCCESS",
            allGuests: res.allGuests
          }
        })
      })
      .catch(() => {
        return dispatch({
          type: GUEST.ADD,
          payload: {
            status: "FAIL"
          }
        })
      })
  }
};

export const deleteGuest = (idGuest) => {
  return dispatch => {
    GuestService.deleteGuest(idGuest)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch({
          type: GUEST.DELETE,
          payload: {
            status: "SUCCESS",
            allGuests: res.allGuests
          }
        })
      })
      .catch(() => {
        return dispatch({
          type: GUEST.DELETE,
          payload: {
            status: "FAIL"
          }
        })
      })
  }
};

export const getInfoGuest = (idGuest) => {
  return dispatch => {
    GuestService.getGuest(idGuest)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return dispatch(guestInfo(res.guestInfo))
      })
      .catch(() => {
        return dispatch(guestInfo(null))
      })
  }
};

export const getsAllGuests = () => {
  return dispatch => {
    GuestService.getAllGuests()
      .then(res => res.json())
      .then(res => {
        return dispatch({
          type: GUEST.LIST_ALL,
          payload: {
            allGuests: res.allGuests.guests
          }
        });
      })
      .catch(err => dispatch({
        type: GUEST.LIST_ALL,
        payload: {
          allGuests: null
        }
      })
    )
  }
}

export const setTitleOnLiveView = (title) => {
  return {
    type: TITLE.LIVEVIEW,
    payload: {
      liveViewTitle: title
    }
  }
}

export const setWellcomeTitle = (title) => {
  return {
    type: TITLE.WELCOME,
    payload: {
      welcomeTitle: title
    }
  }
}

// export const Action = {
//   guest: {
//     add: addGuest
//   }
// }
