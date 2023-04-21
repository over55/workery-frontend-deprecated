import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBoxes, faUsers } from '@fortawesome/free-solid-svg-icons'

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
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/customers" class={`has-text-grey-light ${location.pathname.includes("customer") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Customers
                            </Link>
                        </li>
                        <li>
                            <Link to="/associates" class={`has-text-grey-light ${location.pathname.includes("associate") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Associates
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" class={`has-text-grey-light ${location.pathname.includes("order") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Work Orders
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks" class={`has-text-grey-light ${location.pathname.includes("task") && "is-active"}`}>
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Tasks
                            </Link>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Financials
                            </a>
                            <a class="has-text-grey-light">
                                <FontAwesomeIcon className="fas" icon={faHome} />&nbsp;Reports
                            </a>
                        </li>
                    </ul>
                    <p class="menu-label has-text-grey-light">
                        Account
                    </p>
                    <ul class="menu-list">
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
