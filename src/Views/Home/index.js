import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { withOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';
import GridLoader from "react-spinners/GridLoader";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

import NavBar from '../../Components/NavBar'
import { ReactComponent as Graphic } from '../../static/images/disability_graphic.svg';
import { ReactComponent as Doctor } from '../../static/images/doctor.svg';
import { ReactComponent as Yoga } from '../../static/images/yoga.svg';
import { ReactComponent as No } from '../../static/images/no.svg';
import './styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function returnTemplate(props) {
  const history = createBrowserHistory({ forceRefresh: true })
  return (
    <React.Fragment>
      <NavBar />
      <CssBaseline />
      <Toolbar id='back-to-top-anchor' />
      <Container className='container'>
        <Paper className='header' elevation={4}>
          <Grid container justify="space-evenly" alignItems="center">
            <Grid container direction="column" justify="space-evenly" className='header-text'>
              <Typography variant="h4" gutterBottom="true">Meet <span className='title'>Debbie</span>, your affordable, personalized, in-home physical therapist.</Typography>
              <Typography variant="h6" gutterBottom="true">Perfect for remote physical therapy sessions. Personalized to the capabilities of your own body. Seamlessly integrated with your personal healthcare provider. </Typography>
              <Grid container justify="space-around" alignItems="center">
                <Button variant="contained" onClick={props.login} className="header-buttons">I am a patient</Button>
                <Button variant="contained" onClick={() => history.push('/admin-dashboard')} className="header-buttons">I am a physician</Button>
              </Grid>
            </Grid>
            <Graphic className="image" />
          </Grid>
        </Paper>
        <Grid container justify="space-evenly">
          <Paper className='card' elevation={4}>
            <Yoga className='image' />
            <Typography variant="h5" className="title">Personalized Therapy Treatments</Typography>
            <Typography variant="h6">With it's sophisticated AI model, Debbie AI provides you with customizable treatment sessions based on your current disabilities and pre-existing conditions.</Typography>
          </Paper>
          <Paper className='card' elevation={4}>
            <Doctor className='image' />
            <Typography variant="h5" className="title">Healthcare Integration</Typography>
            <Typography variant="h6">With built-in physician integration, doctors remain up-to-date with your recovery progression.</Typography>
          </Paper>
          <Paper className='card' elevation={4}>
            <No className='image' />
            <Typography variant="h5" className="title">Greater Affordability</Typography>
            <Typography variant="h6">With no annual cost, Debbie AI provides a more accessible solution to physical therapy.</Typography>
          </Paper>
        </Grid>
      </Container>

      <ScrollTop {...props}>
        <Fab className='scroll-to-top' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  )
}

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.physicianLogin = this.physicianLogin.bind(this);
  }

  async login() {
    this.props.authService.login('/');
  }

  async physicianLogin() {
    this.props.authService.login('/');
  }

  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    if (this.props.authState.isPending)
      return <div style={style}><GridLoader size={65} color={"#3F9899"}/></div>
    return this.props.authState.isAuthenticated ? <Redirect to='/dashboard' /> : returnTemplate(this)
  }
});