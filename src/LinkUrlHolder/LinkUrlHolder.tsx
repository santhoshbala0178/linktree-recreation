import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { editLinkUrl, saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

const StyledLinkUrlHolder = styled.div`
  padding: 5px;
  height: 40%;
  width: 80%;
`;

const StyledLinkUrlEditor = styled.input`
  letter-spacing: 0.5px;
  border: none;
  font-weight: 500;

  &: focus {
    outline: none;
  }
`;

const StyledUrlEditIcon = styled.svg`
  fill: grey;

  & :hover {
    cursor: pointer;
  }
`;

const mapStatetoProps = (state: RootState) => ({ ...state.newLinkReducer });

const mapDispatchtoProps = {
  editLinkUrlFunc: editLinkUrl,
  saveUserChangesFunc: saveUserChanges,
};

type OwnProps = {
  id?: number;
  url?: string;
};

type Props = ReturnType<typeof mapStatetoProps> &
  typeof mapDispatchtoProps &
  OwnProps;

const LinkUrlHolder: React.FC<Props> = ({
  id,
  url,
  editLinkUrlFunc,
  saveUserChangesFunc,
}) => {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    editLinkUrlFunc({
      id,
      url: e.target.value,
    });

    saveUserChangesFunc({
      type: 'SAVE_CHANGE_STATE',
      saveState: true,
    });
  }
  return (
    <StyledLinkUrlHolder>
      <StyledLinkUrlEditor
        placeholder="http://url"
        value={url}
        onChange={(e) => handleOnChange(e)}
      />
      <i>
        <StyledUrlEditIcon width="12" height="12" viewBox="0 0 12 12">
          <path d="M2.5,6.67188,8.46477.70711a1,1,0,0,1,1.41421,0L11.29289,2.121a1,1,0,0,1,0,1.41421L5.32813,9.5ZM4.32813,10.5,0,12,1.5,7.67188Z" />
        </StyledUrlEditIcon>
      </i>
    </StyledLinkUrlHolder>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkUrlHolder);
