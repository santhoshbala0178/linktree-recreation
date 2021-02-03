import React, {useState} from "react";
import "./style.css";
import {connect} from "react-redux";
import {useHistory, browserHistory} from "react-router";
import Logo from "../Logo";
import TextHolder from "../TextHolder";
import Loader from "../Loader";
import ErrorMessageHolder from "../ErrorMessageHolder";
import firebase from "../Firebase";
import {addNewLink, modifyUserDetails, setSignedInState} from "../action";

function LoginUser(props) {
    let history = useHistory()
    const [loadState, setLoadState] = useState(false)
    const [errorState, setErrorState] = useState(false)

    function handleOnClick(e) {
        setLoadState(true)
        const dbRef = firebase.database().ref();
        const usersRef = dbRef.child('Users');

        usersRef.once('value', (snapshot) => {
            let userFound = false
            snapshot.forEach(data => {
              const dataVal = data.val()
              if (props.username === dataVal.username && props.password === dataVal.password) {
                    if (dataVal.Links) {
                        Object.keys(dataVal?.Links).map((eachKey) => {
                            props.addNewLink({
                                name: dataVal.Links[eachKey].name,
                                id: dataVal.Links[eachKey].id,
                                url: dataVal.Links[eachKey].url,
                                enable: dataVal.Links[eachKey].enable
                        })})
                        }
                    
                    
                    props.modifyUserDetails({
                        type: "LOGIN_STATUS",
                        login: true,
                        id: data.key
                    })

                    sessionStorage.setItem("login", true)
                    sessionStorage.setItem("username", props.username)
                    sessionStorage.setItem("id", data.key)

                    props.setSignedInState(true)
                    history.push("/admin")

                    userFound = true
                }})

              if (userFound) {
                setLoadState(false)
              }
              else {
                setErrorState(true)
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
            }
              setLoadState(false)   
          })
    }   
    return (
        <div className="login-user-page">
            {loadState && <Loader/>}
            <div className="login-user-content">
                <Logo/>
                <div className="login-header">Log in to continue to your Linkedin admin</div>
                <div className="login-block">
                    <TextHolder placeholder="Username" field="login-username" value={props.username}/>
                    <TextHolder placeholder="Password" field="login-password" value={props.password}/>
                    {errorState &&  <ErrorMessageHolder message="Username or Password is incorrect"/>}
                    <div className="login-button-holder">
                        <button className="login-button" onClick={(e) => handleOnClick(e)}
                        disabled={(props.username) && (props.password)?false:true}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {...state.userDetailsReducer,  ...state.newLinkReducer, ...state.signedInReducer}
}

const mapDispatchtoProps = {
    addNewLink,
    modifyUserDetails,
    setSignedInState
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginUser);