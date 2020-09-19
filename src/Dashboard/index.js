import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

export default withOktaAuth(class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    this.props.authService.logout('/');
  }

  render() {
    return <button onClick={this.logout}>Logout</button>
  }
});