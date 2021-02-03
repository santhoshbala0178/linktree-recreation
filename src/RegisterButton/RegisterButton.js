import React from "react";
import {connect} from "react-redux"
import "./style.css";
import { Link } from "react-router-dom";
import {modifyUserDetails} from "../action";

function RegisterButton(props){

    function handleOnClick(e) {
        props.modifyUserDetails({
            type: "RESET_DETAILS"
        })
    }

    return (
    <div>
        <Link to={"/register"} className="nav-link">
            <button className="register-div-button" onClick={(e) => handleOnClick(e)}>
                GET STARTED FOR FREE
            </button>
        </Link>
    </div>)
}

const mapDispatchtoProps={
    modifyUserDetails
}

export default connect(null, mapDispatchtoProps)(RegisterButton);