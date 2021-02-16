import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './style.css';
import LogoIcon from '../LogoIcon';
import AddNewLink from '../AddNewLink';
import LinkDisplay from '../LinkDisplay';
import LinkHolder from '../LinkHolder';
import LinkShare from '../LinkShare';
import SaveChanges from '../SaveChanges';
import firebase from '../Firebase';
import Loader from '../Loader';
import { addNewLink, modifyUserDetails } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({
  ...state.newLinkReducer,
  ...state.userDetailsReducer,
});

const mapDispatchtoProps = {
  addNewLinkFunc: addNewLink,
  modifyUserDetailsFunc: modifyUserDetails,
};

type OwnProps = {
  links?: INewLink[];
  username?: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const MainPage: React.FC<Props> = ({
  links,
  username,
  addNewLinkFunc,
  modifyUserDetailsFunc,
}) => {
  const history = useHistory();
  const [loadState, setLoadState] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem('login');
    const sessionUsername = sessionStorage.getItem('username');
    const id = sessionStorage.getItem('id');

    if (!username && loginStatus === 'true') {
      setLoadState(true);
      modifyUserDetailsFunc({
        type: 'MODIFY_USERNAME',
        username: sessionUsername !== null ? sessionUsername : '',
      });
      modifyUserDetailsFunc({
        type: 'LOGIN_STATUS',
        login: JSON.parse(loginStatus),
        id: id !== null ? id : undefined,
      });

      if (links.length === 0) {
        const dbRef = firebase.database().ref();
        const usersRef = dbRef.child('Users');

        usersRef.once('value', (snapshot) => {
          snapshot.forEach((data) => {
            const dataVal = data.val();
            if (sessionUsername === dataVal.username) {
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
            }
          });
          setLoadState(false);
        });
      } else {
        setLoadState(false);
      }
    } else if (!loginStatus) {
      history.push('/login');
    }
  }, []);

  return (
    <div className="main-page-wrapper">
      {loadState && <Loader />}
      <div className="left-panel">
        <Link to="/">
          <div className="mainpage-logo-holder">
            <LogoIcon />
          </div>
        </Link>
      </div>
      <div className="main-panel">
        <div className="main-panel-header">
          <div style={{ padding: '10px' }}>
            <Link to="/admin" className="main-panel-link">
              Links
            </Link>
          </div>
        </div>
        <div className="main-panel-body">
          <div className="main-body-content">
            <div className="add-new-link-div">
              <AddNewLink />
              <SaveChanges />
            </div>
            {links &&
              links.map((eachLink, i) => (
                <LinkHolder
                  key={`holder${i + 1}`}
                  uniqueId={`holder${i + 1}`}
                  linkData={eachLink}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="right-panel-header">
          <LinkShare username={username} />
        </div>
        <div className="right-panel-body">
          <LinkDisplay from="display" username={username} />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(MainPage);
