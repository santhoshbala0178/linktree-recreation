import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { addNewLink } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  addNewLinkFunc: addNewLink,
};

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const AddNewLink: React.FC<Props> = ({ addNewLinkFunc, links }) => {
  function handleOnClick() {
    addNewLinkFunc();
  }

  return (
    <div>
      <button
        type="button"
        className="add-new-link-button"
        onClick={() => handleOnClick()}
        disabled={
          !(
            links &&
            (links.length === 0 ||
              (links.length > 0 &&
                links[links.length - 1].url &&
                links[links.length - 1].name))
          )
        }
      >
        Add New Link
      </button>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddNewLink);
