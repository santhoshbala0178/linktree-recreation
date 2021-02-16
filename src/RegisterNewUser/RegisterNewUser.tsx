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
  modifyUserDetails,
  resetAllLink,
  setSignedInState,
} from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({
  ...state.userDetailsReducer,
  ...state.newLinkReducer,
});

const mapDispatchtoProps = {
  modifyUserDetailsFunc: modifyUserDetails,
  resetAllLinkFunc: resetAllLink,
  setSignedInStateFunc: setSignedInState,
};

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const RegisterNewUser: React.FC<Props> = ({
  username,
  password,
  repeatPassword,
  modifyUserDetailsFunc,
  resetAllLinkFunc,
  setSignedInStateFunc,
}) => {
  const history = useHistory();
  const [loadState, setLoadState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleOnClick() {
    setLoadState(true);

    if (password !== repeatPassword) {
      modifyUserDetailsFunc({
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
          if (username === dataVal.username) {
            userNameExists = true;
          }
        });

        if (userNameExists) {
          modifyUserDetailsFunc({
            type: 'RESET_DETAILS',
          });
          setErrorState(true);
          setErrorMessage('Username is already taken!');
          setLoadState(false);
        } else {
          const id = usersRef.push({
            username,
            password,
            Links: [],
          }).key;
          resetAllLinkFunc();
          modifyUserDetailsFunc({
            type: 'LOGIN_STATUS',
            login: true,
            id: id !== null ? id : '',
          });
          sessionStorage.setItem('login', 'true');
          sessionStorage.setItem(
            'username',
            username !== undefined ? username : '',
          );
          sessionStorage.setItem('id', id !== null ? id : '');

          setLoadState(false);
          setSignedInStateFunc(true);
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
            value={username}
          />
          <TextHolder
            placeholder="Password"
            field="register-password"
            value={password}
          />
          <TextHolder
            placeholder="Repeat password"
            field="register-repeat-password"
            value={repeatPassword}
          />
          {errorState && <ErrorMessageHolder message={errorMessage} />}
          <div className="register-button-holder">
            <button
              type="button"
              className="register-button"
              onClick={() => handleOnClick()}
              disabled={!(username && password && repeatPassword)}
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
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RegisterNewUser);
