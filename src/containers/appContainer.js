import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";

// Middleware
import requiresAuth from '../helpers/requiresAuth';

// Navigation
import NavigationContainer from './navigation/navigationContainer';
import NotFound404Container from './navigation/notFound404Container';

// General
import PrivacyContainer from './general/privacyContainer';
import HelpContainer from './general/helpContainer';
import TermsContainer from './general/termsContainer';

// Account
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";

// Organizations
import SharedOrganizationListContainer from "./organization/shared/sharedOrganizationListContainer";
import SharedOrganizationCreateContainer from "./organization/shared/sharedOrganizationCreateContainer";

// Dashboard
import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";

// Client
import ClientListContainer from "./clients/list/clientListContainer";
import ClientSearchContainer from "./clients/search/clientSearchContainer";
import ClientSearchResultContainer from "./clients/search/clientSearchResultContainer";
import ClientLiteRetrieveContainer from "./clients/retrieve/clientLiteRetrieveContainer";
import ClientFullRetrieveContainer from "./clients/retrieve/clientFullRetrieveContainer";
import ClientUpdateContainer from "./clients/update/clientUpdateContainer";
import ClientCreateStep1Container from "./clients/create/clientCreateStep1Container";
import ClientCreateStep2Container from "./clients/create/clientCreateStep2Container";
import ClientCreateStep3Container from "./clients/create/clientCreateStep3Container";
import ClientDemoteContainer from "./clients/demote/clientDemoteContainer";


class AppContainer extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid" id="outer-container">

                    <NavigationContainer
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match}
                        staticContext={this.props.staticContext}
                    />

                    <div className="d-flex align-items-stretch">
                        <main id="main" role="main">
                            <ScrollUpButton />
                            <Switch>
                                <Route path="/" exact component={LoginContainer} />
                                <Route path="/login" exact component={LoginContainer} />
                                <Route path="/logout" exact component={LogoutContainer} />
                                <Route path="/organizations" exact component={requiresAuth(SharedOrganizationListContainer)} />
                                <Route path="/organization/add" exact component={requiresAuth(SharedOrganizationCreateContainer)} />
                                <Route path="/dashboard-redirect/:accessToken/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />

                                { /* CLIENTS */ }
                                <Route path="/clients/add/step-1" exact component={requiresAuth(ClientCreateStep1Container)} />
                                <Route path="/clients/add/step-2" exact component={requiresAuth(ClientCreateStep2Container)} />
                                <Route path="/clients/add/step-3" exact component={requiresAuth(ClientCreateStep3Container)} />
                                <Route path="/clients" exact component={requiresAuth(ClientListContainer)} />
                                <Route path="/clients/search" exact component={requiresAuth(ClientSearchContainer)} />
                                <Route path="/clients/search-results" exact component={requiresAuth(ClientSearchResultContainer)} />
                                <Route path="/client/:slug" exact component={requiresAuth(ClientLiteRetrieveContainer)} />
                                <Route path="/client/:slug/full" exact component={requiresAuth(ClientFullRetrieveContainer)} />
                                <Route path="/client/:slug/update" exact component={requiresAuth(ClientUpdateContainer)} />
                                <Route path="/client/:slug/demote" exact component={requiresAuth(ClientDemoteContainer)} />

                                <Route component={NotFound404Container} />
                            </Switch>
                        </main>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(AppContainer);
