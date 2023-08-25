import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSearch, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { getClientDetailAPI, postClientCreateAPI } from "../../../../API/Client";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormMultiSelectFieldForTags from "../../../Reusable/FormMultiSelectFieldForTags";
import FormMultiSelectFieldForSkillSets from "../../../Reusable/FormMultiSelectFieldForSkillSets";
import FormMultiSelectFieldForHowHears from "../../../Reusable/FormMultiSelectFieldForHowHears";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS } from "../../../../Constants/FieldOptions";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function AdminClientAddStep6() {
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
    const [tags, setTags] = useState([]);
    const [skillSets, setSkillSets] = useState([]);
    const [howHearAboutUsItems, setHowHearAboutUsItems] = useState([]);

    // typeOf,  tags, tagOptions, dateOfBirth, gender, isHowHearLoading, howHearId, howHearOptions, howHearOther, howHearIdLabel, joinDate,
    // onRadioChange,  onMultiChange, onJoinDateChange, comment,
    // errors, onTextChange, onSelectChange, onDateOfBirthChange, isLoading, onClick

    ////
    //// Event handling.
    ////


    ////
    //// API.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");
        let newErrors = {};
        let hasErrors = false;

        // if (firstName === "") {
        //     newErrors["firstName"] = "missing value";
        //     hasErrors = true;
        // }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }
        setForceURL("/admin/clients/add/step-5");
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

                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faChartPie} />&nbsp;Metrics</p>

                        <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                <div class="container">

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

                                    <FormMultiSelectFieldForSkillSets
                                        label="Skill Sets (Optional)"
                                        name="skillSets"
                                        placeholder="Pick skill sets"
                                        skillSets={skillSets}
                                        setSkillSets={setSkillSets}
                                        errorText={errors && errors.skillSets}
                                        helpText="Pick the skill sets you would like to associate with this cliient."
                                        isRequired={true}
                                        maxWidth="320px"
                                    />

                                    <FormMultiSelectFieldForHowHears
                                        label="How Did You Hear About us? "
                                        name="howHearAboutUsItems"
                                        placeholder="Pick"
                                        howHearAboutUsItems={howHearAboutUsItems}
                                        setHowHearAboutUsItems={setHowHearAboutUsItems}
                                        errorText={errors && errors.howHearAboutUsItems}
                                        helpText="Pick"
                                        isRequired={true}
                                        maxWidth="320px"
                                    />

                                    {/*
                                    <FormMultiSelectField
                                        label="Tags (Optional)"
                                        name="tags"
                                        placeholder="Text input"
                                        options={EQUIPMENT_OPTIONS}
                                        selectedValues={equipment}
                                        onChange={onEquipmentChange}
                                        errorText={errors && errors.equipment}
                                        helpText="Pick the equipment associated with this session template."
                                        isRequired={true}
                                        maxWidth="320px"
                                    />
                                    */}


                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-medium is-fullwidth-mobile" to="/admin/clients/add/step-5"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
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

export default AdminClientAddStep6
