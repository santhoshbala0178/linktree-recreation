import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './style.css';
import { modifyUserDetails } from '../action';

function NewUserRedirect(props) {
  function handleOnClick() {
    if (props.url) {
      props.modifyUserDetails({
        type: 'MODIFY_USERNAME',
        username: props.url,
      });
    }
  }

  return (
    <div
      className={`new-user-redirect-div ${
        props.url ? 'button-fadeIn' : 'button-fadeOut'
      }`}
    >
      <NavLink to="/register">
        <button
          type="button"
          className="new-user-redirect-button"
          onClick={(e) => handleOnClick(e)}
        >
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
            <path
              style={{ fill: 'white' }}
              d="M23.987,12a2.411,2.411,0,0,0-.814-1.8L11.994.361a1.44,1.44,0,0,0-1.9,2.162l8.637,7.6a.25.25,0,0,1-.165.437H1.452a1.44,1.44,0,0,0,0,2.88H18.563a.251.251,0,0,1,.165.438l-8.637,7.6a1.44,1.44,0,1,0,1.9,2.161L23.172,13.8A2.409,2.409,0,0,0,23.987,12Z"
            />
          </svg>
        </button>
      </NavLink>
    </div>
  );
}

const mapStatetoProps = (state) => ({ ...state.newUrlReducer });

const mapDispatchtoProps = {
  modifyUserDetails,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(NewUserRedirect);
