import React from 'react';
import './style.css';

type Props = {
  username?: string;
};

const LinkDisplayId: React.FC<Props> = ({ username }) => (
  <div className="link-display-id">{`@${username}`}</div>
);

export default LinkDisplayId;
