import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import RegisterButton from '../RegisterButton';
import LoginButton from '../LoginButton';
import UrlEditor from '../UrlEditor';
import {
  resetAllLink,
  modifyUserDetails,
  setSignedInState,
} from '../store/action';
import { RootState } from '../store/store';

const StyledTopWrapper = styled.div`
  position: sticky;
  top: 0px;
`;

const StyledNavHolder = styled.div`
  width: 100%;
  height: 60px;
  padding: 0px 24px;
  background-color: white;
  box-sizing: border-box;
  display: flex;
`;

const StyledNavLeft = styled.div`
  height: 60px;
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 350px) {
    display: none;
  }
`;

const StyledNavRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
`;

const StyledButtonHolder = styled.div`
  margin: 10px;
`;

const StyledButton = styled.button`
  font-family: Karla, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', Oxygen, Cantarell, sans-serif;
  background: rgb(117, 81, 233);
  color: white;
  border: none;
  height: 40px;
  border-radius: 10px;
  padding: 0px 20px;
  font-size: 18px;
  font-weight: 500;

  &: hover {
    cursor: pointer;
  }
`;

const StyledGetStarted = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
  box-sizing: border-box;
`;

const StyledMainHeader = styled.div`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
  text-align-last: center;
`;

const StyledMainHeaderText = styled.div`
  color: rgb(19, 20, 21);
  font-family: Karla, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', Oxygen, Cantarell, sans-serif;
  font-weight: normal;
  font-size: 64px;

  @media only screen and (max-width: 992px) {
    font-size: 48px;
  }

  @media only screen and (max-width: 770px) {
    font-size: 40px;
  }
`;

const StyledMainHeaderSubText = styled.div`
  padding-top: 16px;
  color: rgb(38, 50, 56);
  font-size: 20px;
`;

const StyledLoginWrapper = styled.div`
  display: flex;
  margin-top: 20px;

  @media only screen and (max-width: 770px) {
    display: none;
  }
`;

const mapStatetoProps = (state: RootState) => ({ ...state.userDetailsReducer });

const mapDispatchtoProps = {
  resetAllLink,
  modifyUserDetails,
  setSignedInState,
};

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const Home: React.FC<Props> = (props) => {
  const [signOut, setSignOut] = useState<boolean>(true);

  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      setSignOut(false);
    }
  }, []);

  function handleOnClick() {
    props.resetAllLink();
    props.modifyUserDetails({
      type: 'RESET_DETAILS',
    });

    sessionStorage.setItem('login', 'false');
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('id', '');

    setSignOut(true);
    props.setSignedInState(false);
  }

  return (
    <>
      <StyledTopWrapper>
        <StyledNavHolder>
          <StyledNavLeft>
            <Logo />
          </StyledNavLeft>
          {!signOut && (
            <StyledNavRight>
              <StyledButtonHolder>
                <StyledButton type="button" onClick={() => handleOnClick()}>
                  Sign Out
                </StyledButton>
              </StyledButtonHolder>
              <StyledButtonHolder>
                <Link to="/admin">
                  <StyledButton type="button">Admin</StyledButton>
                </Link>
              </StyledButtonHolder>
            </StyledNavRight>
          )}
        </StyledNavHolder>
      </StyledTopWrapper>
      <StyledGetStarted>
        <StyledMainHeader>
          <StyledMainHeaderText>
            The Only Link You’ll Ever Need
          </StyledMainHeaderText>
          <StyledMainHeaderSubText>
            Connect audiences to all of your content with just one link
          </StyledMainHeaderSubText>
        </StyledMainHeader>
        <RegisterButton />
        <StyledLoginWrapper>
          <span style={{ marginRight: '5px' }}>Already on Linktree?</span>
          <LoginButton />
        </StyledLoginWrapper>
      </StyledGetStarted>
      <UrlEditor />
    </>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
