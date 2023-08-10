import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { topAlertMessageState, topAlertStatusState } from "../../AppState";

function RootDashboard() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    ////
    //// API.
    ////

    ////
    //// Event handling.
    ////

    ////
    //// Misc.
    ////

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.
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
                    <nav class="breadcrumb has-background-light p-4" aria-label="breadcrumbs">
                        <ul>
                            <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Root Dashboard</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Root Dashboard</h1>
                            </div>
                        </div>

                        <section class="hero is-medium is-link">
                          <div class="hero-body">
                            <p class="title">
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Organizations
                            </p>
                            <p class="subtitle">
                              Manage all the organizations in your system:
                              <br />
                              <br />
                              <Link to={"/root/organizations"}>View&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                            </p>
                          </div>
                        </section>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default RootDashboard;
