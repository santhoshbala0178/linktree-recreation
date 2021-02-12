import React from 'react';
import './style.css';

function ErrorMessageHolder(props) {
  return (
    <div
      className="error-message-holder"
    >
      { props.message }
    </div>
  );
}

export default ErrorMessageHolder;
