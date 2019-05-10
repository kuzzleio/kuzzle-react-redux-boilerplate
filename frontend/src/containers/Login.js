import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../state/actions';

import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;

    this.props.login({
      username,
      password,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <form className="Login" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={this.handleChange}
        />
        <button>Login</button>
      </form>
    );
  }
}

export default connect(
  state => ({}),
  {
    login: ActionCreators.login,
    setNotif: ActionCreators.setNotif,
  }
)(Login);
