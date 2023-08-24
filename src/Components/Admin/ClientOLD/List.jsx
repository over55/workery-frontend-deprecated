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
import { USER_ROLES, PAGE_SIZE_OPTIONS, USER_STATUS_LIST_OPTIONS, USER_ROLE_LIST_OPTIONS, CLIENT_SORT_OPTIONS, CLIENT_STATUS_FILTER_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS } from "../../../Constants/FieldOptions";
import { DEFAULT_CLIENT_LIST_SORT_BY_VALUE, DEFAULT_CLIENT_STATUS_FILTER_OPTION } from "../../../Constants/App";
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
    const [listData, setListData] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [offsetStep, setOffsetStep] = useState(10);                              // Pagination
    const [previousOffsets, setPreviousOffsets] = useState([]);                    // Pagination
    const [sortByValue, setSortByValue] = useState(DEFAULT_CLIENT_LIST_SORT_BY_VALUE); // Sorting
    const [nextOffset, setNextOffset] = useState("");                              // Pagination
    const [currentOffset, setCurrentOffset] = useState(0);                         // Pagination
    const [temporarySearchText, setTemporarySearchText] = useState("");            // Searching - The search field value as your writes their query.
    const [actualSearchText, setActualSearchText] = useState("");                  // Searching - The actual search query value to submit to the API.
    const [status, setStatus] = useState(DEFAULT_CLIENT_STATUS_FILTER_OPTION);     // Filtering
    const [role, setRole] = useState("");                                          // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                        // Filtering
    const [typeOf, setTypeOf] = useState(0);                                       // Filtering

    ////
    //// API.
    ////

    function onClientListSuccess(response){
        // console.log("onClientListSuccess: Starting...");
        if (response.results !== null) {
            setListData(response);
            if (response.results.length > 0) {
                setNextOffset(currentOffset + offsetStep); // For pagination purposes.
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
        // console.log("onClientListDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const fetchListV2 = (offs=0, lim=10, so=DEFAULT_CLIENT_LIST_SORT_BY_VALUE, s=1, to=0) => {
        setFetching(true);
        setErrors({});

        let params = new Map();

        // Apply our pagination.
        params.set("offset", offs);
        params.set("limit", lim);

        // DEVELOPERS NOTE: Our `sortByValue` is string with the sort field
        // and sort order combined with a comma seperation. Therefore we
        // need to split as follows.
        const sortArray = so.split(",");
        params.set("sort_field", sortArray[0]);
        params.set("sort_order", sortArray[1]);

        // Apply our filters.
        if (s !== undefined && s !== null && s !== "") { // Searhcing
            params.set("state", s);
        }
        if (to !== undefined && to !== null && to !== "") { // Searhcing
            params.set("type_of", to);
        }
        // if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
        //     params.set("search", keywords);
        // }
        // if (s !== undefined && s !== null && s !== "") {
        //     params.set("status", s);
        // }
        // if (r !== undefined && r !== null && r !== "") {
        //     params.set("role", r);
        // }
        // if (j !== undefined && j !== null && j !== "") {
        //     const jStr = j.getTime();
        //     params.set("created_at_gte", jStr);
        // }

        // Make the API call.
        getClientListAPI(
            params,
            onClientListSuccess,
            onClientListError,
            onClientListDone
        );
    }

    const onNextClicked = (e) => {
        console.log("onNextClick");
        let arr = [...previousOffsets];
        arr.push(currentOffset);
        setPreviousOffsets(arr);
        setCurrentOffset(nextOffset);
    }

    const onPreviousClicked = (e) => {
        console.log("onPreviousClicked");
        let arr = [...previousOffsets];
        const previousOffset = arr.pop();
        setPreviousOffsets(arr);
        setCurrentOffset(previousOffset);
    }

    const onSearchButtonClick = (e) => { // Searching
        console.log("Search button clicked...");
        setActualSearchText(temporarySearchText);
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            // window.scrollTo(0, 0);  // Start the page at the top of the page.
            fetchListV2(currentOffset, offsetStep, sortByValue, status, typeOf);
        }

        return () => { mounted = false; }
    }, [currentOffset, offsetStep, sortByValue, status, typeOf]);

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
                                    <Link to="/admin/clients/add/step-1">
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
                    {/* Do nothing in this particular page ... */}

                    {/* Page Table */}
                    <nav class="box" style={{ borderRadius: "20px"}}>

                        {/* Title + Options */}
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-3"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;List</h1>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        <div class="columns has-background-light is-multiline p-2" style={{ borderRadius: "20px"}}>
                            <div class="column is-12">
                                <h1 class="subtitle is-5 is-underlined"><FontAwesomeIcon className="fas" icon={faFilter} />&nbsp;Filtering & Sorting</h1>
                            </div>

                            <div class="column">
                                <FormSelectField
                                    label="Status"
                                    name="status"
                                    placeholder="Pick status"
                                    selectedValue={status}
                                    helpText=""
                                    onChange={(e)=>setStatus(parseInt(e.target.value))}
                                    options={CLIENT_STATUS_FILTER_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            <div class="column">
                                <FormSelectField
                                    label="Type"
                                    name="typeOf"
                                    placeholder="Pick client type"
                                    selectedValue={typeOf}
                                    helpText=""
                                    onChange={(e)=>setTypeOf(parseInt(e.target.value))}
                                    options={CLIENT_TYPE_OF_FILTER_OPTIONS}
                                    isRequired={true}
                                />
                            </div>
                            {/*
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
                                    name="sortByValue"
                                    placeholder="Pick sorting"
                                    selectedValue={sortByValue}
                                    helpText=""
                                    onChange={(e)=>setSortByValue(e.target.value)}
                                    options={CLIENT_SORT_OPTIONS}
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
                                {listData && listData.results && (listData.results.length > 0 || previousOffsets.length > 0)
                                    ?
                                    <div class="container">
                                        {/*
                                            ##################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                            ##################################################################
                                        */}
                                        <div class="is-hidden-touch" >
                                            <AdminClientListDesktop
                                                listData={listData}
                                                setOffsetStep={setOffsetStep}
                                                offsetStep={offsetStep}
                                                previousOffsets={previousOffsets}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
                                            />
                                        </div>

                                        {/*
                                            ###########################################################################
                                            EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
                                            ###########################################################################
                                        */}
                                        <div class="is-fullwidth is-hidden-desktop">
                                            <AdminClientListMobile
                                                listData={listData}
                                                setOffsetStep={setOffsetStep}
                                                offsetStep={offsetStep}
                                                previousOffsets={previousOffsets}
                                                onPreviousClicked={onPreviousClicked}
                                                onNextClicked={onNextClicked}
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
                                                No listData. <b><Link to="/admin/listData/add">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first user.
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
