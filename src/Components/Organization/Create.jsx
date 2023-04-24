import React, { useState, useEffect, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faIdCard, faSquarePhone, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { postOrganizationCreateAPI } from "../../API/Organization";
import useLocalStorage from "../../Hooks/useLocalStorage";
import FormErrorBox from "../Element/FormErrorBox";
import FormInputField from "../Element/FormInputField";
import FormTextareaField from "../Element/FormTextareaField";


function OrganizationCreate() {
    ////
    //// Component states.
    ////

    const [setOrganization] = useLocalStorage(null);
    const [errors, setErrors] = useState({
        // "schemaName": "missing value",
    });
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [schemaName, setSchemaName] = useState("");
    const [name, setName] = useState("");
    const [alternateName, setAlternateName] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [addressCountry, setAddressCountry] = useState("");
    const [addressRegion, setAddressRegion] = useState("");
    const [addressLocality, setAddressLocality] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [streetAddressExtra, setStreetAddressExtra] = useState("");

    ////
    //// API.
    ////

    const onOrganizationCreateSuccess = useCallback((organization) => {
        console.log("onOrganizationCreateSuccess: Starting...");
        setOrganization(organization);

        setForceURL("/organization/"+organization.id+"?msg=updated");
    }, [setOrganization, setForceURL]);

    const onOrganizationCreateError = useCallback((apiErr) => {
        console.log("onOrganizationCreateError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }, [setErrors,]);

    const onOrganizationCreateDone = useCallback(() => {
        console.log("onOrganizationCreateDone: Starting...");
        setFetching(false);
    }, [setFetching,]);

    ////
    //// Event handling.
    ////

    function onSchemaNameChange(e) {
        setSchemaName(e.target.value);
    }

    function onNameChange(e) {
        setName(e.target.value)
    }

    function onAlternateNameChange(e) {
        setAlternateName(e.target.value);
    }

    function onDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function onEmailChange(e) {
        setEmail(e.target.value);
    }

    function onTelephoneChange(e) {
        setTelephone(e.target.value);
    }

    function onAddressCountryChange(e) {
        setAddressCountry(e.target.value);
    }

    function onAddressRegionChange(e) {
        setAddressRegion(e.target.value);
    }

    function onAddressLocalityChange(e) {
        setAddressLocality(e.target.value);
    }

    function onPostalCodeChange(e) {
        setPostalCode(e.target.value);
    }

    function onStreetAddressChange(e) {
        setStreetAddress(e.target.value);
    }

    function onStreetAddressExtraChange(e) {
        setStreetAddressExtra(e.target.value);
    }

    function onSubmitClick(e) {
        const org = {
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
        postOrganizationCreateAPI(
            org,
            onOrganizationCreateSuccess,
            onOrganizationCreateError,
            onOrganizationCreateDone
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
    }, []);

    ////
    //// Component rendering.
    ////

    console.log("err", errors);

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
                            <li class="is-active"><Link aria-current="page">Create</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <h1 class="title is-1"><FontAwesomeIcon className="mdi" icon={faBuilding} />&nbsp;Add Organization</h1>
                        <FormErrorBox errors={errors} />

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
                                <FormInputField
                                    label="Schema Name"
                                    name="schemaName"
                                    placeholder="Schema Name"
                                    value={schemaName}
                                    errorText={errors && errors.schemaName}
                                    helpText=""
                                    onChange={onSchemaNameChange}
                                    isRequired={true}
                                    maxWidth="150px"
                                />
                                <FormInputField
                                    label="Name"
                                    name="name"
                                    placeholder="Schema Name"
                                    value={name}
                                    errorText={errors && errors.name}
                                    helpText=""
                                    onChange={onNameChange}
                                    isRequired={true}
                                    maxWidth="450px"
                                />
                                <FormInputField
                                    label="Alternate Name"
                                    name="alternateName"
                                    placeholder="Alternate Name"
                                    value={alternateName}
                                    errorText={errors && errors.name}
                                    helpText=""
                                    onChange={onAlternateNameChange}
                                    isRequired={true}
                                    maxWidth="350px"
                                />
                                <FormTextareaField
                                    label="Description"
                                    name="description"
                                    placeholder="Description"
                                    value={description}
                                    errorText={errors && errors.description}
                                    helpText=""
                                    onChange={onDescriptionChange}
                                    isRequired={true}
                                    maxWidth="100%"
                                />

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faSquarePhone} />&nbsp;Contact</p>
                                <FormInputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    errorText={errors && errors.email}
                                    helpText=""
                                    onChange={onEmailChange}
                                    isRequired={true}
                                    maxWidth="200px"
                                />
                                <FormInputField
                                    label="Telephone"
                                    name="telephone"
                                    type="text"
                                    placeholder="Telephone"
                                    value={telephone}
                                    errorText={errors && errors.telephone}
                                    helpText=""
                                    onChange={onTelephoneChange}
                                    isRequired={true}
                                    maxWidth="200px"
                                />

                                <p class="subtitle is-3 pt-3"><FontAwesomeIcon className="is-white" icon={faAddressCard} />&nbsp;Address</p>
                                <FormInputField
                                    label="Country"
                                    name="addressCountry"
                                    type="text"
                                    placeholder="Country"
                                    value={addressCountry}
                                    errorText={errors && errors.addressCountry}
                                    helpText=""
                                    onChange={onAddressCountryChange}
                                    isRequired={true}
                                    maxWidth="150px"
                                />
                                <FormInputField
                                    label="Region"
                                    name="addressRegion"
                                    type="text"
                                    placeholder="Region"
                                    value={addressRegion}
                                    errorText={errors && errors.addressRegion}
                                    helpText=""
                                    onChange={onAddressRegionChange}
                                    isRequired={true}
                                    maxWidth="150px"
                                />
                                <FormInputField
                                    label="Locality"
                                    name="addressLocality"
                                    type="text"
                                    placeholder="Locality"
                                    value={addressLocality}
                                    errorText={errors && errors.addressLocality}
                                    helpText=""
                                    onChange={onAddressLocalityChange}
                                    isRequired={true}
                                    maxWidth="150px"
                                />
                                <FormInputField
                                    label="Postal Code"
                                    name="postalCode"
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    errorText={errors && errors.postalCode}
                                    helpText=""
                                    onChange={onPostalCodeChange}
                                    isRequired={true}
                                    maxWidth="100px"
                                />
                                <FormInputField
                                    label="Street Address"
                                    name="streetAddress"
                                    type="text"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    errorText={errors && errors.streetAddress}
                                    helpText=""
                                    onChange={onStreetAddressChange}
                                    isRequired={true}
                                    maxWidth="500px"
                                />
                                <FormInputField
                                    label="Street Address Extra line (Optional)"
                                    name="streetAddressExtra"
                                    type="text"
                                    placeholder="Street Address Extra line (Optional)"
                                    value={streetAddressExtra}
                                    errorText={errors && errors.streetAddressExtra}
                                    helpText=""
                                    onChange={onStreetAddressExtraChange}
                                    isRequired={false}
                                    maxWidth="500px"
                                />
                                <div class="columns pt-3">
                                    <div class="column is-half">
                                        <Link to={`/organizations`} class="button is-hidden-touch">Back</Link>
                                        <Link to={`/organizations`} class="button is-fullwidth is-hidden-desktop">Back</Link>
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

export default OrganizationCreate;
