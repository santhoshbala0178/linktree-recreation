import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { deleteLink, saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  deleteLinkFunc: deleteLink,
  saveUserChangesFunc: saveUserChanges,
};

type OwnProps = {
  id?: number;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const LinkDelete: React.FC<Props> = ({
  id,
  deleteLinkFunc,
  saveUserChangesFunc,
}) => {
  function handleOnClick() {
    deleteLinkFunc({
      id,
    });

    saveUserChangesFunc({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }

  return (
    <div
      onClick={() => handleOnClick()}
      onKeyDown={() => handleOnClick()}
      role="button"
      tabIndex={0}
    >
      <svg className="link-delete" viewBox="0 0 16 16">
        <path
          fill="none"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 2.5v-2h4v2M1 2.5h14M9.533 13.5l.25-9M6.217 4.5l.25 9M2.661 4.5l.889 11h8.9l.888-11"
        />
      </svg>
    </div>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkDelete);
