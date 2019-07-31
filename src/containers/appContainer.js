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

// Work Order
import OrderListContainer from "./orders/list/orderListContainer";
import OrderSearchContainer from "./orders/search/orderSearchContainer";
import OrderSearchResultContainer from "./orders/search/orderSearchResultContainer";
import OrderLiteRetrieveContainer from "./orders/retrieve/orderLiteRetrieveContainer";
import OrderFullRetrieveContainer from "./orders/retrieve/orderFullRetrieveContainer";
import OrderCreateStep1Container from "./orders/create/orderCreateStep1Container";
import OrderCreateStep2Container from "./orders/create/orderCreateStep2Container";
import OrderCreateStep3Container from "./orders/create/orderCreateStep3Container";
import OrderCreateStep4BizContainer from "./orders/create/orderCreateStep4BizContainer";
import OrderCreateStep4RezOrComContainer from "./orders/create/orderCreateStep4RezOrComContainer";
import OrderCreateStep5Container from "./orders/create/orderCreateStep5Container";
import OrderCreateStep6Container from "./orders/create/orderCreateStep6Container";
import OrderCreateStep7Container from "./orders/create/orderCreateStep7Container";
import OrderCreateStep8Container from "./orders/create/orderCreateStep8Container";
import OrderUpdateContainer from "./orders/update/orderUpdateContainer";
import OrderPromoteStep1Container from "./orders/promote/orderPromoteStep1Container";
import OrderPromoteStep2Container from "./orders/promote/orderPromoteStep2Container";
import OrderPromoteStep3Container from "./orders/promote/orderPromoteStep3Container";

// Tasks
import TaskListContainer from "./tasks/list/taskListContainer";
import TaskSearchContainer from "./tasks/search/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/search/taskSearchResultContainer";
import AssignWatchAssociateTaskStep1Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep1Container";
import AssignWatchAssociateTaskStep2Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep2Container";
import AssignWatchAssociateTaskStep3Container from "./tasks/assignWatchAssociate/assignWatchAssociateTaskStep3Container";
import AssignWatchAreaCoordinatorTaskStep1Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep1Container";
import AssignWatchAreaCoordinatorTaskStep2Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep2Container";
import AssignWatchAreaCoordinatorTaskStep3Container from "./tasks/assignWatchAreaCoordinator/assignWatchAreaCoordinatorTaskStep3Container";

// Staff
import StaffListContainer from "./staff/list/staffListContainer";
import StaffSearchContainer from "./staff/staffSearchContainer";
import StaffSearchResultContainer from "./staff/staffSearchResultContainer";
import StaffUpdateContainer from "./staff/update/staffUpdateContainer";
import StaffCreateStep1Container from "./staff/create/staffCreateStep1Container";
import StaffCreateStep2Container from "./staff/create/staffCreateStep2Container";
import StaffFullRetrieveContainer from "./staff/retrieve/staffFullRetrieveContainer";
import StaffLiteRetrieveContainer from "./staff/retrieve/staffLiteRetrieveContainer";

// Reports
import ReportListContainer from "./reports/reportListContainer";

// // Financials
// import FinancialListContainer from "./financials/list/financialListContainer";
// import FinanciaRetrieveContainer from "./financials/retrieve/financialRetrieveContainer";
// import FinanciaUpdateContainer from "./financials/update/financialUpdateContainer";

// Settings
import SettingListContainer from "./settings/settingListContainer";

import TagsListContainer from "./settings/tags/list/tagListContainer";
import TagDeleteContainer from "./settings/tags/tagDeleteContainer";
import TagCreateContainer from "./settings/tags/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHear/list/howHearListContainer";
import HowHearDeleteContainer from "./settings/howHear/howHearDeleteContainer";
import HowHearCreateContainer from "./settings/howHear/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHear/howHearUpdateContainer";

import AnnouncementListContainer from "./settings/announcements/list/announcementListContainer";
import AnnouncementDeleteContainer from "./settings/announcements/announcementDeleteContainer";
import AnnouncementCreateContainer from "./settings/announcements/announcementCreateContainer";
import AnnouncementUpdateContainer from "./settings/announcements/announcementUpdateContainer";

