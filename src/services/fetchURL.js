import { URL } from '../constvalues/ConstValues';

export const MAKE_FROM_BODY = (body) => {
  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
}

export const FETCH = (method, extURL, formBody) => {
  return formBody ?
    fetch(URL.DEV + extURL, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'token': localStorage.getItem('token')
      },
      body: formBody
    }) :
    fetch(URL.DEV + extURL, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'token': localStorage.getItem('token')
      }
    })
}
