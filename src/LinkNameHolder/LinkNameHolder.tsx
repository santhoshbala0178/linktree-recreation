import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { editLinkName, saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  editLinkNameFunc: editLinkName,
  saveUserChangesFunc: saveUserChanges,
};

type OwnProps = {
  id?: number;
  name?: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const LinkNameHolder: React.FC<Props> = ({
  id,
  name,
  editLinkNameFunc,
  saveUserChangesFunc,
}) => {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    editLinkNameFunc({
      id,
      name: e.target.value,
    });

    saveUserChangesFunc({
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
        value={name}
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
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkNameHolder);
