import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { enableLink, saveUserChanges } from '../action';

function LinkEnabler(props) {
  function handleOnClick(e) {
    props.enableLink({
      id: props.id,
      enable: e.target.checked,
    });

    props.saveUserChanges({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }

  return (
    <div style={{ paddingBottom: '15px' }}>
      <label className="switch" htmlFor="enable-link">
        <input
          id="enable-link"
          type="checkbox"
          className="link-enable-checkbox"
          checked={props.enable}
          onClick={(e) => handleOnClick(e)}
        />
        <span className="slider round" />
      </label>
    </div>
  );
}

const mapStatetoProps = (state) => ({ ...state.newLinkReduce });

const mapDispatchtoProps = {
  enableLink,
  saveUserChanges,
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkEnabler);