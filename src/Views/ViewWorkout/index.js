import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import { withOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';
import GridLoader from "react-spinners/GridLoader";


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

import NavBar from '../../Components/NavBar'
import './styles.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

async function checkUser() {
  if (this.props.authState.isAuthenticated && !this.state.userInfo) {
    const userInfo = await this.props.authService.getUser();
    if (this._isMounted) {
      this.setState({ userInfo });
    }
  }
}

function createData(name, count) {
  return { name, count };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

function returnTemplate(props) {
  return (
    <React.Fragment>
      <NavBar />
      <CssBaseline />
      <Toolbar id='back-to-top-anchor' />
      <Container className='dashboard'>
        Workout!
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


export default withOktaAuth(class ViewWorkout extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { userInfo: null, exercises: null };
    this.checkUser = checkUser.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    this.checkUser();
    // var url = new URL("http://dummy.restapiexample.com/api/v1/employee/1")
    // fetch(url).then((response) => response.json()).then((data) => this.setState({ exercises: data }));
    this.setState({ exercises: { key: 1 } })
  }

  async componentDidUpdate() {
    this._isMounted = true;
    this.checkUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    if (this.state.exercises)
      return returnTemplate(this)
    else
      return <div style={style}><GridLoader size={65} color={"#3F9899"} /></div>
  }
});