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
import { setSignedInState } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.signedInReducer });

const mapDispatchtoProps = {
  setSignedInStateFunc: setSignedInState,
};

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const App: React.FC<Props> = ({ setSignedInStateFunc, signedIn }) => {
  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      setSignedInStateFunc(true);
    } else {
      setSignedInStateFunc(false);
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
            {!signedIn && <LoginUser />}
            {signedIn && <Redirect to="/admin" />}
          </Route>
          <Route exact path="/admin">
            {!signedIn && <Redirect to="/login" />}
            {signedIn && <MainPage />}
          </Route>
          <Route exact path="/register">
            {!signedIn && <RegisterNewUser />}
            {signedIn && <Redirect to="/admin" />}
          </Route>
          <Route exact path="/share/:paramUsername">
            <LinkDisplay from="page" />
          </Route>
        </Switch>
      </ErrorComponent>
    </Router>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
