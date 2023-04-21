import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faChevronRight, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { getOrganizationDetailAPI } from "../../API/Organization";
import { getSelectedOptions } from "../../Helpers/selectHelper";
import useLocalStorage from "../../Hooks/useLocalStorage";


function OrganizationDetail() {
    ////
    ////
    ////

    const { id } = useParams()

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [organization, setOrganization] = useLocalStorage(id, "");
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

    function onOrganizationDetailSuccess(response){
        console.log("onOrganizationDetailSuccess: Starting...");
        setOrganization(response);
    }

    function onOrganizationDetailError(apiErr) {
        console.log("onOrganizationDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationDetailDone() {
        console.log("onOrganizationDetailDone: Starting...");
        setFetching(false);
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
            setFetching(true);
            getOrganizationDetailAPI(
                id,
                onOrganizationDetailSuccess,
                onOrganizationDetailError,
                onOrganizationDetailDone
            );
        }

        return () => { mounted = false; }
    }, [id]);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><FontAwesomeIcon className="is-white" icon={faBuilding} />&nbsp;<Link to="/organizations" aria-current="page">Organizations</Link></li>
                            <li class="is-active"><Link to={`/organization`} aria-current="page">Details</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <p class="title is-3"><FontAwesomeIcon className="is-white" icon={faBuilding} />&nbsp;Organization</p>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                                <div class="loader-wrapper is-centered">
                                  <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                                </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="columns">
                            <div class="column">
                                <p class="subtitle is-4">Information</p>
                                <div class="field">
                                    <label class="label">ID</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={id} disabled={true} />
                                    </div>
                                </div>

                                <div class="columns">
                                    <div class="column is-half">
                                        <Link to="/organizations" class="button is-hidden-touch">Back</Link>
                                        <Link to="/organizations" class="button is-fullwidth is-hidden-desktop">Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <Link to={`/organization/${id}/edit`} class="button is-primary is-hidden-touch">Edit</Link>
                                        <Link to={`/organization/${id}/edit`} class="button is-primary is-fullwidth is-hidden-desktop">Edit</Link>
                                    </div>
                                </div>
                            </div>

                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

export default OrganizationDetail;
