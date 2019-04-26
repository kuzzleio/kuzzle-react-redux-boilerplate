import { fork } from 'redux-saga/effects';
import app from './app';

const sagas = function*() {
  yield [fork(app)];
};

export default sagas;
