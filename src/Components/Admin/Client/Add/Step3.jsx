import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID  } from "../../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../AppState";


function AdminClientAddStep3() {
    ////
    //// Global state.
    ////

    const [addCustomer, setAddCustomer] = useRecoilState(addCustomerState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    ////
    //// Event handling.
    ////

    const onSelectType = (to) => {
        let modifiedAddCustomer = { ...addCustomer };
        modifiedAddCustomer.type = to;
        setAddCustomer(modifiedAddCustomer);
        setForceURL("/admin/clients/add/step-4");
    }

    ////
    //// API.
    ////

    // Nothing...

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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
                                    <Link class="button is-medium is-success" to={`/admin/clients/add/step-1`}>Yes</Link>
                                    <button class="button is-medium" onClick={(e)=>setShowCancelWarning(false)}>No</button>
                                </footer>
                            </div>
                        </div>

                        <p class="title is-4">Select Client Type:</p>

                        <p class="pb-4 has-text-grey">Please select the type of client this is.</p>

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
                                                <a onClick={(e,s)=>onSelectType(RESIDENTIAL_CUSTOMER_TYPE_OF_ID)} class="card-footer-item">Pick&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></a>
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
                                                <a onClick={(e,s)=>onSelectType(COMMERCIAL_CUSTOMER_TYPE_OF_ID)} class="card-footer-item">Pick&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></a>
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

                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminClientAddStep3;
