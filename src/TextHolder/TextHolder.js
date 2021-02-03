import React from "react";
import {connect} from "react-redux";
import "./style.css";
import {modifyUserDetails} from "../action";

function TextHolder(props) {
    function handleOnChange(e) {
        if (props.field === "login-username" || props.field === "register-username") {
            props.modifyUserDetails({
                type: "MODIFY_USERNAME",
                username: e.target.value
            })
        }
        else if (props.field === "login-password" || props.field === "register-password") {
            props.modifyUserDetails({
                type: "MODIFY_PASSWORD",
                password: e.target.value
            })
        }
        else if (props.field === "register-repeat-password") {
            props.modifyUserDetails({
                type: "MODIFY_REPEAT_PASSWORD",
                repeatPassword: e.target.value
            })
        }
    }

    return (
        <div className="text-holder">
            <input placeholder={props.placeholder} value={props.value}className="text-editor" onChange={(e) => handleOnChange(e)} type={props.field.includes("password")?"password":"text"}></input>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {...state.userDetailsReducer}
}

const mapDispatchtoProps = {
    modifyUserDetails
}

export default connect(mapStatetoProps, mapDispatchtoProps)(TextHolder);