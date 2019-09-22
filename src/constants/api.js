/**
 *  The constant used for hydrating/re-hydrating the redux state.
 */
export const APP_STATE = 'APP_STATE';

/**
 *  The API web-services endpoints.
 */
export const WORKERY_API_BASE_PATH = '/en/api'
export const WORKERY_LOGIN_API_ENDPOINT = '/login';
export const WORKERY_REFRESH_TOKEN_API_ENDPOINT = '/refresh-token';
export const WORKERY_PROFILE_API_ENDPOINT = '/profile';
export const WORKERY_TENANT_LIST_API_ENDPOINT = '/franchises';
export const WORKERY_TENANT_DETAIL_API_ENDPOINT = '/franchise/';
export const WORKERY_DASHBOARD_API_ENDPOINT = '/dashboard';
export const WORKERY_NAVIGATION_API_ENDPOINT = '/navigation';
export const WORKERY_CLIENT_LIST_API_ENDPOINT = '/v2/customers';
export const WORKERY_CLIENT_DETAIL_API_ENDPOINT = '/v2/customer/';
export const WORKERY_CLIENT_ARCHIVE_API_ENDPOINT = '/customers/operation/archive';
export const WORKERY_CLIENT_REZ_UPGRADE_API_ENDPOINT = '/customers/operation/upgrade-residential';
export const WORKERY_CLIENT_COMMENT_LIST_API_ENDPOINT = '/customer-comments';
export const WORKERY_CLIENT_FILE_LIST_API_ENDPOINT = '/customer-files';
export const WORKERY_CLIENT_FILE_ARCHIVE_API_ENDPOINT = '/customer-file/XXX/';
export const WORKERY_CLIENT_CONTACT_UPDATE_API_ENDPOINT = '/customer/XXX/contact';
export const WORKERY_CLIENT_ADDRESS_UPDATE_API_ENDPOINT = '/customer/XXX/address';
export const WORKERY_CLIENT_METRICS_UPDATE_API_ENDPOINT = '/customer/XXX/metrics';
export const WORKERY_ORDER_LIST_API_ENDPOINT = '/orders';
export const WORKERY_ORDER_DETAIL_API_ENDPOINT = '/order/';
export const WORKERY_ORDER_LITE_UPDATE_API_ENDPOINT = '/order/XXX/lite';
export const WORKERY_ORDER_FINANCIAL_UPDATE_API_ENDPOINT = '/order/XXX/financial';
export const WORKERY_ORDER_COMMENT_LIST_API_ENDPOINT = '/order-comments';
export const WORKERY_ORDER_TRANSFER_OPERATION_API_ENDPOINT = '/orders/operation/transfer';
export const WORKERY_ORDER_UNASSIGN_ASSOCIATE_OPERATION_API_ENDPOINT = '/orders/operation/unassign';
export const WORKERY_ORDER_CLOSE_OPERATION_API_ENDPOINT = '/orders/operation/close';
export const WORKERY_ORDER_REOPEN_OPERATION_API_ENDPOINT = '/orders/operation/reopen';
export const WORKERY_ORDER_POSTPONE_OPERATION_API_ENDPOINT = '/orders/operation/postpone';
export const WORKERY_TASK_ORDER_COMPLETION_OPERATION_API_ENDPOINT = '/orders/operation/order-completion';
export const WORKERY_ORDER_FILE_LIST_API_ENDPOINT = '/order-files';
export const WORKERY_ORDER_FILE_ARCHIVE_API_ENDPOINT = '/order-file/XXX/';
export const WORKERY_ASSOCIATE_LIST_API_ENDPOINT = '/associates';
export const WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT = '/associate/';
export const WORKERY_ASSOCIATE_COMMENT_LIST_API_ENDPOINT = '/associate-comments';
export const WORKERY_ASSOCIATE_CONTACT_UPDATE_API_ENDPOINT = '/associate/XXX/contact';
export const WORKERY_ASSOCIATE_ADDRESS_UPDATE_API_ENDPOINT = '/associate/XXX/address';
export const WORKERY_ASSOCIATE_ACCOUNT_UPDATE_API_ENDPOINT = '/associate/XXX/account';
export const WORKERY_ASSOCIATE_METRICS_UPDATE_API_ENDPOINT = '/associate/XXX/metrics';
export const WORKERY_ASSOCIATE_FILE_LIST_API_ENDPOINT = '/associate-files';
export const WORKERY_ASSOCIATE_FILE_ARCHIVE_API_ENDPOINT = '/associate-file/XXX/';
export const WORKERY_TASK_LIST_API_ENDPOINT = '/tasks';
export const WORKERY_TASK_DETAIL_API_ENDPOINT = '/task/';
export const WORKERY_TASK_AVAILABLE_ASSOCIATE_LIST_CREATE_API_ENDPOINT = '/task/XXX/available-associates';
export const WORKERY_TASK_ASSIGN_ASSOCIATE_OPERATION_API_ENDPOINT = '/task/operation/assign-associate';
export const WORKERY_TASK_FOLLOW_UP_OPERATION_API_ENDPOINT = '/v2/task/operation/follow-up';
export const WORKERY_TASK_FOLLOW_UP_PENDING_OPERATION_API_ENDPOINT = '/v2/task/operation/follow-up-pending';
export const WORKERY_TASK_ORDER_COMPLETION_API_ENDPOINT = '/task/operation/order-completion';
export const WORKERY_TASK_SURVEY_OPERATION_API_ENDPOINT = '/task/operation/survey';
export const WORKERY_STAFF_LIST_API_ENDPOINT = '/v2/staves';
export const WORKERY_STAFF_DETAIL_API_ENDPOINT = '/v2/staff/'
export const WORKERY_STAFF_COMMENT_LIST_API_ENDPOINT = '/staff-comments';
export const WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT = '/staff/XXX/contact';
export const WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT = '/staff/XXX/address';
export const WORKERY_STAFF_ACCOUNT_UPDATE_API_ENDPOINT = '/staff/XXX/account';
export const WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT = '/staff/XXX/metrics';
export const WORKERY_STAFF_CHANGE_ROLE_OPERATION_API_ENDPOINT = '/staff/XXX/change-role';
export const WORKERY_STAFF_CHANGE_PASSWORD_OPERATION_API_ENDPOINT = '/staff/XXX/change-password';
export const WORKERY_FINANCIAL_LIST_API_ENDPOINT = '/financials';
export const WORKERY_FINANCIAL_DETAIL_API_ENDPOINT = '/financial/';
export const WORKERY_TAG_LIST_API_ENDPOINT = '/tags';
export const WORKERY_TAG_DETAIL_API_ENDPOINT = '/tag/';
export const WORKERY_HOW_HEAR_LIST_API_ENDPOINT = '/how_hears';
export const WORKERY_HOW_HEAR_DETAIL_API_ENDPOINT = '/how_hear/';
export const WORKERY_AWAY_LOG_LIST_API_ENDPOINT = '/away-logs';
export const WORKERY_AWAY_LOG_DETAIL_API_ENDPOINT = '/away-log/';
export const WORKERY_BULLETIN_BOARD_ITEM_LIST_API_ENDPOINT = '/bulletin_board_items';
export const WORKERY_BULLETIN_BOARD_ITEM_DETAIL_API_ENDPOINT = '/bulletin_board_item/';
export const WORKERY_SKILL_SET_LIST_API_ENDPOINT = '/skill_sets';
export const WORKERY_SKILL_SET_DETAIL_API_ENDPOINT = '/skill_set/';
export const WORKERY_INSURANCE_REQUIREMENT_LIST_API_ENDPOINT = '/insurance_requirements';
export const WORKERY_INSURANCE_REQUIREMENT_DETAIL_API_ENDPOINT = '/insurance_requirement/';
export const WORKERY_SERVICE_FEE_LIST_API_ENDPOINT = '/order_service_fees';
export const WORKERY_SERVICE_FEE_DETAIL_API_ENDPOINT = '/order_service_fee/';
export const WORKERY_ARCHIVED_CLIENT_LIST_API_ENDPOINT = '/deactivated-customers';
export const WORKERY_VEHICLE_TYPE_LIST_API_ENDPOINT = '/vehicle_types';
export const WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT = '/vehicle_type/';
export const WORKERY_PARTNER_LIST_API_ENDPOINT = '/v2/partners';
export const WORKERY_PARTNER_DETAIL_API_ENDPOINT = '/v2/partner/';
export const WORKERY_PARTNER_COMMENT_LIST_API_ENDPOINT = '/partner-comments';
export const WORKERY_PARTNER_ADDRESS_UPDATE_API_ENDPOINT = '/partner/XXX/address';
export const WORKERY_PARTNER_CONTACT_UPDATE_API_ENDPOINT = '/partner/XXX/contact';
export const WORKERY_PARTNER_METRICS_UPDATE_API_ENDPOINT = '/partner/XXX/metrics';
export const WORKERY_ACTIVITY_SHEET_LIST_API_ENDPOINT = '/activity-sheets';
export const WORKERY_ACTIVITY_SHEET_DETAIL_API_ENDPOINT = '/activity-sheet/';
export const WORKERY_REPORT_ONE_CSV_DOWNLOAD_API_ENDPOINT = 'report/1/csv-download';
export const WORKERY_REPORT_TWO_CSV_DOWNLOAD_API_ENDPOINT = 'report/2/csv-download';
export const WORKERY_REPORT_THREE_CSV_DOWNLOAD_API_ENDPOINT = 'report/3/csv-download';
export const WORKERY_REPORT_FOUR_CSV_DOWNLOAD_API_ENDPOINT = 'report/4/csv-download';
export const WORKERY_REPORT_FIVE_CSV_DOWNLOAD_API_ENDPOINT = 'report/5/csv-download';
export const WORKERY_REPORT_SIX_CSV_DOWNLOAD_API_ENDPOINT = 'report/6/csv-download';
export const WORKERY_REPORT_SEVEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/7/csv-download';
export const WORKERY_REPORT_EIGHT_CSV_DOWNLOAD_API_ENDPOINT = 'report/8/csv-download';
export const WORKERY_REPORT_NINE_CSV_DOWNLOAD_API_ENDPOINT = 'report/9/csv-download';
export const WORKERY_REPORT_TEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/10/csv-download';
export const WORKERY_REPORT_ELEVEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/11/csv-download';
export const WORKERY_REPORT_TWELVE_CSV_DOWNLOAD_API_ENDPOINT = 'report/12/csv-download';
export const WORKERY_REPORT_THIRTEEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/13/csv-download';
export const WORKERY_REPORT_FOURTEEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/14/csv-download';
export const WORKERY_REPORT_FIFTHTEEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/15/csv-download';
export const WORKERY_REPORT_SIXTEEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/16/csv-download';
export const WORKERY_REPORT_SEVENTEEN_CSV_DOWNLOAD_API_ENDPOINT = 'report/17/csv-download';
export const WORKERY_ONGOING_ORDER_LIST_API_ENDPOINT = '/ongoing-orders';
export const WORKERY_ONGOING_ORDER_DETAIL_API_ENDPOINT = '/ongoing-order/';
export const WORKERY_ONGOING_ORDER_COMMENT_LIST_API_ENDPOINT = '/ongoing-order-comments';
export const WORKERY_ONGOING_ORDER_RETRIEVE_UPDATE_API_ENDPOINT = '/v2/ongoing-order/XXX/';
export const WORKERY_COMMENT_LIST_API_ENDPOINT = '/comments';
export const WORKERY_STAFF_ARCHIVE_API_ENDPOINT = '/staff/XXX/archive'

