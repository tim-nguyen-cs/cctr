import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import Home from './Views/Home';
import Dashboard from './Views/Dashboard';
import AdminDashboard from './Views/AdminDashboard';
import ViewWorkout from './Views/ViewWorkout';

class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-919896.okta.com/'
          clientId='0oa10b72uvHtQ2NrH4x7'
          redirectUri={window.location.origin + '/implicit/callback'} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/dashboard' component={Dashboard} />
          <SecureRoute path='/view-workout' component={ViewWorkout} />
          {/* <SecureRoute path='/admin-dashboard' component={AdminDashboard} /> */}
          <Route path='/admin-dashboard' component={AdminDashboard} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;