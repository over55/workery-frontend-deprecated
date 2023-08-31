import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingUser, faImage, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis, faArchive, faBoxOpen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getClientDetailAPI } from "../../../API/Client";
import FormErrorBox from "../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../Reusable/DataDisplayRowText";
import DataDisplayRowSelect from "../../Reusable/DataDisplayRowSelect";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../AppState";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminClientDetailMore() {
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
    const [tabIndex, setTabIndex] = useState(1);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

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
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPaperclip} />&nbsp;Summary</p>
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

                                    {/* Tab Navigation */}
                                    <div class="tabs is-medium">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/client/${client.id}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/detail`}>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/orders`}>Orders</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/comments`}>Comments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/attachments`}>Attachments</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link><strong>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></strong></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Page Menu Options */}
                                    <section class="hero ">
                                      <div class="hero-body has-text-centered">
                                        <div class="container">
                                            <div class="columns is-vcentered is-multiline">
                                                <div class="column">
                                                    <Link to={`/admin/client/${cid}/avatar`}>
                                                        <FontAwesomeIcon className="mdi has-text-white has-background-danger-dark p-6 mb-3" icon={faImage} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                                        <h1 class="title is-3">Change Photo</h1>
                                                        <p className="has-text-grey">Upload a photo of the client</p>
                                                    </Link>
                                                </div>
                                                {client.status === 2
                                                    ?
                                                    <div class="column">
                                                        <Link to={`/admin/client/${cid}/unarchive`}>
                                                            <FontAwesomeIcon className="mdi has-text-white has-background-success-dark p-6 mb-3" icon={faBoxOpen} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                                            <h1 class="title is-3">Unarchive</h1>
                                                            <p className="has-text-grey">Make client visible in list and search results</p>
                                                        </Link>
                                                    </div>
                                                    :
                                                    <div class="column">
                                                        <Link to={`/admin/client/${cid}/archive`}>
                                                            <FontAwesomeIcon className="mdi has-text-white has-background-success-dark p-6 mb-3" icon={faArchive} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                                            <h1 class="title is-3">Archive</h1>
                                                            <p className="has-text-grey">Make client hidden from list and search results</p>
                                                        </Link>
                                                    </div>
                                                }

                                                <div class="column">
                                                    <Link to={`/admin/client/${cid}/upgrade`}>
                                                        <FontAwesomeIcon className="mdi has-text-white has-background-info-dark p-6 mb-3" icon={faBuildingUser} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                                        <h1 class="title is-3">Upgrade</h1>
                                                        <p className="has-text-grey">Change client to become business client</p>
                                                    </Link>
                                                </div>
                                                <div class="column">
                                                    <Link to={`/admin/client/${cid}/permadelete`}>
                                                        <FontAwesomeIcon className="mdi has-text-white has-background-danger p-6 mb-3" icon={faTrashCan} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                                        <h1 class="title is-3">Delete</h1>
                                                        <p className="has-text-grey">Permanently delete this client and all associated data</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                    </section>

                                    {/* Bottom Navigation */}
                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/clients`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">

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

export default AdminClientDetailMore;