import ResourcesListContainer from "./settings/resources/list/resourceListContainer";
import ResourceDeleteContainer from "./settings/resources/resourceDeleteContainer";
import ResourceCreateContainer from "./settings/resources/resourceCreateContainer";
import ResourceUpdateContainer from "./settings/resources/resourceUpdateContainer";


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
                                { /* ACCOUNT + GENERAL */}
                                <Route path="/" exact component={LoginContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/help" exact component={HelpContainer} />
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

                                { /* WORK ORDER */}
                                <Route path="/orders/add/step-1" exact component={requiresAuth(OrderCreateStep1Container)} />
                                <Route path="/orders/add/step-2" exact component={requiresAuth(OrderCreateStep2Container)} />
                                <Route path="/orders/add/step-3" exact component={requiresAuth(OrderCreateStep3Container)} />
                                <Route path="/orders/add/step-4-biz" exact component={requiresAuth(OrderCreateStep4BizContainer)} />
                                <Route path="/orders/add/step-4-rez-or-cc" exact component={requiresAuth(OrderCreateStep4RezOrComContainer)} />
                                <Route path="/orders/add/step-5" exact component={requiresAuth(OrderCreateStep5Container)} />
                                <Route path="/orders/add/step-6" exact component={requiresAuth(OrderCreateStep6Container)} />
                                <Route path="/orders/add/step-7" exact component={requiresAuth(OrderCreateStep7Container)} />
                                <Route path="/orders/add/step-8" exact component={requiresAuth(OrderCreateStep8Container)} />
                                <Route path="/orders" exact component={requiresAuth(OrderListContainer)} />
                                <Route path="/orders/search" exact component={requiresAuth(OrderSearchContainer)} />
                                <Route path="/orders/search-results" exact component={requiresAuth(OrderSearchResultContainer)} />
                                <Route path="/order/:slug" exact component={requiresAuth(OrderLiteRetrieveContainer)} />
                                <Route path="/order/:slug/full" exact component={requiresAuth(OrderFullRetrieveContainer)} />
                                <Route path="/order/:slug/update" exact component={requiresAuth(OrderUpdateContainer)} />
                                <Route path="/order/:slug/promote/step-1" exact component={requiresAuth(OrderPromoteStep1Container)} />
                                <Route path="/order/:slug/promote/step-2" exact component={requiresAuth(OrderPromoteStep2Container)} />
                                <Route path="/order/:slug/promote/step-3" exact component={requiresAuth(OrderPromoteStep3Container)} />

                                { /* TASKS */ }
                                <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                                <Route path="/tasks/search" exact component={requiresAuth(TaskSearchContainer)} />
                                <Route path="/tasks/search-results" exact component={requiresAuth(TaskSearchResultContainer)} />
                                <Route path="/task/1/:slug/step-1" exact component={requiresAuth(AssignWatchAssociateTaskStep1Container)} />
                                <Route path="/task/1/:slug/step-2" exact component={requiresAuth(AssignWatchAssociateTaskStep2Container)} />
                                <Route path="/task/1/:slug/step-3" exact component={requiresAuth(AssignWatchAssociateTaskStep3Container)} />
                                <Route path="/task/2/:slug/step-1" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep1Container)} />
                                <Route path="/task/2/:slug/step-2" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep2Container)} />
                                <Route path="/task/2/:slug/step-3" exact component={requiresAuth(AssignWatchAreaCoordinatorTaskStep3Container)} />

                                { /* STAFF */ }
                                <Route path="/staff/add/step-1" exact component={requiresAuth(StaffCreateStep1Container)} />
                                <Route path="/staff/add/step-2" exact component={requiresAuth(StaffCreateStep2Container)} />
                                <Route path="/staff" exact component={requiresAuth(StaffListContainer)} />
                                <Route path="/staff/search" exact component={requiresAuth(StaffSearchContainer)} />
                                <Route path="/staff/search-results" exact component={requiresAuth(StaffSearchResultContainer)} />
                                <Route path="/staff/:slug" exact component={requiresAuth(StaffLiteRetrieveContainer)} />
                                <Route path="/staff/:slug/full" exact component={requiresAuth(StaffFullRetrieveContainer)} />
                                <Route path="/staff/:slug/update" exact component={requiresAuth(StaffUpdateContainer)} />

                                { /* REPORTS */ }
                                <Route path="/reports" exact component={requiresAuth(ReportListContainer)} />

                                { /* SETTINGS */ }
                                <Route path="/settings" exact component={requiresAuth(SettingListContainer)} />
                                <Route path="/settings/tags" exact component={requiresAuth(TagsListContainer)} />
                                <Route path="/settings/tag/add" exact component={requiresAuth(TagCreateContainer)} />
                                <Route path="/settings/tag/:slug/delete" exact component={requiresAuth(TagDeleteContainer)} />
                                <Route path="/settings/tag/:slug/update" exact component={requiresAuth(TagUpdateContainer)} />
                                <Route path="/settings/how-hears" exact component={requiresAuth(HowHearsListContainer)} />
                                <Route path="/settings/how-hears/add" exact component={requiresAuth(HowHearCreateContainer)} />
                                <Route path="/settings/how-hear/:slug/delete" exact component={requiresAuth(HowHearDeleteContainer)} />
                                <Route path="/settings/how-hear/:slug/update" exact component={requiresAuth(HowHearUpdateContainer)} />
                                <Route path="/settings/announcements" exact component={requiresAuth(AnnouncementListContainer)} />
                                <Route path="/settings/announcements/add" exact component={requiresAuth(AnnouncementCreateContainer)} />
                                <Route path="/settings/announcement/:slug/delete" exact component={requiresAuth(AnnouncementDeleteContainer)} />
                                <Route path="/settings/announcement/:slug/update" exact component={requiresAuth(AnnouncementUpdateContainer)} />
                                <Route path="/settings/resources" exact component={requiresAuth(ResourcesListContainer)} />
                                <Route path="/settings/resource/add" exact component={requiresAuth(ResourceCreateContainer)} />
                                <Route path="/settings/resource/:slug/delete" exact component={requiresAuth(ResourceDeleteContainer)} />
                                <Route path="/settings/resource/:slug/update" exact component={requiresAuth(ResourceUpdateContainer)} />

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
