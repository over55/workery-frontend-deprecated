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
import CommentListContainer from "./general/commentListContainer";

// Account
import LoginContainer from "./account/loginContainer";
import LogoutContainer from "./account/logoutContainer";

// Organizations
import SharedOrganizationListContainer from "./organization/shared/list/sharedOrganizationListContainer";
import SharedOrganizationCreateContainer from "./organization/shared/create/sharedOrganizationCreateContainer";
import SharedOrganizationCreateSuccessContainer from "./organization/shared/create/sharedOrganizationCreateSuccessContainer";
import SharedOrganizationUpdateContainer from "./organization/shared/update/sharedOrganizationUpdateContainer";

// Dashboard
import TenantDashboardRedirectContainer from "./dashboard/tenantDashboardRedirectContainer";
import DashboardContainer from "./dashboard/dashboardContainer";

// (Admin) Client
import ClientListContainer from "./clients/list/clientListContainer";
import ClientSearchContainer from "./clients/search/clientSearchContainer";
import ClientSearchResultContainer from "./clients/search/clientSearchResultContainer";
import ClientLiteRetrieveContainer from "./clients/retrieve/clientLiteRetrieveContainer";
import ClientFullRetrieveContainer from "./clients/retrieve/clientFullRetrieveContainer";
import ClientOrderListContainer from "./clients/retrieve/clientOrderListContainer";
import ClientCommentContainer from "./clients/retrieve/clientCommentContainer";
import ClientAvatarUpdateOperationContainer from "./clients/operations/clientAvatarUpdateOperationContainer";
import CustomerFileUploadAddContainer from "./clients/retrieve/file_upload/clientFileUploadAddContainer";
import CustomerFileUploadArchiveContainer from "./clients/retrieve/file_upload/clientFileUploadArchiveContainer";
import CustomerFileUploadListContainer from "./clients/retrieve/file_upload/clientFileUploadListContainer";
import ClientCreateStep1Container from "./clients/create/clientCreateStep1Container";
import ClientCreateStep2Container from "./clients/create/clientCreateStep2Container";
import ClientCreateStep3Container from "./clients/create/clientCreateStep3Container";
import ClientCreateStep4Container from "./clients/create/clientCreateStep4Container";
import ClientCreateStep5Container from "./clients/create/clientCreateStep5Container";
import ClientCreateStep6Container from "./clients/create/clientCreateStep6Container";
import ClientCreateStep7Container from "./clients/create/clientCreateStep7Container";
import ClientContactUpdateContainer from "./clients/update/clientContactUpdateContainer";
import ClientAddressUpdateContainer from "./clients/update/clientAddressUpdateContainer";
import ClientMetricsUpdateContainer from "./clients/update/clientMetricsUpdateContainer";
import ClientUnarchiveOperationContainer from "./clients/operations/clientUnarchiveOperationContainer";
import ClientArchiveOperationContainer from "./clients/operations/clientArchiveOperationContainer";
import ClientRezUpgradeOperationContainer from "./clients/operations/clientRezUpgradeOperationContainer";
import ClientPermanentDeleteOperationContainer from "./clients/operations/clientPermanentDeleteOperationContainer";

// (Admin) Associate
import AdminAssociateListContainer from "./associates/admin/list/adminAssociateListContainer";
import AdminAssociateSearchContainer from "./associates/admin/search/adminAssociateSearchContainer";
import AdminAssociateSearchResultContainer from "./associates/admin/search/adminAssociateSearchResultContainer";
import AdminAssociateLiteRetrieveContainer from "./associates/admin/retrieve/adminAssociateLiteRetrieveContainer";
import AdminAssociateFullRetrieveContainer from "./associates/admin/retrieve/adminAssociateFullRetrieveContainer";
import AdminAssociateOrderListContainer from "./associates/admin/retrieve/adminAssociateOrderListContainer";
import AdminAssociateActivitySheetListContainer from "./associates/admin/retrieve/adminAssociateActivitySheetListContainer";
import AdminAssociateCommentContainer from "./associates/admin/retrieve/adminAssociateCommentContainer";
import AdminAssociateAvatarOperationContainer from "./associates/admin/operations/adminAssociateAvatarOperationContainer";
import AdminAssociateFileUploadAddContainer from "./associates/admin/retrieve/file_upload/adminAssociateFileUploadAddContainer";
import AdminAssociateFileUploadArchiveContainer from "./associates/admin/retrieve/file_upload/adminAssociateFileUploadArchiveContainer";
import AdminAssociateFileUploadListContainer from "./associates/admin/retrieve/file_upload/adminAssociateFileUploadListContainer";
import AdminAssociateCreateStep1Container from "./associates/admin/create/adminAssociateCreateStep1Container";
import AdminAssociateCreateStep2Container from "./associates/admin/create/adminAssociateCreateStep2Container";
import AdminAssociateCreateStep3Container from "./associates/admin/create/adminAssociateCreateStep3Container";
import AdminAssociateCreateStep4Container from "./associates/admin/create/adminAssociateCreateStep4Container";
import AdminAssociateCreateStep5Container from "./associates/admin/create/adminAssociateCreateStep5Container";
import AdminAssociateCreateStep6Container from "./associates/admin/create/adminAssociateCreateStep6Container";
import AdminAssociateCreateStep7Container from "./associates/admin/create/adminAssociateCreateStep7Container";
import AdminAssociateCreateStep8Container from "./associates/admin/create/adminAssociateCreateStep8Container";
import AdminAssociateAccountUpdateContainer from "./associates/admin/update/adminAssociateAccountUpdateContainer";
import AdminAssociateAddressUpdateContainer from "./associates/admin/update/adminAssociateAddressUpdateContainer";
import AdminAssociateContactUpdateContainer from "./associates/admin/update/adminAssociateContactUpdateContainer";
import AdminAssociateMetricsUpdateContainer from "./associates/admin/update/adminAssociateMetricsUpdateContainer";
import AdminAssociateBalanceOperationContainer from "./associates/admin/operations/adminAssociateBalanceOperationContainer";
import AdminAssociateChangePasswordOperationContainer from "./associates/admin/operations/adminAssociateChangePasswordOperationContainer";

