import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getClientDetailAPI } from "../../../API/Client";
import FormErrorBox from "../../Reusable/FormErrorBox";
import FormRadioField from "../../Reusable/FormRadioField";
import FormInputField from "../../Reusable/FormInputField";
import FormTextareaField from "../../Reusable/FormTextareaField";
import FormMultiSelectField from "../../Reusable/FormMultiSelectField";
import FormSelectField from "../../Reusable/FormSelectField";
import FormCheckboxField from "../../Reusable/FormCheckboxField";
import FormCountryField from "../../Reusable/FormCountryField";
import FormRegionField from "../../Reusable/FormRegionField";
import FormMultiSelectFieldForTags from "../../Reusable/FormMultiSelectFieldForTags";
import FormSelectFieldForHowHearAboutUsItem from "../../Reusable/FormSelectFieldForHowHear";
import FormDateField from "../../Reusable/FormDateField";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID, RESIDENTIAL_CUSTOMER_TYPE_OF_ID } from "../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT, topAlertMessageState, topAlertStatusState } from "../../../AppState";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS_WITH_EMPTY_OPTIONS } from "../../../Constants/FieldOptions";


function AdminClientUpdate() {
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

    // Step 3
    const [customerType, setCustomerType] = useState(0);

    // Step 4
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState(0);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [otherPhone, setOtherPhone] = useState("");
    const [otherPhoneType, setOtherPhoneType] = useState(0);
    const [isOkToText, setIsOkToText] = useState(false);
    const [isOkToEmail, setIsOkToEmail] = useState(false);

    // Step 5
    const [postalCode, setPostalCode] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [hasShippingAddress, setHasShippingAddress] = useState(false);
    const [shippingName, setShippingName] = useState("");
    const [shippingPhone, setShippingPhone] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingRegion, setShippingRegion] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingAddressLine1, setShippingAddressLine1] = useState("");
    const [shippingAddressLine2, setShippingAddressLine2] = useState("");
    const [shippingPostalCode, setShippingPostalCode] = useState("");

    // Step 6
    const [tags, setTags] = useState([]);
    const [howDidYouHearAboutUsID, setHowDidYouHearAboutUsID] = useState("");
    const [isHowDidYouHearAboutUsOther, setIsHowDidYouHearAboutUsOther] = useState(false);
    const [howDidYouHearAboutUsOther, setHowHearAboutUsItemOther] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [joinDate, setJoinDate] = useState(null);
    const [gender, setGender] = useState("");

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onDetailSuccess(response){
        console.log("onDetailSuccess: Starting...");
        setClient(response);

        // Step 3
        setCustomerType(response.type);

        // Step 4
        setOrganizationName(response.organizationName);
        setOrganizationType(response.organizationType);
        setEmail(response.email);
        setPhone(response.phone);
        setPhoneType(response.phoneType);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setOtherPhone(response.otherPhone);
        setOtherPhoneType(response.otherPhoneType);
        setIsOkToText(response.isOkToText);
        setIsOkToEmail(response.isOkToEmail);

        // Step 5
        setPostalCode(response.postalCode);
        setAddressLine1(response.addressLine1);
        setAddressLine2(response.addressLine2);
        setCity(response.city);
        setRegion(response.region);
        setCountry(response.country);
        setHasShippingAddress(response.hasShippingAddress);
        setShippingName(response.shippingName);
        setShippingPhone(response.shippingPhone);
        setShippingCountry(response.shippingCountry);
        setShippingRegion(response.shippingRegion);
        setShippingCity(response.shippingCity);
        setShippingAddressLine1(response.shippingAddressLine1);
        setShippingAddressLine2(response.shippingAddressLine2);
        setShippingPostalCode(response.shippingPostalCode);

        // Step 6
        // (We need to convert into ID strings)
        let tagIDs = [];
        for (let tag of response.tags) {
            tagIDs.push(tag.id);
        }
        setTags(tagIDs);

        setHowDidYouHearAboutUsID(response.howDidYouHearAboutUsID);
        setIsHowDidYouHearAboutUsOther(response.howDidYouHearAboutUsText === "Other");
        setHowHearAboutUsItemOther(response.howDidYouHearAboutUsOther);
        setBirthDate(response.birthDate);
        setJoinDate(response.joinDate);
        setGender(response.gender);
    }

    function onDetailError(apiErr) {
        console.log("onDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDetailDone() {
        console.log("onDetailDone: Starting...");
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
                onDetailSuccess,
                onDetailError,
                onDetailDone
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
                            <li class=""><Link to={`/admin/client/${cid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Update</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to={`/admin/client/${cid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        {client && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Client</p>
                                <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>
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

                                    <p class="title is-5"><FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings</p>

                                    <FormRadioField
                                        label="Type"
                                        name="type"
                                        value={customerType}
                                        opt1Value={RESIDENTIAL_CUSTOMER_TYPE_OF_ID}
                                        opt1Label="Residential"
                                        opt2Value={COMMERCIAL_CUSTOMER_TYPE_OF_ID}
                                        opt2Label="Business"
                                        errorText={errors.text}
                                        wasValidated={false}
                                        helpText=""
                                        onChange={(e)=>setCustomerType(parseInt(e.target.value))}
                                    />

                                    <p class="title is-5"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Contact</p>

                                    {customerType === COMMERCIAL_CUSTOMER_TYPE_OF_ID && <>
                                        <FormInputField
                                            label="Organization Name"
                                            name="organizationName"
                                            placeholder="Text input"
                                            value={organizationName}
                                            errorText={errors && errors.organizationName}
                                            helpText=""
                                            onChange={(e)=>setOrganizationName(e.target.value)}
                                            isRequired={true}
                                            maxWidth="380px"
                                        />
                                        <FormSelectField
                                            label="Organization Type"
                                            name="organizationType"
                                            placeholder="Pick"
                                            selectedValue={organizationType}
                                            errorText={errors && errors.organizationType}
                                            helpText=""
                                            onChange={(e)=>setOrganizationType(parseInt(e.target.value))}
                                            options={CLIENT_ORGANIZATION_TYPE_OPTIONS_WITH_EMPTY_OPTIONS}
                                        />
                                    </>}

                                    <FormInputField
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Text input"
                                        value={firstName}
                                        errorText={errors && errors.firstName}
                                        helpText=""
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Text input"
                                        value={lastName}
                                        errorText={errors && errors.lastName}
                                        helpText=""
                                        onChange={(e)=>setLastName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Text input"
                                        value={email}
                                        errorText={errors && errors.email}
                                        helpText=""
                                        onChange={(e)=>setEmail(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormCheckboxField
                                        label="I agree to receive electronic email"
                                        name="isOkToEmail"
                                        checked={isOkToEmail}
                                        errorText={errors && errors.isOkToEmail}
                                        onChange={(e,x)=>setIsOkToEmail(!isOkToEmail)}
                                        maxWidth="180px"
                                    />

                                    <FormInputField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        value={phone}
                                        errorText={errors && errors.phone}
                                        helpText=""
                                        onChange={(e)=>setPhone(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormSelectField
                                        label="Phone Type"
                                        name="phoneType"
                                        placeholder="Pick"
                                        selectedValue={phoneType}
                                        errorText={errors && errors.phoneType}
                                        helpText=""
                                        onChange={(e)=>setPhoneType(parseInt(e.target.value))}
                                        options={CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />

                                    <FormCheckboxField
                                        label="I agree to receive texts to my phone"
                                        name="isOkToText"
                                        checked={isOkToText}
                                        errorText={errors && errors.setIsOkToText}
                                        onChange={(e,x)=>setIsOkToText(!isOkToText)}
                                        maxWidth="180px"
                                    />

                                    <FormInputField
                                        label="Other Phone (Optional)"
                                        name="otherPhone"
                                        placeholder="Text input"
                                        value={otherPhone}
                                        errorText={errors && errors.otherPhone}
                                        helpText=""
                                        onChange={(e)=>setOtherPhone(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormSelectField
                                        label="Other Phone Type (Optional)"
                                        name="otherPhoneType"
                                        placeholder="Pick"
                                        selectedValue={otherPhoneType}
                                        errorText={errors && errors.phootherPhoneTypeneType}
                                        helpText=""
                                        onChange={(e)=>setOtherPhoneType(parseInt(e.target.value))}
                                        options={CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS}
                                    />

                                    <p class="title is-5"><FontAwesomeIcon className="fas" icon={faAddressBook} />&nbsp;Address</p>

                                    <FormCheckboxField
                                        label="Has shipping address different then billing address"
                                        name="hasShippingAddress"
                                        checked={hasShippingAddress}
                                        errorText={errors && errors.hasShippingAddress}
                                        onChange={(e)=>setHasShippingAddress(!hasShippingAddress)}
                                        maxWidth="180px"
                                    />

                                    <div class="columns">
                                        <div class="column">
                                            <p class="subtitle is-6">
                                            {hasShippingAddress
                                                ? <p class="subtitle is-6">Billing Address</p>
                                                : <p class="subtitle is-6"></p>
                                            }
                                            </p>
                                            <FormCountryField
                                                priorityOptions={["CA","US","MX"]}
                                                label="Country"
                                                name="country"
                                                placeholder="Text input"
                                                selectedCountry={country}
                                                errorText={errors && errors.country}
                                                helpText=""
                                                onChange={(value)=>setCountry(value)}
                                                isRequired={true}
                                                maxWidth="160px"
                                            />

                                            <FormRegionField
                                                label="Province/Territory"
                                                name="region"
                                                placeholder="Text input"
                                                selectedCountry={country}
                                                selectedRegion={region}
                                                errorText={errors && errors.region}
                                                helpText=""
                                                onChange={(value)=>setRegion(value)}
                                                isRequired={true}
                                                maxWidth="280px"
                                            />

                                            <FormInputField
                                                label="City"
                                                name="city"
                                                placeholder="Text input"
                                                value={city}
                                                errorText={errors && errors.city}
                                                helpText=""
                                                onChange={(e)=>setCity(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Address Line 1"
                                                name="addressLine1"
                                                placeholder="Text input"
                                                value={addressLine1}
                                                errorText={errors && errors.addressLine1}
                                                helpText=""
                                                onChange={(e)=>setAddressLine1(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Address Line 2 (Optional)"
                                                name="addressLine2"
                                                placeholder="Text input"
                                                value={addressLine2}
                                                errorText={errors && errors.addressLine2}
                                                helpText=""
                                                onChange={(e)=>setAddressLine2(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Postal Code"
                                                name="postalCode"
                                                placeholder="Text input"
                                                value={postalCode}
                                                errorText={errors && errors.postalCode}
                                                helpText=""
                                                onChange={(e)=>setPostalCode(e.target.value)}
                                                isRequired={true}
                                                maxWidth="100px"
                                            />
                                        </div>
                                        {hasShippingAddress &&<div class="column">
                                            <p class="subtitle is-6">Shipping Address</p>

                                            <FormInputField
                                                label="Name"
                                                name="shippingName"
                                                placeholder="Text input"
                                                value={shippingName}
                                                errorText={errors && errors.shippingName}
                                                helpText="The name to contact for this shipping address"
                                                onChange={(e)=>setShippingName(e.target.value)}
                                                isRequired={true}
                                                maxWidth="350px"
                                            />

                                            <FormInputField
                                                label="Phone"
                                                name="shippingPhone"
                                                placeholder="Text input"
                                                value={shippingPhone}
                                                errorText={errors && errors.shippingPhone}
                                                helpText="The contact phone number for this shipping address"
                                                onChange={(e)=>setShippingPhone(e.target.value)}
                                                isRequired={true}
                                                maxWidth="150px"
                                            />

                                            <FormCountryField
                                                priorityOptions={["CA","US","MX"]}
                                                label="Country"
                                                name="shippingCountry"
                                                placeholder="Text input"
                                                selectedCountry={shippingCountry}
                                                errorText={errors && errors.shippingCountry}
                                                helpText=""
                                                onChange={(value)=>setShippingCountry(value)}
                                                isRequired={true}
                                                maxWidth="160px"
                                            />

                                            <FormRegionField
                                                label="Province/Territory"
                                                name="shippingRegion"
                                                placeholder="Text input"
                                                selectedCountry={shippingCountry}
                                                selectedRegion={shippingRegion}
                                                errorText={errors && errors.shippingRegion}
                                                helpText=""
                                                onChange={(value)=>setShippingRegion(value)}
                                                isRequired={true}
                                                maxWidth="280px"
                                            />

                                            <FormInputField
                                                label="City"
                                                name="shippingCity"
                                                placeholder="Text input"
                                                value={shippingCity}
                                                errorText={errors && errors.shippingCity}
                                                helpText=""
                                                onChange={(e)=>setShippingCity(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Address Line 1"
                                                name="shippingAddressLine1"
                                                placeholder="Text input"
                                                value={shippingAddressLine1}
                                                errorText={errors && errors.shippingAddressLine1}
                                                helpText=""
                                                onChange={(e)=>setShippingAddressLine1(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Address Line 2 (Optional)"
                                                name="shippingAddressLine2"
                                                placeholder="Text input"
                                                value={shippingAddressLine2}
                                                errorText={errors && errors.shippingAddressLine2}
                                                helpText=""
                                                onChange={(e)=>setShippingAddressLine2(e.target.value)}
                                                isRequired={true}
                                                maxWidth="380px"
                                            />

                                            <FormInputField
                                                label="Postal Code"
                                                name="shippingPostalCode"
                                                placeholder="Text input"
                                                value={shippingPostalCode}
                                                errorText={errors && errors.shippingPostalCode}
                                                helpText=""
                                                onChange={(e)=>setShippingPostalCode(e.target.value)}
                                                isRequired={true}
                                                maxWidth="100px"
                                            />

                                        </div>}
                                    </div>

                                    <p class="title is-5"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>

                                    <FormMultiSelectFieldForTags
                                        label="Tags (Optional)"
                                        name="tags"
                                        placeholder="Pick tags"
                                        tags={tags}
                                        setTags={setTags}
                                        errorText={errors && errors.tags}
                                        helpText="Pick the tags you would like to associate with this cliient."
                                        isRequired={true}
                                        maxWidth="320px"
                                    />

                                    <FormSelectFieldForHowHearAboutUsItem
                                        howDidYouHearAboutUsID={howDidYouHearAboutUsID}
                                        setHowDidYouHearAboutUsID={setHowDidYouHearAboutUsID}
                                        isHowDidYouHearAboutUsOther={isHowDidYouHearAboutUsOther}
                                        setIsHowDidYouHearAboutUsOther={setIsHowDidYouHearAboutUsOther}
                                        errorText={errors && errors.howDidYouHearAboutUsID}
                                        helpText=""
                                        isRequired={true}
                                        maxWidth="520px"
                                    />
                                    {isHowDidYouHearAboutUsOther === true &&
                                        <>
                                            <FormInputField
                                                label="How did you hear about us? (Other)"
                                                name="howDidYouHearAboutUsOther"
                                                placeholder="Text input"
                                                value={howDidYouHearAboutUsOther}
                                                errorText={errors && errors.howDidYouHearAboutUsOther}
                                                helpText=""
                                                onChange={(e)=>setHowHearAboutUsItemOther(e.target.value)}
                                                isRequired={true}
                                                maxWidth="100%"
                                            />
                                        </>
                                    }

                                    <FormRadioField
                                        label="Gender"
                                        name="gender"
                                        value={gender}
                                        opt1Value="Male"
                                        opt1Label="Male"
                                        opt2Value="Female"
                                        opt2Label="Female"
                                        opt3Value="Other"
                                        opt3Label="Other"
                                        onChange={(e)=>setGender(e.target.value)}
                                    />

                                    <FormDateField
                                        label="Birth Date (Optional)"
                                        name="birthDate"
                                        placeholder="Text input"
                                        value={birthDate}
                                        helpText=""
                                        onChange={(date)=>setBirthDate(date)}
                                        isRequired={true}
                                        maxWidth="180px"
                                    />

                                    <FormDateField
                                        label="Join Date (Optional)"
                                        name="joinDate"
                                        placeholder="Text input"
                                        value={joinDate}
                                        helpText="This indicates when the user joined the workery"
                                        onChange={(date)=>setJoinDate(date)}
                                        isRequired={true}
                                        maxWidth="180px"
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/client/${cid}`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/client/${cid}/edit`} class="button is-success is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</Link>
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

export default AdminClientUpdate;
