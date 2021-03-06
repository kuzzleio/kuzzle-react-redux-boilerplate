import keyMirror from 'key-mirror';

const ActionsTypes = keyMirror({
  SET_APP_READY: null,
  SET_APP_ONLINE: null,
  SET_APP_OFFLINE: null,

  FETCH_JWT: null,
  FETCH_USER: null,

  LOGIN: null,
  LOGIN_SUCCESS: null,
  LOGOUT: null,

  SET_NOTIF: null,
  CLEAR_NOTIF: null,
});

export default ActionsTypes;
