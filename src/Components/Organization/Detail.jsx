import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faChevronRight, faEye, faIdCard, faSquarePhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
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
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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
                        <h1 class="title is-1"><FontAwesomeIcon className="mdi" icon={faBuilding} />&nbsp;Organization Details</h1>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                                <div class="loader-wrapper is-centered">
                                  <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                                </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="columns">
                            <div class="column">
                                <p class="subtitle is-3"><FontAwesomeIcon className="is-white" icon={faIdCard} />&nbsp;Identification</p>
                                <div class="field">
                                    <label class="label">ID</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={id} disabled={true} style={{maxWidth:"100px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Schema</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.schemaName} disabled={true} style={{maxWidth:"100px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.name} disabled={true} style={{maxWidth:"450px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Alternate Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.alternateName} disabled={true} style={{maxWidth:"350px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" placeholder="Text input" value={organization.description} disabled={true} />
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faSquarePhone} />&nbsp;Contact</p>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" placeholder="Email input" value={organization.email} disabled={true} style={{maxWidth:"200px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Telephone</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Telephone input" value={organization.telephone} disabled={true} style={{maxWidth:"200px"}}  />
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faAddressCard} />&nbsp;Address</p>
                                <div class="field">
                                    <label class="label">Country</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressCountry} disabled={true} style={{maxWidth:"150px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Region</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressRegion} disabled={true} style={{maxWidth:"250px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Locality</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressLocality} disabled={true} style={{maxWidth:"350px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Postal Code</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.postalCode} disabled={true} style={{maxWidth:"100px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.streetAddress} disabled={true} style={{maxWidth:"500px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address (Extra line)</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.streetAddressExtra} disabled={true} style={{maxWidth:"500px"}} />
                                    </div>
                                </div>
                                <div class="columns pt-3">
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
