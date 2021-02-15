import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import './style.css';
import LogoIcon from '../LogoIcon';
import NewUserRedirect from '../NewUserRedirect';
import { updateUrl } from '../store/action';
import { RootState } from '../store/store';

const mapStatetoProps = (state: RootState) => ({ ...state.newUrlReducer });

const mapDispatchtoProps = { updateUrlFunc: updateUrl };

type Props = ReturnType<typeof mapStatetoProps> & typeof mapDispatchtoProps;

const UrlEditor: React.FC<Props> = ({ url, updateUrlFunc }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  function onChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    updateUrlFunc(e.target.value);
  }

  return (
    <div className="url-holder">
      <div className="url-holder-div">
        <LogoIcon />
        <div className="linktree-div">linktr.ee/</div>
        <div className="input-holder">
          <input
            ref={ref}
            className="url-editor"
            placeholder="yournamehere"
            value={url}
            onChange={(e) => onChangeEvent(e)}
          />
        </div>
        <NewUserRedirect url={url} />
      </div>
    </div>
  );
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UrlEditor);
