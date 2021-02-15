import React from 'react';
import './style.css';

type Props = {
  linkData: INewLink;
};

const LinkDisplaySite: React.FC<Props> = ({ linkData }) => (
  <a
    href={linkData.url}
    target="_blank"
    className="display-link-holder"
    rel="noreferrer"
  >
    <div className="link-display-site">
      <div className="link-display-site-text">{linkData.name}</div>
    </div>
  </a>
);

export default LinkDisplaySite;
