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


    // Render the following component GUI.
    return (
        <>
             {onHamburgerClicked === true && <aside class={`column is-2 is-narrow-mobile is-fullheight section`}>
                <p class="menu-label is-hidden-touch">Navigation</p>
                <ul class="menu-list">
                    <li>
                        <Link to="/dashboard" class={`${location.pathname.includes("dashboard") && "is-active"}`}>
                            <FontAwesomeIcon className="fas" icon={faHome} /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/clients" class={`${location.pathname.includes("client") && "is-active"}`}>
                            <FontAwesomeIcon className="fas" icon={faBoxes} /> Clients
                        </Link>
                    </li>
                    <li>
                        <Link to="/associates" class={`${location.pathname.includes("associate") && "is-active"}`}>
                            <FontAwesomeIcon className="fas" icon={faBoxes} /> Associates
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" class={`${location.pathname.includes("order") && "is-active"}`}>
                            <FontAwesomeIcon className="fas" icon={faBoxes} /> Work Orders
                        </Link>
                    </li>
                  {/*
                  <li>
                    <a href="#" class="">
                       <FontAwesomeIcon className="fas" icon={faHome} /> Links
                    </a>

                    <ul>
                      <li>
                        <a href="#">
                            <FontAwesomeIcon className="fas is-small" icon={faHome} />  Link1
                        </a>
                      </li>
                      <li>
                        <a href="#">
                            <FontAwesomeIcon className="fas is-small" icon={faHome} /> Link2
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" class="">
                      <FontAwesomeIcon className="fas is-small" icon={faHome} /> About
                    </a>
                  </li>
                  */}
                </ul>
            </aside>}
        </>
    );
}

export default SideNavigation;