// OLD - PLEASE DO SOMETHING WITH THESE.
export const WORKERY_LOGOUT_API_ENDPOINT ='/logout';
export const WORKERY_REGISTER_API_URL = process.env.REACT_APP_API_HOST+'/api/register';
export const WORKERY_ACTIVATE_API_URL = process.env.REACT_APP_API_HOST+'/api/activate';
export const WORKERY_ACTIVATE_API_ENDPOINT = '/activate';
export const WORKERY_SEND_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/send-password-reset';
export const WORKERY_PASSWORD_RESET_API_URL = process.env.REACT_APP_API_HOST+'/api/reset-password';
export const WORKERY_ONBOARDING_API_URL = process.env.REACT_APP_API_HOST+'/api/onboarding';
export const WORKERY_PURCHASE_DEVICE_API_URL = process.env.REACT_APP_API_HOST+'/api/purchase-device';
export const WORKERY_PROFILE_API_URL = process.env.REACT_APP_API_HOST+'/api/profile';


/**
 *  The type of choices we have for the `Production` API endpoint for the
 *  `type_of` field.
 */
export const EXECUTIVE_GROUP_ID = 1
export const MANAGEMENT_GROUP_ID = 2
export const FRONTLINE_GROUP_ID = 3
export const ASSOCIATE_GROUP_ID = 4
export const CUSTOMER_GROUP_ID = 5
export const ANONYMOUS_GROUP_ID = 0
export const GROUP_MEMBERSHIP_CHOICES = [
    {
        selectName: "group",
        value: EXECUTIVE_GROUP_ID,
        label: "Executive"
    },{
        selectName: "group",
        value: MANAGEMENT_GROUP_ID,
        label: "Manager"
    },{
        selectName: "group",
        value: FRONTLINE_GROUP_ID,
        label: "Frontline Staff"
    },{
        selectName: "group",
        value: ASSOCIATE_GROUP_ID,
        label: "Associate"
    },{
        selectName: "group",
        value: CUSTOMER_GROUP_ID,
        label: "Member"
    }
];


