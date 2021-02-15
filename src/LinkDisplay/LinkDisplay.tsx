import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import './style.css';
import LinkDisplayId from '../LinkDisplayId';
import LinkDisplaySite from '../LinkDisplaySite';
import firebase from '../Firebase';
import Loader from '../Loader';
import { RootState } from '../store/store';

type OwnProps = {
  from: string;
  username?: string;
};

type Params = {
  paramUsername: string;
};

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });
type Props = ReturnType<typeof mapStatetoProps> & OwnProps;

const LinkDisplay: React.FC<Props> = ({ from, username, links }) => {
  const { paramUsername } = useParams<Params>();
  const [localLinks, changeLocalLinks] = useState<INewLink[]>();
  const [loadState, setLoadState] = useState<boolean>(false);

  useEffect(() => {
    if (from === 'page') {
      setLoadState(true);
      const dbRef = firebase.database().ref();
      const usersRef = dbRef.child('Users');

      usersRef.once('value', (snapshot: IAllDBLinks) => {
        const dbLinks = [] as IAllLinks;
        snapshot.forEach((data) => {
          const dataVal = data.val();
          if (paramUsername === dataVal.username) {
            if (dataVal.Links) {
              Object.keys(dataVal?.Links).map((eachKey) => {
                dbLinks.push({
                  name: dataVal.Links[eachKey].name,
                  id: dataVal.Links[eachKey].id,
                  url: dataVal.Links[eachKey].url,
                  enable: dataVal.Links[eachKey].enable,
                });
              });
            }
            changeLocalLinks([...dbLinks]);
          }
        });
        setLoadState(false);
      });
    }
  }, []);

  return (
    <div
      className={from === 'page' ? 'link-display-page' : 'link-display-panel'}
    >
      {loadState && from === 'page' && <Loader />}
      <div className={from === 'page' ? 'link-display-page-content' : ''}>
        <div className="link-display-id-holder">
          <LinkDisplayId
            username={from === 'page' ? paramUsername : username}
          />
        </div>
        <div>
          {from === 'display' &&
            links &&
            links.map((eachLink, i) => {
              if (eachLink.enable && eachLink.name && eachLink.url) {
                return (
                  <LinkDisplaySite
                    key={`linkdisplay${i + 1}`}
                    linkData={eachLink}
                  />
                );
              }
            })}
          {from === 'page' &&
            localLinks &&
            localLinks.map((eachLink, i) => {
              if (eachLink.enable && eachLink.name && eachLink.url) {
                return (
                  <LinkDisplaySite
                    key={`linkpage${i + 1}`}
                    linkData={eachLink}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStatetoProps)(LinkDisplay);
