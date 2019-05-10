import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.min.css';

import kuzzle from '../services/kuzzle';
import Home from './Home';
import Login from './Login';
import Offline from '../components/Offline';
import Loading from '../components/Loading';
import ActionCreators from '../state/actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    kuzzle.on('networkError', error => {
      console.error(error.message);
    });

    this._initialize();
  }

  async _initialize() {
    kuzzle.addListener('connected', () => {
      this.props.setAppOnline();
    });
    kuzzle.addListener('reconnected', () => {
      this.props.setAppOnline();
    });
    kuzzle.addListener('disconnected', () => {
      this.props.setAppOffline();
    });
    kuzzle.addListener('tokenExpired', () => {
      this.props.logout();
    });

    await kuzzle.connect();
    this.props.fetchJwt();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      const { type, message } = nextProps.notification;
      toast[type](message);
      this.props.clearNotif();
    }
  }

  render() {
    const { user, isReady, isOnline } = this.props;

    console.log(isReady, isOnline);

    if (!isOnline) {
      return <Offline />;
    }

    if (!isReady) {
      return <Loading />;
    }

    return (
      <div className="App">
        <Router>
          {user && user.jwt ? (
            <Switch>
              <Route path="/" exact component={Home} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          )}
        </Router>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.app.user,
    notification: state.app.notification,
    isReady: state.app.isReady,
    isOnline: state.app.isOnline,
  }),
  {
    clearNotif: ActionCreators.clearNotif,
    fetchJwt: ActionCreators.fetchJwt,
    setAppOnline: ActionCreators.setAppOnline,
    setAppOffline: ActionCreators.setAppOffline,
    logout: ActionCreators.logout,
  }
)(App);