// (Admin) Work Order
import AdminOrderListContainer from "./orders/admin/list/adminOrderListContainer";
import AdminOrderSearchContainer from "./orders/admin/search/adminOrderSearchContainer";
import AdminOrderSearchResultContainer from "./orders/admin/search/adminOrderSearchResultContainer";
import AdminOrderLiteRetrieveContainer from "./orders/admin/retrieve/adminOrderLiteRetrieveContainer";
import AdminOrderFullRetrieveContainer from "./orders/admin/retrieve/adminOrderFullRetrieveContainer";
import AdminOrderTaskListContainer from "./orders/admin/retrieve/adminOrderTaskListContainer";
import AdminOrderActivitySheetListContainer from "./orders/admin/retrieve/adminOrderActivitySheetListContainer";
import AdminOrderCommentContainer from "./orders/admin/retrieve/adminOrderCommentContainer";
import AdminOrderFileUploadAddContainer from "./orders/admin/retrieve/file_upload/adminOrderFileUploadAddContainer";
import AdminOrderFileUploadArchiveContainer from "./orders/admin/retrieve/file_upload/adminOrderFileUploadArchiveContainer";
import AdminOrderFileUploadListContainer from "./orders/admin/retrieve/file_upload/adminOrderFileUploadListContainer";
import AdminOrderUnassignAssociateOperationContainer from "./orders/admin/operations/adminOrderUnassignAssociateOperationContainer";
import AdminOrderPostponeOperationContainer from "./orders/admin/operations/adminOrderPostponeOperationContainer";
import AdminOrderCloseOperationContainer from "./orders/admin/operations/adminOrderCloseOperationContainer";
import AdminOrderReopenOperationContainer from "./orders/admin/operations/adminOrderReopenOperationContainer";
import AdminOrderCreateStep1Container from "./orders/admin/create/adminOrderCreateStep1Container";
import AdminOrderCreateStep2Container from "./orders/admin/create/adminOrderCreateStep2Container";
import AdminOrderCreateStep3Container from "./orders/admin/create/adminOrderCreateStep3Container";
import AdminOrderCreateStep4Container from "./orders/admin/create/adminOrderCreateStep4Container";
import AdminOrderCreateStep5Container from "./orders/admin/create/adminOrderCreateStep5Container";
import AdminOrderCreateStep6Container from "./orders/admin/create/adminOrderCreateStep6Container";
import AdminOrderLiteUpdateContainer from "./orders/admin/update/adminOrderLiteUpdateContainer";
import AdminOrderTransferStep1Container from "./orders/admin/operations/transfer/adminOrderTransferStep1Container";
import AdminOrderTransferStep2Container from "./orders/admin/operations/transfer/adminOrderTransferStep2Container";
import AdminOrderTransferStep3Container from "./orders/admin/operations/transfer/adminOrderTransferStep3Container";
import AdminOrderTransferStep4Container from "./orders/admin/operations/transfer/adminOrderTransferStep4Container";
import AdminOrderTransferStep5Container from "./orders/admin/operations/transfer/adminOrderTransferStep5Container";

// (Associate) Work Order
import AssociateOrderListContainer from "./orders/associate/list/associateOrderListContainer";
import AssociateOrderLiteRetrieveContainer from "./orders/associate/retrieve/associateOrderLiteRetrieveContainer";
import AssociateOrderFullRetrieveContainer from "./orders/associate/retrieve/associateOrderFullRetrieveContainer";

// Tasks
import TaskListContainer from "./tasks/list/taskListContainer";
import TaskSearchContainer from "./tasks/search/taskSearchContainer";
import TaskSearchResultContainer from "./tasks/search/taskSearchResultContainer";
import AssignAssociateTaskStep1Container from "./tasks/assignAssociate/assignAssociateTaskStep1Container";
import AssignAssociateTaskStep2Container from "./tasks/assignAssociate/assignAssociateTaskStep2Container";
import AssignAssociateTaskStep3Container from "./tasks/assignAssociate/assignAssociateTaskStep3Container";
import AssignAssociateTaskStep4Container from "./tasks/assignAssociate/assignAssociateTaskStep4Container";
import FollowUpTaskStep1Container from "./tasks/followUp/followUpTaskStep1Container";
import FollowUpTaskStep2Container from "./tasks/followUp/followUpTaskStep2Container";
import FollowUpTaskStep3Container from "./tasks/followUp/followUpTaskStep3Container";
import FollowUpPendingTaskStep1Container from "./tasks/followUpPending/followUpPendingTaskStep1Container";
import FollowUpPendingTaskStep2Container from "./tasks/followUpPending/followUpPendingTaskStep2Container";
import OrderCompletionTaskStep1Container from "./tasks/orderCompletion/orderCompletionTaskStep1Container";
import OrderCompletionTaskStep2Container from "./tasks/orderCompletion/orderCompletionTaskStep2Container";
import OrderCompletionTaskStep3Container from "./tasks/orderCompletion/orderCompletionTaskStep3Container";
import OrderCompletionTaskStep4Container from "./tasks/orderCompletion/orderCompletionTaskStep4Container";
import OrderCompletionTaskStep5Container from "./tasks/orderCompletion/orderCompletionTaskStep5Container";
import SurveyTaskStep1Container from "./tasks/survey/surveyTaskStep1Container";
import SurveyTaskStep2Container from "./tasks/survey/surveyTaskStep2Container";
import SurveyTaskStep3Container from "./tasks/survey/surveyTaskStep3Container";

// Staff
import StaffListContainer from "./staff/list/staffListContainer";
import StaffSearchContainer from "./staff/search/staffSearchContainer";
import StaffSearchResultContainer from "./staff/search/staffSearchResultContainer";
import StaffContactUpdateContainer from "./staff/update/staffContactUpdateContainer";
import StaffAddressUpdateContainer from "./staff/update/staffAddressUpdateContainer";
import StaffAccountUpdateContainer from "./staff/update/staffAccountUpdateContainer";
import StaffMetricsUpdateContainer from "./staff/update/staffMetricsUpdateContainer";
import StaffFullRetrieveContainer from "./staff/retrieve/staffFullRetrieveContainer";
import StaffLiteRetrieveContainer from "./staff/retrieve/staffLiteRetrieveContainer";
import StaffCommentContainer from "./staff/retrieve/staffCommentContainer";
import StaffFileUploadAddContainer from "./staff/retrieve/file_upload/staffFileUploadAddContainer";
import StaffFileUploadArchiveContainer from "./staff/retrieve/file_upload/staffFileUploadArchiveContainer";
import StaffFileUploadListContainer from "./staff/retrieve/file_upload/staffFileUploadListContainer";
import StaffCreateStep1Container from "./staff/create/staffCreateStep1Container";
import StaffCreateStep2Container from "./staff/create/staffCreateStep2Container";
import StaffCreateStep3Container from "./staff/create/staffCreateStep3Container";
import StaffCreateStep4Container from "./staff/create/staffCreateStep4Container";
import StaffCreateStep5Container from "./staff/create/staffCreateStep5Container";
import StaffCreateStep6Container from "./staff/create/staffCreateStep6Container";
import StaffCreateStep7Container from "./staff/create/staffCreateStep7Container";
import StaffCreateStep8Container from "./staff/create/staffCreateStep8Container";
import StaffArchiveContainer from "./staff/operations/staffArchiveContainer";
import StaffAccountChangePasswordContainer from "./staff/operations/staffAccountChangePasswordContainer";
import StaffChangeRoleContainer from "./staff/operations/staffChangeRoleContainer";
import StaffAvatarUpdateOperationContainer from "./staff/operations/staffAvatarUpdateOperationContainer";