/**
 *  The pagination values we use.
 */
export const STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION = 100;
export const TINY_RESULTS_SIZE_PER_PAGE_PAGINATION = 10;

/**
 *  The generic type of that we can use in the system.
 */
export const RESIDENCE_TYPE_OF = 1
export const BUSINESS_TYPE_OF = 2
export const COMMUNITY_CARES_TYPE_OF = 3


/**
 *  A list of simple street types to choose from.
 */
export const BASIC_STREET_TYPE_CHOICES = [
    {
        selectName: "streetType",
        value: "Avenue",
        label: "Avenue"
    },{
        selectName: "streetType",
        value: "Drive",
        label: "Drive"
    },{
        selectName: "streetType",
        value: "Road",
        label: "Road"
    },{
        selectName: "streetType",
        value: "Street",
        label: "Street"
    },{
        selectName: "streetType",
        value: "Way",
        label: "Way"
    },{
        selectName: "streetType",
        value: "Other",
        label: "Other"
    }
];


/**
 *  A list of directions to choose from.
 */
export const STREET_DIRECTION_CHOICES = [
    {
        selectName: "streetDirection", value: "", label: "-"
    },{
        selectName: "streetDirection", value: "E", label: "East"
    },{
        selectName: "streetDirection", value: "N", label: "North"
    },{
        selectName: "streetDirection", value: "NE", label: "Northeast"
    },{
        selectName: "streetDirection", value: "NW", label: "Northwest"
    },{
        selectName: "streetDirection", value: "S", label: "South"
    },{
        selectName: "streetDirection", value: "SE", label: "Southeast"
    },{
        selectName: "streetDirection", value: "SW", label: "Southwest"
    },{
        selectName: "streetDirection", value: "W", label: "West"
    }
];


/**
 *  The item type of that we can use in the system.
 */
