import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ErrorComponent from '../ErrorComponent';
import './style.css';
import Home from '../Home';
import MainPage from '../MainPage';
import LinkDisplay from '../LinkDisplay';
import RegisterNewUser from '../RegisterNewUser';
import LoginUser from '../LoginUser';
import { setSignedInState } from '../action';

function App(props) {
  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      props.setSignedInState(true);
    } else {
      props.setSignedInState(false);
    }
  }, []);

  return (
    <Router>
      <ErrorComponent>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            {!props.signedIn  && <LoginUser />}
            {props.signedIn && <Redirect to="/admin" />}
          </Route>
          <Route exact path="/admin">
            {!props.signedIn && <Redirect to="/login" />}
            {props.signedIn && <MainPage />}
          </Route>
          <Route exact path="/register">
            {!props.signedIn && <RegisterNewUser />}
            {props.signedIn && <Redirect to="/admin" />}
          </Route>
          <Route exact path="/share/:username">
            <LinkDisplay from="page" />
          </Route>
        </Switch>
      </ErrorComponent>
    </Router>
  );
}

const mapStatetoProps = (state) => ({ ...state.signedInReducer });

const mapDispatchtoProps = {
  setSignedInState
};

export default connect(mapStatetoProps,mapDispatchtoProps)(App);
