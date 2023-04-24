
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

// Function to be called when an API error ocures.
export function performValidationFromError(validation, apiErrors) {
    for (let validationKey in validation) {
        // Check if the key is present in dictionary2
        if (apiErrors.hasOwnProperty(validationKey)) {
            validation[validationKey] = FIELD_IS_ERROR
        } else {
            validation[validationKey] = FIELD_IS_VALID
        }
    }
    return validation
}
