import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import firebase from '../Firebase';
import { saveUserChanges } from '../action';

function SaveChanges(props) {
  function handleOnClick() {
    const dbRef = firebase.database().ref();
    const userDataRef = dbRef.child('Users').child(props.id);

    userDataRef.update({ Links: props.links });

    props.saveUserChanges({
      type: 'SAVE_CHANGE_STATE',
      saveState: false,
    });
  }

  return (
    <div>
      <button
        type="button"
        className="save-changes-button"
        onClick={(e) => handleOnClick(e)}
        disabled={!props.saveState}
      >
        Save Changes
      </button>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  ...state.newLinkReducer,
  ...state.userDetailsReducer,
  ...state.saveChangeReducer,
});

const mapDispatchtoProps = {
  saveUserChanges,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SaveChanges);
