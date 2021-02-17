import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import LinkDisplayId from '../LinkDisplayId';
import LinkDisplaySite from '../LinkDisplaySite';
import firebase from '../Firebase';
import Loader from '../Loader';
import { RootState } from '../store/store';

const StyledLinkDisplay = styled.div<{ from: string }>`
  ${(props) =>
    props.from === 'page' &&
    css`
      height: 100%;
      width: 100%;
      margin: auto auto;
      background-color: #76f3fa;
      background: linear-gradient(0deg, #76f3fa, #3a4eff);
    `}
  ${(props) =>
    props.from !== 'page' &&
    css`
      height: 80%;
      width: 70%;
      margin: auto auto;
      border: 20px solid black;
      border-radius: 50px;
      background-color: #76f3fa;
      background: linear-gradient(0deg, #76f3fa, #3a4eff);
      transform: scale(0.695671) translate3d(0px, 0px, 0px);
    `}
`;

const StyledLinkDisplayHolder = styled.div`
  display: flex;
`;

const StyledPageContent = styled.div<{ from: string }>`
  ${(props) =>
    props.from === 'page' &&
    css`
      width: 50%;
      margin: auto;
    `}
`;

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

      usersRef.once('value', (snapshot) => {
        const dbLinks: INewLink[] = [];
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
    <StyledLinkDisplay from={from}>
      {loadState && from === 'page' && <Loader />}
      <StyledPageContent from={from}>
        <StyledLinkDisplayHolder>
          <LinkDisplayId
            username={from === 'page' ? paramUsername : username}
          />
        </StyledLinkDisplayHolder>
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
      </StyledPageContent>
    </StyledLinkDisplay>
  );
};

export default connect(mapStatetoProps)(LinkDisplay);