export const INCIDENT_ITEM_TYPE_OF = 1
export const EVENT_ITEM_TYPE_OF = 2
export const CONCERN_ITEM_TYPE_OF = 3
export const INFORMATION_ITEM_TYPE_OF = 4
export const ITEM_TYPE_CHOICES = [
    {
        selectName: "typeOf",
        value: INCIDENT_ITEM_TYPE_OF,
        label: "Incident"
    },{
        selectName: "typeOf",
        value: EVENT_ITEM_TYPE_OF,
        label: "Event"
    },{
        selectName: "typeOf",
        value: CONCERN_ITEM_TYPE_OF,
        label: "Concern"
    },{
        selectName: "typeOf",
        value: INFORMATION_ITEM_TYPE_OF,
        label: "Information"
    }
];


/**
 *  The item type of that we can use in the system.
 */
export const OTHER_EVENT_TYPE_OF = 1;
export const GARAGE_SALE_EVENT_TYPE_OF = 2;
export const GATHERING_EVENT_TYPE_OF = 3;
export const SPORTS_ITEM_TYPE_OF = 4;
export const BBQ_ITEM_TYPE_OF = 5;
export const FUNDRAISER_ITEM_TYPE_OF = 6;
export const ARTS_ITEM_TYPE_OF = 7;
export const EVENT_TYPE_CHOICES = [
    {
        selectName: "eventTypeOf",
        value: GARAGE_SALE_EVENT_TYPE_OF,
        label: "Garage Sale"
    },{
        selectName: "eventTypeOf",
        value: GATHERING_EVENT_TYPE_OF,
        label: "Gathering"
    },{
        selectName: "eventTypeOf",
        value: SPORTS_ITEM_TYPE_OF,
        label: "Sports"
    },{
        selectName: "eventTypeOf",
        value: BBQ_ITEM_TYPE_OF,
        label: "BBQ"
    },{
        selectName: "eventTypeOf",
        value: FUNDRAISER_ITEM_TYPE_OF,
        label: "Fundraiser"
    },{
        selectName: "eventTypeOf",
        value: ARTS_ITEM_TYPE_OF,
        label: "Arts"
    },{
        selectName: "eventTypeOf",
        value: OTHER_EVENT_TYPE_OF,
        label: "Other"
    }
];


/**
Break In
Fraud
Arson
Assault
Illegal Drugs
Person in Need
A Public Safety Issue
 */


/**
 *  The item type of that we can use in the system.
 */
export const OTHER_INCIDENT_TYPE_OF = 1;
export const BREAK_IN_INCIDENT_TYPE_OF = 2;
export const FRAUD_INCIDENT_TYPE_OF = 3;
export const ARSON_INCIDENT_TYPE_OF = 4;
export const ASSAULT_INCIDENT_TYPE_OF = 5;
export const ILLEGAL_DRUGS_INCIDENT_TYPE_OF = 6;
export const PERSON_IN_NEED_INCIDENT_TYPE_OF = 7;
export const PUBLIC_SAFETY_ISSUE_INCIDENT_TYPE_OF = 8;
export const INCIDENT_TYPE_CHOICES = [
    {
        selectName: "incidentTypeOf",
        value: BREAK_IN_INCIDENT_TYPE_OF,
        label: "Break In"
    },{
        selectName: "incidentTypeOf",
        value: FRAUD_INCIDENT_TYPE_OF,
        label: "Fraud"
    },{
        selectName: "incidentTypeOf",
        value: ARSON_INCIDENT_TYPE_OF,
        label: "Arson"
    },{
        selectName: "incidentTypeOf",
        value: ASSAULT_INCIDENT_TYPE_OF,
        label: "Assault"
    },{
        selectName: "incidentTypeOf",
        value: ILLEGAL_DRUGS_INCIDENT_TYPE_OF,
        label: "Illegal Drugs"
    },{
        selectName: "incidentTypeOf",
        value: PERSON_IN_NEED_INCIDENT_TYPE_OF,
        label: "Person in Need"
    },{
        selectName: "incidentTypeOf",
        value: PUBLIC_SAFETY_ISSUE_INCIDENT_TYPE_OF,
        label: "Public Safety Issue"
    },{
        selectName: "incidentTypeOf",
        value: OTHER_INCIDENT_TYPE_OF,
        label: "Other"
    }
];


/**
 *  The resource category of that we can use in the system.
 */
export const HEALTH_RESOURCE_CATEGORY = 2
export const HOUSING_RESOURCE_CATEGORY = 3
export const LONELINESS_RESOURCE_CATEGORY = 4
export const FOOD_SECURITY_RESOUCE_CATEGORY = 5
export const EDUCATION_RESOURCE_CATEGORY = 6
export const MUNICIPAL_RESOURCE_CATEGORY = 7
export const POLICE_RESOURCE_CATEGORY = 8
export const FIRE_RESOURCE_CATEGORY = 9
export const EMERGENCY_RESOURCE_CATEGORY = 10
export const RESOURCE_CATEGORY_CHOICES = [
    {
        selectName: "category",
        value: HEALTH_RESOURCE_CATEGORY,
        label: "Health"
    },{
        selectName: "category",
        value: HOUSING_RESOURCE_CATEGORY,
        label: "Housing"
    },{
        selectName: "category",
        value: LONELINESS_RESOURCE_CATEGORY,
        label: "Loneliness"
    },{
        selectName: "category",
        value: FOOD_SECURITY_RESOUCE_CATEGORY,
        label: "Food Security"
    },{
        selectName: "category",
        value: EDUCATION_RESOURCE_CATEGORY,
        label: "Education"
    },{
        selectName: "category",
        value: MUNICIPAL_RESOURCE_CATEGORY,
        label: "Municipal"
    },{
        selectName: "category",
        value: POLICE_RESOURCE_CATEGORY,
        label: "Police"
    },{
        selectName: "category",
        value: FIRE_RESOURCE_CATEGORY,
        label: "Fire"
    },{
        selectName: "category",
        value: EMERGENCY_RESOURCE_CATEGORY,
        label: "Emergency"
    }
];


