import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { modifyUserDetails } from '../store/action';

const StyledLoginDiv = styled.div`
 & :hover{
  cursor: pointer;
`;

const StyledLoginLink = styled(Link)`
  color: black;
`;

const mapDispatchtoProps = {
  modifyUserDetailsFunc: modifyUserDetails,
};

type Props = typeof mapDispatchtoProps;

const LoginButton: React.FC<Props> = ({ modifyUserDetailsFunc }) => {
  function handleOnClick() {
    modifyUserDetailsFunc({
      type: 'RESET_DETAILS',
    });
  }

  return (
    <StyledLoginLink to="/login" >
      <StyledLoginDiv
        role="button"
        onClick={() => handleOnClick()}
        onKeyDown={() => handleOnClick()}
        tabIndex={0}
      >
        Log In
      </StyledLoginDiv>
    </StyledLoginLink>
  );
}

export default connect(null, mapDispatchtoProps)(LoginButton);
