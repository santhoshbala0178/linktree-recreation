import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import firebase from '../Firebase';
import { saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const StyledSaveChanges = styled.button`
  height: 48px;
  border-radius: 10px;
  border: none;
  color: rgb(255, 255, 255);
  background: rgb(117, 81, 233);
  font-family: Karla, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', Oxygen, Cantarell, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  padding: 12px 24px;
  box-sizing: border-box;
  width: 100%;

  &: hover {
    cursor: pointer;
    background: rgb(85, 81, 233);
  }

  &: focus {
    outline: none;
  }

  &: disabled {
    background-color: gray;
    cursor: initial;
  }
`;

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
      <StyledSaveChanges
        type="button"
        onClick={() => handleOnClick()}
        disabled={!saveState}
      >
        Save Changes
      </StyledSaveChanges>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SaveChanges);
