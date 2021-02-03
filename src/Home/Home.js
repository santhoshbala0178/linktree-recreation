import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import Logo from "../Logo";
import RegisterButton from "../RegisterButton";
import LoginButton from "../LoginButton";
import UrlEditor from"../UrlEditor";
import {modifyUserDetails, setSignedInState} from "../action";

function Home(props) {
    const [divState, changeDivState] = useState(true)
    const [signOut, setSignOut] = useState(true)
    

    useEffect(() => {
        if(sessionStorage.getItem('login') === "true") {
            setSignOut(false)
        }
    }, [])

    function handleOnClick(e) {
        props.modifyUserDetails({
            type: "MODIFY_USERNAME",
            username: ""
        })
        props.modifyUserDetails({
            type: "MODIFY_PASSWORD",
            password: ""
        })
        props.modifyUserDetails({
            type: "LOGIN_STATUS",
            login: false,
            id:""
        
        })  
        sessionStorage.setItem("login", false)
        sessionStorage.setItem("username", "")
        sessionStorage.setItem("id", "")

        setSignOut(true)
        props.setSignedInState(false)
    }

    return (
        <>
            <div className="top-wrapper">
                <div className={"navbar-holder " + (divState? "show-div":"hide-div")}>
                    <div className="navbar-left">
                        <Logo iconPosition="top"/>
                    </div>
                    {!signOut  &&
                    <div className="navbar-right">
                        <div className="navbar-right-button-holder">
                            <button className="navbar-right-button" onClick={(e) => handleOnClick(e)}>Sign Out</button>
                        </div>
                        <div className="navbar-right-button-holder">
                            <Link to="/admin">
                                <button className="navbar-right-button">Admin</button>
                            </Link>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="main-page-get-started">
                <div className="main-header">
                    <div className="main-header-text">The Only Link You’ll Ever Need</div>
                    <div className="main-header-sub-text">Connect audiences to all of your content with just one link</div>
                </div>
                <RegisterButton/>
                <div className="main-login-wrapper">
                    <span style={{marginRight:'5px'}}>Already on Linktree?</span>
                    <LoginButton/>
                </div>
            </div>
            <UrlEditor/>
       </>
          
    )
}


const mapStatetoProps = (state) => {
    return {...state.userDetailsReducer}
}

const mapDispatchtoProps = {
    modifyUserDetails,
    setSignedInState
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);