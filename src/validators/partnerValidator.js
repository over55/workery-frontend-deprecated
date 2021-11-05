import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_ROLE_ID
} from '../constants/api';



export function validateContactInput(data) {
    let errors = {};
    if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
        errors.organizationName = 'This field is required';
    }
    if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
        errors.givenName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.telephone === undefined || data.telephone === null || validator.isEmpty(data.telephone) || data.telephone === "") {
        errors.telephone = 'This field is required';
    }
    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }
    if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
        errors.isOkToEmail = 'This field is required';
    }
    if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
        errors.isOkToText = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateAddressInput(data) {
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


export function validateMetricsInput(data) {
    let errors = {};
    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null || data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearIdLabel.includes("Other") === true) {
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


export function validateInput(data) {
    let errors = {};

    // --- CONTACT --- //

    if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
        errors.organizationName = 'This field is required';
    }
    if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
        errors.givenName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.telephone === undefined || data.telephone === null || validator.isEmpty(data.telephone) || data.telephone === "") {
        errors.telephone = 'This field is required';
    }
    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }
    if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
        errors.isOkToEmail = 'This field is required';
    }
    if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
        errors.isOkToText = 'This field is required';
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

    // --- EXTRA --- //

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null || data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearIdLabel.includes("Other") === true) {
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
 *  Validator will validate step 3 in the partner creation form.
 */
export function validateStep3CreateInput(data) {
    let errors = {};

    if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
        errors.organizationName = 'This field is required';
    }
    if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "" || isNaN(data.organizationTypeOf) ) {
        errors.organizationTypeOf = 'This field is required';
    }
    if (data.givenName === undefined || data.givenName === null || validator.isEmpty(data.givenName) || data.givenName === "") {
        errors.givenName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.telephone === undefined || data.telephone === null || validator.isEmpty(data.telephone) || data.telephone === "") {
        errors.telephone = 'This field is required';
    }
    if (data.telephoneTypeOf === undefined || data.telephoneTypeOf === null || data.telephoneTypeOf === "" || isNaN(data.telephoneTypeOf) ) {
        errors.telephoneTypeOf = 'This field is required';
    }
    if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
        errors.email = 'This field is required';
    }
    if (data.isOkToEmail === undefined || data.isOkToEmail === null || data.isOkToEmail === "" || isNaN(data.isOkToEmail)) {
        errors.isOkToEmail = 'This field is required';
    }
    if (data.isOkToText === undefined || data.isOkToText === null || data.isOkToText === "" || isNaN(data.isOkToText) ) {
        errors.isOkToText = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
        errors.isActive = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 *  Validator will validate step 4 in the partner creation form.
 */
export function validateStep4CreateInput(data) {
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
 *  Validator will validate step 5 in the partner creation form.
 */
export function validateStep5CreateInput(data) {
    let errors = {};

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null || data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearIdLabel.includes("Other") === true) {
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
 *  Validator will validate step 6 in the partner creation form.
 */
export function validateStep6CreateInput(data) {
    return validateInput(data);
}


export function validatePromotionInput(data) {
    let errors = {};

    if (data.roleId === undefined || data.roleId === null || data.roleId === "") {
        errors.roleId = 'This field is required';
    } else {
        if (data.areaCoordinatorAgreement === undefined || data.areaCoordinatorAgreement === null || data.areaCoordinatorAgreement === "" || data.areaCoordinatorAgreement === false) {
            errors.areaCoordinatorAgreement = 'This field is required.';
        }
        if (data.conflictOfInterestAgreement === undefined || data.conflictOfInterestAgreement === null || data.conflictOfInterestAgreement === "" || data.conflictOfInterestAgreement === false) {
            errors.conflictOfInterestAgreement = 'This field is required';
        }
        if (data.codeOfConductAgreement === undefined || data.codeOfConductAgreement === null || data.codeOfConductAgreement === "" || data.codeOfConductAgreement === false) {
            errors.codeOfConductAgreement = 'This field is required';
        }
        if (data.confidentialityAgreement === undefined || data.confidentialityAgreement === null || data.confidentialityAgreement === "" || data.confidentialityAgreement === false) {
            errors.confidentialityAgreement = 'This field is required';
        }
        if (data.roleId === ASSOCIATE_ROLE_ID) {
            if (data.associateAgreement === undefined || data.associateAgreement === null || data.associateAgreement === "" || data.associateAgreement === false) {
                errors.associateAgreement = 'This field is required';
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

    if (data.advancedSearchActive === true) {
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
