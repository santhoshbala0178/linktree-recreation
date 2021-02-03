import React from "react";
import {connect} from "react-redux"
import {Link} from "react-router-dom";
import "./style.css";
import {modifyUserDetails} from "../action";

function LoginButton(props) {

    function handleOnClick(e) {
        props.modifyUserDetails({
            type: "RESET_DETAILS"
        })
    }

    return (
        <Link to={"/login"} className="login-link">
            <div className="login-div"  onClick={(e) => handleOnClick(e)}>
                Log In
            </div>
        </Link>
    )
}

const mapDispatchtoProps={
    modifyUserDetails
}
export default connect(null, mapDispatchtoProps)(LoginButton);