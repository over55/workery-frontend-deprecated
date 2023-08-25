export const PAGINATION_LIMIT = 250;
export const PAGE_SIZE_OPTIONS = 25;

export const EXECUTIVE_ROLE_ID = 1
export const MANAGEMENT_ROLE_ID = 2
export const FRONTLINE_ROLE_ID = 3
export const ASSOCIATE_ROLE_ID = 4
export const CUSTOMER_ROLE_ID = 5
export const ANONYMOUS_ROLE_ID = 0


// Use to control the form field required.
export const FIELD_IS_VALID = 1
export const FIELD_IS_ERROR = 2
export const FIELD_IS_REQUIRED = 3
export const FIELD_IS_OPTIONAL = 4

export function getFieldClass(code) {
    switch (code) {
        case FIELD_IS_VALID:
            return "is-success";
        case FIELD_IS_ERROR:
            return "is-danger";
        case FIELD_IS_REQUIRED:
            return "is-primary";
        case FIELD_IS_OPTIONAL:
            return "is-success";
        default:
            return null;
    }
}

//----------------------------------------------------------------------------//
//                                Clients                                     //
//----------------------------------------------------------------------------//


export const UNASSIGNED_CUSTOMER_TYPE_OF_ID = 1
export const RESIDENTIAL_CUSTOMER_TYPE_OF_ID = 2
export const COMMERCIAL_CUSTOMER_TYPE_OF_ID = 3

export const UNASSIGNED_ASSOCIATE_TYPE_OF_ID = 1
export const RESIDENTIAL_ASSOCIATE_TYPE_OF_ID = 2
export const COMMERCIAL_ASSOCIATE_TYPE_OF_ID = 3

// The following are the default sort by values to use.
export const DEFAULT_CLIENT_LIST_SORT_BY_VALUE = "last_name,ASC";
export const DEFAULT_CLIENT_STATUS_FILTER_OPTION = 1; // 1=Active

export const CLIENT_PHONE_TYPE_LANDLINE = 1
export const CLIENT_PHONE_TYPE_MOBILE = 2
export const CLIENT_PHONE_TYPE_WORK = 3
