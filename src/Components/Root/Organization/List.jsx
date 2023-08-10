import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faBuilding, faRefresh, faFilter, faSearch  } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getOrganizationListAPI, deleteOrganizationAPI } from "../../../API/Organization";
import { topAlertMessageState, topAlertStatusState, currentUserState } from "../../../AppState";
import FormErrorBox from "../../Reusable/FormErrorBox";
import PageLoadingContent from "../../Reusable/PageLoadingContent";
import FormInputFieldWithButton from "../../Reusable/FormInputFieldWithButton";
import FormSelectField from "../../Reusable/FormSelectField";
import FormDateField from "../../Reusable/FormDateField";
import { ORGANIZATION_STATUS_LIST_OPTIONS } from "../../../Constants/FieldOptions";
import RootOrganizationListDesktop from "./ListDesktop";
import RootOrganizationListMobile from "./ListMobile";


function RootOrganizationList() {

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
    const [organizations, setOrganizations] = useState("");
    const [selectedOrganizationForDeletion, setSelectedOrganizationForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                           // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);             // Pagination
    const [nextCursor, setNextCursor] = useState("");                       // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                 // Pagination
    const [showFilter, setShowFilter] = useState(false);                    // Filtering + Searching
    const [sortField, setSortField] = useState("created");                  // Sorting
    const [temporarySearchText, setTemporarySearchText] = useState("");     // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");           // Searching - The actual search query value to submit to the API.
    const [status, setStatus] = useState("");                               // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                 // Filtering


    ////
    //// API.
    ////

    function onOrganizationListSuccess(response){
        console.log("onOrganizationListSuccess: Starting...");
        console.log("onComicSubmissionListSuccess: response:", response);
        if (response.results !== null) {
            setOrganizations(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onOrganizationListError(apiErr) {
        console.log("onOrganizationListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationListDone() {
        console.log("onOrganizationListDone: Starting...");
        setFetching(false);
    }

    function onOrganizationDeleteSuccess(response){
        console.log("onOrganizationDeleteSuccess: Starting..."); // For debugging purposes only.

        // Update notification.
        setTopAlertStatus("success");
        setTopAlertMessage("Organization deleted");
        setTimeout(() => {
            console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // Fetch again an updated list.
        fetchList(currentCursor, pageSize, actualSearchText, status, createdAtGTE);
    }

    function onOrganizationDeleteError(apiErr) {
        console.log("onOrganizationDeleteError: Starting..."); // For debugging purposes only.
        setErrors(apiErr);

        // Update notification.
        setTopAlertStatus("danger");
        setTopAlertMessage("Failed deleting");
        setTimeout(() => {
            console.log("onOrganizationDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrganizationDeleteDone() {
        console.log("onOrganizationDeleteDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchList = (cur, limit, keywords, s, cagte) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "created") // Sorting

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
        if (cagte !== undefined && cagte !== null && cagte !== "") {
            const cagteStr = cagte.getTime();
            params.set("created_at_gte", cagteStr);
        }

        getOrganizationListAPI(
            params,
            onOrganizationListSuccess,
            onOrganizationListError,
            onOrganizationListDone
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

    const onSelectOrganizationForDeletion = (e, organization) => {
        console.log("onSelectOrganizationForDeletion", organization);
        setSelectedOrganizationForDeletion(organization);
    }

    const onDeselectOrganizationForDeletion = (e) => {
        console.log("onDeselectOrganizationForDeletion");
        setSelectedOrganizationForDeletion("");
    }

    const onSearchButtonClick = (e) => { // Searching
        console.log("Search button clicked...");
        setActualSearchText(temporarySearchText);
    }

    const onDeleteConfirmButtonClick = (e) => {
        console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.

        deleteOrganizationAPI(
            selectedOrganizationForDeletion.id,
            onOrganizationDeleteSuccess,
            onOrganizationDeleteError,
            onOrganizationDeleteDone
        );
        setSelectedOrganizationForDeletion("");

    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchList(currentCursor, pageSize, actualSearchText, status, createdAtGTE);
        }

        return () => { mounted = false; }
    }, [currentCursor, pageSize, actualSearchText, status, createdAtGTE]);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/root/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Root Dashboard</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organizations List</h1>
                            </div>

                            {/* Mobile only */}
                            <div className="column has-text-right is-hidden-desktop is-hidden-tablet">
                                <button onClick={()=>fetchList(currentCursor, pageSize, actualSearchText, status, createdAtGTE)} class="button is-small is-info is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faRefresh} />&nbsp;Refresh
                                </button>
                                &nbsp;
                                {/*
                                <button onClick={(e)=>setShowFilter(!showFilter)} class="button is-small is-success is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faFilter} />&nbsp;Filter
                                </button>*/}
                                &nbsp;
                                <Link to={`/admin/organizations/add`} class="button is-small is-primary is-fullwidth" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Organization
                                </Link>
                            </div>

                            {/* Tablet and Desktop only */}
                            <div className="column has-text-right is-hidden-mobile">
                                <button onClick={()=>fetchList(currentCursor, pageSize, actualSearchText, status, createdAtGTE)} class="button is-small is-info" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faRefresh} />
                                </button>
                                &nbsp;
                                {/*
                                <button onClick={(e)=>setShowFilter(!showFilter)} class="button is-small is-success" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faFilter} />&nbsp;Filter
                                </button>*/}
                                &nbsp;
                                <Link to={`/admin/organizations/add`} class="button is-small is-primary" type="button">
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New Organization
                                </Link>
                            </div>
                        </div>

                        {showFilter &&
                            <div class="columns has-background-white-bis" style={{borderRadius:"15px", padding:"20px"}}>
                                <div class="column">
                                    <FormInputFieldWithButton
                                        label={"Search"}
                                        name="temporarySearchText"
                                        type="text"
                                        placeholder="Search by name"
                                        value={temporarySearchText}
                                        helpText=""
                                        onChange={(e)=>setTemporarySearchText(e.target.value)}
                                        isRequired={true}
                                        maxWidth="100%"
                                        buttonLabel={<><FontAwesomeIcon className="fas" icon={faSearch} /></>}
                                        onButtonClick={onSearchButtonClick}
                                    />
                                </div>
                                <div class="column">
                                    <FormSelectField
                                        label="Status"
                                        name="status"
                                        placeholder="Pick status"
                                        selectedValue={status}
                                        helpText=""
                                        onChange={(e)=>setStatus(parseInt(e.target.value))}
                                        options={ORGANIZATION_STATUS_LIST_OPTIONS}
                                        isRequired={true}
                                    />
                                </div>
                                <div class="column">
                                    <FormDateField
                                        label="Created After"
                                        name="createdAtGTE"
                                        placeholder="Text input"
                                        value={createdAtGTE}
                                        helpText=""
                                        onChange={(date)=>setCreatedAtGTE(date)}
                                        isRequired={true}
                                        maxWidth="120px"
                                    />
                                </div>
                            </div>
                        }

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <FormErrorBox errors={errors} />
                                {organizations && organizations.results && (organizations.results.length > 0 || previousCursors.length > 0)
                                    ?
                                    <div class="container">
                                        {/*
                                            ##################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                            ##################################################################
                                        */}
                                        <div class="is-hidden-touch" >
                                            <RootOrganizationListDesktop
                                                listData={organizations}
                                                setPageSize={setPageSize}
                                                pageSize={pageSize}
                                                previousCursors={previousCursors}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
                                                onSelectOrganizationForDeletion={onSelectOrganizationForDeletion}
                                            />
                                        </div>

                                        {/*
                                            ###########################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                            ###########################################################################
                                        */}
                                        <div class="is-fullwidth is-hidden-desktop">
                                            <RootOrganizationListMobile
                                                listData={organizations}
                                                setPageSize={setPageSize}
                                                pageSize={pageSize}
                                                previousCursors={previousCursors}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
                                                onSelectOrganizationForDeletion={onSelectOrganizationForDeletion}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <section class="hero is-medium has-background-white-ter">
                                          <div class="hero-body">
                                            <p class="title">
                                                <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Organizations
                                            </p>
                                            <p class="subtitle">
                                                No organizations. <b><Link to="/admin/organizations/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first organization.
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

export default RootOrganizationList;
