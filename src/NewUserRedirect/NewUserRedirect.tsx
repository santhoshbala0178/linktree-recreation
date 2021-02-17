import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { modifyUserDetails } from '../store/action';

const StyledNewUserRedirect = styled.div<{ url: string }>`
  width: 50px;
  height: 50px;
  margin-left: auto;
  margin-right: 5px;
  visibility: ${(props) => (props.url ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.url ? 1 : 0)};
  transition: ${(props) =>
    (props.url
      ? 'visibility 0s linear 0ms, opacity 300ms;'
      : 'visibility 0s linear 300ms, opacity 300ms;')};
`;

const StyledNewUserButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: none;
  background-color: rgb(117, 81, 233);

  &: hover {
    cursor: pointer;
  }
`;

const mapDispatchtoProps = {
  modifyUserDetailsFunc: modifyUserDetails,
};

type OwnProps = {
  url?: string;
};

type Props = typeof mapDispatchtoProps & OwnProps;

const NewUserRedirect: React.FC<Props> = ({ url, modifyUserDetailsFunc }) => {
  function handleOnClick() {
    if (url) {
      modifyUserDetailsFunc({
        type: 'MODIFY_USERNAME',
        username: url,
      });
    }
  }

  return (
    <StyledNewUserRedirect url={url || ''}>
      <NavLink to="/register">
        <StyledNewUserButton type="button" onClick={() => handleOnClick()}>
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
            <path
              style={{ fill: 'white' }}
              d="M23.987,12a2.411,2.411,0,0,0-.814-1.8L11.994.361a1.44,1.44,0,0,0-1.9,2.162l8.637,7.6a.25.25,0,0,1-.165.437H1.452a1.44,1.44,0,0,0,0,2.88H18.563a.251.251,0,0,1,.165.438l-8.637,7.6a1.44,1.44,0,1,0,1.9,2.161L23.172,13.8A2.409,2.409,0,0,0,23.987,12Z"
            />
          </svg>
        </StyledNewUserButton>
      </NavLink>
    </StyledNewUserRedirect>
  );
};

export default connect(null, mapDispatchtoProps)(NewUserRedirect);
