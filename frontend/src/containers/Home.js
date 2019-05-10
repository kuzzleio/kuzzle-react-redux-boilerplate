import React from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../state/actions';

import './Home.css';

const Home = ({ user, logout }) => {
  return (
    <div className="Home">
      <span>Hello {user.username}!</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default connect(
  state => ({
    user: state.app.user,
  }),
  {
    logout: ActionCreators.logout,
  }
)(Home);
