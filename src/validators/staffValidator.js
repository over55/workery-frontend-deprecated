import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_GROUP_ID,
    OTHER_DEMOTION_REASON
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    // --- CONTACT --- //

    if (data.typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {

        if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
            errors.givenName = 'This field is required';
        }
        if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
            errors.lastName = 'This field is required';
        }
        if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
            errors.primaryPhone = 'This field is required';
        }
        if (data.workEmail === undefined || data.workEmail === null || validator.isEmpty(data.workEmail) || data.workEmail === "") {
            errors.workEmail = 'This field is required';
        }
        if (data.personalEmail === undefined || data.personalEmail === null || validator.isEmpty(data.personalEmail) || data.personalEmail === "") {
            errors.personalEmail = 'This field is required';
        }
        if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
            errors.isOkToEmail = 'This field is required';
        }
        if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
            errors.isOkToText = 'This field is required';
        }

    } else if (data.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {

        alert("TODO"); // TODO: IMPLEMENT WHEN READY.

    }

    // --- ADDRESS --- //

    if (data.streetAddress === undefined || data.streetAddress === null || validator.isEmpty(data.streetAddress) || data.streetAddress === "") {
        errors.streetAddress = 'This field is required';
    }
    if (data.region === undefined || data.region === null || validator.isEmpty(data.region) || data.region === "") {
        errors.region = 'This field is required';
    }
    if (data.locality === undefined || data.locality === null || validator.isEmpty(data.locality) || data.locality === "") {
        errors.locality = 'This field is required';
    }
    if (data.country === undefined || data.country === null || validator.isEmpty(data.country) || data.country === "") {
        errors.country = 'This field is required';
    }
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }

    // --- ACCOUNT --- //

    if (data.policeCheck === undefined || data.policeCheck === null || data.policeCheck === "" || isNaN(data.policeCheck) ) {
        errors.policeCheck = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
        errors.isActive = 'This field is required';
    }

    // --- METRICS --- //

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHear === undefined || data.howHear === null ||data.howHear === "" || isNaN(data.howHear) ) {
        errors.howHear = 'This field is required';
    } else {
        if (data.howHear === "Other") {
            if (data.howHearOther === undefined || data.howHearOther === null || validator.isEmpty(data.howHearOther) || data.howHearOther === "") {
                errors.howHearOther = 'This field is required';
            }
        }
    }
    if (data.joinDate === undefined || data.joinDate === null || data.joinDate === "" || isNaN(data.joinDate) ) {
        errors.joinDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function staffValidator(data) {
    let errors = {};
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 4 in the staff creation form.
 */
export function validateStep4CreateInput(data) {
    let errors = {};

    if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
        errors.givenName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
        errors.primaryPhone = 'This field is required';
    }
    if (data.workEmail === undefined || data.workEmail === null || validator.isEmpty(data.workEmail) || data.workEmail === "") {
        errors.workEmail = 'This field is required';
    }
    if (data.personalEmail === undefined || data.personalEmail === null || validator.isEmpty(data.personalEmail) || data.personalEmail === "") {
        errors.personalEmail = 'This field is required';
    }
    // if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
    //     errors.isOkToEmail = 'This field is required';
    // }
    // if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
    //     errors.isOkToText = 'This field is required';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 5 in the staff creation form.
 */
export function validateStep5CreateInput(data) {
    let errors = {};

    if (data.streetAddress === undefined || data.streetAddress === null || validator.isEmpty(data.streetAddress) || data.streetAddress === "") {
        errors.streetAddress = 'This field is required';
    }
    if (data.region === undefined || data.region === null || validator.isEmpty(data.region) || data.region === "") {
        errors.region = 'This field is required';
    }
    if (data.locality === undefined || data.locality === null || validator.isEmpty(data.locality) || data.locality === "") {
        errors.locality = 'This field is required';
    }
    if (data.country === undefined || data.country === null || validator.isEmpty(data.country) || data.country === "") {
        errors.country = 'This field is required';
    }
    if (data.postalCode === undefined || data.postalCode === null || validator.isEmpty(data.postalCode) || data.postalCode === "") {
        errors.postalCode = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/**
 *  Validator will validate step 6 in the staff creation form.
 */
export function validateStep6CreateInput(data) {
    let errors = {};

    if (data.policeCheck === undefined || data.policeCheck === null || data.policeCheck === "" || isNaN(data.policeCheck) ) {
        errors.policeCheck = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
        errors.isActive = 'This field is required';
    }
    if (data.password === undefined || data.password === null || data.password === "" ) {
        errors.password = 'This field is required';
    }
    if (data.passwordRepeat === undefined || data.passwordRepeat === null || data.passwordRepeat === "" ) {
        errors.passwordRepeat = 'This field is required';
    }
    if (data.password !== data.passwordRepeat) {
        errors.password = 'Password does not match!';
        errors.passwordRepeat = 'Password does not match!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/**
 *  Validator will validate step 7 in the staff creation form.
 */
export function validateStep7CreateInput(data) {
    let errors = {};

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHear === undefined || data.howHear === null ||data.howHear === "" || isNaN(data.howHear) ) {
        errors.howHear = 'This field is required';
    } else {
        if (data.howHear === "Other") {
            if (data.howHearOther === undefined || data.howHearOther === null || validator.isEmpty(data.howHearOther) || data.howHearOther === "") {
                errors.howHearOther = 'This field is required';
            }
        }
    }
    if (data.joinDate === undefined || data.joinDate === null || data.joinDate === "" || isNaN(data.joinDate) ) {
        errors.joinDate = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/**
 *  Validator will validate step 7 in the staff creation form.
 */
export function validateStep8CreateInput(data) {
    return validateInput(data);
}


/**
 *  Validator will validate demotion form.
 */
export function validateDemotionInput(data) {
    let errors = {};

    if (data.role === undefined || data.role === null || data.role === "") {
        errors.role = 'This field is required';
    }
    if (data.reason === undefined || data.reason === null || data.reason === "") {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === OTHER_DEMOTION_REASON) {
            if (data.reasonOther === undefined || data.reasonOther === null || validator.isEmpty(data.reasonOther) || data.reasonOther === "") {
                errors.reasonOther = 'This field is required';
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateSearchInput(data) {
    let errors = {};

    if (data.advancedSearchActive === false) {
        if (data.keyword === undefined || data.keyword === null || data.keyword === "") {
            errors.keyword = 'This field is required.';
        }
    } else {
        let hasEmptyField = 0;
        if (data.givenName === undefined || data.givenName === null || data.givenName === "") {
            hasEmptyField += 1;
        }
        if (data.lastName === undefined || data.lastName === null || data.lastName === "") {
            hasEmptyField += 1;
        }
        if (data.telephone === undefined || data.telephone === null || data.telephone === "") {
            hasEmptyField += 1;
        }
        if (data.email === undefined || data.email === null || data.email === "") {
            hasEmptyField += 1;
        }

        if (hasEmptyField === 4) {
            // errors.givenName = '';
            // errors.lastName = '';
            // errors.phone = '';
            // errors.email = '';
            errors.MinimumOneFieldRequired = "Please input at leaset one field from the advanced section before submitting.";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


 export function validateMetricsUpdateInput(data) {
     let errors = {};

     if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
         errors.dateOfBirth = 'This field is required';
     }
     if (data.gender === undefined || data.gender === null || data.gender === "" ) {
         errors.gender = 'This field is required';
     }
     if (data.howHear === undefined || data.howHear === null ||data.howHear === "" || isNaN(data.howHear) ) {
         errors.howHear = 'This field is required';
     } else {
         if (data.howHear === "Other") {
             if (data.howHearOther === undefined || data.howHearOther === null || validator.isEmpty(data.howHearOther) || data.howHearOther === "") {
                 errors.howHearOther = 'This field is required';
             }
         }
     }
     if (data.joinDate === undefined || data.joinDate === null || data.joinDate === "" || isNaN(data.joinDate) ) {
         errors.joinDate = 'This field is required';
     }
     return {
         errors,
         isValid: isEmpty(errors)
     }
 }

export function validateChangeRoleInput(data) {
    let errors = {};

    if (data.role === undefined || data.role === null || data.role === "" ) {
        errors.role = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateChangePasswordOperationInput(data) {
    let errors = {};

    if (data.password !== data.passwordRepeat) {
        errors.password = 'Password does not match!';
        errors.passwordRepeat = 'Password does not match!';
    }
    if (data.password === undefined || data.password === null || data.password === "" ) {
        errors.password = 'This field is required';
    }
    if (data.passwordRepeat === undefined || data.passwordRepeat === null || data.passwordRepeat === "" ) {
        errors.passwordRepeat = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateAccountUpdateInput(data) {
    let errors = {};

    if (data.policeCheck === undefined || data.policeCheck === null || data.policeCheck === "" || isNaN(data.policeCheck) ) {
        errors.policeCheck = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
        errors.isActive = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
