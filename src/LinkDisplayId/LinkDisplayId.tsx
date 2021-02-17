import React from 'react';
import styled from 'styled-components';

const StyledLinkDisplayId = styled.div`
  color: white;
  font-family: 'Karla', 'Karla', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 30px auto;
`;

type Props = {
  username?: string;
};

const LinkDisplayId: React.FC<Props> = ({ username }) => (
  <StyledLinkDisplayId>{`@${username}`}</StyledLinkDisplayId>
);

export default LinkDisplayId;