// Reports
import ReportListContainer from "./reports/reportListContainer";
import Report1Container from "./reports/report1Container";
import Report2Container from "./reports/report2Container";
import Report3Container from "./reports/report3Container";
import Report4Container from "./reports/report4Container";
import Report5Container from "./reports/report5Container";
import Report6Container from "./reports/report6Container";
import Report7Container from "./reports/report7Container";
import Report8Container from "./reports/report8Container";
import Report9Container from "./reports/report9Container";
import Report10Container from "./reports/report10Container";
import Report11Container from "./reports/report11Container";
import Report12Container from "./reports/report12Container";
import Report13Container from "./reports/report13Container";
import Report14Container from "./reports/report14Container";
import Report15Container from "./reports/report15Container";
import Report16Container from "./reports/report16Container";
import Report17Container from "./reports/report17Container";

// Skill Sets
import SkillsetSearchContainer from "./skillsets/skillsetSearchContainer";
import SkillsetSearchResultsContainer from "./skillsets/skillsetSearchResultsContainer";

// Financials
import FinancialListContainer from "./financials/list/financialListContainer";
import FinancialRetrieveContainer from "./financials/retrieve/financialRetrieveContainer";
import FinancialUpdateContainer from "./financials/update/financialUpdateContainer";
import FinancialCloneOperationContainer from "./financials/operations/financialCloneOperationContainer";
import InvoiceRetrieveContainer from "./financials/retrieve/invoiceRetrieveContainer";
import DepositListContainer from "./financials/retrieve/depositListContainer";
import InvoiceCreateStep1Container from "./financials/create/invoiceCreateStep1Container";
import InvoiceCreateStep2Container from "./financials/create/invoiceCreateStep2Container";
import InvoiceCreateStep3Container from "./financials/create/invoiceCreateStep3Container";
import InvoiceCreateStep4Container from "./financials/create/invoiceCreateStep4Container";
import InvoiceFirstSectionUpdateContainer from "./financials/update/invoiceFirstSectionUpdateContainer";
import InvoiceSecondSectionUpdateContainer from "./financials/update/invoiceSecondSectionUpdateContainer";
import InvoiceThirdSectionUpdateContainer from "./financials/update/invoiceThirdSectionUpdateContainer";
import DepositCreateStep1Container from "./financials/create/depositCreateStep1Container";
import DepositCreateStep2Container from "./financials/create/depositCreateStep2Container";


// Settings
import SettingListContainer from "./settings/settingListContainer";

import TagsListContainer from "./settings/tags/list/tagListContainer";
import TagDeleteContainer from "./settings/tags/delete/tagDeleteContainer";
import TagCreateContainer from "./settings/tags/create/tagCreateContainer";
import TagUpdateContainer from "./settings/tags/update/tagUpdateContainer";

import HowHearsListContainer from "./settings/howHears/list/howHearListContainer";
import HowHearDeleteContainer from "./settings/howHears/delete/howHearDeleteContainer";
import HowHearCreateContainer from "./settings/howHears/create/howHearCreateContainer";
import HowHearUpdateContainer from "./settings/howHears/update/howHearUpdateContainer";

import AwayLogListContainer from "./settings/awayLogs/list/awayLogListContainer";
import AwayLogDeleteContainer from "./settings/awayLogs/delete/awayLogDeleteContainer";
import AwayLogCreateContainer from "./settings/awayLogs/create/awayLogCreateContainer";
import AwayLogUpdateContainer from "./settings/awayLogs/update/awayLogUpdateContainer";

import ResourcesListContainer from "./settings/resources/list/resourceListContainer";
import ResourceDeleteContainer from "./settings/resources/resourceDeleteContainer";
import ResourceCreateContainer from "./settings/resources/resourceCreateContainer";
import ResourceUpdateContainer from "./settings/resources/resourceUpdateContainer";

import BulletinBoardItemsListContainer from "./settings/bulletinBoardItems/list/bulletinBoardItemListContainer";
import BulletinBoardItemDeleteContainer from "./settings/bulletinBoardItems/delete/bulletinBoardItemDeleteContainer";
import BulletinBoardItemCreateContainer from "./settings/bulletinBoardItems/create/bulletinBoardItemCreateContainer";
import BulletinBoardItemUpdateContainer from "./settings/bulletinBoardItems/update/bulletinBoardItemUpdateContainer";
import BulletinBoardItemRetrieveContainer from "./settings/bulletinBoardItems/retrieve/bulletinBoardItemRetrieveContainer";

import SkillSetsListContainer from "./settings/skillSets/list/skillSetListContainer";
import SkillSetDeleteContainer from "./settings/skillSets/delete/skillSetDeleteContainer";
import SkillSetCreateContainer from "./settings/skillSets/create/skillSetCreateContainer";
import SkillSetUpdateContainer from "./settings/skillSets/update/skillSetUpdateContainer";

import InsuranceRequirementsListContainer from "./settings/insuranceRequirements/list/insuranceRequirementListContainer";
import InsuranceRequirementDeleteContainer from "./settings/insuranceRequirements/delete/insuranceRequirementDeleteContainer";
import InsuranceRequirementCreateContainer from "./settings/insuranceRequirements/create/insuranceRequirementCreateContainer";
import InsuranceRequirementUpdateContainer from "./settings/insuranceRequirements/update/insuranceRequirementUpdateContainer";

