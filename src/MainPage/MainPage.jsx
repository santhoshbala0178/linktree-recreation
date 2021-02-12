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
import { addNewLink, modifyUserDetails } from '../action';

function MainPage(props) {
  const history = useHistory();
  const [loadState, setLoadState] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem('login');
    const username = sessionStorage.getItem('username');
    const id = sessionStorage.getItem('id');

    if (!props.username && loginStatus == 'true') {
      setLoadState(true);
      props.modifyUserDetails({
        type: 'MODIFY_USERNAME',
        username,
      });
      props.modifyUserDetails({
        type: 'LOGIN_STATUS',
        login: JSON.parse(loginStatus),
        id,
      });

      const dbRef = firebase.database().ref();
      const usersRef = dbRef.child('Users');

      usersRef.once('value', (snapshot) => {
        snapshot.forEach((data) => {
          const dataVal = data.val();
          if (username === dataVal.username) {
            if (dataVal.Links) {
              Object.keys(dataVal?.Links).map((eachKey) => {
                props.addNewLink({
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
            {props.links &&
              props.links.map((eachLink) => <LinkHolder linkData={eachLink} />)}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="right-panel-header">
          <LinkShare username={props.username} />
        </div>
        <div className="right-panel-body">
          <LinkDisplay from="display" username={props.username} />
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  ...state.newLinkReducer,
  ...state.userDetailsReducer,
  ...state.signedInReducer,
});

const mapDispatchtoProps = {
  addNewLink,
  modifyUserDetails,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(MainPage);
