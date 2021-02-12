import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import './style.css';
import Logo from '../Logo';
import TextHolder from '../TextHolder';
import LoginButton from '../LoginButton';
import ErrorMessageHolder from '../ErrorMessageHolder';
import firebase from '../Firebase';
import Loader from '../Loader';
import {
  addNewLink,
  modifyUserDetails,
  resetAllLink,
  setSignedInState,
} from '../action';

function RegisterNewUser(props) {
  const history = useHistory();
  const [loadState, setLoadState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleOnClick(e) {
    setLoadState(true);

    if (props.password !== props.repeatPassword) {
      props.modifyUserDetails({
        type: 'RESET_DETAILS',
      });
      setErrorState(true);
      setErrorMessage('Password and Repeat Password does not match!');
      setLoadState(false);
    } else {
      const dbRef = firebase.database().ref();
      const usersRef = dbRef.child('Users');

      usersRef.once('value', (snapshot) => {
        let userNameExists = false;
        snapshot.forEach((data) => {
          const dataVal = data.val();
          if (props.username === dataVal.username) {
            userNameExists = true;
          }
        });

        if (userNameExists) {
          props.modifyUserDetails({
            type: 'RESET_DETAILS',
          });
          setErrorState(true);
          setErrorMessage('Username is already taken!');
          setLoadState(false);
        } else {
          const id = new Date().valueOf();
          usersRef.push({
            username: props.username,
            password: props.password,
            Links: [],
          });
          props.resetAllLink();
          props.setSignedInState(true);
          history.push('/admin');
          props.modifyUserDetails({
            type: 'LOGIN_STATUS',
            login: true,
            id,
          });
          sessionStorage.setItem('login', true);
          sessionStorage.setItem('username', props.username);
          sessionStorage.setItem('id', id);

          setLoadState(false);
        }
      });
    }
  }

  return (
    <div className="register-user-page">
      {loadState && <Loader />}
      <div className="regiser-user-content">
        <Logo />
        <div className="sign-up-header">Sign up for your Linktree account</div>
        <div className="register-block">
          <TextHolder
            placeholder="Username"
            field="register-username"
            value={props.username}
          />
          <TextHolder
            placeholder="Password"
            field="register-password"
            value={props.password}
          />
          <TextHolder
            placeholder="Repeat password"
            field="register-repeat-password"
            value={props.repeatPassword}
          />
          {errorState && <ErrorMessageHolder message={errorMessage} />}
          <div className="register-button-holder">
            <button
              type="button"
              className="register-button"
              onClick={(e) => handleOnClick(e)}
              disabled={
                !(props.username && props.password && props.repeatPassword)
              }
            >
              Register
            </button>
          </div>
          <div className="login-holder">
            <div className="register-login-wrapper">
              <span style={{ marginRight: '5px' }}>Already on Linktree?</span>
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  ...state.userDetailsReducer,
  ...state.newLinkReducer,
});

const mapDispatchtoProps = {
  addNewLink,
  modifyUserDetails,
  resetAllLink,
  setSignedInState,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RegisterNewUser);
