import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS } from "../../../../Constants/FieldOptions";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../AppState";


function AdminClientAddStep4() {
    ////
    //// Global state.
    ////

    const [addCustomer, setAddCustomer] = useRecoilState(addCustomerState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);
    const [email, setEmail] = useState(addCustomer.email);
    const [phone, setPhone] = useState(addCustomer.phone);
    const [phoneType, setPhoneType] = useState(addCustomer.phoneType);
    const [firstName, setFirstName] = useState(addCustomer.firstName);
    const [lastName, setLastName] = useState(addCustomer.lastName);
    const [otherPhone, setOtherPhone] = useState(addCustomer.otherPhone);
    const [otherPhoneType, setOtherPhoneType] = useState(addCustomer.otherPhoneType);
    const [isOkToText, setIsOkToText] = useState(addCustomer.isOkToText);
    const [isOkToEmail, setIsOkToEmail] = useState(addCustomer.isOkToEmail);

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        let newErrors = {};
        let hasErrors = false;

        if (firstName === "") {
            newErrors["firstName"] = "missing value";
            hasErrors = true;
        }
        if (lastName === "") {
            newErrors["lastName"] = "missing value";
            hasErrors = true;
        }
        if (email === "") {
            newErrors["email"] = "missing value";
            hasErrors = true;
        }
        if (phone === "") {
            newErrors["phone"] = "missing value";
            hasErrors = true;
        }
        if (phoneType === 0) {
            newErrors["phoneType"] = "missing value";
            hasErrors = true;
        }

        if (hasErrors) {
            // Set the client based error validation.
            setErrors(newErrors);

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

            return;
        }

        // Save to persistent storage.
        let modifiedAddCustomer = { ...addCustomer };
        modifiedAddCustomer.firstName = firstName;
        modifiedAddCustomer.lastName = lastName;
        modifiedAddCustomer.email = email;
        modifiedAddCustomer.phone = phone;
        modifiedAddCustomer.phoneType = phoneType;
        modifiedAddCustomer.otherPhone = otherPhone;
        modifiedAddCustomer.otherPhoneType = otherPhoneType;
        modifiedAddCustomer.isOkToText = isOkToText;
        modifiedAddCustomer.isOkToEmail = isOkToEmail;
        setAddCustomer(modifiedAddCustomer);

        // Redirect to the next page.
        setForceURL("/admin/clients/add/step-5");
    }

    ////
    //// API.
    ////

    // Do nothing...

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

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faIdCard} />&nbsp;Contact</p>

                        <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                <div class="container">

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


                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-medium is-fullwidth-mobile" to="/admin/clients/add/step-3"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-medium is-primary is-fullwidth-mobile" onClick={onSubmitClick}>Next&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></button>
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

export default AdminClientAddStep4;
