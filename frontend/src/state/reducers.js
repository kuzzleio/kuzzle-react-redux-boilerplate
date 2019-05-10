import update from 'immutability-helper';
import extendUpdate from '../helpers/extendUpdate';
import ActionsTypes from '../constants/ActionsTypes';
import initialState from './initialState';

extendUpdate(update);

const reducersMap = {
  [ActionsTypes.SET_APP_READY]: state =>
    update(state, {
      app: {
        isReady: { $set: true },
      },
    }),
  [ActionsTypes.SET_APP_ONLINE]: state =>
    update(state, {
      app: {
        isOnline: { $set: true },
      },
    }),
  [ActionsTypes.SET_APP_OFFLINE]: state =>
    update(state, {
      app: {
        isOnline: { $set: false },
      },
    }),
  [ActionsTypes.LOGIN_SUCCESS]: (state, { jwt, user }) =>
    update(state, {
      app: {
        user: {
          jwt: { $set: jwt },
          username: { $set: user.username },
        },
      },
    }),
  [ActionsTypes.LOGOUT]: state =>
    update(state, {
      app: {
        user: {
          $set: {
            jwt: null,
          },
        },
      },
    }),
  [ActionsTypes.SET_NOTIF]: (state, payload) =>
    update(state, {
      app: {
        notification: {
          $set: {
            ...payload,
          },
        },
      },
    }),
  [ActionsTypes.CLEAR_NOTIF]: state =>
    update(state, {
      app: {
        notification: {
          $set: null,
        },
      },
    }),
  leaveStateUnchanged: state => state,
};

const reducers = function reducers(state = initialState, action) {
  const reducer = reducersMap[action.type] || reducersMap.leaveStateUnchanged;
  const newState = reducer(state, action.payload, action.meta);
  return newState;
};

export default reducers;
