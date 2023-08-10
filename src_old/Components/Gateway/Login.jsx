import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import FormErrorBox from "../Element/FormErrorBox";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { postLoginAPI } from "../../API/gateway";
import { EXECUTIVE_ROLE_ID } from "../../Constants/App";

function Login() {
    ////
    //// Component states.
    ////

    // const [errors, setErrors] = useState({
    //     "email": "account does not exist",
    //     "password": "invalid password"
    // });
    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({
        "email": false,
        "password": false
    });
    const [profile, setProfile] = useLocalStorage("WORKERY_USER_PROFILE");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forceURL, setForceURL] = useState("");

    ////
    //// API.
    ////

    function onLoginSuccess(profile){
        console.log("onLoginSuccess: Starting...");

        // Save the data to local storage for persistance in this browser and
        // redirect the user to their respected dahsboard.
        setProfile(profile);
        if (profile.roleId === EXECUTIVE_ROLE_ID) {
            setForceURL("/organizations");
        } else {
            setForceURL("/dashboard");
        }
    }

    function onLoginError(apiErr) {
        console.log("onLoginError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onLoginDone() {
        console.log("onLoginDone: Starting...");
    }

    ////
    //// Event handling.
    ////

    function onEmailChange(e) {
        setEmail(e.target.value);
        validation["email"]=false
        setValidation(validation);
        // setErrors(errors["email"]="");
    }

    function onPasswordChange(e) {
        setPassword(e.target.value);
        validation["password"]=false
        setValidation(validation);
        // setErrors(errors["password"]="");
    }

    function onButtonClick(e) {
        var newErrors = {};
        var newValidation = {};
        if (email === undefined || email === null || email === "") {
            newErrors["email"] = "value is missing";
        } else {
            newValidation["email"] = true
        }
        if (password === undefined || password === null || password === "") {
            newErrors["password"] = "value is missing";
        } else {
            newValidation["password"] = true
        }

        /// Save to state.
        setErrors(newErrors);
        setValidation(newValidation);

        if (Object.keys(newErrors).length > 0) {
            //
            // Handle errors.
            //

            console.log("failed validation");

            // window.scrollTo(0, 0);  // Start the page at the top of the page.

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop()
        } else {
            //
            // Submit to server.
            //

            console.log("successful validation, submitting to API server.");

            const postData = {
                email: email,
                password: password,
            };
            postLoginAPI(
                postData,
                onLoginSuccess,
                onLoginError,
                onLoginDone
            );
        }
    }

    ////
    //// Misc.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container column is-12">
                <div class="section">

                    <section class="hero is-fullheight">
                        <div class="hero-body">
                            <div class="container">
                                <div class="columns is-centered">
                                    <div class="box is-rounded column is-one-third-tablet">
                                        <form>
                                            <h1 className="title is-3 has-text-centered">Sign In</h1>
                                            <FormErrorBox errors={errors} />

                                            <div class="field">
                                                <label class="label is-small has-text-grey-light">USERNAME</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class={`input ${errors && errors.email && 'is-danger'} ${validation && validation.email && 'is-success'}`} type="text" placeholder="Email" value={email} onChange={onEmailChange}/>
                                                    <span class="icon is-small is-left">
                                                        <FontAwesomeIcon className="fas" icon={faEnvelope} />
                                                    </span>
                                                </div>
                                                {errors && errors.email &&
                                                    <p class="help is-danger">{errors.email}</p>
                                                }
                                            </div>

                                            <div class="field">
                                                <label class="label is-small has-text-grey-light">PASSWORD</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class={`input ${errors && errors.password && 'is-danger'} ${validation && validation.password && 'is-success'}`}  type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
                                                    <span class="icon is-small is-left">
                                                        <FontAwesomeIcon className="fas" icon={faKey} />
                                                    </span>
                                                </div>
                                                {errors && errors.password &&
                                                    <p class="help is-danger">{errors.password}</p>
                                                }
                                            </div>
                                            <br />
                                            <button class="button is-block is-fullwidth is-primary" type="button" onClick={onButtonClick}>
                                                Login <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        </form>
                                        <br />
                                        <nav class="level">
                                            <div class="level-item has-text-centered">
                                                <div>
                                                    <Link to="/forgot-password" className="is-size-7-tablet">Forgot Password?</Link>
                                                </div>
                                            </div>
                                            {/*
                                            <div class="level-item has-text-centered">
                                                <div>
                                                    <Link to="/register-step-1" className="is-size-7-tablet">Create an Account</Link>
                                                </div>
                                            </div>
                                            */}
                                        </nav>
                                    </div>
                                    {/* End box */}
                                </div>
                            </div>
                            {/* End container */}
                        </div>
                        {/* End hero-body */}
                    </section>

                </div>
            </div>
        </>
    );
}

export default Login;
