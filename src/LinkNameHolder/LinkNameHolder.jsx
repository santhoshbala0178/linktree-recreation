import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { editLinkName, saveUserChanges } from '../action';

function LinkNameHolder(props) {
  function handleOnChange(e) {
    props.editLinkName({
      id: props.id,
      name: e.target.value,
    });

    props.saveUserChanges({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }

  return (
    <div className="link-name-holder">
      <input
        className="link-name-editor"
        placeholder="Enter title"
        onChange={(e) => handleOnChange(e)}
        value={props.name}
      />
      <i>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="link-name-edit-icon"
        >
          <path d="M2.5,6.67188,8.46477.70711a1,1,0,0,1,1.41421,0L11.29289,2.121a1,1,0,0,1,0,1.41421L5.32813,9.5ZM4.32813,10.5,0,12,1.5,7.67188Z" />
        </svg>
      </i>
    </div>
  );
}

const mapStatetoProps = (state) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  editLinkName,
  saveUserChanges,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkNameHolder);
