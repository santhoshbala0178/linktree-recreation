import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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

const StyledRegisterUserPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f6f8;
`;

const StyledRegisterUserContent = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  align-items: center;
  padding: 50px;
`;

const StyledSignUpHeader = styled.div`
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const StyledRegisterBlock = styled.div`
  background-color: white;
  margin: 20px 0px;
  width: 50%;
  height: 50%;
  padding: 20px 0px;
  min-width: 350px;

  @media only screen and (max-width: 350px) {
    min-width: 100%;
  }
`;

const StyledRegisterButtonHolder = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0px;
  justify-content: space-around;
`;

const StyledRegisterButton = styled.button`
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

const StyledLoginWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;

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
            username !== undefined ? username : ''
          );
          sessionStorage.setItem('id', id !== null ? id : '');

          setLoadState(false);
          setSignedInStateFunc(true);
        }
      });
    }
  }

  return (
    <StyledRegisterUserPage>
      {loadState && <Loader />}
      <StyledRegisterUserContent>
        <Logo />
        <StyledSignUpHeader>
          Sign up for your Linktree account
        </StyledSignUpHeader>
        <StyledRegisterBlock>
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
          <StyledRegisterButtonHolder>
            <StyledRegisterButton
              type="button"
              onClick={() => handleOnClick()}
              disabled={!(username && password && repeatPassword)}
            >
              Register
            </StyledRegisterButton>
          </StyledRegisterButtonHolder>
          <div>
            <StyledLoginWrapper>
              <span style={{ marginRight: '5px' }}>Already on Linktree?</span>
              <LoginButton />
            </StyledLoginWrapper>
          </div>
        </StyledRegisterBlock>
      </StyledRegisterUserContent>
    </StyledRegisterUserPage>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(RegisterNewUser);
