import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getClientDetailAPI } from "../../../API/Client";
import FormErrorBox from "../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../Reusable/DataDisplayRowText";
import DataDisplayRowCheckbox from "../../Reusable/DataDisplayRowCheckbox";
import DataDisplayRowRadio from "../../Reusable/DataDisplayRowRadio";
import DataDisplayRowSelect from "../../Reusable/DataDisplayRowSelect";
import DataDisplayRowTags from "../../Reusable/DataDisplayRowTags";
import DataDisplayRowHowHearAboutUsItem from "../../Reusable/DataDisplayRowHowHear";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../AppState";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS } from "../../../Constants/FieldOptions";


function AdminClientDetailFull() {
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
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Detail</p>
                            </div>
                            <div class="column has-text-right">
                                <Link to={`/admin/client/${cid}/edit`} class="button is-small is-warning is-fullwidth-mobile" type="button">
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
                                            <li>
                                                <Link to={`/admin/client/${client.id}`}>Summary</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link><strong>Detail</strong></Link>
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
                                            <li>
                                                <Link to={`/admin/client/${client.id}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <p class="title is-4 mt-2"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Contact</p>

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

                                    <DataDisplayRowCheckbox
                                       label="I agree to receive electronic email"
                                       checked={client.isOkToEmail}
                                    />

                                    <DataDisplayRowText
                                        label="Phone"
                                        value={client.phone}
                                        type="phone"
                                    />

                                    <DataDisplayRowSelect
                                        label="Phone Type"
                                        selectedValue={client.phoneType}
                                        options={CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />

                                    <DataDisplayRowCheckbox
                                       label="I agree to receive texts to my phone"
                                       checked={client.isOkToText}
                                    />

                                    <DataDisplayRowText
                                        label="Other Phone (Optional)"
                                        value={client.otherPhone}
                                        type="phone"
                                    />

                                    {client.otherPhoneType !== 0 && <DataDisplayRowSelect
                                        label="Other Phone Type (Optional)"
                                        selectedValue={client.otherPhoneType}
                                        options={CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />}

                                    <p class="title is-4"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>

                                    <DataDisplayRowCheckbox
                                       label="Has shipping address different then billing address"
                                       checked={client.hasShippingAddress}
                                    />

                                    <div class="columns">
                                        <div class="column">
                                            {client.hasShippingAddress
                                                ? <p class="subtitle is-6">Billing Address</p>
                                                : <></>
                                            }

                                            <DataDisplayRowText
                                                label="Country"
                                                value={client.country}
                                            />

                                            <DataDisplayRowText
                                                label="Province/Territory"
                                                value={client.region}
                                            />

                                            <DataDisplayRowText
                                                label="City"
                                                value={client.city}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 1"
                                                value={client.addressLine1}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 2 (Optional)"
                                                value={client.addressLine2}
                                            />

                                            <DataDisplayRowText
                                                label="Postal Code)"
                                                value={client.postalCode}
                                            />
                                        </div>
                                        {client.hasShippingAddress &&<div class="column">
                                            <p class="subtitle is-6">Shipping Address</p>

                                            <DataDisplayRowText
                                                label="Name"
                                                value={client.shippingName}
                                            />

                                            <DataDisplayRowText
                                                label="Phone"
                                                value={client.shippingPhone}
                                                type="phone"
                                            />

                                            <DataDisplayRowText
                                                label="Country"
                                                value={client.shippingCountry}
                                            />

                                            <DataDisplayRowText
                                                label="Province/Territory"
                                                value={client.shippingRegion}
                                            />

                                            <DataDisplayRowText
                                                label="City"
                                                value={client.shippingCity}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 1"
                                                value={client.shippingAddressLine1}
                                            />

                                            <DataDisplayRowText
                                                label="Address Line 2 (Optional)"
                                                value={client.shippingAddressLine2}
                                            />

                                            <DataDisplayRowText
                                                label="Postal Code"
                                                value={client.shippingPostalCode}
                                            />
                                        </div>}
                                    </div>

                                    <p class="title is-4"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>

                                    <DataDisplayRowTags
                                        tags={client.tags}
                                    />

                                    <DataDisplayRowHowHearAboutUsItem
                                        howDidYouHearAboutUsID={client.howDidYouHearAboutUsID}
                                    />

                                    {client.howDidYouHearAboutUsOther !== undefined && client.howDidYouHearAboutUsOther !== null && client.howDidYouHearAboutUsOther !== null &&
                                        <DataDisplayRowText
                                            label="How did you hear about us? (Other)"
                                            value={client.howDidYouHearAboutUsOther}
                                        />
                                    }

                                    <DataDisplayRowRadio
                                        label="Gender"
                                        value={client.gender}
                                        opt1Value="Male"
                                        opt1Label="Male"
                                        opt2Value="Female"
                                        opt2Label="Female"
                                        opt3Value="Other"
                                        opt3Label="Other"
                                    />

                                    <DataDisplayRowText
                                        label="Birth Date (Optional)"
                                        value={client.birthDate}
                                        type="date"
                                    />

                                    <DataDisplayRowText
                                        label="Join Date (Optional)"
                                        value={client.joinDate}
                                        type="date"
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

export default AdminClientDetailFull;
