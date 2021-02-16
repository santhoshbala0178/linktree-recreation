import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import firebase from '../Firebase';
import { saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({
  ...state.newLinkReducer,
  ...state.userDetailsReducer,
  ...state.saveChangeReducer,
});

const mapDispatchtoProps = {
  saveUserChangesFunc: saveUserChanges,
};

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const SaveChanges: React.FC<Props> = ({
  saveState,
  id,
  links,
  saveUserChangesFunc,
}) => {
  function handleOnClick() {
    const dbRef = firebase.database().ref();

    if (id) {
      const userDataRef = dbRef.child('Users').child(id);

      userDataRef.update({ Links: links });

      saveUserChangesFunc({
        type: 'SAVE_CHANGE_STATE',
        saveState: false,
      });
    }
  }

  return (
    <div>
      <button
        type="button"
        className="save-changes-button"
        onClick={() => handleOnClick()}
        disabled={!saveState}
      >
        Save Changes
      </button>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SaveChanges);
