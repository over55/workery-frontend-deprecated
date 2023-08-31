import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faTable, faWrench, faPaperclip, faAddressCard, faSquarePhone, faTasks, faTachometer, faPlus, faArrowLeft, faCheckCircle, faUserCircle, faGauge, faPencil, faUsers, faEye, faIdCard, faAddressBook, faContactCard, faChartPie, faBuilding, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

import { getClientDetailAPI } from "../../../../API/Client";
import { getOrderListAPI } from "../../../../API/Order";
import FormErrorBox from "../../../Reusable/FormErrorBox";
import DataDisplayRowText from "../../../Reusable/DataDisplayRowText";
import DataDisplayRowSelect from "../../../Reusable/DataDisplayRowSelect";
import PageLoadingContent from "../../../Reusable/PageLoadingContent";
import { topAlertMessageState, topAlertStatusState } from "../../../../AppState";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from "../../../../Constants/App";
import { addCustomerState, ADD_CUSTOMER_STATE_DEFAULT } from "../../../../AppState";
import { CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS, CLIENT_TYPE_OF_FILTER_OPTIONS, CLIENT_ORGANIZATION_TYPE_OPTIONS } from "../../../../Constants/FieldOptions";
import AdminClientOrderListDesktop from "./ListDesktop";
import AdminClientOrderListMobile from "./ListMobile";


function AdminClientDetailOrderList() {
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
    const [orderList, setOrderList] = useState([]);

    const [pageSize, setPageSize] = useState(10);                                      // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                        // Pagination
    const [nextCursor, setNextCursor] = useState("");                                  // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                            // Pagination
    const [showFilter, setShowFilter] = useState(false);                               // Filtering + Searching
    const [sortByValue, setSortByValue] = useState("created,ASC");                     // Sorting
    const [status, setStatus] = useState(1);                                           // Filtering
    const [createdAtGTE, setCreatedAtGTE] = useState(null);                            // Filtering

    ////
    //// Event handling.
    ////

    const defaultFetchList = () => {
        fetchList(currentCursor, pageSize, "", sortByValue, status, createdAtGTE, cid);
    }

    const fetchList = (cur, limit, keywords, so, s, j, custid) => {
        setFetching(true);
        setErrors({});

        let params = new Map();
        params.set("page_size", limit);     // Pagination
        params.set("sort_field", "last_name") // Sorting

        if (cur !== "") { // Pagination
            params.set("cursor", cur);
        }

        // DEVELOPERS NOTE: Our `sortByValue` is string with the sort field
        // and sort order combined with a comma seperation. Therefore we
        // need to split as follows.
        const sortArray = so.split(",");
        params.set("sort_field", sortArray[0]);
        params.set("sort_order", sortArray[1]);

        // Filtering
        if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
            params.set("search", keywords);
        }
        if (s !== undefined && s !== null && s !== "") {
            params.set("status", s);
        }
        if (j !== undefined && j !== null && j !== "") {
            const jStr = j.getTime();
            params.set("created_at_gte", jStr);
        }

        // Customer id.
        params.set("customer_id", cid);

        getOrderListAPI(
            params,
            onOrderListSuccess,
            onOrderListError,
            onOrderListDone
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

    ////
    //// API.
    ////

    // --- Client Detail --- //

    function onClientSuccess(response){
        console.log("onClientSuccess: Starting...");
        if (response !== undefined && response !== null && response !== "") {
            setClient(response);
            defaultFetchList();
        }
    }

    function onClientError(apiErr) {
        console.log("onClientError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onClientDone() {
        console.log("onClientDone: Starting...");
        setFetching(false);
    }

    // --- Order List --- //

    function onOrderListSuccess(response){
        console.log("onOrderListSuccess: Starting...");
        setOrderList(response);
    }

    function onOrderListError(apiErr) {
        console.log("onOrderListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onOrderListDone() {
        console.log("onOrderListDone: Starting...");
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
                onClientSuccess,
                onClientError,
                onClientDone
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
                        {client && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faWrench} />&nbsp;Orders</p>
                            </div>
                            <div class="column has-text-right">
                                <Link to={`/admin/client/${cid}/edit`} class="button is-small is-success is-fullwidth-mobile" type="button" disabled={true}>
                                    <FontAwesomeIcon className="mdi" icon={faPlus} />&nbsp;New
                                </Link>
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

                                    {/* Tab Navigation */}
                                    <div class="tabs is-medium">
                                        <ul>
                                            <li>
                                                <Link to={`/admin/client/${client.id}`}>Summary</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/detail`}>Detail</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link><strong>Orders</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/comments`}>Comments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/attachments`}>Attachments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/admin/client/${client.id}/more`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {orderList && orderList.results && (orderList.results.length > 0 || previousCursors.length > 0)
                                        ?
                                        <div class="container">
                                            {/*
                                                ##################################################################
                                                EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
                                                ##################################################################
                                            */}
                                            <div class="is-hidden-touch" >
                                                <AdminClientOrderListDesktop
                                                    listData={orderList}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
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
                                                <AdminClientOrderListMobile
                                                    listData={orderList}
                                                    setPageSize={setPageSize}
                                                    pageSize={pageSize}
                                                    previousCursors={previousCursors}
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
                                                    No clients. <b><Link to="/admin/clients/add/step-1">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first client.
                                                </p>
                                            </div>
                                        </section>
                                    }

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/admin/clients`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link class="button is-success is-fullwidth-mobile" disabled={true}><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link>
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

export default AdminClientDetailOrderList;
