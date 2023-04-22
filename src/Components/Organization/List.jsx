import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faChevronRight, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { getOrganizationListAPI } from "../../API/Organization";


function OrganizationList() {

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [organizations, setOrganizations] = useState({});
    const [isFetching, setFetching] = useState(false);

    ////
    //// API.
    ////

    function onOrganizationListSuccess(response){
        console.log("onOrganizationListSuccess: Starting...");
        setOrganizations(response);
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

    ////
    //// Event handling.
    ////

    // (Do nothing)

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getOrganizationListAPI(
                onOrganizationListSuccess,
                onOrganizationListError,
                onOrganizationListDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>

                            <li class="is-active"><Link to="/organizations" aria-current="page">
                                <FontAwesomeIcon className="is-white" icon={faBuilding} />&nbsp;Organizations</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <h1 class="title is-1"><FontAwesomeIcon className="mdi" icon={faBuilding} />&nbsp;Organizations</h1>

                        {isFetching && <div class="columns is-centered" style={{paddingTop: "20px"}}>
                            <div class="column has-text-centered is-2">
                            <div class="loader-wrapper is-centered">
                              <div class="loader is-loading is-centered" style={{height: "80px", width: "80px"}}></div>
                            </div>
                            </div>
                        </div>}

                        {!isFetching && <div className="columns">
                            {!isEmpty(organizations) && organizations.results.map(function(organization, i){
                                return <div class="column is-4">
                                    <div class="card workery-card">
                                          <div class="card-image">
                                              <span class="workery-content is-vcentered workery-card-span">
                                                  <FontAwesomeIcon className="fa-10x has-text-white" icon={faBuilding} />
                                              </span>
                                          </div>
                                          <div class="card-content">
                                            <div class="media">
                                              <div class="media-content">
                                                <p class="title is-5">{organization.name}</p>
                                                <p class="subtitle is-7">{organization.schemaName}</p>
                                              </div>
                                            </div>

                                            <div class="content">
                                              {/*
                                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                              Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                              <a href="#">#css</a> <a href="#">#responsive</a>


                                             */}
                                              <div class="block">
                                                   <Link to={`/organization/${organization.id}`} class="button is-primary is-fullwidth">View Details</Link>
                                              </div>

                                              <div class="block">
                                                  <Link to={`/dashboard-redirect-for-organization/${organization.id}`} class="button is-warning is-fullwidth">
                                                        Edit&nbsp;<FontAwesomeIcon icon={faChevronRight} /></Link>
                                              </div>

                                              <div class="block">
                                                  <Link to={`/dashboard-redirect-for-organization/${organization.id}`} class="button is-success workery-success-btn is-fullwidth">Start&nbsp;<FontAwesomeIcon icon={faChevronRight} /></Link>
                                              </div>

                                            </div>
                                          </div>
                                    </div>
                                </div>;
                            })}
                        </div>}
                    </nav>
                </section>
            </div>
        </>
    );
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default OrganizationList;
