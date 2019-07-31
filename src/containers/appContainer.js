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
import ClientCreateStep1Container from "./clients/create/clientCreateStep1Container";
import ClientCreateStep2Container from "./clients/create/clientCreateStep2Container";
import ClientCreateStep3Container from "./clients/create/clientCreateStep3Container";
import ClientCreateStep4BizContainer from "./clients/create/clientCreateStep4BizContainer";
import ClientCreateStep4RezOrComContainer from "./clients/create/clientCreateStep4RezOrComContainer";
import ClientCreateStep5Container from "./clients/create/clientCreateStep5Container";
import ClientCreateStep6Container from "./clients/create/clientCreateStep6Container";
import ClientCreateStep7Container from "./clients/create/clientCreateStep7Container";
import ClientCreateStep8Container from "./clients/create/clientCreateStep8Container";
import ClientUpdateContainer from "./clients/update/clientUpdateContainer";
import ClientPromoteStep1Container from "./clients/promote/clientPromoteStep1Container";
import ClientPromoteStep2Container from "./clients/promote/clientPromoteStep2Container";
import ClientPromoteStep3Container from "./clients/promote/clientPromoteStep3Container";

// Associate
import AssociateListContainer from "./associates/list/associateListContainer";
import AssociateSearchContainer from "./associates/search/associateSearchContainer";
import AssociateSearchResultContainer from "./associates/search/associateSearchResultContainer";
import AssociateLiteRetrieveContainer from "./associates/retrieve/associateLiteRetrieveContainer";
import AssociateFullRetrieveContainer from "./associates/retrieve/associateFullRetrieveContainer";
import AssociateUpdateContainer from "./associates/update/associateUpdateContainer";
import AssociateCreateStep1Container from "./associates/create/associateCreateStep1Container";
import AssociateCreateStep2Container from "./associates/create/associateCreateStep2Container";
import AssociateCreateStep3Container from "./associates/create/associateCreateStep3Container";
import AssociateDemoteContainer from "./associates/demote/associateDemoteContainer";

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
                                <Route path="/clients/add/step-4-biz" exact component={requiresAuth(ClientCreateStep4BizContainer)} />
                                <Route path="/clients/add/step-4-rez-or-cc" exact component={requiresAuth(ClientCreateStep4RezOrComContainer)} />
                                <Route path="/clients/add/step-5" exact component={requiresAuth(ClientCreateStep5Container)} />
                                <Route path="/clients/add/step-6" exact component={requiresAuth(ClientCreateStep6Container)} />
                                <Route path="/clients/add/step-7" exact component={requiresAuth(ClientCreateStep7Container)} />
                                <Route path="/clients/add/step-8" exact component={requiresAuth(ClientCreateStep8Container)} />
                                <Route path="/clients" exact component={requiresAuth(ClientListContainer)} />
                                <Route path="/clients/search" exact component={requiresAuth(ClientSearchContainer)} />
                                <Route path="/clients/search-results" exact component={requiresAuth(ClientSearchResultContainer)} />
                                <Route path="/client/:slug" exact component={requiresAuth(ClientLiteRetrieveContainer)} />
                                <Route path="/client/:slug/full" exact component={requiresAuth(ClientFullRetrieveContainer)} />
                                <Route path="/client/:slug/update" exact component={requiresAuth(ClientUpdateContainer)} />
                                <Route path="/client/:slug/promote/step-1" exact component={requiresAuth(ClientPromoteStep1Container)} />
                                <Route path="/client/:slug/promote/step-2" exact component={requiresAuth(ClientPromoteStep2Container)} />
                                <Route path="/client/:slug/promote/step-3" exact component={requiresAuth(ClientPromoteStep3Container)} />

                                { /* ASSOCIATES */ }
                                <Route path="/associates/add/step-1" exact component={requiresAuth(AssociateCreateStep1Container)} />
                                <Route path="/associates/add/step-2" exact component={requiresAuth(AssociateCreateStep2Container)} />
                                <Route path="/associates/add/step-3" exact component={requiresAuth(AssociateCreateStep3Container)} />
                                <Route path="/associates" exact component={requiresAuth(AssociateListContainer)} />
                                <Route path="/associates/search" exact component={requiresAuth(AssociateSearchContainer)} />
                                <Route path="/associates/search-results" exact component={requiresAuth(AssociateSearchResultContainer)} />
                                <Route path="/associate/:slug" exact component={requiresAuth(AssociateLiteRetrieveContainer)} />
                                <Route path="/associate/:slug/full" exact component={requiresAuth(AssociateFullRetrieveContainer)} />
                                <Route path="/associate/:slug/update" exact component={requiresAuth(AssociateUpdateContainer)} />
                                <Route path="/associate/:slug/demote" exact component={requiresAuth(AssociateDemoteContainer)} />

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
