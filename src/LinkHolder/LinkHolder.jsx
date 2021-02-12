import React from 'react';
import './style.css';
import LinkNameHolder from '../LinkNameHolder';
import LinkUrlHolder from '../LinkUrlHolder';
import LinkEnabler from '../LinkEnabler';
import LinkDelete from '../LinkDelete';

function LinkHolder(props) {
  return (
    <div className="link-holder">
      <div className="card-move-wrapper" />
      <div className="card-content-wrapper">
        <div style={{ width: '80%' }}>
          <LinkNameHolder name={props.linkData.name} id={props.linkData.id} />
          <LinkUrlHolder url={props.linkData.url} id={props.linkData.id} />
        </div>
        <div>
          <LinkEnabler enable={props.linkData.enable} id={props.linkData.id} />
          <LinkDelete id={props.linkData.id} />
        </div>
      </div>
    </div>
  );
}

export default LinkHolder;
