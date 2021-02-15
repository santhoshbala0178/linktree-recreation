import React from 'react';
import './style.css';

const LogoIcon: React.FC = () => (
  <svg className="logo-svg">
    <path
      className="left-tree-icon"
      d="M7.385.43a.81.81 0 0 0-1.416 0l-5.292 9.6c-.246.493.123 1.047.677 1.047h3.57v3.63c0 .37.307.678.676.678h2.092c.37 0 .677-.308.677-.677v-3.631h-.984a.8.8 0 0 1-.8-.677c0-.123 0-.246.061-.37L9.6 4.676 7.385.43z"
    />
    <path
      className="right-tree-icon"
      d="M12.062.43a.81.81 0 0 1 1.415 0l5.292 9.6c.246.493-.123 1.047-.677 1.047h-3.507v3.63c0 .37-.308.678-.678.678h-2.215a.683.683 0 0 1-.677-.677v-3.631H12a.8.8 0 0 0 .8-.677c0-.123 0-.246-.062-.37L9.785 4.677 12.062.43z"
    />
  </svg>
);

export default LogoIcon;
