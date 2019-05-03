import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import ActionsTypes from '../constants/ActionsTypes';
import ActionCreators from './actions';
import kuzzle from '../services/kuzzle';

const login = function*({ payload: { username, password } }) {
  try {
    const jwt = yield kuzzle.auth.login('local', {
      username,
      password,
    });

    yield put(ActionCreators.fetchUser(jwt));
    localStorage.setItem('jwt', jwt);
  } catch (e) {
    yield put(
      ActionCreators.setNotif({
        type: 'error',
        message: e.message,
      })
    );
  }
};

const fetchJwt = function*() {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    const { valid } = yield kuzzle.auth.checkToken(jwt);
    if (valid) {
      kuzzle.jwt = jwt;
      yield put(ActionCreators.fetchUser(jwt, false));
      return;
    }
    localStorage.removeItem('jwt');
  }
  yield put(ActionCreators.setAppReady());
};

const fetchUser = function*({ payload: { jwt }, meta: { isFirstLogin } }) {
  const user = yield kuzzle.auth.getMyCredentials('local');
  yield put(ActionCreators.loginSuccess(jwt, user));
  yield put(ActionCreators.setAppReady());

  if (isFirstLogin) {
    yield put(
      ActionCreators.setNotif({
        type: 'success',
        message: 'Login successful!',
      })
    );
  }
};

const logout = function*() {
  yield kuzzle.auth.logout();
  localStorage.removeItem('jwt');
};

const sagas = function*() {
  yield takeLatest(ActionsTypes.LOGIN, login);
  yield takeLatest(ActionsTypes.FETCH_JWT, fetchJwt);
  yield takeLatest(ActionsTypes.FETCH_USER, fetchUser);
  yield takeLatest(ActionsTypes.LOGOUT, logout);
};

export default sagas;
