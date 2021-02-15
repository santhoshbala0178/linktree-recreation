import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

type OwnProps = {
  username?: string;
};

const LinkShare: React.FC<OwnProps> = ({ username }) => (
  <div className="link-share-holder">
    <span className="linktree-share-text">My Linktree:</span>
    <div>
      <Link to={`/share/${username}`} className="linktree-share-link">
        {`https://priceless-johnson-be9261.netlify.app/share/${username}`}
      </Link>
    </div>
  </div>
);

export default LinkShare;
