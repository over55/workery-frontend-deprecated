import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';

import { currentUserState } from "../../AppState";


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

    ////
    //// API.
    ////

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
