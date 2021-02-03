import React from "react";
import {connect} from "react-redux";
import "./style.css";
import {addNewLink} from "../action";

function AddNewLink(props){
    function handleOnClick(e) {
        props.addNewLink()
    }

    return (
    <div>
        <button className="add-new-link-button" onClick= {(e) => ( handleOnClick(e))} 
        disabled={
            (props.links.length==0) || (props.links.length>0 && props.links[props.links.length-1]['url'] && props.links[props.links.length-1]['name'])? false: true 
        }>
            Add New Link
        </button>
    </div>)
}

const mapStatetoProps = (state)  => {
    return {
        ...state.newLinkReducer
    }
}

const mapDispatchtoProps = {
    addNewLink
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AddNewLink);