/**
 *  The resource type of that we can use in the system.
 */
export const LINK_RESOURCE_TYPE_OF = 2;
export const YOUTUBE_VIDEO_RESOURCE_TYPE_OF = 3;
export const IMAGE_RESOURCE_TYPE_OF = 4;
export const FILE_RESOURCE_TYPE_OF = 5;
export const RESOURCE_TYPE_OF_CHOICES = [
    {
        selectName: "typeOf",
        value: LINK_RESOURCE_TYPE_OF,
        label: "Link"
    },{
        selectName: "typeOf",
        value: YOUTUBE_VIDEO_RESOURCE_TYPE_OF,
        label: "YouTube Video"
    },{
        selectName: "typeOf",
        value: IMAGE_RESOURCE_TYPE_OF,
        label: "Image"
    },{
        selectName: "typeOf",
        value: FILE_RESOURCE_TYPE_OF,
        label: "File"
    }
];



/**
 *  The reason why a user got demote
 */
export const OTHER_DEMOTION_REASON = 1;
export const SOME_REASON_DEMOTION_REASON = 2;
export const ANOTHER_REASON_DEMOTION_REASON = 3;
export const DEMOTION_REASON_CHOICES = [
    {
        selectName: "reason",
        value: SOME_REASON_DEMOTION_REASON,
        label: "Some reason"
    },{
        selectName: "reason",
        value: ANOTHER_REASON_DEMOTION_REASON,
        label: "Another reason"
    },{
        selectName: "reason",
        value: OTHER_DEMOTION_REASON,
        label: "Other"
    }
];


/**
 *  The associate demotion roles.
 */
export const ASSOCIATE_TO_AREA_COORDINATOR_DEMOTION_ROLE = 1;
export const ASSOCIATE_TO_MEMBER_DEMOTION_ROLE = 2;
export const ASSOCIATE_DEMOTION_ROLE_CHOICES = [
    {
        selectName: "role",
        value: ASSOCIATE_TO_AREA_COORDINATOR_DEMOTION_ROLE,
        label: "Area Coordinator"
    },{
        selectName: "role",
        value: ASSOCIATE_TO_MEMBER_DEMOTION_ROLE,
        label: "Member"
    }
];


/**
 *  The associate demotion roles.
 */
export const MALE_GENDER = 'male';
export const FEMALE_GENDER = 'female';
export const PREFER_NOT_TO_SAY_GENDER = 'prefer not say';
export const OTHER_GENDER = 'other';
export const GENDER_CHOICES = [
    {
        selectName: "gender",
        value: MALE_GENDER,
        label: "Male"
    },{
        selectName: "gender",
        value: FEMALE_GENDER,
        label: "Female"
    },{
        selectName: "gender",
        value: PREFER_NOT_TO_SAY_GENDER,
        label: "Prefer not to say"
    }
];
export const GENDER_RADIO_CHOICES = [
    {
        id: 'willingToVolunteer-m-choice',
        name: "gender",
        value: MALE_GENDER,
        label: "Male"
    },{
        id: 'willingToVolunteer-f-choice',
        name: "gender",
        value: FEMALE_GENDER,
        label: "Female"
    },{
        id: 'willingToVolunteer-pnts-choice',
        name: "gender",
        value: PREFER_NOT_TO_SAY_GENDER,
        label: "Prefer not to say"
    }
];


/**
 *  The tenant account roles.
 */
export const TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES = [
    {
        selectName: "accountType",
        value: MANAGEMENT_GROUP_ID,
        label: "Management"
    },{
        selectName: "accountType",
        value: FRONTLINE_GROUP_ID,
        label: "Frontline Staff"
    }
];


/**
 *  Choices we have for the `willing_to_volunteer` field.
 */
export const WILLING_TO_VOLUNTEER_CHOICES = [
    {
        id: 'willingToVolunteer-yes-choice',
        name: 'willingToVolunteer',
        value: 2,
        label: 'Yes',
    },{
        id: 'willingToVolunteer-maybe-choice',
        name: 'willingToVolunteer',
        value: 1,
        label: 'Maybe',
    },{
        id: 'willingToVolunteer-no-choice',
        name: 'willingToVolunteer',
        value: 0,
        label: 'No',
    }
];

/**
 *  Choices we have for the `ho`
 */
export const ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES = [
    {
        id: 'anotherHouseholdMemberRegistered-y-choice',
        name: "anotherHouseholdMemberRegistered",
        value: 1,
        label: "Yes"
    },{
        id: 'anotherHouseholdMemberRegistered-n-choice',
        name: "anotherHouseholdMemberRegistered",
        value: 0,
        label: "No"
    }
];


