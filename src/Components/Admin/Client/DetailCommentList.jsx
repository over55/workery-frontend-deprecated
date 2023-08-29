import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faWrench, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { DateTime } from "luxon";

import { getClientDetailAPI, postClientCreateCommentOperationAPI } from "../../../API/Client";
import FormErrorBox from "../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../Reusable/DataDisplayRowText";
import FormTextareaField from "../../Reusable/FormTextareaField";
import DataDisplayRowSelect from "../../Reusable/DataDisplayRowSelect";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../AppState";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminClientDetailCommentList() {
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
    const [content, setContent] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = () => {
        console.log("onSubmitClick: Beginning...");// Submit to the backend.
        console.log("onSubmitClick, content:", content);
        setErrors(null);
        postClientCreateCommentOperationAPI(
            cid, content, onUpdateSuccess, onUpdateError, onUpdateDone
        );
    }

    ////
    //// API.
    ////

    // --- Details --- //

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

    // --- Update --- //

    function onUpdateSuccess(response){
        console.log("onSuccess: Starting...");
        setClient(response);
        setContent("");

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Comment created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSuccess: Delayed for 2 seconds.");
            console.log("onSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUpdateError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onUpdateDone() {
        console.log("onDone: Starting...");
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/clients" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link></li>
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
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faMessage} />&nbsp;Comments</p>
                            </div>
                            <div class="column has-text-right">
                                {/*
                                <Link to={`/admin/client/${cid}/edit`} class="button is-small is-success is-fullwidth-mobile" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Comment
                                </Link>
                                */}
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

                                    {/* Tab Navigation */}
                                    <div class="tabs is-medium">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/client/${cid}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/detail`}>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/orders`}>Orders</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link><strong>Comments</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/attachments`}>Attachments</Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {client.comments && client.comments.length > 0 && <>
                                        {client.comments.map(function(comment, i){
                                            console.log(comment); // For debugging purposes only.
                                            return <div className="pb-3">
                                                <span class="is-pulled-right has-text-grey-light">{comment.createdByName} at <b>{DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED)}</b></span>
                                                <br />
                                                <article class="message">
                                                    <div class="message-body">{comment.content}</div>
                                                </article>
                                            </div>
                                        })}
                                    </>}

                                    <div class="mt-4 block has-background-success-light p-3">
                                        <FormTextareaField
                                            label="Write your comment here:"
                                            name="content"
                                            placeholder="Text input"
                                            value={content}
                                            errorText={errors && errors.content}
                                            helpText=""
                                            onChange={(e)=>setContent(e.target.value)}
                                            isRequired={true}
                                            maxWidth="180px"
                                        />
                                    </div>

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/clients`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button onClick={onSubmitClick} class="button is-success is-fullwidth-mobile">
                                                <FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Comment
                                            </button>
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

export default AdminClientDetailCommentList;
