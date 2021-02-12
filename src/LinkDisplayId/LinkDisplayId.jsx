import React from 'react';
import './style.css';

function LinkDisplayId({username}) {
  return <div className="link-display-id">{`@${username}`}</div>;
}

export default LinkDisplayId;
