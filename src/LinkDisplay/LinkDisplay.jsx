import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import './style.css';
import LinkDisplayId from '../LinkDisplayId';
import LinkDisplaySite from '../LinkDisplaySite';
import firebase from '../Firebase';
import Loader from '../Loader';

function LinkDisplay(props) {
  const { username } = useParams();
  const [localLinks, changeLocalLinks] = useState([]);
  const [loadState, setLoadState] = useState(false);

  useEffect(() => {
    if (props.from === 'page') {
      setLoadState(true);
      const dbRef = firebase.database().ref();
      const usersRef = dbRef.child('Users');

      usersRef.once('value', (snapshot) => {
        const links = [];
        snapshot.forEach((data) => {
          const dataVal = data.val();
          if (username === dataVal.username) {
            if (dataVal.Links) {
              Object.keys(dataVal?.Links).map((eachKey) => {
                links.push({
                  name: dataVal.Links[eachKey].name,
                  id: dataVal.Links[eachKey].id,
                  url: dataVal.Links[eachKey].url,
                  enable: dataVal.Links[eachKey].enable,
                });
              });
            }
            changeLocalLinks([...links]);
          }
        });
        setLoadState(false);
      });
    }
  }, []);

  return (
    <div
      className={
        props.from === 'page' ? 'link-display-page' : 'link-display-panel'
      }
    >
      {loadState && props.from === 'page' && <Loader />}
      <div className={props.from === 'page' ? 'link-display-page-content' : ''}>
        <div className="link-display-id-holder">
          <LinkDisplayId
            username={props.from === 'page' ? username : props.username}
          />
        </div>
        <div>
          {props.from === 'display' &&
            props.links &&
            props.links.map((eachLink) => {
              if (eachLink.enable && eachLink.name && eachLink.url) {
                return <LinkDisplaySite linkData={eachLink} />;
              }
            })}
          {props.from === 'page' &&
            localLinks &&
            localLinks.map((eachLink) => {
              if (eachLink.enable && eachLink.name && eachLink.url) {
                return <LinkDisplaySite linkData={eachLink} />;
              }
            })}
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({ ...state.newLinkReducer });

export default connect(mapStatetoProps)(LinkDisplay);
