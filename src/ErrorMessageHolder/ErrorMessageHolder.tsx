import React from 'react';
import './style.css';

type Props = { message: string };

const ErrorMessageHolder: React.FC<Props> = ({ message }) => (
  <div className="error-message-holder">{message}</div>
);

export default ErrorMessageHolder;
