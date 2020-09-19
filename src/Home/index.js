import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    this.props.authService.login('/');
  }

  async logout() {
    this.props.authService.logout('/');
  }

  render() {
    if (this.props.authState.isPending) return <div>Loading...</div>;
    return this.props.authState.isAuthenticated ?
      <Redirect to="/dashboard" /> :
      <button onClick={this.login}>Login</button>;
  }
});