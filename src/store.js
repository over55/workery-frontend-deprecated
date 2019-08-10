import thunk from 'redux-thunk';
import  { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { APP_STATE } from "./constants/redux";
import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
    TENANT_LIST_SUCCESS, CLIENT_LIST_SUCCESS, ORDER_LIST_SUCCESS,
    ASSOCIATE_LIST_SUCCESS, TASK_LIST_SUCCESS, FINANCIAL_LIST_SUCCESS,
    TAG_LIST_SUCCESS, HOW_HEAR_LIST_SUCCESS, AWAY_LOG_LIST_SUCCESS,
    SKILL_SET_LIST_SUCCESS, INSURANCE_REQUIREMENT_LIST_SUCCESS, SERVICE_FEE_LIST_SUCCESS,
    DEACTIVATED_CLIENT_LIST_SUCCESS, PARTNER_LIST_SUCCESS, CLIENT_COMMENT_LIST_REQUEST,
    ASSOCIATE_COMMENT_LIST_REQUEST, ACTIVITY_SHEET_LIST_SUCCESS, ACTIVITY_SHEET_DETAIL_SUCCESS
} from "./constants/actionTypes";
import { associateListReducer, associateDetailReducer } from "./reducers/associateReducers";
import { awayLogListReducer, awayLogDetailReducer } from "./reducers/awayLogReducers";
import { bulletinBoardItemListReducer, bulletinBoardItemDetailReducer } from "./reducers/bulletinBoardItemReducers";
import { clientListReducer, clientDetailReducer } from "./reducers/clientReducers";
import dashboardReducer from "./reducers/dashboardReducer";
import deactivatedClientListReducer from "./reducers/deactivatedClientReducers";
import flashMessageReducer from "./reducers/flashMessageReducer";
import { howHearListReducer, howHearDetailReducer } from "./reducers/howHearReducers";
import { insuranceRequirementListReducer, insuranceRequirementDetailReducer } from "./reducers/insuranceRequirementReducers";
import { orderListReducer, orderDetailReducer } from "./reducers/orderReducers";
import { partnerListReducer, partnerDetailReducer } from "./reducers/partnerReducers";
import { serviceFeeListReducer, serviceFeeDetailReducer } from "./reducers/serviceFeeReducers";
import { skillSetListReducer, skillSetDetailReducer } from "./reducers/skillSetReducers";
import { staffListReducer, staffDetailReducer } from "./reducers/staffReducers";
import { tagListReducer, tagDetailReducer } from "./reducers/tagReducers";
import { tenantListReducer, tenantDetailReducer } from "./reducers/tenantReducer";
import userReducer from "./reducers/userReducer";
import { taskListReducer, taskDetailReducer } from "./reducers/taskReducers";
import financialListReducer from "./reducers/financialReducers";
import { vehicleTypeListReducer, vehicleTypeDetailReducer } from "./reducers/vehicleTypeReducers";
import { clientCommentListReducer } from "./reducers/clientCommentReducers";
import { associateCommentListReducer } from "./reducers/associateCommentReducers";
import { activitySheetItemListReducer, activitySheetItemDetailReducer } from "./reducers/activitySheetItemReducers";


// Combine Reducers
const appReducer = combineReducers({
    associateListState: associateListReducer, associateDetailState: associateDetailReducer,
    awayLogListState: awayLogListReducer, awayLogDetailState: awayLogDetailReducer,
    bulletinBoardItemListState: bulletinBoardItemListReducer, bulletinBoardItemDetailState: bulletinBoardItemDetailReducer,
    clientListState: clientListReducer, clientDetailState: clientDetailReducer,
    dashboardState: dashboardReducer,
    deactivatedClientListState: deactivatedClientListReducer,
    flashMessageState: flashMessageReducer,
    howHearListState: howHearListReducer, howHearDetailState: howHearDetailReducer,
    insuranceRequirementListState: insuranceRequirementListReducer, insuranceRequirementDetailState: insuranceRequirementDetailReducer,
    orderListState: orderListReducer, orderDetailState: orderDetailReducer,
    partnerListState: partnerListReducer, partnerDetailState: partnerDetailReducer,
    serviceFeeListState: serviceFeeListReducer, serviceFeeDetailState: serviceFeeDetailReducer,
    skillSetListState: skillSetListReducer, skillSetDetailState: skillSetDetailReducer,
    staffListState: staffListReducer, staffDetailState: staffDetailReducer,
    tagListState: tagListReducer, tagDetailState: tagDetailReducer,
    taskListState: taskListReducer, taskDetailState: taskDetailReducer,
    tenantListState: tenantListReducer, tenantDetailState: tenantDetailReducer,
    userState: userReducer,
    financialListState: financialListReducer,
    vehicleTypeListState: vehicleTypeListReducer, vehicleTypeDetailState: vehicleTypeDetailReducer,
    clientCommentListState: clientCommentListReducer,
    associateCommentListState: associateCommentListReducer,
    activitySheetItemListState: activitySheetItemListReducer, activitySheetItemDetailState: activitySheetItemDetailReducer,
});


/**
 *  Reducer to be used before the "appReducer" used. The difference with is
 *  this reducer will clear the `redux` state if the logout state was detected.
 *
 *  Special thanks to:
 *  https://stackoverflow.com/a/35641992
 */
const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined
    }
    return appReducer(state, action)
}


/**
 *  Function will save the application state if a specific 'react-redux' state
 *  was triggered.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if ([
            LOGIN_SUCCESS, LOGOUT_SUCCESS, DASHBOARD_SUCCESS, PROFILE_SUCCESS,
            TENANT_LIST_SUCCESS, CLIENT_LIST_SUCCESS, ORDER_LIST_SUCCESS,
            TASK_LIST_SUCCESS, FINANCIAL_LIST_SUCCESS, AWAY_LOG_LIST_SUCCESS,
            SKILL_SET_LIST_SUCCESS, INSURANCE_REQUIREMENT_LIST_SUCCESS, SERVICE_FEE_LIST_SUCCESS,
            DEACTIVATED_CLIENT_LIST_SUCCESS, HOW_HEAR_LIST_SUCCESS, TAG_LIST_SUCCESS, ASSOCIATE_LIST_SUCCESS,
            CLIENT_COMMENT_LIST_REQUEST, ASSOCIATE_COMMENT_LIST_REQUEST, ACTIVITY_SHEET_LIST_SUCCESS, ACTIVITY_SHEET_DETAIL_SUCCESS
        ].includes(result.type)) {
            // console.log("De-hydrating store...");
            localStorage.setItem(APP_STATE, JSON.stringify(getState()))
        }
        return result;
    };
};


/**
 *  Function will load up the saved app-state from the local storage on
 *  application initial startup.
 *
 *  Special thanks: https://stackoverflow.com/a/52593860
 */
const reHydrateStore = () => {
    const data = localStorage.getItem(APP_STATE);
    if (data) {
        // console.log("Re-hydrating Store...");
        const jsonData = JSON.parse(data);
        // console.log("Store Contents:", jsonData); // For debugging purposes only.
        return jsonData;
    }
    return undefined;
};


// Create our store singleton object and populate it with our initial data.
const store = createStore(
    rootReducer,
    reHydrateStore(),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            localStorageMiddleware
        )
    )
);


export default store;
