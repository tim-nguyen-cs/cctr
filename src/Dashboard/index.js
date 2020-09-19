import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

async function checkUser() {
  if (this.props.authState.isAuthenticated && !this.state.userInfo) {
    const userInfo = await this.props.authService.getUser();
    if (this._isMounted) {
      this.setState({ userInfo });
    }
  }
}

export default withOktaAuth(class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: null };
    this.checkUser = checkUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    this.props.authService.logout('/');
  }

  async componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };

    this._isMounted = true;
    this.checkUser();
    fetch('https://api.github.com/users/hacktivist123').then((response) => response.json()).then((data) => this.setState({ activities: data }));
  }

  async componentDidUpdate() {
    this.checkUser();
  }

  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <div>
          {this.state.userInfo && (
            <div>
              <p>Welcome back, {this.state.activities.login}!</p>
            </div>
          )}
        </div>
        <button onClick={this.logout}>Logout</button>
      </React.Fragment>
    )
  }
});