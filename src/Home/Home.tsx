import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import Logo from '../Logo';
import RegisterButton from '../RegisterButton';
import LoginButton from '../LoginButton';
import UrlEditor from '../UrlEditor';
import { modifyUserDetails, setSignedInState } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.userDetailsReducer });

const mapDispatchtoProps = {
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
    props.modifyUserDetails({
      type: 'MODIFY_USERNAME',
      username: '',
    });
    props.modifyUserDetails({
      type: 'MODIFY_PASSWORD',
      password: '',
    });
    props.modifyUserDetails({
      type: 'LOGIN_STATUS',
      login: false,
      id: '',
    });
    sessionStorage.setItem('login', 'false');
    sessionStorage.setItem('username', '');
    sessionStorage.setItem('id', '');

    setSignOut(true);
    props.setSignedInState(false);
  }

  return (
    <>
      <div className="top-wrapper">
        <div className="navbar-holder">
          <div className="navbar-left">
            <Logo />
          </div>
          {!signOut && (
            <div className="navbar-right">
              <div className="navbar-right-button-holder">
                <button
                  type="button"
                  className="navbar-right-button"
                  onClick={() => handleOnClick()}
                >
                  Sign Out
                </button>
              </div>
              <div className="navbar-right-button-holder">
                <Link to="/admin">
                  <button type="button" className="navbar-right-button">
                    Admin
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="main-page-get-started">
        <div className="main-header">
          <div className="main-header-text">The Only Link You’ll Ever Need</div>
          <div className="main-header-sub-text">
            Connect audiences to all of your content with just one link
          </div>
        </div>
        <RegisterButton />
        <div className="main-login-wrapper">
          <span style={{ marginRight: '5px' }}>Already on Linktree?</span>
          <LoginButton />
        </div>
      </div>
      <UrlEditor />
    </>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
