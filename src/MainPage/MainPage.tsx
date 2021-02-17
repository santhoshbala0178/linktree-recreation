import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const StyledMainPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledLeftPanel = styled.div`
  width: 3%;
  height: 100%;
  border-right: 1px solid #d7dce1;
  margin-left: 5px;
  box-sizing: border-box;

  @media only screen and (max-width: 770px) {
    width: 5%;
  }
`;

const StyledMainPageLogoHolder = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledMainPanel = styled.div`
  width: 65%;
  height: 100%;

  @media only screen and (max-width: 770px) {
    width: 95%;
  }
`;

const StyledMainPanelHeader = styled.div`
  height: 64px;
  border-bottom: 1px solid #d7dce1;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledMainPanelLink = styled(Link)`
  letter-spacing: 1px;
  font-weight: 400;
  line-height: 1.5;
  font-size: 1rem;
  text-decoration: none;
  color: black;

  &: active {
    color: none;
  }
`;

const StyledMainPanelBody = styled.div`
  height: 100vh;
  background-color: #f5f6f8;
`;

const StyledMainPanelContent = styled.div`
  padding-top: 5%;
`;

const StyledAddNewLink = styled.div`
  width: 50%;
  height: 48px;
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;

  @media only screen and (max-width: 770px) {
    width: 100%;
  }
`;

const StyledRightPanel = styled.div`
  width: 32%;
  height: 100%;
  border-left: 1px solid #d7dce1;
`;

const StyledRightPanelHeader = styled.div`
  height: 64px;
  box-sizing: border-box;
  border-bottom: 1px solid #d7dce1;
`;

const StyledRightPanelBody = styled.div`
  height: 100vh;
  background-color: #f5f6f8;
`;

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
    <StyledMainPageWrapper>
      {loadState && <Loader />}
      <StyledLeftPanel>
        <Link to="/">
          <StyledMainPageLogoHolder>
            <LogoIcon />
          </StyledMainPageLogoHolder>
        </Link>
      </StyledLeftPanel>
      <StyledMainPanel>
        <StyledMainPanelHeader>
          <div style={{ padding: '10px' }}>
            <StyledMainPanelLink to="/admin">Links</StyledMainPanelLink>
          </div>
        </StyledMainPanelHeader>
        <StyledMainPanelBody>
          <StyledMainPanelContent>
            <StyledAddNewLink>
              <AddNewLink />
              <SaveChanges />
            </StyledAddNewLink>
            {links &&
              links.map((eachLink, i) => (
                <LinkHolder
                  key={`holder${i + 1}`}
                  uniqueId={`holder${i + 1}`}
                  linkData={eachLink}
                />
              ))}
          </StyledMainPanelContent>
        </StyledMainPanelBody>
      </StyledMainPanel>
      <StyledRightPanel>
        <StyledRightPanelHeader>
          <LinkShare username={username} />
        </StyledRightPanelHeader>
        <StyledRightPanelBody>
          <LinkDisplay from="display" username={username} />
        </StyledRightPanelBody>
      </StyledRightPanel>
    </StyledMainPageWrapper>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(MainPage);
