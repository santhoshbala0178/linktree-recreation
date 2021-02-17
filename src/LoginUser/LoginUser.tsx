import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

const StyledLoginUserPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f6f8;
`;

const StyledLoginUserContent = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  padding: 50px;
`;

const StyledLoginHeader = styled.div`
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const StyledLoginBlock = styled.div`
  background-color: white;
  margin: 20px 0px;
  width: 50%;
  height: 50%;
  padding: 20px 0px;
  min-width: 450px;

  @media only screen and (max-width: 450px) {
    min-width: 100%;
  }
`;

const StyledButtonHolder = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0px;
  justify-content: space-around;
`;

const StyledLoginButton = styled.button`
  background: rgb(117, 81, 233);
  color: white;
  height: 30px;
  width: 80%;
  border-radius: 5px;
  border: none;
  font-weight: bold;

  &: hover {
    cursor: pointer;
  }

  &: disabled {
    background-color: gray;
  }
`;

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
            id: data.key !== null ? data.key : '',
          });

          sessionStorage.setItem('login', 'true');
          sessionStorage.setItem(
            'username',
            username !== undefined ? username : ''
          );
          sessionStorage.setItem('id', data.key !== null ? data.key : '');
          userFound = true;
        }
      });

      if (userFound) {
        setLoadState(false);
        setSignedInStateFunc(true);
      } else {
        setErrorState(true);
        modifyUserDetailsFunc({
          type: 'RESET_DETAILS',
        });
        setLoadState(false);
      }
    });
  }
  return (
    <StyledLoginUserPage>
      {loadState && <Loader />}
      <StyledLoginUserContent>
        <Logo />
        <StyledLoginHeader>
          Log in to continue to your Linktree admin
        </StyledLoginHeader>
        <StyledLoginBlock>
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
          <StyledButtonHolder>
            <StyledLoginButton
              type="button"
              onClick={() => handleOnClick()}
              disabled={!(username && password)}
            >
              Log In
            </StyledLoginButton>
          </StyledButtonHolder>
        </StyledLoginBlock>
      </StyledLoginUserContent>
    </StyledLoginUserPage>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginUser);
