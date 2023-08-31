import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faTasks, faTachometer, faPlus, faTimesCircle, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faIdCard, faAddressBook, faContactCard, faChartPie, faCogs, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { putAttachmentUpdateAPI, getAttachmentDetailAPI } from "../../../../API/Attachment";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormCountryField from "../../../Reusable/FormCountryField";
import FormRegionField from "../../../Reusable/FormRegionField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";


function AdminClientAttachmentUpdate() {
    ////
    //// URL Parameters.
    ////

    const { cid, aid } = useParams()

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    ////
    //// Event handling.
    ////

    const onHandleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Starting...")
        setFetching(true);
        setErrors({});

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', title);
        formData.append('description', description);

        putAttachmentUpdateAPI(
            aid,
            formData,
            onAdminClientAttachmentUpdateSuccess,
            onAdminClientAttachmentUpdateError,
            onAdminClientAttachmentUpdateDone
        );
        console.log("onSubmitClick: Finished.")
    }

    ////
    //// API.
    ////

    // --- Update --- //

    function onAdminClientAttachmentUpdateSuccess(response){
        // For debugging purposes only.
        console.log("onAdminClientAttachmentUpdateSuccess: Starting...");
        console.log(response);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Attachment uploaded");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onAdminClientAttachmentUpdateSuccess: Delayed for 2 seconds.");
            console.log("onAdminClientAttachmentUpdateSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Redirect the user to the user attachments page.
        setForceURL("/admin/client/"+cid+"/attachments");
    }

    function onAdminClientAttachmentUpdateError(apiErr) {
        console.log("onAdminClientAttachmentUpdateError: Starting...");
        setErrors(apiErr);

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Failed submitting");
        setTopAlertStatus("danger");
        setTimeout(() => {
            console.log("onAdminClientAttachmentUpdateError: Delayed for 2 seconds.");
            console.log("onAdminClientAttachmentUpdateError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAdminClientAttachmentUpdateDone() {
        console.log("onAdminClientAttachmentUpdateDone: Starting...");
        setFetching(false);
    }

    // --- Detail --- //
    function onSuccess(response){
        console.log("onSuccess: Starting...");
        setTitle(response.title);
        setDescription(response.description);
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
        console.log("onDone: Starting...");
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
            setErrors({});
            getAttachmentDetailAPI(
                aid,
                onSuccess,
                onError,
                onDone
            );
        }

        return () => { mounted = false; }
    }, [aid,]);
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
                            <li class=""><Link to={`/admin/client/${cid}/attachments`} aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail (Attachments)</Link></li>
                            <li class=""><Link to={`/admin/client/${cid}/attachment/${aid}`} aria-current="page"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Attachment</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to={`/admin/client/${cid}/attachments`} aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail (Attachments)</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        <p class="title is-4"><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit Attachment</p>

                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Submitting..."} />
                            :
                            <>
                                <div class="container">
                                    <article class="message is-warning">
                                      <div class="message-body">
                                        <strong>Warning:</strong> Submitting with new uploaded file will delete previous upload.
                                      </div>
                                    </article>

                                    <FormInputField
                                        label="Title"
                                        name="title"
                                        placeholder="Text input"
                                        value={title}
                                        errorText={errors && errors.title}
                                        helpText=""
                                        onChange={(e)=>setTitle(e.target.value)}
                                        isRequired={true}
                                        maxWidth="150px"
                                    />

                                    <FormInputField
                                        label="Description"
                                        name="description"
                                        type="text"
                                        placeholder="Text input"
                                        value={description}
                                        errorText={errors && errors.description}
                                        helpText=""
                                        onChange={(e)=>setDescription(e.target.value)}
                                        isRequired={true}
                                        maxWidth="485px"
                                    />

                                    {selectedFile !== undefined && selectedFile !== null && selectedFile !== ""
                                        ?
                                        <>
                                            <article class="message is-success">
                                                <div class="message-body">
                                                    <FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;File ready to upload.
                                                </div>
                                            </article>
                                        </>
                                        :
                                        <>
                                            <b>File (Optional)</b>
                                            <br />
                                            <input name="file"type="file" onChange={onHandleFileChange} />
                                            <br />
                                            <br />
                                        </>
                                    }

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link to={`/admin/client/${cid}/attachment/${aid}`} class="button is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Detail</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button class="button is-medium is-success is-fullwidth-mobile" onClick={onSubmitClick}><FontAwesomeIcon className="fas" icon={faCheckCircle} />&nbsp;Save</button>
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

export default AdminClientAttachmentUpdate;
