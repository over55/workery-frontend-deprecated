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


function OrganizationUpdate() {
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
                            <li class=""><Link to={`/organization/${id}`} aria-current="page">Details</Link></li>
                            <li class="is-active"><Link to={`/organization`} aria-current="page">Edit</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <h1 class="title is-1"><FontAwesomeIcon className="mdi" icon={faBuilding} />&nbsp;Edit Organization</h1>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                                <div class="loader-wrapper is-centered">
                                  <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                                </div>
                            </div>
                        </div>}

                        {!isFetching && <div class="columns">
                            <div class="column">
                                <p class="subtitle is-3">Identification</p>
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
                                        <input class="input" type="text" placeholder="Text input" value={organization.name} style={{maxWidth:"450px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Alternate Name</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.alternateName} style={{maxWidth:"350px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class="textarea" placeholder="Text input" value={organization.description} />
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3">Contact</p>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class="input" type="email" placeholder="Email input" value={organization.email} style={{maxWidth:"200px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Telephone</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Telephone input" value={organization.telephone} style={{maxWidth:"200px"}}  />
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3">Address</p>
                                <div class="field">
                                    <label class="label">Country</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressCountry} style={{maxWidth:"150px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Region</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressRegion} style={{maxWidth:"250px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Locality</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.addressLocality} style={{maxWidth:"350px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Postal Code</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.postalCode} style={{maxWidth:"100px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.streetAddress} style={{maxWidth:"500px"}} />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address (Extra line)</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Text input" value={organization.streetAddressExtra} style={{maxWidth:"500px"}} />
                                    </div>
                                </div>
                                <div class="columns pt-3">
                                    <div class="column is-half">
                                        <Link to="/organizations" class="button is-hidden-touch">Back</Link>
                                        <Link to="/organizations" class="button is-fullwidth is-hidden-desktop">Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <button class="button is-primary is-hidden-touch">Save</button>
                                        <button class="button is-primary is-fullwidth is-hidden-desktop">Save</button>
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

export default OrganizationUpdate;
