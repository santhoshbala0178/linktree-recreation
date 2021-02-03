import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

function LinkShare(props) {
    return (
        <div className="link-share-holder">
            <span className="linktree-share-text">My Linktree:</span>
            <div>
                <Link to={`/share/${props.username}`} className="linktree-share-link" >
                        {`http://linktree/share/${props.username}`}
                </Link>
            </div>
        </div>
    )
}

export default LinkShare;