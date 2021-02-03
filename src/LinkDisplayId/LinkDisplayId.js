import React from "react";
import "./style.css";

function LinkDisplayId(props) {
    return (
        <div className="link-display-id">
            @{props.username}
        </div>
    )
}

export default LinkDisplayId;