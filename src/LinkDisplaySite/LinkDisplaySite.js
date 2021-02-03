import React from "react";
import "./style.css";

function LinkDisplaySite(props){
    return (
        <a href={props.linkData.url} target="_blank" className="display-link-holder">
            <div className="link-display-site">
                <div className="link-display-site-text">
                        {props.linkData.name}
                </div>
            </div>
        </a>
    )
}


export default LinkDisplaySite;