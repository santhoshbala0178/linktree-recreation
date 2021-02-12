import React from 'react';
import './style.css';

export default function Loader() {
  return (
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
}
