import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome, faTachometer, faTasks, faUserCircle, faWrench, faCrown,
    faChartBar, faToolbox, faTags, faCreditCard, faUserTie, faCogs,
    faQuestionCircle, faSignOut
} from '@fortawesome/free-solid-svg-icons'

function SideNavigation({onHamburgerClicked, setOnHamburgerClicked}) {

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/login",
        "/logout",
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log();
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    console.log("onHamburgerClicked:", onHamburgerClicked);
    if (onHamburgerClicked === false) {
        return null;
    }

    // Render the following component GUI.
    return (
        <>
            <div class="has-background-black is-narrow-mobile is-fullheight" style={{height: "100vh", padding:"30px"}}>
                <aside class="menu">
                    <p class="menu-label has-text-grey-light">
                        Staff
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link to="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks" class={`has-text-grey-light ${location.pathname.includes("task") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Tasks
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers" class={`has-text-grey-light ${location.pathname.includes("customer") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Customers
                            </Link>
                        </li>
                        <li>
                            <Link to="/associates" class={`has-text-grey-light ${location.pathname.includes("associate") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faCrown} />&nbsp;Associates
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" class={`has-text-grey-light ${location.pathname.includes("order") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faWrench} />&nbsp;Work Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/skill-sets" class={`has-text-grey-light ${location.pathname.includes("skill-set") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faToolbox} />&nbsp;Skill Sets
                            </Link>
                        </li>
                        <li>
                            <Link to="/tags" class={`has-text-grey-light ${location.pathname.includes("tag") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faTags} />&nbsp;Tags
                            </Link>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faCreditCard} />&nbsp;Financials
                            </a>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faChartBar} />&nbsp;Reports
                            </a>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faUserTie} />&nbsp;Staff
                            </a>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Settings
                            </a>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Account
                    </p>
                    <ul class="menu-list">
                        <li>
                            <Link to="/help" class={`has-text-grey-light ${location.pathname.includes("help") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Help
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" class={`has-text-grey-light ${location.pathname.includes("profile") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Sign Off
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        </>
    );
}

export default SideNavigation;
