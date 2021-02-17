import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinkShareHolder = styled.div`
  padding: 20px;
  display: flex;
`;

const StyledLinkShareText = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 5px;
`;

const StyledLinkShareLink = styled(Link)`
  color: black;
`;

type OwnProps = {
  username?: string;
};

const LinkShare: React.FC<OwnProps> = ({ username }) => (
  <StyledLinkShareHolder>
    <StyledLinkShareText>My Linktree:</StyledLinkShareText>
    <div>
      <StyledLinkShareLink to={`/share/${username}`}>
        {`https://priceless-johnson-be9261.netlify.app/share/${username}`}
      </StyledLinkShareLink>
    </div>
  </StyledLinkShareHolder>
);

export default LinkShare;
