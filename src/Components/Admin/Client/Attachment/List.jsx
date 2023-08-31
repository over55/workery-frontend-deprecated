import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faArrowRight, faTrashCan, faArrowUpRightFromSquare, faFile, faDownload, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { ATTACHMENT_STATES, PAGE_SIZE_OPTIONS } from "../../../../Constants/FieldOptions";

import { getClientDetailAPI } from "../../../../API/Client";
import { getAttachmentListAPI, deleteAttachmentAPI } from "../../../../API/Attachment";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import FormInputField from "../../../Reusable/FormInputField";
import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormSelectField from "../../../Reusable/FormSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import AdminClientDetailAttachmentListDesktop from "./ListDektop";
import AdminClientDetailAttachmentListMobile from "./ListMobile";


function AdminClientDetailAttachmentList() {
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
    const [tabIndex, setTabIndex] = useState(1);
    const [attachments, setAttachments] = useState("");
    const [selectedAttachmentForDeletion, setSelectedAttachmentForDeletion] = useState("");
    const [pageSize, setPageSize] = useState(10);               // Pagination
    const [previousCursors, setPreviousCursors] = useState([]); // Pagination
    const [nextCursor, setNextCursor] = useState("");           // Pagination
    const [currentCursor, setCurrentCursor] = useState("");     // Pagination

    ////
    //// Event handling.
    ////

    const fetchAttachmentList = (cur, clientID, limit) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set('ownership_id', cid);
        params.set('ownership_role', 1); // 1=Client or Client.
        params.set("page_size", limit);
        if (cur !== "") {
            params.set("cursor", cur);
        }

        getAttachmentListAPI(
            params,
            onAttachmentListSuccess,
            onAttachmentListError,
            onAttachmentListDone
        );
    }

    const onNextClicked = (e) => {
        console.log("onNextClicked");
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        console.log("onPreviousClicked");
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSelectAttachmentForDeletion = (e, attachment) => {
        console.log("onSelectAttachmentForDeletion", attachment);
        setSelectedAttachmentForDeletion(attachment);
    }

    const onDeselectAttachmentForDeletion = (e) => {
        console.log("onDeselectAttachmentForDeletion");
        setSelectedAttachmentForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteAttachmentAPI(
            selectedAttachmentForDeletion.id,
            onAttachmentDeleteSuccess,
            onAttachmentDeleteError,
            onAttachmentDeleteDone
        );
        setSelectedAttachmentForDeletion("");
    }

    ////
    //// API.
    ////

    // Client details.

    function onClientDetailSuccess(response){
        console.log("onClientDetailSuccess: Starting...");
        setClient(response);
    }

    function onClientDetailError(apiErr) {
        console.log("onClientDetailError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onClientDetailDone() {
        console.log("onClientDetailDone: Starting...");
        setFetching(false);
    }

    // Attachment list.

    function onAttachmentListSuccess(response){
        console.log("onAttachmentListSuccess: Starting...");
        if (response.results !== null) {
            setAttachments(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onAttachmentListError(apiErr) {
        console.log("onAttachmentListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAttachmentListDone() {
        console.log("onAttachmentListDone: Starting...");
        setFetching(false);
    }

    // Attachment delete.

    function onAttachmentDeleteSuccess(response){
        console.log("onAttachmentDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Attachment deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchAttachmentList(currentCursor, cid, pageSize);
    }

    function onAttachmentDeleteError(apiErr) {
        console.log("onAttachmentDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onAttachmentDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onAttachmentDeleteDone() {
        console.log("onAttachmentDeleteDone: Starting...");
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
                onClientDetailSuccess,
                onClientDetailError,
                onClientDetailDone
            );
            fetchAttachmentList(currentCursor, cid, pageSize);
        }

        return () => { mounted = false; }
    }, [currentCursor, cid, pageSize]);
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
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/admin/clients" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faFile} />&nbsp;Attachments</p>
                            </div>
                            {client && <div class="column has-text-right">
                                <Link to={`/admin/client/${cid}/attachments/add`} class="button is-small is-success is-fullwidth-mobile" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New
                                </Link>
                            </div>}
                        </div>

                        <FormErrorBox errors={errors} />

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                {client && <div class="container">

                                    {/* Tab Navigation */}
                                    <div class="tabs is-medium">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/client/${cid}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/detail`}>Detail</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/orders`}>Orders</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${cid}/comments`}>Comments</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link to={`/admin/client/${cid}/attachments`}><strong>Attachments</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {!isFetching && attachments && attachments.results && (attachments.results.length > 0 || previousCursors.length > 0)
                                        ?
                                        <div class="container">

                                            {/*
                                                ##################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                                ##################################################################
                                            */}
                                            <div class="is-hidden-touch" >
                                                <AdminClientDetailAttachmentListDesktop
                                                    clientID={cid}
                                                    listData={attachments}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    onSelectAttachmentForDeletion={onSelectAttachmentForDeletion}
                                                />
                                            </div>

                                            {/*
                                                ###########################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                                ###########################################################################
                                            */}
                                            <div class="is-fullwidth is-hidden-desktop">
                                                <AdminClientDetailAttachmentListMobile
                                                    clientID={cid}
                                                    listData={attachments}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
                                                    onPreviousClicked={onPreviousClicked}
                                                    onNextClicked={onNextClicked}
                                                    onSelectAttachmentForDeletion={onSelectAttachmentForDeletion}
                                                />
                                            </div>
                                        </div>
                                        :
                                        <div class="container">
                                            <article class="message is-dark">
                                                <div class="message-body">
                                                    No attachments. <b><Link to={`/admin/client/${cid}/attachments/add`}>Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating a new attachment.
                                                </div>
                                            </article>
                                        </div>
                                    }

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/clients`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/admin/client/${cid}/attachments/add`} class="button is-success is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link>
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

export default AdminClientDetailAttachmentList;
