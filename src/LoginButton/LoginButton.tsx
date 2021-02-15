import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';
import { modifyUserDetails } from '../store/action';

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
    <Link to="/login" className="login-link">
      <div
        className="login-div"
        role="button"
        onClick={() => handleOnClick()}
        onKeyDown={() => handleOnClick()}
        tabIndex={0}
      >
        Log In
      </div>
    </Link>
  );
}

export default connect(null, mapDispatchtoProps)(LoginButton);
