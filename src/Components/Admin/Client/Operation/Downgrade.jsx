import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingUser, faImage, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis, faHomeUser, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getClientDetailAPI, postDowngradeClientAPI } from "../../../../API/Client";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function AdminClientDowngradeOperation() {
    ////
    //// URL Parameters.
    ////

    const { cid } = useParams()

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [client, setClient] = useState({});

    ////
    //// Event handling.
    ////

    const onSubmitClick = () => {
        setErrors({});
        setFetching(true);
        postDowngradeClientAPI(
            cid,
            onDowngradeSuccess,
            onDowngradeError,
            onDowngradeDone
        );
    }

    ////
    //// API.
    ////

    // --- Detail --- //

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setClient(response);
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
        console.log("onDone: Starting...");
        setFetching(false);
    }

    // --- Downgrade --- //

    function onDowngradeSuccess(response){
        console.log("onDowngradeSuccess: Starting...");

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Client downgrade");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSuccess: Delayed for 2 seconds.");
            console.log("onSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        setForceURL("/admin/client/"+cid+"/more");
    }

    function onDowngradeError(apiErr) {
        console.log("onDowngradeError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDowngradeDone() {
        console.log("onDowngradeDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            getClientDetailAPI(
                cid,
                onSuccess,
                onError,
                onDone
            );
        }

        return () => { mounted = false; }
    }, [cid]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    {/* Desktop Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/admin/clients" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</Link></li>
                            <li class=""><Link to={`/admin/client/${cid}/more`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (More)</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faHomeUser} />&nbsp;Downgrade</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to={`/admin/client/${cid}/more`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        {client && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faHomeUser} />&nbsp;Downgrade Client</p>
                            </div>
                            <div class="column has-text-right">

                            </div>
                        </div>}

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />

                                {client && <div class="container">

                                    <article class="message is-warning">
                                        <div class="message-body">
                                            <p class="title is-4"><FontAwesomeIcon className="fas" icon={faCircleExclamation} />&nbsp;Warning</p>
                                            <p>You are about to <b>downgrade</b> this client from <i>Business</i> type into <i>Residential</i>. This will affect the rates, associates and terms the client will now be applied. Are you sure you want to continue?</p>
                                        </div>
                                    </article>

                                    {/* Bottom Navigation */}
                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/client/${cid}/more`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-danger is-fullwidth-mobile" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} type="button" />&nbsp;Confirm and Downgrade</button>
                                        </div>
                                    </div>

                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminClientDowngradeOperation;
