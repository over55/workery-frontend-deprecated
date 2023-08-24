import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getClientListAPI, deleteClientAPI } from "../../../API/Client";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectField from "../../Reusable/FormSelectField";
import FormDateField from "../../Reusable/FormDateField";
import { USER_ROLES, PAGE_SIZE_OPTIONS, USER_STATUS_LIST_OPTIONS, USER_ROLE_LIST_OPTIONS } from "../../../Constants/FieldOptions";
import AdminClientListDesktop from "./ListDesktop";
import AdminClientListMobile from "./ListMobile";


function AdminClientList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [users, setClients] = useState("");
    const [selectedClientForDeletion, setSelectedClientForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                           // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);             // Pagination
    const [nextCursor, setNextCursor] = useState("");                       // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                 // Pagination
    const [showFilter, setShowFilter] = useState(false);                    // Filtering + Searching
    const [sortField, setSortField] = useState("last_name");                  // Sorting
    const [temporarySearchText, setTemporarySearchText] = useState("");     // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");           // Searching - The actual search query value to submit to the API.
    const [status, setStatus] = useState("");                               // Filtering
    const [role, setRole] = useState("");                                   // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                 // Filtering

    ////
    //// API.
    ////

    function onClientListSuccess(response){
        console.log("onClientListSuccess: Starting...");
        if (response.results !== null) {
            setClients(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onClientListError(apiErr) {
        console.log("onClientListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onClientListDone() {
        console.log("onClientListDone: Starting...");
        setFetching(false);
    }

    function onClientDeleteSuccess(response){
        console.log("onClientDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Client deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize, actualSearchText, status, role, createdAtGTE);
    }

    function onClientDeleteError(apiErr) {
        console.log("onClientDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onClientDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onClientDeleteDone() {
        console.log("onClientDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, s, r, j) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "last_name") // Sorting

        if (cur !== "") { // Pagination
            params.set("cursor", cur);
        }

        // Filtering
        if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
            params.set("search", keywords);
        }
        if (s !== undefined && s !== null && s !== "") {
            params.set("status", s);
        }
        if (r !== undefined && r !== null && r !== "") {
            params.set("role", r);
        }
        if (j !== undefined && j !== null && j !== "") {
            const jStr = j.getTime();
            params.set("created_at_gte", jStr);
        }

        getClientListAPI(
            params,
            onClientListSuccess,
            onClientListError,
            onClientListDone
        );
    }

    const onNextClicked = (e) => {
        let arr = [...previousCursors];
        arr.push(currentCursor);
        setPreviousCursors(arr);
        setCurrentCursor(nextCursor);
    }

    const onPreviousClicked = (e) => {
        let arr = [...previousCursors];
        const previousCursor = arr.pop();
        setPreviousCursors(arr);
        setCurrentCursor(previousCursor);
    }

    const onSearchButtonClick = (e) => { // Searching
        console.log("Search button clicked...");
        setActualSearchText(temporarySearchText);
    }

    const onSelectClientForDeletion = (e, user) => {
        console.log("onSelectClientForDeletion", user);
        setSelectedClientForDeletion(user);
    }

    const onDeselectClientForDeletion = (e) => {
        console.log("onDeselectClientForDeletion");
        setSelectedClientForDeletion("");
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteClientAPI(
            selectedClientForDeletion.id,
            onClientDeleteSuccess,
            onClientDeleteError,
            onClientDeleteDone
        );
        setSelectedClientForDeletion("");

    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            // window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList(currentCursor, pageSize, actualSearchText, status, role, createdAtGTE);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, actualSearchText, status, role, createdAtGTE]);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">

                    {/* Page Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                        <ul class="">
                            <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</Link></li>
                        </ul>
                    </nav>

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</h1>
                    <hr />


                    {/* Page Menu Options */}
                    <section class="hero ">
                      <div class="hero-body has-text-centered">
                        <div class="container">
                            <div class="columns is-vcentered">
                                <div class="column">
                                    <Link to="/admin/clients/add">
                                        <FontAwesomeIcon className="mdi has-text-white has-background-danger-dark p-6 mb-3" icon={faPlus} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                        <h1 class="title is-3">Add</h1>
                                        <p className="has-text-grey">Add clients</p>
                                    </Link>
                                </div>
                                <div class="column">
                                    <Link to="/admin/clients/search">
                                        <FontAwesomeIcon className="mdi has-text-white has-background-success-dark p-6 mb-3" icon={faSearch} style={{maxWidth:"100px",minHeight:"100px", borderRadius: "100%"}} />
                                        <h1 class="title is-3">Search</h1>
                                        <p className="has-text-grey">Search clients</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                      </div>
                    </section>

                    {/* Page Modal(s) */}
                    <div class={`modal ${selectedClientForDeletion ? 'is-active' : ''}`}>
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Are you sure?</p>
                                <button class="delete" aria-label="close" onClick={onDeselectClientForDeletion}></button>
                            </header>
                            <section class="modal-card-body">
                                You are about to <b>archive</b> this user; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
                                <button class="button" onClick={onDeselectClientForDeletion}>Cancel</button>
                            </footer>
                        </div>
                    </div>

                    {/* Page Table */}
                    <nav class="box" style={{ borderRadius: "20px"}}>

                        {/* Title + Options */}
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-3"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;List</h1>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        <div class="columns has-background-light is-multiline" style={{ borderRadius: "20px"}}>
                            <div class="column is-12">
                                <h1 class="subtitle is-5 is-underlined"><FontAwesomeIcon className="fas" icon={faFilter} />&nbsp;Filtering & Sorting</h1>
                            </div>
                            {/*
                            <div class="column">
                                <FormSelectField
                                    label="Filter by Status"
                                    name="status"
                                    placeholder="Pick status"
                                    selectedValue={status}
                                    helpText=""
                                    onChange={(e)=>setStatus(parseInt(e.target.value))}
                                    options={USER_STATUS_LIST_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            <div class="column">
                                <FormSelectField
                                    label="Filter by Role"
                                    name="role"
                                    placeholder="Pick role"
                                    selectedValue={role}
                                    helpText=""
                                    onChange={(e)=>setRole(parseInt(e.target.value))}
                                    options={USER_ROLE_LIST_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            <div class="column">
                                <FormDateField
                                    label="Filter by Joined After"
                                    name="createdAtGTE"
                                    placeholder="Text input"
                                    value={createdAtGTE}
                                    helpText=""
                                    onChange={(date)=>setCreatedAtGTE(date)}
                                    isRequired={true}
                                    maxWidth="120px"
                                />
                            </div>
                             */}
                            <div class="column has-text-right">
                                <FormSelectField
                                    label="Sort by"
                                    name="role"
                                    placeholder="Pick role"
                                    selectedValue={role}
                                    helpText=""
                                    onChange={(e)=>setRole(parseInt(e.target.value))}
                                    options={USER_ROLE_LIST_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                        </div>

                        {/* Table Contents */}
                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {users && users.results && (users.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <div class="container">
                                        {/*
                                            ##################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                            ##################################################################
                                        */}
                                        <div class="is-hidden-touch" >
                                            <AdminClientListDesktop
                                                listData={users}
                                                setPageSize={setPageSize}
                                                pageSize={pageSize}
                                                previousCursors={previousCursors}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
                                                onSelectClientForDeletion={onSelectClientForDeletion}
                                            />
                                        </div>

                                        {/*
                                            ###########################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                            ###########################################################################
                                        */}
                                        <div class="is-fullwidth is-hidden-desktop">
                                            <AdminClientListMobile
                                                listData={users}
                                                setPageSize={setPageSize}
                                                pageSize={pageSize}
                                                previousCursors={previousCursors}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
                                                onSelectClientForDeletion={onSelectClientForDeletion}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <section class="hero is-medium has-background-white-ter">
                                          <div class="hero-body">
                                            <p class="title">
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Clients
                                            </p>
                                            <p class="subtitle">
                                                No users. <b><Link to="/admin/users/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first user.
                                            </p>
                                          </div>
                                    </section>
                                }
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default AdminClientList;
