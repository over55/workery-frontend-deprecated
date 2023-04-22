import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function TopNavigation({onHamburgerClicked, setOnHamburgerClicked}) {

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/index",
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


    // Render the following component GUI.
    return (
        <>
            <nav class="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor:"#343a40",}}>
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="./img/compressed-logo.png" width="112" height="28"/>
                    </a>
                    <a role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                        <span aria-hidden="true">
                        </span>
                        <span aria-hidden="true">
                        </span>
                        <span aria-hidden="true">
                        </span>
                    </a>
                </div>
                <div id="navbarBasicExample" class="navbar-menu has-text-white">

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                                <FontAwesomeIcon className="fas has-text-white" icon={faBars} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default TopNavigation;
