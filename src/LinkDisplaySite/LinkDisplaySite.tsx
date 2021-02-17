import React from 'react';
import styled from 'styled-components';

const StyledLinkDisplayText = styled.div`
  color: white;
  font-family: 'Karla', 'Karla', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: auto;
`;

const StyledLinkDisplaySite = styled.div`
  border: white solid 2px;
  height: 24px;
  padding: 15px 20px;
  margin: 20px 10px;
  display: flex;

  &: hover {
    cursor: pointer;
    background-color: white;
  }

  &: hover ${StyledLinkDisplayText} {
    color: #3a4eff;
  }
`;

const StyledDisplayLinkHolder = styled.a`
  text-decoration: none;
`;

type Props = {
  linkData: INewLink;
};

const LinkDisplaySite: React.FC<Props> = ({ linkData }) => (
  <StyledDisplayLinkHolder href={linkData.url} target="_blank" rel="noreferrer">
    <StyledLinkDisplaySite>
      <StyledLinkDisplayText>{linkData.name}</StyledLinkDisplayText>
    </StyledLinkDisplaySite>
  </StyledDisplayLinkHolder>
);

export default LinkDisplaySite;
