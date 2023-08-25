import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getClientDetailAPI, postClientCreateAPI } from "../../../../API/Client";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID  } from "../../../../Constants/App";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function AdminClientAddStep3() {
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
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////

    const onSelectTypeOf = (to) => {
        console.log("--->", to);
        setForceURL("/admin/clients/add/step-4");
    }


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        if (firstName === "" && lastName === "" && email === "" && phone === "") {
            setErrors({
                message: "please enter a value"
            });
            return
        }
        setForceURL("/admin/clients/add/step-2?fn="+firstName+"&ln="+lastName+"&e="+email+"&p="+phone);
    }

    function onAdminClientAddSuccess(response){
        // For debugging purposes only.
        console.log("onAdminClientAddSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Client created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminClientAddSuccess: Delayed for 2 seconds.");
            console.log("onAdminClientAddSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to a new page.
        setForceURL("/admin/Client/"+response.id);
    }

    function onAdminClientAddError(apiErr) {
        console.log("onAdminClientAddError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminClientAddError: Delayed for 2 seconds.");
            console.log("onAdminClientAddError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminClientAddDone() {
        console.log("onAdminClientAddDone: Starting...");
        setFetching(false);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            setFetching(false);
        }
        return () => { mounted = false; }
    }, []);
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/clients" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New Client</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">
                        <div class={`modal ${showCancelWarning ? 'is-active' : ''}`}>
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Are you sure?</p>
                                    <button class="delete" aria-label="close" onClick={(e)=>setShowCancelWarning(false)}></button>
                                </header>
                                <section class="modal-card-body">
                                    Your Client record will be cancelled and your work will be lost. This cannot be undone. Do you want to continue?
                                </section>
                                <footer class="modal-card-foot">
                                    <Link class="button is-medium is-success" to={`/admin/clients`}>Yes</Link>
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-4">Select Client Type:</p>

                        <p class="pb-4 has-text-grey">Please select the type of client this is.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                <div class="container">
                                    <div class="columns">

                                        {/* Residential */}
                                        <div class="column">
                                            <div class="card">
                                                <div class="card-image">
                                                    <figure class="image is-4by3">
                                                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                                    </figure>
                                                </div>
                                                <div class="card-content">
                                                    <div class="media">

                                                      <div class="media-content">
                                                        <p class="title is-4">Residential User</p>
                                                      </div>
                                                    </div>

                                                    <div class="content">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                                      <a href="#">#css</a> <a href="#">#responsive</a>
                                                      <br />
                                                    </div>
                                                </div>
                                                <footer class="card-footer">
                                                    <a onClick={(e,s)=>onSelectTypeOf(RESIDENTIAL_CUSTOMER_TYPE_OF_ID)} class="card-footer-item">Pick&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></a>
                                                </footer>
                                            </div>
                                        </div>

                                        {/* Business */}
                                        <div class="column">
                                            <div class="card">
                                                <div class="card-image">
                                                    <figure class="image is-4by3">
                                                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                                                    </figure>
                                                </div>
                                                <div class="card-content">
                                                    <div class="media">

                                                      <div class="media-content">
                                                        <p class="title is-4">Business User</p>
                                                      </div>
                                                    </div>

                                                    <div class="content">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                                      <a href="#">#css</a> <a href="#">#responsive</a>
                                                      <br />
                                                    </div>
                                                </div>
                                                <footer class="card-footer">
                                                    <a onClick={(e,s)=>onSelectTypeOf(COMMERCIAL_CUSTOMER_TYPE_OF_ID)} class="card-footer-item">Pick&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></a>
                                                </footer>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <button class="button is-medium is-fullwidth-mobile" onClick={(e)=>setShowCancelWarning(true)}><FontAwesomeIcon className="fas" icon={faTimesCircle} />&nbsp;Cancel</button>
                                        </div>
                                        <div class="column is-half has-text-right">

                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminClientAddStep3;
