import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { modifyUserDetails } from '../store/action';

const StyledLink = styled(Link)`
  &: focus {
    outline: none;
  }
`;

const StyledRegisterButton = styled.button`
  height: 64px;
  padding: 0px 32px;
  border-radius: 10px;
  border: none;
  color: rgb(255, 255, 255);
  background: rgb(117, 81, 233);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const mapDispatchtoProps = {
  modifyUserDetailsFunc: modifyUserDetails,
};

type Props = typeof mapDispatchtoProps;

const RegisterButton: React.FC<Props> = ({ modifyUserDetailsFunc }) => {
  function handleOnClick() {
    modifyUserDetailsFunc({
      type: 'RESET_DETAILS',
    });
  }

  return (
    <div>
      <StyledLink to="/register">
        <StyledRegisterButton type="button" onClick={() => handleOnClick()}>
          GET STARTED FOR FREE
        </StyledRegisterButton>
      </StyledLink>
    </div>
  );
};

export default connect(null, mapDispatchtoProps)(RegisterButton);
