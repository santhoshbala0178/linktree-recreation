import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { modifyUserDetails } from '../store/action';
import { RootState } from '../store/store';

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
    <div className="text-holder">
      <input
        placeholder={placeholder}
        value={value}
        className="text-editor"
        onChange={(e) => handleOnChange(e)}
        type={field.includes('password') ? 'password' : 'text'}
      />
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(TextHolder);
