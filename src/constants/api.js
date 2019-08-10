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
export const WORKERY_CLIENT_LIST_API_ENDPOINT = '/customers';
export const WORKERY_CLIENT_DETAIL_API_ENDPOINT = '/customer/';
export const WORKERY_ORDER_LIST_API_ENDPOINT = '/orders';
export const WORKERY_ORDER_DETAIL_API_ENDPOINT = '/order/';
export const WORKERY_ASSOCIATE_LIST_API_ENDPOINT = '/associates';
export const WORKERY_ASSOCIATE_DETAIL_API_ENDPOINT = '/associate/';
export const WORKERY_TASK_LIST_API_ENDPOINT = '/tasks';
export const WORKERY_TASK_DETAIL_API_ENDPOINT = '/task/';
export const WORKERY_STAFF_LIST_API_ENDPOINT = '/staves';
export const WORKERY_STAFF_DETAIL_API_ENDPOINT = '/staff/'
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
export const WORKERY_DEACTIVATED_CLIENT_LIST_API_ENDPOINT = '/deactivated-customers';
export const WORKERY_VEHICLE_TYPE_LIST_API_ENDPOINT = '/vehicle_types';
export const WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT = '/vehicle_type/';
export const WORKERY_PARTNER_LIST_API_ENDPOINT = '/partners';
export const WORKERY_PARTNER_DETAIL_API_ENDPOINT = '/partner/';
export const WORKERY_CLIENT_COMMENT_LIST_API_ENDPOINT = '/customer-comments';
export const WORKERY_ASSOCIATE_COMMENT_LIST_API_ENDPOINT = '/associate-comments';


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
export const MALE_GENDER = 2;
export const FEMALE_GENDER = 3;
export const PREFER_NOT_TO_SAY_GENDER = 4;
export const OTHER_GENDER = 1;
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
