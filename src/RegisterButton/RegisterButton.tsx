import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { Link } from 'react-router-dom';
import { modifyUserDetails } from '../store/action';

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
      <Link to="/register" className="nav-link">
        <button
          type="button"
          className="register-div-button"
          onClick={() => handleOnClick()}
        >
          GET STARTED FOR FREE
        </button>
      </Link>
    </div>
  );
};

export default connect(null, mapDispatchtoProps)(RegisterButton);
