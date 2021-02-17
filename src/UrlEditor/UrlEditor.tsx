import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LogoIcon from '../LogoIcon';
import NewUserRedirect from '../NewUserRedirect';
import { updateUrl } from '../store/action';
import { RootState } from '../store/store';

const StyledUrlHolder = styled.div`
  width: 576px;
  height: 80px;
  margin: 10px auto;
  border: 1px solid rgb(117, 81, 233);
  border-radius: 50px;
  display: flex;

  @media only screen and (max-width: 770px) {
    width: 320px;
    height: 64px;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

const StyledUrlDiv = styled.div`
  display: flex;
  margin: auto;
`;

const StyledLinkTreeDiv = styled.div`
  font-size: 32px;
  letter-spacing: -0.64px;
  color: rgb(38, 50, 56);
  margin-left: 2%;
`;

const StyledInputHolder = styled.div`
  margin-left: 1px;
  width: 50%;
`;

const StyledUrlEditor = styled.input`
  border: none;
  width: 100%;
  font-size: 32px;
  letter-spacing: -0.64px;
  color: rgb(38, 50, 56);

  &: focus {
    outline: none;
  }
`;

const mapStatetoProps = (state: RootState) => ({ ...state.newUrlReducer });

const mapDispatchtoProps = { updateUrlFunc: updateUrl };

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const UrlEditor: React.FC<Props> = ({ url, updateUrlFunc }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  function onChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    updateUrlFunc(e.target.value);
  }

  return (
    <StyledUrlHolder>
      <StyledUrlDiv>
        <LogoIcon />
        <StyledLinkTreeDiv>linktr.ee/</StyledLinkTreeDiv>
        <StyledInputHolder>
          <StyledUrlEditor
            ref={ref}
            placeholder="yournamehere"
            value={url}
            onChange={(e) => onChangeEvent(e)}
          />
        </StyledInputHolder>
        <NewUserRedirect url={url} />
      </StyledUrlDiv>
    </StyledUrlHolder>
  );
};

export default connect(mapStatetoProps, mapDispatchtoProps)(UrlEditor);
