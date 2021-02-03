import React from "react";
import {connect} from "react-redux";
import "./style.css"
import {deleteLink, saveUserChanges} from "../action";

function LinkDelete(props) {
    function handleOnClick(e) {
        props.deleteLink({
            "id":props.id
        })

        props.saveUserChanges({
            type: "SAVE_CHANGE_STATE",
            saveState: true
        })
    }

    return (
        <div onClick={(e) => handleOnClick(e)}>
            <svg className="link-delete" viewBox="0 0 16 16"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M6 2.5v-2h4v2M1 2.5h14M9.533 13.5l.25-9M6.217 4.5l.25 9M2.661 4.5l.889 11h8.9l.888-11"></path></svg>
        </div>
    )
}


const mapStatetoProps = (state) => {
    return {...state.newLinkReducer}
}


const mapDispatchtoProps = {
    deleteLink,
    saveUserChanges
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LinkDelete);