export const ITEM_EVENT_SHOULD_BE_SHOWN_TO_CHOICES = [
    {
        id: 'shownToWhom-gp-choice',
        name: "shownToWhom",
        value: 1,
        label: "General Public"
    },{
        id: 'shownToWhom-anm-choice',
        name: "shownToWhom",
        value: 2,
        label: "All NWL Members"
    },{
        id: 'shownToWhom-mwas-choice',
        name: "shownToWhom",
        value: 3,
        label: "My Watch Area"
    }
];


export const ITEM_EVENT_CAN_BE_SHOWN_ON_SOCIAL_MEDIA_CHOICES = [
    {
        id: 'canBePostedOnSocialMedia-m-choice',
        name: "canBePostedOnSocialMedia",
        value: 1,
        label: "Yes"
    },{
        id: 'canBePostedOnSocialMedia-f-choice',
        name: "canBePostedOnSocialMedia",
        value: 0,
        label: "No"
    }
];



export const ITEM_INCIDENT_NOTIFY_AUTHORITIES_CHOICES = [
    {
        id: 'notifiedAuthorities-t-choice',
        name: "notifiedAuthorities",
        value: 1,
        label: "Yes"
    },{
        id: 'notifiedAuthorities-f-choice',
        name: "notifiedAuthorities",
        value: 0,
        label: "No"
    }
];


export const ITEM_INCIDENT_ACCEPT_AUTHORITY_COOPERATION_CHOICES = [
    {
        id: 'acceptAuthorityCooperation-t-choice',
        name: "acceptAuthorityCooperation",
        value: 1,
        label: "Yes"
    },{
        id: 'acceptAuthorityCooperation-f-choice',
        name: "acceptAuthorityCooperation",
        value: 0,
        label: "No"
    }
];


export const IS_OK_TO_EMAIL_CHOICES = [
    {
        id: 'isOkToEmail-t-choice',
        name: "isOkToEmail",
        value: 1,
        label: "Yes"
    },{
        id: 'isOkToEmail-f-choice',
        name: "isOkToEmail",
        value: 0,
        label: "No"
    }
];


export const IS_OK_TO_TEXT_CHOICES = [
    {
        id: 'isOkToText-t-choice',
        name: "isOkToText",
        value: 1,
        label: "Yes"
    },{
        id: 'isOkToText-f-choice',
        name: "isOkToText",
        value: 0,
        label: "No"
    }
];


// # The following constants are used by the "contant_point" models.
// #

export const TELEPHONE_CONTACT_POINT_TYPE_OF_ID = 1
export const MOBILE_CONTACT_POINT_TYPE_OF_ID = 2
export const WORK_CONTACT_POINT_TYPE_OF_ID = 3
export const PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES = [
    {
        id: 'primaryPhoneTypeOf-1-choice',
        selectName: "primaryPhoneTypeOf",
        value: TELEPHONE_CONTACT_POINT_TYPE_OF_ID,
        label: "Landline"
    },{
        id: 'primaryPhoneTypeOf-2-choice',
        selectName: "primaryPhoneTypeOf",
        value: MOBILE_CONTACT_POINT_TYPE_OF_ID,
        label: "Mobile"
    },{
        id: 'primaryPhoneTypeOf-3-choice',
        selectName: "primaryPhoneTypeOf",
        value: WORK_CONTACT_POINT_TYPE_OF_ID,
        label: "Work"
    }
];
export const SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES = [
    {
        id: 'secondaryPhoneTypeOf-1-choice',
        selectName: "secondaryPhoneTypeOf",
        value: TELEPHONE_CONTACT_POINT_TYPE_OF_ID,
        label: "Landline"
    },{
        id: 'secondaryPhoneTypeOf-2-choice',
        selectName: "secondaryPhoneTypeOf",
        value: MOBILE_CONTACT_POINT_TYPE_OF_ID,
        label: "Mobile"
    },{
        id: 'secondaryPhoneTypeOf-3-choice',
        selectName: "secondaryPhoneTypeOf",
        value: WORK_CONTACT_POINT_TYPE_OF_ID,
        label: "Work"
    }
];

// # The following constants are used by the "Job" model.
// #
//
// RESIDENTIAL_JOB_TYPE_OF_ID = 1
// COMMERCIAL_JOB_TYPE_OF_ID = 2
// UNASSIGNED_JOB_TYPE_OF_ID = 3
//
// JOB_TYPE_OF_CHOICES = (
//     (RESIDENTIAL_JOB_TYPE_OF_ID, _('Residential Job Type')),
//     (COMMERCIAL_JOB_TYPE_OF_ID, _('Commercial Job Type')),
//     (UNASSIGNED_JOB_TYPE_OF_ID, _('Unassigned Job Type'))
// )
//
//
// # The following constants are used by the "Customer" model.
// #

export const UNASSIGNED_CUSTOMER_TYPE_OF_ID = 1
export const RESIDENTIAL_CUSTOMER_TYPE_OF_ID = 2
export const COMMERCIAL_CUSTOMER_TYPE_OF_ID = 3

