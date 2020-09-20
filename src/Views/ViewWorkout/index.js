import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { withOktaAuth } from '@okta/okta-react';

import PropTypes from 'prop-types';
import GridLoader from "react-spinners/GridLoader";
import Carousel from 'react-material-ui-carousel'


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
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

function Item(props) {
  return (
    <Paper>
      <Typography variant="h4" gutterBottom><b>{props.item.name}</b></Typography>
      <Typography variant="subtitle1" gutterBottom>{props.item.description}</Typography>
      <Grid container justify="center">
        <img src={props.item.image} alt="workout" className="image"/>
      </Grid>
    </Paper>
  )
}

function returnTemplate(props) {
  const history = createBrowserHistory({ forceRefresh: true })
  return (
    <React.Fragment>
      <NavBar />
      <CssBaseline />
      <Toolbar id='back-to-top-anchor' />
      <Container className='workout-view'>
        <Paper className='header' elevation={4}>
          <Grid container justify="space-between">
            <Typography variant="h6" gutterBottom><u>Here's your workout! Keep it up!</u></Typography>
            <Button className='finish' variant='outlined' onClick={() => history.push('/dashboard')}>Finish Session</Button>
          </Grid>
          <Carousel autoPlay="false" animation="slide" interval="10000">{props.state.exercises.map((item, i) => <Item key={i} item={item} />)}</Carousel>
          <Grid container justify="flex-end">
            <Button className="SOS" variant='contained' color="secondary" onClick={props.sendSMS}>I'm in Trouble!</Button>
          </Grid>
        </Paper>
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
    this.state = { userInfo: null, exercises: null, open: false };
    this.checkUser = checkUser.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    this.checkUser();

    var items = [
      {
        name: "Sit-Ups (30x)",
        description: "Situps are classic abdominal exercises done by lying on your back and lifting your torso. They use your body weight to strengthen and tone the core-stabilizing abdominal muscles. Situps work the rectus abdominis, transverse abdominis, and obliques in addition to your hip flexors, chest, and neck.",
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60'
      },
      {
        name: "Push-Ups (20x)",
        description: "The pushup may just be the perfect exercise that builds both upper-body and core strength. Done properly, it is a compound exercise that uses muscles in the chest, shoulders, triceps, back, abs, and even the legs.",
        image: 'https://www.verywellfit.com/thmb/WEMOE5Z79lFIOOwPfgHljmF1aao=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Verywell-42-3498282-Pushup01-1596-5994a0f8519de20010b3bdd3.gif'
      },
      {
        name: "Squats (10x)",
        description: "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent of a squat, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.",
        image: 'https://gethealthyu.com/wp-content/uploads/2014/09/Basic-Squat_Exercise.jpg'
      },
      {
        name: "Russian Twist (20x)",
        description: "The Russian twist is a type of exercise that is used to work the abdominal muscles by performing a twisting motion on the abdomen",
        image: 'https://qph.fs.quoracdn.net/main-qimg-b89e15171646c72b5a06121fb54b9fbc'
      },
    ]
    // var url = new URL("http://dummy.restapiexample.com/api/v1/employee/1")
    // fetch(url).then((response) => response.json()).then((data) => this.setState({ exercises: data }));
    this.setState({ exercises: items })
  }

  async componentDidUpdate() {
    this._isMounted = true;
    this.checkUser();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendSMS() {
    console.log('Sending SMS!')
  }


  render() {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    if (this.state.exercises)
      return returnTemplate(this)
    else
      return <div style={style}><GridLoader size={65} color={"#3F9899"} /></div>
  }
});