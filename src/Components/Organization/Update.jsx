import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faIdCard, faSquarePhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'
import { putOrganizationUpdateAPI } from "../../API/Organization";
import { getSelectedOptions } from "../../Helpers/selectHelper";
import useLocalStorage from "../../Hooks/useLocalStorage";

const IS_VALID = 1
const IS_ERROR = 2
const IS_REQUIRED = 3
const IS_OPTIONAL = 4

function OrganizationUpdate() {
    ////
    ////
    ////

    const { id } = useParams()

    ////
    //// Component states.
    ////

    const [organization, setOrganization] = useLocalStorage(id, "");
    const [errors, setErrors] = useState({
        // "schemaName": "missing value",
    });
    const [validation, setValidation] = useState({
        "schemaName": false,
        "name": false,
        "alternateName": false,
        "description": false,
        "email": false,
        "telephone": false,
        "addressCountry": false,
        "addressRegion": false,
        "addressLocality": false,
        "postalCode": false,
        "streetAddress": false,
        "streetAddressExtra": false,
    });
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [schemaName, setSchemaName] = useState(organization.schemaName);
    const [name, setName] = useState(organization.name);
    const [alternateName, setAlternateName] = useState(organization.alternateName);
    const [description, setDescription] = useState(organization.description);
    const [email, setEmail] = useState(organization.email);
    const [telephone, setTelephone] = useState(organization.telephone);
    const [addressCountry, setAddressCountry] = useState(organization.addressCountry);
    const [addressRegion, setAddressRegion] = useState(organization.addressRegion);
    const [addressLocality, setAddressLocality] = useState(organization.addressLocality);
    const [postalCode, setPostalCode] = useState(organization.postalCode);
    const [streetAddress, setStreetAddress] = useState(organization.streetAddress);
    const [streetAddressExtra, setStreetAddressExtra] = useState(organization.streetAddressExtra);

    ////
    //// API.
    ////

    function onOrganizationUpdateSuccess(response){
        console.log("onOrganizationUpdateSuccess: Starting...");
        setOrganization(response);

        setForceURL("/organization/"+organization.id+"?msg=updated");
    }

    function onOrganizationUpdateError(apiErr) {
        console.log("onOrganizationUpdateError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationUpdateDone() {
        console.log("onOrganizationUpdateDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    function onSchemaNameChange(e) {
        setSchemaName(e.target.value);
        validation["schemaName"] = e.target.value !== "";
        setValidation(validation);
    }

    function onNameChange(e) {
        setName(e.target.value);
        validation["name"] = e.target.value !== "";
        setValidation(validation);
    }

    function onAlternateNameChange(e) {
        setAlternateName(e.target.value);
        validation["alternateName"] = e.target.value !== "";
        setValidation(validation);
    }

    function onDescriptionChange(e) {
        setDescription(e.target.value);
        validation["description"] = e.target.value !== "";
        setValidation(validation);
    }

    function onEmailChange(e) {
        setEmail(e.target.value);
        validation["email"] = e.target.value !== "";
        setValidation(validation);
    }

    function onTelephoneChange(e) {
        setTelephone(e.target.value);
        validation["telephone"] = e.target.value !== "";
        setValidation(validation);
    }

    function onAddressCountryChange(e) {
        setAddressCountry(e.target.value);
        validation["addressCountry"] = e.target.value !== "";
        setValidation(validation);
    }

    function onAddressRegionChange(e) {
        setAddressRegion(e.target.value);
        validation["addressRegion"] = e.target.value !== "";
        setValidation(validation);
    }

    function onAddressLocalityChange(e) {
        setAddressLocality(e.target.value);
        validation["addressLocality"] = e.target.value !== "";
        setValidation(validation);
    }

    function onPostalCodeChange(e) {
        setPostalCode(e.target.value);
        validation["postalCode"] = e.target.value !== "";
        setValidation(validation);
    }

    function onStreetAddressChange(e) {
        setStreetAddress(e.target.value);
        validation["streetAddress"] = e.target.value !== "";
        setValidation(validation);
    }

    function onStreetAddressExtraChange(e) {
        setStreetAddressExtra(e.target.value);
        validation["streetAddressExtra"] = e.target.value !== "";
        setValidation(validation);
    }

    function onSubmitClick(e) {
        const org = {
            id: parseInt(id),
            name: name,
            state: 1,
            schemaName: schemaName,
            alternateName: alternateName,
            description: description,
            email: email,
            telephone: telephone,
            addressCountry: addressCountry,
            addressRegion: addressRegion,
            addressLocality: addressLocality,
            postalCode: postalCode,
            streetAddress: streetAddress,
            streetAddressExtra: streetAddressExtra,
        };
        setFetching(true);
        putOrganizationUpdateAPI(
            org,
            onOrganizationUpdateSuccess,
            onOrganizationUpdateError,
            onOrganizationUpdateDone
        );
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
        }

        return () => { mounted = false; }
    }, [id]);

    ////
    //// Component rendering.
    ////

    console.log("err", errors);
    console.log("validation", validation);

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

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
                                <p class="subtitle is-3"><FontAwesomeIcon className="is-white" icon={faIdCard} />&nbsp;Identification</p>
                                <div class="field">
                                    <label class="label">ID</label>
                                    <div class="control">
                                        <input class="input"
                                                type="text"
                                         placeholder="Text input"
                                               value={id}
                                            disabled={true}
                                               style={{maxWidth:"100px"}}  />
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Schema</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.schemaName && 'is-danger'} ${validation && validation.schemaName ? 'is-success' : "is-primary"}`}
                                                type="text"
                                         placeholder="Text input"
                                               style={{maxWidth:"100px"}}
                                               value={schemaName}
                                            onChange={onSchemaNameChange}
                                        />
                                        {errors && errors.schemaName &&
                                            <p class="help is-danger">{errors.schemaName}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Name</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.name && 'is-danger'} ${validation && validation.name && 'is-success'}`}
                                                type="text" placeholder="Text input"
                                               value={name}
                                            onChange={onNameChange}
                                               style={{maxWidth:"450px"}} />
                                        {errors && errors.name &&
                                            <p class="help is-danger">{errors.name}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Alternate Name</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.alternateName && 'is-danger'} ${validation && validation.alternateName && 'is-success'}`}
                                                type="text" placeholder="Text input"
                                               value={alternateName}
                                            onChange={onAlternateNameChange}
                                               style={{maxWidth:"350px"}}  />
                                        {errors && errors.alternateName &&
                                            <p class="help is-danger">{errors.alternateName}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Description</label>
                                    <div class="control">
                                        <textarea class={`textarea ${errors && errors.description && 'is-danger'} ${validation && validation.description && 'is-success'}`}
                                            placeholder="Text input"
                                                  value={description}
                                               onChange={onDescriptionChange} />
                                        {errors && errors.description &&
                                            <p class="help is-danger">{errors.description}</p>
                                        }
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faSquarePhone} />&nbsp;Contact</p>
                                <div class="field">
                                    <label class="label">Email</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.email && 'is-danger'} ${validation && validation.email && 'is-success'}`}
                                                type="email" placeholder="Email input"
                                               value={email}
                                            onChange={onEmailChange}
                                               style={{maxWidth:"200px"}}  />
                                       {errors && errors.email &&
                                           <p class="help is-danger">{errors.email}</p>
                                       }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Telephone</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.telephone && 'is-danger'} ${validation && validation.telephone && 'is-success'}`}
                                                type="text" placeholder="Telephone input"
                                        value={telephone}
                                     onChange={onTelephoneChange}
                                        style={{maxWidth:"200px"}}  />
                                        {errors && errors.telephone &&
                                            <p class="help is-danger">{errors.telephone}</p>
                                        }
                                    </div>
                                </div>

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faAddressCard} />&nbsp;Address</p>
                                <div class="field">
                                    <label class="label">Country</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.addressCountry && 'is-danger'} ${validation && validation.addressCountry && 'is-success'}`}
                                                type="text" placeholder="Text input"
                                        value={addressCountry}
                                     onChange={onAddressCountryChange}
                                        style={{maxWidth:"150px"}} />
                                        {errors && errors.addressCountry &&
                                            <p class="help is-danger">{errors.addressCountry}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Region</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.addressRegion && 'is-danger'} ${validation && validation.addressRegion && 'is-success'}`}
                                                type="text" placeholder="Text input"
                                        value={addressRegion}
                                     onChange={onAddressRegionChange}
                                        style={{maxWidth:"250px"}} />
                                        {errors && errors.addressRegion &&
                                            <p class="help is-danger">{errors.addressRegion}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Locality</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.addressLocality && 'is-danger'} ${validation && validation.addressLocality && 'is-success'}`}
                                                type="text" placeholder="Text input"
                                        value={addressLocality}
                                     onChange={onAddressLocalityChange}
                                        style={{maxWidth:"350px"}} />
                                        {errors && errors.addressLocality &&
                                            <p class="help is-danger">{errors.addressLocality}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Postal Code</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.postalCode && 'is-danger'} ${validation && validation.postalCode && 'is-success'}`}
                                        type="text" placeholder="Text input"
                                        value={postalCode}
                                     onChange={onPostalCodeChange}
                                        style={{maxWidth:"100px"}} />
                                        {errors && errors.postalCode &&
                                            <p class="help is-danger">{errors.postalCode}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.streetAddress && 'is-danger'} ${validation && validation.streetAddress && 'is-success'}`}
                                        type="text" placeholder="Text input"
                                        value={streetAddress}
                                     onChange={onStreetAddressChange}
                                        style={{maxWidth:"500px"}} />
                                        {errors && errors.streetAddress &&
                                            <p class="help is-danger">{errors.streetAddress}</p>
                                        }
                                    </div>
                                </div>
                                <div class="field">
                                    <label class="label">Street Address (Extra line)</label>
                                    <div class="control">
                                        <input class={`input ${errors && errors.streetAddressExtra && 'is-danger'} ${validation && validation.streetAddressExtra && 'is-success'}`}
                                        type="text" placeholder="Text input"
                                        value={streetAddressExtra}
                                     onChange={onStreetAddressExtraChange}
                                        style={{maxWidth:"500px"}} />
                                        {errors && errors.streetAddressExtra &&
                                            <p class="help is-danger">{errors.streetAddressExtra}</p>
                                        }
                                    </div>
                                </div>
                                <div class="columns pt-3">
                                    <div class="column is-half">
                                        <Link to={`/organization/${id}`} class="button is-hidden-touch">Back</Link>
                                        <Link to={`/organization/${id}`} class="button is-fullwidth is-hidden-desktop">Back</Link>
                                    </div>
                                    <div class="column is-half has-text-right">
                                        <button onClick={onSubmitClick} class="button is-primary is-hidden-touch">Save</button>
                                        <button onClick={onSubmitClick} class="button is-primary is-fullwidth is-hidden-desktop">Save</button>
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