// CUSTOMER_TYPE_OF_CHOICES = (
//     (RESIDENTIAL_CUSTOMER_TYPE_OF_ID, _('Residential Customer')),
//     (COMMERCIAL_CUSTOMER_TYPE_OF_ID, _('Commercial Customer')),
//     (UNASSIGNED_CUSTOMER_TYPE_OF_ID, _('Unknown Customer'))
// )
//
//
// # The following constants are used by the "Organization" model.
// #
//
// UNKNOWN_ORGANIZATION_TYPE_OF_ID = 1
// PRIVATE_ORGANIZATION_TYPE_OF_ID = 2
// NON_PROFIT_ORGANIZATION_TYPE_OF_ID = 3
// GOVERNMENT_ORGANIZATION_TYPE_OF_ID = 4
//
// ORGANIZATION_TYPE_OF_CHOICES = (
//     (UNKNOWN_ORGANIZATION_TYPE_OF_ID, _('Unknown Organization Type')),
//     (PRIVATE_ORGANIZATION_TYPE_OF_ID, _('Private Organization Type')),
//     (NON_PROFIT_ORGANIZATION_TYPE_OF_ID, _('Non-Profit Organization Type')),
//     (GOVERNMENT_ORGANIZATION_TYPE_OF_ID, _('Government Organization')),
// )
//
//
// # The following constants are used by the "Customer" model.
// #
//
// ASSIGNED_ASSOCIATE_TASK_ITEM_TYPE_OF_ID = 1
// FOLLOW_UP_IS_JOB_COMPLETE_TASK_ITEM_TYPE_OF_ID = 2
// FOLLOW_UP_CUSTOMER_SURVEY_TASK_ITEM_TYPE_OF_ID = 3
// FOLLOW_UP_DID_ASSOCIATE_ACCEPT_JOB_TASK_ITEM_TYPE_OF_ID = 4
// UPDATE_ONGOING_JOB_TASK_ITEM_TYPE_OF_ID = 5
//
// TASK_ITEM_TYPE_OF_CHOICES = (
//     (ASSIGNED_ASSOCIATE_TASK_ITEM_TYPE_OF_ID, _('Assign associate')),
//     (FOLLOW_UP_IS_JOB_COMPLETE_TASK_ITEM_TYPE_OF_ID, _('Follow up is job complete')),
//     (FOLLOW_UP_CUSTOMER_SURVEY_TASK_ITEM_TYPE_OF_ID, _('Follow up customer survey')),
//     (FOLLOW_UP_DID_ASSOCIATE_ACCEPT_JOB_TASK_ITEM_TYPE_OF_ID, _('Follow up did associate accept job')),
//     (UPDATE_ONGOING_JOB_TASK_ITEM_TYPE_OF_ID, _('Follow up was ongoing job updated')),
// )
//

// # The following constants are used by the "contant_point" models.
// #

export const IS_ACTIVE_TYPE = 1;
export const IS_INACTIVE_TYPE_OF = 2;
export const IS_ACTIVE_TYPE_OF_CHOICES = [
    {
        id: 'isActive-1-choice',
        selectName: "isActive",
        value: IS_ACTIVE_TYPE,
        label: "Active"
    },{
        id: 'isActive-2-choice',
        selectName: "isActive",
        value: IS_INACTIVE_TYPE_OF,
        label: "Inactive"
    }
];



export const IS_ONGOING_JOB_TYPE = 1;
export const IS_ONE_TIME_JOB_TYPE_OF = 2;
export const JOB_TYPE_CHOICES = [
    {
        id: 'jobType-1-choice',
        selectName: "jobType",
        value: IS_ONGOING_JOB_TYPE,
        label: "Ongoing"
    },{
        id: 'jobType-2-choice',
        selectName: "jobType",
        value: IS_ONE_TIME_JOB_TYPE_OF,
        label: "One-time"
    }
];


export const HOME_SUPPORT_CHOICES = [
    {
        id: 'homeSupport-1-choice',
        selectName: "homeSupport",
        value: 1,
        label: "Yes"
    },{
        id: 'homeSupport-2-choice',
        selectName: "homeSupport",
        value: 0,
        label: "No"
    }
];


