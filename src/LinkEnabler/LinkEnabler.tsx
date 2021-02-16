import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { enableLink, saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  enableLinkFunc: enableLink,
  saveUserChangesFunc: saveUserChanges,
};

type OwnProps = {
  enable?: boolean;
  id?: number;
  uniqueId: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const LinkEnabler: React.FC<Props> = ({
  id,
  enable,
  uniqueId,
  enableLinkFunc,
  saveUserChangesFunc,
}) => {
  function handleOnClick(e: React.ChangeEvent<HTMLInputElement>) {
    enableLinkFunc({
      id,
      enable: e.target.checked,
    });

    saveUserChangesFunc({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }

  return (
    <div style={{ paddingBottom: '15px' }}>
      <label className="switch" htmlFor={uniqueId}>
        <input
          id={uniqueId}
          type="checkbox"
          className="link-enable-checkbox"
          checked={enable}
          onChange={(e) => handleOnClick(e)}
        />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkEnabler);
