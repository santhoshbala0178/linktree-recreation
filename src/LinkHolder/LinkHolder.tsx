import React from 'react';
import './style.css';
import LinkNameHolder from '../LinkNameHolder';
import LinkUrlHolder from '../LinkUrlHolder';
import LinkEnabler from '../LinkEnabler';
import LinkDelete from '../LinkDelete';

type Props = {
  linkData: INewLink;
};

const LinkHolder: React.FC<Props> = ({ linkData }) => (
  <div className="link-holder">
    <div className="card-move-wrapper" />
    <div className="card-content-wrapper">
      <div style={{ width: '80%' }}>
        <LinkNameHolder name={linkData.name} id={linkData.id} />
        <LinkUrlHolder url={linkData.url} id={linkData.id} />
      </div>
      <div>
        <LinkEnabler enable={linkData.enable} id={linkData.id} />
        <LinkDelete id={linkData.id} />
      </div>
    </div>
  </div>
);

export default LinkHolder;
