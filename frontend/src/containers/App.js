import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import ActionCreators from '../state/actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    kuzzle.on('networkError', error => {
      toast.error(error);
    });

    this._initialize();
  }

  async _initialize() {
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
    const { user, isReady } = this.props;

    if (!isReady) {
      return <span>Loading...</span>;
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
  }),
  {
    clearNotif: ActionCreators.clearNotif,
    fetchJwt: ActionCreators.fetchJwt,
  }
)(App);
