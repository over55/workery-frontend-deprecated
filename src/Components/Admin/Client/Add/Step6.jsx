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
import FormMultiSelectFieldForTags from "../../../Reusable/FormMultiSelectFieldForTags";
import FormSelectFieldForHowHearAboutUsItem from "../../../Reusable/FormSelectFieldForHowHear";
import FormDateField from "../../../Reusable/FormDateField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../AppState";
// import FormMultiSelectFieldForSkillSets from "../../../Reusable/FormMultiSelectFieldForSkillSets";


function AdminClientAddStep6() {
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
    const [tags, setTags] = useState(addCustomer.tags);
    const [howDidYouHearAboutUsID, setHowDidYouHearAboutUsID] = useState(addCustomer.howDidYouHearAboutUsID);
    const [isHowDidYouHearAboutUsOther, setIsHowDidYouHearAboutUsOther] = useState(addCustomer.isHowDidYouHearAboutUsOther);
    const [howDidYouHearAboutUsOther, setHowHearAboutUsItemOther] = useState(addCustomer.howDidYouHearAboutUsOther);
    const [birthDate, setBirthDate] = useState(addCustomer.birthDate);
    const [joinDate, setJoinDate] = useState(addCustomer.joinDate);
    const [gender, setGender] = useState(addCustomer.gender);
    const [additionalComment, setAdditionalComment] = useState(addCustomer.additionalComment);
    // const [skillSets, setSkillSets] = useState([]);

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

        if (howDidYouHearAboutUsID === "") {
            newErrors["howDidYouHearAboutUsID"] = "missing value";
            hasErrors = true;
        } else {
            if (isHowDidYouHearAboutUsOther === true && howDidYouHearAboutUsOther === "") {
                newErrors["howDidYouHearAboutUsOther"] = "missing value";
                hasErrors = true;
            }
        }

        if (hasErrors) {
            // Set the client based error validation.
            setErrors(newErrors);

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();

            console.log("onSubmitClick: Ending with error.");
            return;
        }

        // Save to persistent storage.
        let modifiedAddCustomer = { ...addCustomer };
        modifiedAddCustomer.tags = tags;
        modifiedAddCustomer.howDidYouHearAboutUsID = howDidYouHearAboutUsID;
        modifiedAddCustomer.howDidYouHearAboutUsOther = howDidYouHearAboutUsOther;
        modifiedAddCustomer.gender = gender;
        modifiedAddCustomer.birthDate = birthDate;
        modifiedAddCustomer.joinDate = joinDate;
        modifiedAddCustomer.additionalComment = additionalComment;
        setAddCustomer(modifiedAddCustomer);

        console.log("onSubmitClick: Ending with success.");

        // Redirect to the next page.
        setForceURL("/admin/clients/add/step-7");
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

                                    {/*
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
                                    */}

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

                                    <FormTextareaField
                                        label="Additional Comment (Optional)"
                                        name="additionalComment"
                                        placeholder="Text input"
                                        value={additionalComment}
                                        errorText={errors && errors.additionalComment}
                                        helpText=""
                                        onChange={(e)=>setAdditionalComment(e.target.value)}
                                        isRequired={true}
                                        maxWidth="280px"
                                        helpText={"Max 638 characters"}
                                        rows={4}
                                    />

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