import ServiceFeesListContainer from "./settings/serviceFees/list/serviceFeeListContainer";
import ServiceFeeDeleteContainer from "./settings/serviceFees/delete/serviceFeeDeleteContainer";
import ServiceFeeCreateContainer from "./settings/serviceFees/create/serviceFeeCreateContainer";
import ServiceFeeUpdateContainer from "./settings/serviceFees/update/serviceFeeUpdateContainer";

import DeactivatedClientListContainer from "./settings/deactivatedClients/list/deactivatedClientListContainer";

import VehicleTypesListContainer from "./settings/vehicleTypes/list/vehicleTypeListContainer";
import VehicleTypeDeleteContainer from "./settings/vehicleTypes/delete/vehicleTypeDeleteContainer";
import VehicleTypeCreateContainer from "./settings/vehicleTypes/create/vehicleTypeCreateContainer";
import VehicleTypeUpdateContainer from "./settings/vehicleTypes/update/vehicleTypeUpdateContainer";

import PartnerListContainer from "./partners/list/partnerListContainer";
import PartnerSearchContainer from "./partners/search/partnerSearchContainer";
import PartnerSearchResultContainer from "./partners/search/partnerSearchResultContainer";
import PartnerLiteRetrieveContainer from "./partners/retrieve/partnerLiteRetrieveContainer";
import PartnerFullRetrieveContainer from "./partners/retrieve/partnerFullRetrieveContainer";
import PartnerCommentContainer from "./partners/retrieve/partnerCommentContainer";
import PartnerFileUploadAddContainer from "./partners/retrieve/file_upload/partnerFileUploadAddContainer";
import PartnerFileUploadArchiveContainer from "./partners/retrieve/file_upload/partnerFileUploadArchiveContainer";
import PartnerFileUploadListContainer from "./partners/retrieve/file_upload/partnerFileUploadListContainer";
import PartnerCreateStep1Container from "./partners/create/partnerCreateStep1Container";
import PartnerCreateStep2Container from "./partners/create/partnerCreateStep2Container";
import PartnerCreateStep3Container from "./partners/create/partnerCreateStep3Container";
import PartnerCreateStep4Container from "./partners/create/partnerCreateStep4Container";
import PartnerCreateStep5Container from "./partners/create/partnerCreateStep5Container";
import PartnerCreateStep6Container from "./partners/create/partnerCreateStep6Container";
import PartnerContactUpdateContainer from "./partners/update/partnerContactUpdateContainer";
import PartnerAddressUpdateContainer from "./partners/update/partnerAddressUpdateContainer";
import PartnerMetricsUpdateContainer from "./partners/update/partnerMetricsUpdateContainer";
import PartnerAvatarUpdateOperationContainer from "./partners/operations/partnerAvatarUpdateOperationContainer";

// Ongoing Work Order
import OngoingOrderListContainer from "./ongoingOrders/list/ongoingOrderListContainer";
import OngoingOrderLiteRetrieveContainer from "./ongoingOrders/retrieve/ongoingOrderLiteRetrieveContainer";
import OngoingOrderFullRetrieveContainer from "./ongoingOrders/retrieve/ongoingOrderFullRetrieveContainer";
import OngoingOrderUpdateContainer from "./ongoingOrders/update/ongoingOrderUpdateContainer";
import OngoingOrderCommentContainer from "./ongoingOrders/retrieve/ongoingOrderCommentContainer";

