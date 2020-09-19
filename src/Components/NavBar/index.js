import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default withOktaAuth(class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    console.log('logging in!')
    this.props.authService.login('/');
  }

  async logout() {
    this.props.authService.logout('/');
  }

  render() {
    console.log(this.state)
    return (
      <AppBar>
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
          >
            <Avatar alt='Wheelchair Heart' src={require('../../static/images/wheelchair_heart.png')} className={useStyles.large} />
            <Typography variant="h4">DEBBIE</Typography>
            {this.props.authState.isAuthenticated ? <Button variant="contained" size='small' onClick={this.logout}><Typography variant="h4">Logout</Typography></Button>
 : <Button variant="contained" size='small' onClick={this.login}><Typography variant="h4">Login</Typography></Button>
}
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
});