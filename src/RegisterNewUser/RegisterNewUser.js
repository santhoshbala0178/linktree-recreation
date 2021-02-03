import React,{useState} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router";
import "./style.css";
import Logo from "../Logo";
import TextHolder from "../TextHolder";
import LoginButton from "../LoginButton";
import firebase from "../Firebase";
import Loader from "../Loader";
import { addNewLink, modifyUserDetails, resetAllLink, setSignedInState} from "../action";

function RegisterNewUser(props) {
    let history = useHistory()
    const [loadState, setLoadState] = useState(false)

    function handleOnClick(e) {
        setLoadState(true)

        if (props.password !== props.repeatPassword) {
            props.modifyUserDetails({
                type: "RESET_DETAILS"
            })
            setLoadState(false)
        }
        else {
            const dbRef = firebase.database().ref();
            const usersRef = dbRef.child('Users');

            usersRef.once('value', (snapshot) => {
                let userNameExists = false
                let id = ""
                snapshot.forEach(data => {
                const dataVal = data.val()
                if (props.username === dataVal.username) {
                    userNameExists = true  
                    id = data.key
                    }
                })

                
                if (userNameExists) {
                    console.log("Username already Exists")
                    props.modifyUserDetails({
                        type: "RESET_DETAILS"
                    })
                    setLoadState(false)
                }
                else {
                    let id = new Date().valueOf();
                    usersRef.push({
                        "username": props.username,
                        "password": props.password,
                        "Links": []
                    })
                    props.resetAllLink()
                    props.setSignedInState(true)
                    history.push("/admin")
                    props.modifyUserDetails({
                        type: "LOGIN_STATUS",
                        login: true,
                        id: id
                    })
                    sessionStorage.setItem("login", true)
                    sessionStorage.setItem("username", props.username)
                    sessionStorage.setItem("id", id)

                    setLoadState(false)

                }

            })
        }
    }

    return (
        <div className="register-user-page">
            {loadState && <Loader/>}
            <div className="regiser-user-content">
                <Logo/>
                <div className="sign-up-header">Sign up for your Linktree account</div>
                <div className="register-block">
                    <TextHolder placeholder="Username" field="register-username" value={props.username}/>
                    <TextHolder placeholder="Password" field="register-password" value={props.password}/>
                    <TextHolder placeholder="Repeat password" field="register-repeat-password" value={props.repeatPassword}/>
                    <div className="register-button-holder">
                        <button className='register-button' onClick={(e) => handleOnClick(e)}
                        disabled={(props.username) && (props.password) && (props.repeatPassword)?false:true}>Register</button>
                    </div>
                    <div className="login-holder">
                        <div className="main-login-wrapper">
                            <span style={{marginRight:'5px'}}>Already on Linktree?</span>
                            <LoginButton/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {...state.userDetailsReducer,  ...state.newLinkReducer}
}

const mapDispatchtoProps = {
    addNewLink,
    modifyUserDetails,
    resetAllLink,
    setSignedInState
}

export default connect(mapStatetoProps, mapDispatchtoProps)(RegisterNewUser);