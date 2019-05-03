import ActionsTypes from '../constants/ActionsTypes';

const ActionCreators = {
  setAppReady: () => ({
    type: ActionsTypes.SET_APP_READY,
    payload: {},
  }),
  fetchJwt: () => ({
    type: ActionsTypes.FETCH_JWT,
    payload: {},
  }),
  fetchUser: (jwt, isFirstLogin = true) => ({
    type: ActionsTypes.FETCH_USER,
    payload: {
      jwt,
    },
    meta: {
      isFirstLogin,
    },
  }),
  login: ({ username, password }) => ({
    type: ActionsTypes.LOGIN,
    payload: {
      username,
      password,
    },
  }),
  logout: () => ({
    type: ActionsTypes.LOGOUT,
    payload: {},
  }),
  loginSuccess: (jwt, user) => ({
    type: ActionsTypes.LOGIN_SUCCESS,
    payload: {
      jwt,
      user,
    },
  }),
  setNotif: ({ type, message }) => ({
    type: ActionsTypes.SET_NOTIF,
    payload: {
      type,
      message,
    },
  }),
  clearNotif: () => ({
    type: ActionsTypes.CLEAR_NOTIF,
    payload: {},
  }),
};

export default ActionCreators;
