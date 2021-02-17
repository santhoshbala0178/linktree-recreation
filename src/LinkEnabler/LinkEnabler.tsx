import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { enableLink, saveUserChanges } from '../store/action';
import { RootState } from '../store/store';

/* The switch - the box around the slider */
const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;
`;

/* The slider */
const StyledSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &: before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

/* Hide default HTML checkbox */
const StyledLinkEnable = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &: checked + ${StyledSlider} {
    background-color: #00d775;
  }

  &: checked + ${StyledSlider}: before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }
`;

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
      <StyledSwitch htmlFor={uniqueId}>
        <StyledLinkEnable
          id={uniqueId}
          type="checkbox"
          checked={enable}
          onChange={(e) => handleOnClick(e)}
        />
        <StyledSlider />
      </StyledSwitch>
    </div>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkEnabler);
