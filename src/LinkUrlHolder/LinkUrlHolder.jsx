import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { editLinkUrl, saveUserChanges } from '../action';

function LinkUrlHolder(props) {
  function handleOnChange(e) {
    props.editLinkUrl({
      id: props.id,
      url: e.target.value,
    });

    props.saveUserChanges({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }
  return (
    <div className="link-url-holder">
      <input
        className="link-url-editor"
        placeholder="http://url"
        value={props.url}
        onChange={(e) => handleOnChange(e)}
      />
      <i>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="link-url-edit-icon"
        >
          <path d="M2.5,6.67188,8.46477.70711a1,1,0,0,1,1.41421,0L11.29289,2.121a1,1,0,0,1,0,1.41421L5.32813,9.5ZM4.32813,10.5,0,12,1.5,7.67188Z" />
        </svg>
      </i>
    </div>
  );
}

const mapStatetoProps = (state) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  editLinkUrl,
  saveUserChanges,
};
export default connect(mapStatetoProps, mapDispatchtoProps)(LinkUrlHolder);
