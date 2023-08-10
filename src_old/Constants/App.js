export const PAGINATION_LIMIT = 250;

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
