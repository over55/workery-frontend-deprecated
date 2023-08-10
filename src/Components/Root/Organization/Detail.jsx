import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getOrganizationDetailAPI } from "../../../API/Organization";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../AppState";
import FormRowText from "../../Reusable/FormRowText";
import FormTextYesNoRow from "../../Reusable/FormRowTextYesNo";


function RootOrganizationDetail() {
    ////
    //// URL Parameters.
    ////

    const { tid } = useParams()

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
    const [organization, setOrganization] = useState({});
    const [tabIndex, setTabIndex] = useState(1);

    ////
    //// Event handling.
    ////

    //

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
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            console.log(tid)
            getOrganizationDetailAPI(
                tid,
                onOrganizationDetailSuccess,
                onOrganizationDetailError,
                onOrganizationDetailDone
            );
        }

        return () => { mounted = false; }
    }, [tid]);
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
                    <nav class="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/root/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Admin Dashboard</Link></li>
                            <li class=""><Link to="/root/organizations" aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        {organization && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization</p>
                            </div>
                            {/* HIDDEN */}
                            <div class="is-hidden column has-text-right">
                                {/* Mobile Specific */}
                                <Link to={`/root/submissions/comics/add?organization_id=${tid}&organization_name=${organization.name}`} class="button is-small is-success is-fullwidth is-hidden-desktop" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                                {/* Desktop Specific */}
                                <Link to={`/root/submissions/comics/add?organization_id=${tid}&organization_name=${organization.name}`} class="button is-small is-success is-hidden-touch" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;CPS
                                </Link>
                            </div>
                        </div>}
                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {organization && <div class="container">

                                    <p class="subtitle is-6 pt-4"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Identification</p>
                                    <hr />

                                    <FormRowText
                                        label="Schema Name"
                                        value={organization.schemaName}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Name"
                                        value={organization.name}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Alternate Name"
                                        value={organization.alternateName}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Description"
                                        value={organization.description}
                                        helpText=""
                                    />

                                    <p class="subtitle is-6 pt-4"><FontAwesomeIcon className="fas" icon={faSquarePhone} />&nbsp;Contact</p>
                                    <hr />

                                    <FormRowText
                                        label="Email"
                                        value={organization.email}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Telephone"
                                        value={organization.telephone}
                                        helpText=""
                                    />

                                    <p class="subtitle is-6 pt-4"><FontAwesomeIcon className="fas" icon={faAddressCard} />&nbsp;Address</p>
                                    <hr />

                                    <FormRowText
                                        label="Country"
                                        value={organization.addressCountry}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Country"
                                        value={organization.addressCountry}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="State/Province"
                                        value={organization.addressRegion}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="City"
                                        value={organization.addressLocality}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Postal Code"
                                        value={organization.postalCode}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Address"
                                        value={organization.streetAddress}
                                        helpText=""
                                    />

                                    <FormRowText
                                        label="Address (Extra line)"
                                        value={organization.streetAddressExtra}
                                        helpText=""
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-hidden-touch" to={`/root/organizations`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                            <Link class="button is-fullwidth is-hidden-desktop" to={`/root/organizations`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/root/organization/${tid}/edit`} class="button is-primary is-hidden-touch"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                            <Link to={`/root/organization/${tid}/edit`} class="button is-primary is-fullwidth is-hidden-desktop"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
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

export default RootOrganizationDetail;
