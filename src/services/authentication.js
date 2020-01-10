import { FETCH_TYPE } from '../constvalues/ConstValues'
import { FETCH, MAKE_FROM_BODY } from './fetchURL';

export const AuthenticationService = {
  login: (email, password) => {
    let formBody = MAKE_FROM_BODY({email, password});
    return FETCH(FETCH_TYPE.POST, "account/login", formBody);
  },
  logout: () => {
    let formBody = MAKE_FROM_BODY({});
    return FETCH(FETCH_TYPE.POST, "account/logout", formBody);
  },
  verify: () => {
    let formBody = MAKE_FROM_BODY({});
    return FETCH(FETCH_TYPE.POST, "account/verify", formBody);
  }
}
