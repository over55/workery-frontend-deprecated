import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import Scroll from 'react-scroll';

import FormErrorBox from "../Reusable/FormErrorBox";
import { currentUserState } from "../../AppState";
import { postExecutiveVisitsTenant } from "../../API/Gateway";


function ToTenantRedirector() {
    ////
    //// URL Parameters.
    ////

    const { tid } = useParams()

    ////
    //// Global state.
    ////

    const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [forceURL, setForceURL] = useState("");
    const [errors, setErrors] = useState({});

    ////
    //// API.
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");

        // Make an exact copy.
        let updatedCurrentUser = {...currentUser};

        // Update fields.
        updatedCurrentUser.tenantID = tid;
        updatedCurrentUser.tenantId = tid;

        // Update global state.
        setCurrentUser(updatedCurrentUser);

        // setCurrentUser(currentUser)
        console.log(updatedCurrentUser);

        setForceURL("/admin/dashboard");
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
        console.log("onLoginDone: Starting...");
    }

    ////
    //// Event handling.
    ////

    // (Do nothing)

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            postExecutiveVisitsTenant(
                tid,
                onSuccess,
                onError,
                onDone
            );
        }

        return () => mounted = false;
    }, [ tid]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }


    return (
        <div class="container column is-12">
            <div class="section">
                <section class="hero is-fullheight">
                    <div class="hero-body">

                        <div class="container">
                            <div class="columns is-centered">
                                <div class="column is-one-third-tablet">
                                    <h1 className="is-size-1">ACCESSING...</h1>
                                    <FormErrorBox errors={errors} />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default ToTenantRedirector;
