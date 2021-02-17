import React from 'react';
import styled from 'styled-components';
import LinkNameHolder from '../LinkNameHolder';
import LinkUrlHolder from '../LinkUrlHolder';
import LinkEnabler from '../LinkEnabler';
import LinkDelete from '../LinkDelete';

const StyledLinkHolder = styled.div`
  width: 50%;
  margin: auto;
  height: 100px;
  background: white;
  border-radius: 5px;
  margin-bottom: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;

  @media only screen and (max-width: 770px) {
  }
`;

const StyledCardMoveWrapper = styled.div`
  width: 5%;
  height: 100%;
  border-right: 1px solid #d7dce1;
`;

const StyledCardContentWrapper = styled.div`
  width: 95%;
  padding: 10px;
  display: flex;
`;

type Props = {
  linkData: INewLink;
  uniqueId: string;
};

const LinkHolder: React.FC<Props> = ({ linkData, uniqueId }) => (
  <StyledLinkHolder>
    <StyledCardMoveWrapper />
    <StyledCardContentWrapper>
      <div style={{ width: '80%' }}>
        <LinkNameHolder name={linkData.name} id={linkData.id} />
        <LinkUrlHolder url={linkData.url} id={linkData.id} />
      </div>
      <div>
        <LinkEnabler
          enable={linkData.enable}
          id={linkData.id}
          uniqueId={uniqueId}
        />
        <LinkDelete id={linkData.id} />
      </div>
    </StyledCardContentWrapper>
  </StyledLinkHolder>
);

export default LinkHolder;
