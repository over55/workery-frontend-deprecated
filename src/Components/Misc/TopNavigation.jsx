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
            <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
              <div class="navbar-brand">
                <Link class="navbar-item" to="/" onClick={()=>setOnHamburgerClicked(false)}>
                  <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Logo Image" />
                </Link>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>

               <div id="navbarBasicExample" class={`navbar-menu is-hidden-mobile`}>
                <div class="navbar-start">

                </div>

                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <Link class="" onClick={()=>setOnHamburgerClicked(!onHamburgerClicked)}>
                        <FontAwesomeIcon className="fas" icon={faBars} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </nav>
        </>
    );
}

export default TopNavigation;
