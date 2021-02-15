import React, { useState } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Logo from '../Logo';
import TextHolder from '../TextHolder';
import Loader from '../Loader';
import ErrorMessageHolder from '../ErrorMessageHolder';
import firebase from '../Firebase';
import {
  addNewLink,
  modifyUserDetails,
  setSignedInState,
} from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({
  ...state.userDetailsReducer,
  ...state.newLinkReducer,
});

const mapDispatchtoProps = {
  addNewLinkFunc: addNewLink,
  modifyUserDetailsFunc: modifyUserDetails,
  setSignedInStateFunc: setSignedInState,
};

type OwnProps = {
  username?: string;
  password?: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const LoginUser: React.FC<Props> = ({
  username,
  password,
  addNewLinkFunc,
  modifyUserDetailsFunc,
  setSignedInStateFunc,
}) => {
  const history = useHistory();
  const [loadState, setLoadState] = useState(false);
  const [errorState, setErrorState] = useState(false);

  function handleOnClick() {
    setLoadState(true);
    const dbRef = firebase.database().ref();
    const usersRef = dbRef.child('Users');

    usersRef.once('value', (snapshot) => {
      let userFound = false;
      snapshot.forEach((data) => {
        const dataVal = data.val();
        if (username === dataVal.username && password === dataVal.password) {
          if (dataVal.Links) {
            Object.keys(dataVal?.Links).map((eachKey) => {
              addNewLinkFunc({
                name: dataVal.Links[eachKey].name,
                id: dataVal.Links[eachKey].id,
                url: dataVal.Links[eachKey].url,
                enable: dataVal.Links[eachKey].enable,
              });
            });
          }

          modifyUserDetailsFunc({
            type: 'LOGIN_STATUS',
            login: true,
            id: data.key,
          });

          sessionStorage.setItem('login', 'true');
          sessionStorage.setItem(
            'username',
            username !== undefined ? username : '',
          );
          sessionStorage.setItem('id', data.key);

          setSignedInStateFunc(true);
          history.push('/admin');

          userFound = true;
        }
      });

      if (userFound) {
        setLoadState(false);
      } else {
        setErrorState(true);
        modifyUserDetailsFunc({
          type: 'RESET_DETAILS',
        });
      }
      setLoadState(false);
    });
  }
  return (
    <div className="login-user-page">
      {loadState && <Loader />}
      <div className="login-user-content">
        <Logo />
        <div className="login-header">
          Log in to continue to your Linktree admin
        </div>
        <div className="login-block">
          <TextHolder
            placeholder="Username"
            field="login-username"
            value={username}
          />
          <TextHolder
            placeholder="Password"
            field="login-password"
            value={password}
          />
          {errorState && (
            <ErrorMessageHolder message="Username or Password is incorrect" />
          )}
          <div className="login-button-holder">
            <button
              type="button"
              className="login-button"
              onClick={() => handleOnClick()}
              disabled={!(username && password)}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginUser);
