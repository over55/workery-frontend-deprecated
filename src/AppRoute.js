import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import Index from "./Components/Gateway/Index";
import OrganizationList from "./Components/Organization/List";
import OrganizationDetail from "./Components/Organization/Detail";
import TopNavigation from "./Components/Misc/TopNavigation";
import SideNavigation from "./Components/Misc/SideNavigation";
import NotFoundError from "./Components/Misc/NotFoundError";

function AppRoute() {
    // Control whether the hamburer menu icon was clicked or not. This state is
    // needed by 'TopNavigation' an 'SideNavigation' components.
    const [onHamburgerClicked, setOnHamburgerClicked] = useState(true);

    return (
        <>
            <Router>
                <div>
                    <TopNavigation
                        onHamburgerClicked={onHamburgerClicked}
                        setOnHamburgerClicked={setOnHamburgerClicked}
                    />
                </div>
                <section class="main-content columns is-fullheight">
                    <Routes>
                        <Route exact path="/organization/:id" element={<OrganizationDetail/>}/>
                        <Route exact path="/organizations" element={<OrganizationList/>}/>
                        <Route exact path="/dashboard" element={<Dashboard/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/logout" element={<LogoutRedirector/>}/>
                        <Route exact path="/" element={<Index/>}/>
                        <Route path="*" element={<NotFoundError/>}/>
                    </Routes>

                    <SideNavigation
                        onHamburgerClicked={onHamburgerClicked}
                        setOnHamburgerClicked={setOnHamburgerClicked}
                    />
                </section>
            </Router>
        </>
    );
}

export default AppRoute;
