import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { withOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';
import GridLoader from "react-spinners/GridLoader";

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">{row.date}</TableCell>
        <TableCell align="center">{row.sentiment}</TableCell>
        <TableCell align="center">{row.was_injured}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">Exercises</Typography>
              <Table size="small" aria-label="exercises">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Exercise Type</b></TableCell>
                    <TableCell align="center"><b>Repetition</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row" align="center">{historyRow.type}</TableCell>
                      <TableCell align="center">{historyRow.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function returnTemplate(props) {
  const history = createBrowserHistory({ forceRefresh: true })
  return (
    <React.Fragment>
      <NavBar />
      <CssBaseline />
      <Toolbar id='back-to-top-anchor' />
      <Container className='dashboard'>
        <Paper className='header' elevation={4}>
          {props.state.userInfo && (<Typography variant="h4" className='header-text' gutterBottom="true">Welcome back, {props.state.userInfo.given_name}!</Typography>)}
          <Typography variant="subtitle1" className='header-text'>You're one step closer to being on the path of self improvement <span role="img" aria-label="Smiley Face">😊</span></Typography>
        </Paper>
        <Divider />
        <Grid container justify="space-between" alignItems="flex-start">
          <Paper className='next-exercise' elevation={4}>
            <Grid container justify="space-between" alignItems="baseline">
              <Typography variant="h4" className='header-text'>Your Next Exercise:</Typography>
              <Button variant="outlined" size="small" onClick={() => history.push('/view-workout')}  className="header-button">Start Session</Button>
            </ Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="table-header">Exercise Type</TableCell>
                    <TableCell align="center" className="table-header">Duration/Repetition</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.state.exercises.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell scope="row" align="center">{Object.keys(row)[0]}</TableCell>
                      <TableCell align="center">{Object.values(row)[0]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className='previous-exercise' elevation={4}>
            <Typography variant="h4" className='header-text'>Your Previous Exercises:</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center" className="table-header">Date</TableCell>
                    <TableCell align="center" className="table-header">Sentiment</TableCell>
                    <TableCell align="center" className="table-header">Injured?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.state.history.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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


export default withOktaAuth(class Dashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { userInfo: null, exercises: null };
    this.checkUser = checkUser.bind(this);
  }

  async componentDidMount() {
    function createData(name, count) {
      return { [name]: count };
    }

    const rows = [
      createData('Crunches', Math.floor(Math.random() * Math.floor(30))),
      createData('Tricep Dips', Math.floor(Math.random() * Math.floor(30))),
      createData('Squat Jumps', Math.floor(Math.random() * Math.floor(30))),
      createData('Leg Raises', Math.floor(Math.random() * Math.floor(30))),
      createData('Oblique Twists', Math.floor(Math.random() * Math.floor(30))),
    ];

    function createCollapseData(date, sentiment, was_injured) {
      return {
        date,
        sentiment,
        was_injured,
        history: [
          { type: 'Crunches', count: Math.floor(Math.random() * Math.floor(30)) },
          { type: 'Squat Jumps', count: Math.floor(Math.random() * Math.floor(30)) },
          { type: 'Oblique Twists', count: Math.floor(Math.random() * Math.floor(30)) },
        ],
      };
    }

    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const collapsedRows = [
      createCollapseData(randomDate(new Date(2020, 0, 1), new Date()).toUTCString(), 'Good', 'Nope!'),
      createCollapseData(randomDate(new Date(2020, 0, 1), new Date()).toUTCString(), 'Okay', 'Yep.'),
      createCollapseData(randomDate(new Date(2020, 0, 1), new Date()).toUTCString(), 'Terrible', 'Yep.'),
      createCollapseData(randomDate(new Date(2020, 0, 1), new Date()).toUTCString(), 'Great', 'Nope!'),
      createCollapseData(randomDate(new Date(2020, 0, 1), new Date()).toUTCString(), 'Good', 'Nope!'),
    ];

    this._isMounted = true;
    this.checkUser();
    // var url = new URL("http://dummy.restapiexample.com/api/v1/employee/1")
    // fetch(url).then((response) => response.json()).then((data) => this.setState({ exercises: data }));
    this.setState({exercises: rows, history: collapsedRows})
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
      return Object.keys(this.state.exercises).length ? returnTemplate(this) : <Redirect to='/onboarding' />
    else
      return <div style={style}><GridLoader size={65} color={"#3F9899"} /></div>
  }
});