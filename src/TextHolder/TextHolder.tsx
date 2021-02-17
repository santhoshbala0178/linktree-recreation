import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { modifyUserDetails } from '../store/action';
import { RootState } from '../store/store';

const StyledTextHolder = styled.div`
  padding: 10px 5px;
  margin: 0px 10px;
`;

const StyledTextEditor = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  color: #282f37;
  border-bottom: grey 1px solid;
  font-family: Karla, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', Oxygen, Cantarell, sans-serif;
  font: 400 13.3333px Arial;

  &: focus {
    outline: none;
  }
`;

const mapStatetoProps = (state: RootState) => ({ ...state.userDetailsReducer });

const mapDispatchtoProps = {
  modifyUserDetailsFunc: modifyUserDetails,
};

type OwnProps = {
  field: string;
  placeholder: string;
  value?: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const TextHolder: React.FC<Props> = ({
  field,
  placeholder,
  value,
  modifyUserDetailsFunc,
}) => {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (field === 'login-username' || field === 'register-username') {
      modifyUserDetailsFunc({
        type: 'MODIFY_USERNAME',
        username: e.target.value,
      });
    } else if (field === 'login-password' || field === 'register-password') {
      modifyUserDetailsFunc({
        type: 'MODIFY_PASSWORD',
        password: e.target.value,
      });
    } else if (field === 'register-repeat-password') {
      modifyUserDetailsFunc({
        type: 'MODIFY_REPEAT_PASSWORD',
        repeatPassword: e.target.value,
      });
    }
  }

  return (
    <StyledTextHolder>
      <StyledTextEditor
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleOnChange(e)}
        type={field.includes('password') ? 'password' : 'text'}
      />
    </StyledTextHolder>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(TextHolder);
