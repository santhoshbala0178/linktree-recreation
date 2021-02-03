import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

function LinkShare(props) {
    return (
        <div className="link-share-holder">
            <span className="linktree-share-text">My Linktree:</span>
            <div>
                <Link to={`/share/${props.username}`} className="linktree-share-link" >
                        {`https://priceless-johnson-be9261.netlify.app/share/${props.username}`}
                </Link>
            </div>
        </div>
    )
}

export default LinkShare;