// (Associate) Profile
import AssociateProfileLiteRetrieveContainer from "./account/associateProfile/retrieve/associateProfileLiteRetrieveContainer";
import AssociateProfileFullRetrieveContainer from "./account/associateProfile/retrieve/associateProfileFullRetrieveContainer";
import AssociateProfileAccountUpdateContainer from "./account/associateProfile/update/associateProfileAccountUpdateContainer";
import AssociateProfileAddressUpdateContainer from "./account/associateProfile/update/associateProfileAddressUpdateContainer";
import AssociateProfileContactUpdateContainer from "./account/associateProfile/update/associateProfileContactUpdateContainer";
import AssociateProfileMetricsUpdateContainer from "./account/associateProfile/update/associateProfileMetricsUpdateContainer";


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
                            <ScrollUpButton ContainerClassName="ScrollUpButtonCustomContainer" TransitionClassName="ScrollUpButtonCustomToggled" >

							</ScrollUpButton>
                            <Switch>
                                { /* ACCOUNT + GENERAL */}
                                <Route path="/" exact component={LoginContainer} />
                                <Route path="/privacy" exact component={PrivacyContainer} />
                                <Route path="/terms" exact component={TermsContainer} />
                                <Route path="/help" exact component={requiresAuth(HelpContainer)} />
                                <Route path="/login" exact component={LoginContainer} />
                                <Route path="/logout" exact component={LogoutContainer} />
                                <Route path="/organizations" exact component={requiresAuth(SharedOrganizationListContainer)} />
                                <Route path="/organization/add" exact component={requiresAuth(SharedOrganizationCreateContainer)} />
                                <Route path="/organization/add-success" exact component={requiresAuth(SharedOrganizationCreateSuccessContainer)} />
                                <Route path="/organization/:id/update" exact component={requiresAuth(SharedOrganizationUpdateContainer)} />
                                <Route path="/dashboard-redirect/:accessToken/:refreshToken" exact component={TenantDashboardRedirectContainer} />
                                <Route path="/dashboard" exact component={requiresAuth(DashboardContainer)} />
                                <Route path="/comments" exact component={requiresAuth(CommentListContainer)} />
                                <Route path="/profile/associate/lite" exact component={requiresAuth(AssociateProfileLiteRetrieveContainer)} />
                                <Route path="/profile/associate/full" exact component={requiresAuth(AssociateProfileFullRetrieveContainer)} />
                                <Route path="/profile/associate/update/account" exact component={requiresAuth(AssociateProfileAccountUpdateContainer)} />
                                <Route path="/profile/associate/update/address" exact component={requiresAuth(AssociateProfileAddressUpdateContainer)} />
                                <Route path="/profile/associate/update/contact" exact component={requiresAuth(AssociateProfileContactUpdateContainer)} />
                                <Route path="/profile/associate/update/metrics" exact component={requiresAuth(AssociateProfileMetricsUpdateContainer)} />

                                { /* CLIENTS */ }
                                <Route path="/clients/add/step-1" exact component={requiresAuth(ClientCreateStep1Container)} />
                                <Route path="/clients/add/step-2" exact component={requiresAuth(ClientCreateStep2Container)} />
                                <Route path="/clients/add/step-3" exact component={requiresAuth(ClientCreateStep3Container)} />
                                <Route path="/clients/add/step-4" exact component={requiresAuth(ClientCreateStep4Container)} />
                                <Route path="/clients/add/step-5" exact component={requiresAuth(ClientCreateStep5Container)} />
                                <Route path="/clients/add/step-6" exact component={requiresAuth(ClientCreateStep6Container)} />
                                <Route path="/clients/add/step-7" exact component={requiresAuth(ClientCreateStep7Container)} />
                                <Route path="/clients" exact component={requiresAuth(ClientListContainer)} />
                                <Route path="/clients/search" exact component={requiresAuth(ClientSearchContainer)} />
                                <Route path="/clients/search-results" exact component={requiresAuth(ClientSearchResultContainer)} />
                                <Route path="/client/:id" exact component={requiresAuth(ClientLiteRetrieveContainer)} />
                                <Route path="/client/:id/full" exact component={requiresAuth(ClientFullRetrieveContainer)} />
                                <Route path="/client/:id/orders" exact component={requiresAuth(ClientOrderListContainer)} />
                                <Route path="/client/:id/comments" exact component={requiresAuth(ClientCommentContainer)} />
                                <Route path="/client/:id/avatar" exact component={requiresAuth(ClientAvatarUpdateOperationContainer)} />
                                <Route path="/client/:id/file/add" exact component={requiresAuth(CustomerFileUploadAddContainer)} />
                                <Route path="/client/:id/file/archive/:fileId" exact component={requiresAuth(CustomerFileUploadArchiveContainer)} />
                                <Route path="/client/:id/files" exact component={requiresAuth(CustomerFileUploadListContainer)} />
                                <Route path="/client/:id/update/contact" exact component={requiresAuth(ClientContactUpdateContainer)} />
                                <Route path="/client/:id/update/address" exact component={requiresAuth(ClientAddressUpdateContainer)} />
                                <Route path="/client/:id/update/metrics" exact component={requiresAuth(ClientMetricsUpdateContainer)} />
                                <Route path="/client/:id/unarchive" exact component={requiresAuth(ClientUnarchiveOperationContainer)} />
                                <Route path="/client/:id/archive" exact component={requiresAuth(ClientArchiveOperationContainer)} />
                                <Route path="/client/:id/delete" exact component={requiresAuth(ClientPermanentDeleteOperationContainer)} />
                                <Route path="/client/:id/rez-upgrade" exact component={requiresAuth(ClientRezUpgradeOperationContainer)} />

                                { /* ASSOCIATES */ }
                                <Route path="/associates/add/step-1" exact component={requiresAuth(AdminAssociateCreateStep1Container)} />
                                <Route path="/associates/add/step-2" exact component={requiresAuth(AdminAssociateCreateStep2Container)} />
                                <Route path="/associates/add/step-3" exact component={requiresAuth(AdminAssociateCreateStep3Container)} />
                                <Route path="/associates/add/step-4" exact component={requiresAuth(AdminAssociateCreateStep4Container)} />
                                <Route path="/associates/add/step-5" exact component={requiresAuth(AdminAssociateCreateStep5Container)} />
                                <Route path="/associates/add/step-6" exact component={requiresAuth(AdminAssociateCreateStep6Container)} />
                                <Route path="/associates/add/step-7" exact component={requiresAuth(AdminAssociateCreateStep7Container)} />
                                <Route path="/associates/add/step-8" exact component={requiresAuth(AdminAssociateCreateStep8Container)} />
                                <Route path="/associates" exact component={requiresAuth(AdminAssociateListContainer)} />
                                <Route path="/associates/search" exact component={requiresAuth(AdminAssociateSearchContainer)} />
                                <Route path="/associates/search-results" exact component={requiresAuth(AdminAssociateSearchResultContainer)} />
                                <Route path="/associate/:id" exact component={requiresAuth(AdminAssociateLiteRetrieveContainer)} />
                                <Route path="/associate/:id/full" exact component={requiresAuth(AdminAssociateFullRetrieveContainer)} />
                                <Route path="/associate/:id/orders" exact component={requiresAuth(AdminAssociateOrderListContainer)} />
                                <Route path="/associate/:id/comments" exact component={requiresAuth(AdminAssociateCommentContainer)} />
                                <Route path="/associate/:id/avatar" exact component={requiresAuth(AdminAssociateAvatarOperationContainer)} />
                                <Route path="/associate/:id/file/add" exact component={requiresAuth(AdminAssociateFileUploadAddContainer)} />
                                <Route path="/associate/:id/file/archive/:fileId" exact component={requiresAuth(AdminAssociateFileUploadArchiveContainer)} />
                                <Route path="/associate/:id/files" exact component={requiresAuth(AdminAssociateFileUploadListContainer)} />
                                <Route path="/associate/:id/activity-sheets" exact component={requiresAuth(AdminAssociateActivitySheetListContainer)} />
                                <Route path="/associate/:id/update/account" exact component={requiresAuth(AdminAssociateAccountUpdateContainer)} />
                                <Route path="/associate/:id/update/address" exact component={requiresAuth(AdminAssociateAddressUpdateContainer)} />
                                <Route path="/associate/:id/update/contact" exact component={requiresAuth(AdminAssociateContactUpdateContainer)} />
                                <Route path="/associate/:id/update/metrics" exact component={requiresAuth(AdminAssociateMetricsUpdateContainer)} />
                                <Route path="/associate/:id/operations/balance" exact component={requiresAuth(AdminAssociateBalanceOperationContainer)} />
                                <Route path="/associate/:id/operations/password" exact component={requiresAuth(AdminAssociateChangePasswordOperationContainer)} />

                                { /* WORK ORDER */}
                                <Route path="/orders/add/step-1" exact component={requiresAuth(AdminOrderCreateStep1Container)} />
                                <Route path="/orders/add/step-2" exact component={requiresAuth(AdminOrderCreateStep2Container)} />
                                <Route path="/orders/add/step-3" exact component={requiresAuth(AdminOrderCreateStep3Container)} />
                                <Route path="/orders/add/step-4" exact component={requiresAuth(AdminOrderCreateStep4Container)} />
                                <Route path="/orders/add/step-5" exact component={requiresAuth(AdminOrderCreateStep5Container)} />
                                <Route path="/orders/add/step-6" exact component={requiresAuth(AdminOrderCreateStep6Container)} />
                                <Route path="/orders" exact component={requiresAuth(AdminOrderListContainer)} />
                                <Route path="/orders/search" exact component={requiresAuth(AdminOrderSearchContainer)} />
                                <Route path="/orders/search-results" exact component={requiresAuth(AdminOrderSearchResultContainer)} />
                                <Route path="/order/:id" exact component={requiresAuth(AdminOrderLiteRetrieveContainer)} />
                                <Route path="/order/:id/full" exact component={requiresAuth(AdminOrderFullRetrieveContainer)} />
                                <Route path="/order/:id/tasks" exact component={requiresAuth(AdminOrderTaskListContainer)} />
                                <Route path="/order/:id/activity-sheets" exact component={requiresAuth(AdminOrderActivitySheetListContainer)} />
                                <Route path="/order/:id/comments" exact component={requiresAuth(AdminOrderCommentContainer)} />
                                <Route path="/order/:id/file/add" exact component={requiresAuth(AdminOrderFileUploadAddContainer)} />
                                <Route path="/order/:id/file/archive/:fileId" exact component={requiresAuth(AdminOrderFileUploadArchiveContainer)} />
                                <Route path="/order/:id/files" exact component={requiresAuth(AdminOrderFileUploadListContainer)} />
                                <Route path="/order/:id/postpone" exact component={requiresAuth(AdminOrderPostponeOperationContainer)} />
                                <Route path="/order/:id/unassign-associate" exact component={requiresAuth(AdminOrderUnassignAssociateOperationContainer)} />
                                <Route path="/order/:id/close" exact component={requiresAuth(AdminOrderCloseOperationContainer)} />
                                <Route path="/order/:id/reopen" exact component={requiresAuth(AdminOrderReopenOperationContainer)} />
                                <Route path="/order/:id/update/lite" exact component={requiresAuth(AdminOrderLiteUpdateContainer)} />
                                <Route path="/order/:id/transfer-step-1" exact component={requiresAuth(AdminOrderTransferStep1Container)} />
                                <Route path="/order/:id/transfer-step-2" exact component={requiresAuth(AdminOrderTransferStep2Container)} />
                                <Route path="/order/:id/transfer-step-3" exact component={requiresAuth(AdminOrderTransferStep3Container)} />
                                <Route path="/order/:id/transfer-step-4" exact component={requiresAuth(AdminOrderTransferStep4Container)} />
                                <Route path="/order/:id/transfer-step-5" exact component={requiresAuth(AdminOrderTransferStep5Container)} />

                                { /* (Associate) Work Orders */ }
                                <Route path="/jobs" exact component={requiresAuth(AssociateOrderListContainer)} />
                                <Route path="/job/:id" exact component={requiresAuth(AssociateOrderLiteRetrieveContainer)} />
                                <Route path="/job/:id/full" exact component={requiresAuth(AssociateOrderFullRetrieveContainer)} />

                                { /* TASKS */ }
                                <Route path="/tasks" exact component={requiresAuth(TaskListContainer)} />
                                <Route path="/tasks/search" exact component={requiresAuth(TaskSearchContainer)} />
                                <Route path="/tasks/search-results" exact component={requiresAuth(TaskSearchResultContainer)} />
                                <Route path="/task/1/:id/step-1" exact component={requiresAuth(AssignAssociateTaskStep1Container)} />
                                <Route path="/task/1/:id/step-2" exact component={requiresAuth(AssignAssociateTaskStep2Container)} />
                                <Route path="/task/1/:id/step-3" exact component={requiresAuth(AssignAssociateTaskStep3Container)} />
                                <Route path="/task/1/:id/step-4" exact component={requiresAuth(AssignAssociateTaskStep4Container)} />
                                <Route path="/task/2/:id/step-1" exact component={requiresAuth(FollowUpTaskStep1Container)} />
                                <Route path="/task/2/:id/step-2" exact component={requiresAuth(FollowUpTaskStep2Container)} />
                                <Route path="/task/2/:id/step-3" exact component={requiresAuth(FollowUpTaskStep3Container)} />
                                <Route path="/task/4/:id/step-1" exact component={requiresAuth(FollowUpPendingTaskStep1Container)} />
                                <Route path="/task/4/:id/step-2" exact component={requiresAuth(FollowUpPendingTaskStep2Container)} />
                                <Route path="/task/6/:id/step-1" exact component={requiresAuth(OrderCompletionTaskStep1Container)} />
                                <Route path="/task/6/:id/step-2" exact component={requiresAuth(OrderCompletionTaskStep2Container)} />
                                <Route path="/task/6/:id/step-3" exact component={requiresAuth(OrderCompletionTaskStep3Container)} />
                                <Route path="/task/6/:id/step-4" exact component={requiresAuth(OrderCompletionTaskStep4Container)} />
                                <Route path="/task/6/:id/step-5" exact component={requiresAuth(OrderCompletionTaskStep5Container)} />
                                <Route path="/task/7/:id/step-1" exact component={requiresAuth(SurveyTaskStep1Container)} />
                                <Route path="/task/7/:id/step-2" exact component={requiresAuth(SurveyTaskStep2Container)} />
                                <Route path="/task/7/:id/step-3" exact component={requiresAuth(SurveyTaskStep3Container)} />

                                { /* STAFF */ }
                                <Route path="/staff/add/step-1" exact component={requiresAuth(StaffCreateStep1Container)} />
                                <Route path="/staff/add/step-2" exact component={requiresAuth(StaffCreateStep2Container)} />
                                <Route path="/staff/add/step-3" exact component={requiresAuth(StaffCreateStep3Container)} />
                                <Route path="/staff/add/step-4" exact component={requiresAuth(StaffCreateStep4Container)} />
                                <Route path="/staff/add/step-5" exact component={requiresAuth(StaffCreateStep5Container)} />
                                <Route path="/staff/add/step-6" exact component={requiresAuth(StaffCreateStep6Container)} />
                                <Route path="/staff/add/step-7" exact component={requiresAuth(StaffCreateStep7Container)} />
                                <Route path="/staff/add/step-8" exact component={requiresAuth(StaffCreateStep8Container)} />
                                <Route path="/staff" exact component={requiresAuth(StaffListContainer)} />
                                <Route path="/staff/search" exact component={requiresAuth(StaffSearchContainer)} />
                                <Route path="/staff/search-results" exact component={requiresAuth(StaffSearchResultContainer)} />
                                <Route path="/staff/:id" exact component={requiresAuth(StaffLiteRetrieveContainer)} />
                                <Route path="/staff/:id/full" exact component={requiresAuth(StaffFullRetrieveContainer)} />
                                <Route path="/staff/:id/comments" exact component={requiresAuth(StaffCommentContainer)} />
                                <Route path="/staff/:id/file/add" exact component={requiresAuth(StaffFileUploadAddContainer)} />
                                <Route path="/staff/:id/file/archive/:fileId" exact component={requiresAuth(StaffFileUploadArchiveContainer)} />
                                <Route path="/staff/:id/files" exact component={requiresAuth(StaffFileUploadListContainer)} />
                                <Route path="/staff/:id/update/contact" exact component={requiresAuth(StaffContactUpdateContainer)} />
                                <Route path="/staff/:id/update/address" exact component={requiresAuth(StaffAddressUpdateContainer)} />
                                <Route path="/staff/:id/update/account" exact component={requiresAuth(StaffAccountUpdateContainer)} />
                                <Route path="/staff/:id/update/metrics" exact component={requiresAuth(StaffMetricsUpdateContainer)} />
                                <Route path="/staff/:id/archive" exact component={requiresAuth(StaffArchiveContainer)} />
                                <Route path="/staff/:id/password" exact component={requiresAuth(StaffAccountChangePasswordContainer)} />
                                <Route path="/staff/:id/role" exact component={requiresAuth(StaffChangeRoleContainer)} />
                                <Route path="/staff/:id/avatar" exact component={requiresAuth(StaffAvatarUpdateOperationContainer)} />

                                { /* REPORTS */ }
                                <Route path="/reports" exact component={requiresAuth(ReportListContainer)} />
                                <Route path="/report/1" exact component={requiresAuth(Report1Container)} />
                                <Route path="/report/2" exact component={requiresAuth(Report2Container)} />
                                <Route path="/report/3" exact component={requiresAuth(Report3Container)} />
                                <Route path="/report/4" exact component={requiresAuth(Report4Container)} />
                                <Route path="/report/5" exact component={requiresAuth(Report5Container)} />
                                <Route path="/report/6" exact component={requiresAuth(Report6Container)} />
                                <Route path="/report/7" exact component={requiresAuth(Report7Container)} />
                                <Route path="/report/8" exact component={requiresAuth(Report8Container)} />
                                <Route path="/report/9" exact component={requiresAuth(Report9Container)} />
                                <Route path="/report/10" exact component={requiresAuth(Report10Container)} />
                                <Route path="/report/11" exact component={requiresAuth(Report11Container)} />
                                <Route path="/report/12" exact component={requiresAuth(Report12Container)} />
                                <Route path="/report/13" exact component={requiresAuth(Report13Container)} />
                                <Route path="/report/14" exact component={requiresAuth(Report14Container)} />
                                <Route path="/report/15" exact component={requiresAuth(Report15Container)} />
                                <Route path="/report/16" exact component={requiresAuth(Report16Container)} />
                                <Route path="/report/17" exact component={requiresAuth(Report17Container)} />

                                { /* SKILLSETS */ }
                                <Route path="/skill-sets" exact component={requiresAuth(SkillsetSearchContainer)} />
                                <Route path="/skill-sets/results" exact component={requiresAuth(SkillsetSearchResultsContainer)} />

                                { /* FINANCIALS */ }
                                <Route path="/financials" exact component={requiresAuth(FinancialListContainer)} />
                                <Route path="/financial/:id" exact component={requiresAuth(FinancialRetrieveContainer)} />
                                <Route path="/financial/:id/update" exact component={requiresAuth(FinancialUpdateContainer)} />
                                <Route path="/financial/:id/clone" exact component={requiresAuth(FinancialCloneOperationContainer)} />
                                <Route path="/financial/:id/deposits" exact component={requiresAuth(DepositListContainer)} />
                                <Route path="/financial/:id/invoice" exact component={requiresAuth(InvoiceRetrieveContainer)} />
                                <Route path="/financial/:id/invoice/create/step-1" exact component={requiresAuth(InvoiceCreateStep1Container)} />
                                <Route path="/financial/:id/invoice/create/step-2" exact component={requiresAuth(InvoiceCreateStep2Container)} />
                                <Route path="/financial/:id/invoice/create/step-3" exact component={requiresAuth(InvoiceCreateStep3Container)} />
                                <Route path="/financial/:id/invoice/create/step-4" exact component={requiresAuth(InvoiceCreateStep4Container)} />
                                <Route path="/financial/:id/invoice/update/first-section" exact component={requiresAuth(InvoiceFirstSectionUpdateContainer)} />
                                <Route path="/financial/:id/invoice/update/second-section" exact component={requiresAuth(InvoiceSecondSectionUpdateContainer)} />
                                <Route path="/financial/:id/invoice/update/third-section" exact component={requiresAuth(InvoiceThirdSectionUpdateContainer)} />
                                <Route path="/financial/:id/deposit/create/step-1" exact component={requiresAuth(DepositCreateStep1Container)} />
                                <Route path="/financial/:id/deposit/create/step-2" exact component={requiresAuth(DepositCreateStep2Container)} />

                                { /* SETTINGS */ }
                                <Route path="/settings" exact component={requiresAuth(SettingListContainer)} />
                                <Route path="/settings/tags" exact component={requiresAuth(TagsListContainer)} />
                                <Route path="/settings/tag/add" exact component={requiresAuth(TagCreateContainer)} />
                                <Route path="/settings/tag/:id/delete" exact component={requiresAuth(TagDeleteContainer)} />
                                <Route path="/settings/tag/:id/update" exact component={requiresAuth(TagUpdateContainer)} />
                                <Route path="/settings/how-hears" exact component={requiresAuth(HowHearsListContainer)} />
                                <Route path="/settings/how-hears/add" exact component={requiresAuth(HowHearCreateContainer)} />
                                <Route path="/settings/how-hear/:id/delete" exact component={requiresAuth(HowHearDeleteContainer)} />
                                <Route path="/settings/how-hear/:id/update" exact component={requiresAuth(HowHearUpdateContainer)} />
                                <Route path="/settings/away-logs" exact component={requiresAuth(AwayLogListContainer)} />
                                <Route path="/settings/away-logs/add" exact component={requiresAuth(AwayLogCreateContainer)} />
                                <Route path="/settings/away-log/:id/delete" exact component={requiresAuth(AwayLogDeleteContainer)} />
                                <Route path="/settings/away-log/:id/update" exact component={requiresAuth(AwayLogUpdateContainer)} />
                                <Route path="/settings/resources" exact component={requiresAuth(ResourcesListContainer)} />
                                <Route path="/settings/resource/add" exact component={requiresAuth(ResourceCreateContainer)} />
                                <Route path="/settings/resource/:id/delete" exact component={requiresAuth(ResourceDeleteContainer)} />
                                <Route path="/settings/resource/:id/update" exact component={requiresAuth(ResourceUpdateContainer)} />
                                <Route path="/settings/bulletin-board-items" exact component={requiresAuth(BulletinBoardItemsListContainer)} />
                                <Route path="/settings/bulletin-board-items/add" exact component={requiresAuth(BulletinBoardItemCreateContainer)} />
                                <Route path="/settings/bulletin-board-item/:id" exact component={requiresAuth(BulletinBoardItemRetrieveContainer)} />
                                <Route path="/settings/bulletin-board-item/:id/delete" exact component={requiresAuth(BulletinBoardItemDeleteContainer)} />
                                <Route path="/settings/bulletin-board-item/:id/update" exact component={requiresAuth(BulletinBoardItemUpdateContainer)} />
                                <Route path="/settings/skill-sets" exact component={requiresAuth(SkillSetsListContainer)} />
                                <Route path="/settings/skill-sets/add" exact component={requiresAuth(SkillSetCreateContainer)} />
                                <Route path="/settings/skill-set/:id/delete" exact component={requiresAuth(SkillSetDeleteContainer)} />
                                <Route path="/settings/skill-set/:id/update" exact component={requiresAuth(SkillSetUpdateContainer)} />
                                <Route path="/settings/insurance-requirements" exact component={requiresAuth(InsuranceRequirementsListContainer)} />
                                <Route path="/settings/insurance-requirement/add" exact component={requiresAuth(InsuranceRequirementCreateContainer)} />
                                <Route path="/settings/insurance-requirement/:id/delete" exact component={requiresAuth(InsuranceRequirementDeleteContainer)} />
                                <Route path="/settings/insurance-requirement/:id/update" exact component={requiresAuth(InsuranceRequirementUpdateContainer)} />
                                <Route path="/settings/service-fees" exact component={requiresAuth(ServiceFeesListContainer)} />
                                <Route path="/settings/service-fee/add" exact component={requiresAuth(ServiceFeeCreateContainer)} />
                                <Route path="/settings/service-fee/:id/delete" exact component={requiresAuth(ServiceFeeDeleteContainer)} />
                                <Route path="/settings/service-fee/:id/update" exact component={requiresAuth(ServiceFeeUpdateContainer)} />
                                <Route path="/settings/deactivated-clients" exact component={requiresAuth(DeactivatedClientListContainer)} />
                                <Route path="/settings/vehicle-types" exact component={requiresAuth(VehicleTypesListContainer)} />
                                <Route path="/settings/vehicle-type/add" exact component={requiresAuth(VehicleTypeCreateContainer)} />
                                <Route path="/settings/vehicle-type/:id/delete" exact component={requiresAuth(VehicleTypeDeleteContainer)} />
                                <Route path="/settings/vehicle-type/:id/update" exact component={requiresAuth(VehicleTypeUpdateContainer)} />

                                { /* PARTNERS */ }
                                <Route path="/partners/add/step-1" exact component={requiresAuth(PartnerCreateStep1Container)} />
                                <Route path="/partners/add/step-2" exact component={requiresAuth(PartnerCreateStep2Container)} />
                                <Route path="/partners/add/step-3" exact component={requiresAuth(PartnerCreateStep3Container)} />
                                <Route path="/partners/add/step-4" exact component={requiresAuth(PartnerCreateStep4Container)} />
                                <Route path="/partners/add/step-5" exact component={requiresAuth(PartnerCreateStep5Container)} />
                                <Route path="/partners/add/step-6" exact component={requiresAuth(PartnerCreateStep6Container)} />
                                <Route path="/partners" exact component={requiresAuth(PartnerListContainer)} />
                                <Route path="/partners/search" exact component={requiresAuth(PartnerSearchContainer)} />
                                <Route path="/partners/search-results" exact component={requiresAuth(PartnerSearchResultContainer)} />
                                <Route path="/partner/:id" exact component={requiresAuth(PartnerLiteRetrieveContainer)} />
                                <Route path="/partner/:id/full" exact component={requiresAuth(PartnerFullRetrieveContainer)} />
                                <Route path="/partner/:id/comments" exact component={requiresAuth(PartnerCommentContainer)} />
                                <Route path="/partner/:id/file/add" exact component={requiresAuth(PartnerFileUploadAddContainer)} />
                                <Route path="/partner/:id/file/archive/:fileId" exact component={requiresAuth(PartnerFileUploadArchiveContainer)} />
                                <Route path="/partner/:id/files" exact component={requiresAuth(PartnerFileUploadListContainer)} />
                                <Route path="/partner/:id/avatar" exact component={requiresAuth(PartnerAvatarUpdateOperationContainer)} />
                                <Route path="/partner/:id/update/contact" exact component={requiresAuth(PartnerContactUpdateContainer)} />
                                <Route path="/partner/:id/update/address" exact component={requiresAuth(PartnerAddressUpdateContainer)} />
                                <Route path="/partner/:id/update/metrics" exact component={requiresAuth(PartnerMetricsUpdateContainer)} />

                                { /* WORK ORDER */}
                                <Route path="/ongoing-orders" exact component={requiresAuth(OngoingOrderListContainer)} />
                                <Route path="/ongoing-order/:id" exact component={requiresAuth(OngoingOrderLiteRetrieveContainer)} />
                                <Route path="/ongoing-order/:id/full" exact component={requiresAuth(OngoingOrderFullRetrieveContainer)} />
                                <Route path="/ongoing-order/:id/comments" exact component={requiresAuth(OngoingOrderCommentContainer)} />
                                <Route path="/ongoing-order/:id/update/lite" exact component={requiresAuth(OngoingOrderUpdateContainer)} />

                                { /* EVERYTHING ELSE... */ }
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
