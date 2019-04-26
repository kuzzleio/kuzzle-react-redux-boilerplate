import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../state/actions';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.actions.setupApp();
  }

  render() {
    return (
      <div className="App">
        <span>isSetup: {this.props.isSetup ? 'OK' : 'KO'} </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
