import React from 'react';
import './style.css';

const Loader: React.FC = () => (
  <div className="transparent-parent">
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