export const AWAY_LOG_REASON_CHOICES = [
    {
        id: 'awayLog-reason-2-choice',
        selectName: "reason",
        value: 2,
        label: "Going on vacation"
    },{
        id: 'awayLog-reason-3-choice',
        selectName: "reason",
        value: 3,
        label: "Personal reasons"
    },{
        id: 'awayLog-reason-2-choice',
        selectName: "reason",
        value: 4,
        label: "Commercial insurance expired"
    },{
        id: 'awayLog-reason-2-choice',
        selectName: "reason",
        value: 5,
        label: "Policy check expired"
    },{
        id: 'awayLog-reason-2-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


export const UNTIL_FURTHER_NOTICE_CHOICES = [
    {
        id: 'awayLog-untilFurtherNotice-1-choice',
        selectName: "untilFurtherNotice",
        value: 1,
        label: "Yes"
    },{
        id: 'awayLog-untilFurtherNotice-0-choice',
        selectName: "untilFurtherNotice",
        value: 0,
        label: "No"
    }
];


export const ARCHIVE_REASON_CHOICES = [
    {
        id: 'archive-reason-2-choice',
        selectName: "reason",
        value: 2,
        label: "Client is blacklisted"
    },{
        id: 'archive-reason-2-choice',
        selectName: "reason",
        value: 3,
        label: "Client has moved"
    },{
        id: 'archive-reason-2-choice',
        selectName: "reason",
        value: 4,
        label: "Client is deceased"
    },{
        id: 'archive-reason-2-choice',
        selectName: "reason",
        value: 5,
        label: "Client does not want us to contact them"
    },{
        id: 'archive-reason-1-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


export const WORK_ORDER_CLOSE_REASON_CHOICES = [
    {
        id: 'reason-2-choice',
        selectName: "reason",
        value: 2,
        label: "Quote was too high"
    },{
        id: 'reason-3-choice',
        selectName: "reason",
        value: 3,
        label: "Job completed by someone else"
    },{
        id: 'reason-5-choice',
        selectName: "reason",
        value: 5,
        label: "Work no longer needed"
    },{
        id: 'reason-6-choice',
        selectName: "reason",
        value: 6,
        label: "Client not satisfied with Associate"
    },{
        id: 'reason-7-choice',
        selectName: "reason",
        value: 7,
        label: "Client did work themselves"
    },{
        id: 'reason-8-choice',
        selectName: "reason",
        value: 8,
        label: "No Associate available"
    },{
        id: 'reason-9-choice',
        selectName: "reason",
        value: 9,
        label: "Work environment unsuitable"
    },{
        id: 'reason-10-choice',
        selectName: "reason",
        value: 10,
        label: "Client did not return call"
    },{
        id: 'reason-16-choice',
        selectName: "reason",
        value: 16,
        label: "Client billing issue"
    },{
        id: 'reason-1-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


export const ORGANIZATION_TYPE_OF_CHOICES = [
    {
        id: 'organizationTypeOf-t-choice',
        selectName: "organizationTypeOf",
        value: 2,
        label: "Private"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 3,
        label: "Non-profit"
    },{
        id: 'organizationTypeOf-f-choice',
        selectName: "organizationTypeOf",
        value: 4,
        label: "Government"
    }
];


export const WORK_ORDER_POSTPONE_REASON_CHOICES = [
    {
        id: 'reason-2-choice',
        selectName: "reason",
        value: 2,
        label: "Client needs more time"
    },{
        id: 'reason-3-choice',
        selectName: "reason",
        value: 3,
        label: "Associate needs more time"
    },{
        id: 'reason-4-choice',
        selectName: "reason",
        value: 4,
        label: "Weather"
    },{
        id: 'reason-1-choice',
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


export const WORK_ORDER_NEW_STATE = 'new'
export const WORK_ORDER_DECLINED_STATE = 'declined'
export const WORK_ORDER_PENDING_STATE = 'pending'
export const WORK_ORDER_CANCELLED_STATE = 'cancelled'
export const WORK_ORDER_ONGOING_STATE = 'ongoing'
export const WORK_ORDER_IN_PROGRESS_STATE = 'in_progress'
export const WORK_ORDER_COMPLETED_BUT_UNPAID_STATE = 'completed_and_unpaid'
export const WORK_ORDER_COMPLETED_AND_PAID_STATE = 'completed_and_paid'
export const WORK_ORDER_ARCHIVED_STATE = 'archived'


/**
 *
 */
export const ORDER_CANCEL_REASON_CHOICES = [
    {
        selectName: "reason",
        value: 2,
        label: "Quote was too high"
    },{
        selectName: "reason",
        value: 3,
        label: "Job completed by someone else"
    },{
        selectName: "reason",
        value: 5,
        label: "Work no longer needed"
    },{
        selectName: "reason",
        value: 6,
        label: "Client not satisfied with Associate"
    },{
        selectName: "reason",
        value: 7,
        label: "Client did work themselves"
    },{
        selectName: "reason",
        value: 8,
        label: "No Associate available"
    },{
        selectName: "reason",
        value: 9,
        label: "Work environment unsuitable"
    },{
        selectName: "reason",
        value: 10,
        label: "Client did not return call"
    },{
        selectName: "reason",
        value: 11,
        label: "Associate did not have necessary equipment"
    },{
        selectName: "reason",
        value: 12,
        label: "Repair not possible"
    },{
        selectName: "reason",
        value: 13,
        label: "Could not meet deadline"
    },{
        selectName: "reason",
        value: 14,
        label: "Associate did not call client"
    },{
        selectName: "reason",
        value: 15,
        label: "Member issue"
    },{
        selectName: "reason",
        value: 16,
        label: "Client billing issue"
    },{
        selectName: "reason",
        value: 1,
        label: "Other"
    }
];


/**
 *
 */
export const NO_SURVEY_CONDUCTED_REASON_CHOICES = [
    {
        selectName: "noSurveyConductedReason",
        value: 2,
        label: "Unable to reach client"
    },{
        selectName: "noSurveyConductedReason",
        value: 3,
        label: "Client did not want to complete survey"
    },{
        selectName: "noSurveyConductedReason",
        value: 1,
        label: "Other"
    }
];



export const ROLE_RADIO_CHOICES = [
    {
        id: 'role-m-choice',
        name: "role",
        value: MANAGEMENT_GROUP_ID,
        label: "Management"
    },{
        id: 'role-f-choice',
        name: "role",
        value: FRONTLINE_GROUP_ID,
        label: "Frontline Staff"
    }
];
