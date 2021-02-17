import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addNewLink } from '../store/action';
import { RootState } from '../store/store';

const StyledAddNewLink = styled.button`
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
    background: gray;
    cursor: initial;
  }
`;

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
      <StyledAddNewLink
        type="button"
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
      </StyledAddNewLink>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddNewLink);
