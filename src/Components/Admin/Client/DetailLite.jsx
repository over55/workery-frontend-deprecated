import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding } from '@fortawesome/free-solid-svg-icons'
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


function AdminClientDetailLite() {
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
                                <Link to={`/root/client/${cid}/edit`} class="button is-small is-warning is-fullwidth-mobile" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>
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
                                            <li class="is-active">
                                                <Link><strong>Summary</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/detail`}>Detail</Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <DataDisplayRowSelect
                                        label="Type"
                                        selectedValue={client.type}
                                        options={CLIENT_TYPE_OF_FILTER_OPTIONS}
                                    />

                                    {client.type === COMMERCIAL_CUSTOMER_TYPE_OF_ID && <>
                                        <DataDisplayRowText
                                            label="Organization Name"
                                            value={client.organizationName}
                                        />
                                        <DataDisplayRowSelect
                                            label="Organization Type"
                                            selectedValue={client.organizationType}
                                            options={CLIENT_ORGANIZATION_TYPE_OPTIONS}
                                        />
                                    </>}

                                    <DataDisplayRowText
                                        label="First Name"
                                        value={client.firstName}
                                    />

                                    <DataDisplayRowText
                                        label="Last Name"
                                        value={client.lastName}
                                    />

                                    <DataDisplayRowText
                                        label="Email"
                                        value={client.email}
                                        type="email"
                                    />

                                    <DataDisplayRowText
                                        label="Phone"
                                        value={client.phone}
                                        type="phone"
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/clients`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/client/${cid}/edit`} class="button is-warning is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default AdminClientDetailLite;
