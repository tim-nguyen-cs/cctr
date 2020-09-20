import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './styles.scss'


export default withOktaAuth(class Dashboard extends Component {
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
    return (
      <AppBar className='nav-bar'>
        <Toolbar>
          <Grid
            container
            alignItems='center'
          >
            <a href="/"><Avatar alt='Wheelchair Heart' src={require('../../static/images/wheelchair_heart.png')} /></a>
            <Typography className='title' variant='h2'>Debbie</Typography>
            {this.props.authState.isAuthenticated ? <Button className='button' variant='outlined' size='small' onClick={this.logout}>Logout</Button>
              : <Button className='button' variant='outlined' onClick={this.login}>Login</Button>
}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
});