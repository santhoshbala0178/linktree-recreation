import React, {useRef, useEffect} from "react";
import { connect } from "react-redux";
import "./style.css";
import LogoIcon from "../LogoIcon";
import NewUserRedirect from "../NewUserRedirect";
import {updateUrl} from "../action";

function UrlEditor(props) {
    const ref = useRef()

    useEffect(() => {
        ref.current.focus()
    }, [])

    function onChangeEvent(e) {
        props.updateUrl(e.target.value)
    }

    return (
        <div className="url-holder">
            <div className="url-holder-div">
                <LogoIcon iconPosition="editor"/>
                <div className="linktree-div">linktr.ee/</div>
                <div className="input-holder">
                    <input ref={ref} className="url-editor" placeholder="yournamehere" value={props.url} onChange={(e) => onChangeEvent(e)}></input>
                </div>
                <NewUserRedirect url={props.url}/>
            </div>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return { ...state.newUrlReducer };
  };
  
const mapDispatchtoProps = {updateUrl}

export default connect(mapStatetoProps, mapDispatchtoProps)(UrlEditor);