import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_GROUP_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    // --- CONTACT --- //

    if (data.typeOf === RESIDENTIAL_CUSTOMER_TYPE_OF_ID) {

        if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
            errors.firstName = 'This field is required';
        }
        if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
            errors.lastName = 'This field is required';
        }
        if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
            errors.primaryPhone = 'This field is required';
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

    } else if (data.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID) {

        if (data.companyName === undefined || data.companyName === null || validator.isEmpty(data.companyName) || data.companyName === "") {
            errors.companyName = 'This field is required';
        }
        if (data.contactFirstName === undefined || data.contactFirstName === null || validator.isEmpty(data.contactFirstName) || data.contactFirstName === "") {
            errors.contactFirstName = 'This field is required';
        }
        if (data.contactLastName === undefined || data.contactLastName === null || validator.isEmpty(data.contactLastName) || data.contactLastName === "") {
            errors.contactLastName = 'This field is required';
        }
        if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
            errors.primaryPhone = 'This field is required';
        }
        if (data.email === undefined || data.email === null || validator.isEmpty(data.email) || data.email === "") {
            errors.email = 'This field is required';
        }

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
    if (data.gender === undefined || data.gender === null || data.gender === "" || isNaN(data.gender) ) {
        errors.gender = 'This field is required';
    }
    if (data.howHear === undefined || data.howHear === null ||data.howHear === "" || isNaN(data.gender) ) {
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
 *  Validator will validate step 4 in the client creation form.
 */
export function validateStep4RezCreateInput(data) {
    let errors = {};

    if (data.firstName === undefined || data.firstName === null || validator.isEmpty(data.firstName) || data.firstName === "") {
        errors.firstName = 'This field is required';
    }
    if (data.lastName === undefined || data.lastName === null || validator.isEmpty(data.lastName) || data.lastName === "") {
        errors.lastName = 'This field is required';
    }
    if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
        errors.primaryPhone = 'This field is required';
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


/**
 *  Validator will validate step 4 in the client creation form.
 */
export function validateStep4BizCreateInput(data) {
    let errors = {};

    if (data.companyName === undefined || data.companyName === null || validator.isEmpty(data.companyName) || data.companyName === "") {
        errors.companyName = 'This field is required';
    }
    if (data.contactFirstName === undefined || data.contactFirstName === null || validator.isEmpty(data.contactFirstName) || data.contactFirstName === "") {
        errors.contactFirstName = 'This field is required';
    }
    if (data.contactLastName === undefined || data.contactLastName === null || validator.isEmpty(data.contactLastName) || data.contactLastName === "") {
        errors.contactLastName = 'This field is required';
    }
    if (data.primaryPhone === undefined || data.primaryPhone === null || validator.isEmpty(data.primaryPhone) || data.primaryPhone === "") {
        errors.primaryPhone = 'This field is required';
    }
    if (data.primaryPhoneTypeOf === undefined || data.primaryPhoneTypeOf === null || data.primaryPhoneTypeOf === "" || isNaN(data.primaryPhoneTypeOf) ) {
        errors.primaryPhoneTypeOf = 'This field is required';
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


/**
 *  Validator will validate step 5 in the client creation form.
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
 *  Validator will validate step 6 in the client creation form.
 */
export function validateStep6CreateInput(data) {
    let errors = {};

    if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
        errors.dateOfBirth = 'This field is required';
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" || isNaN(data.gender) ) {
        errors.gender = 'This field is required';
    }
    if (data.howHear === undefined || data.howHear === null ||data.howHear === "" || isNaN(data.gender) ) {
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
 *  Validator will validate step 7 in the client creation form.
 */
export function validateStep7CreateInput(data) {
    return validateInput(data);
}


export function validatePromotionInput(data) {
    let errors = {};

    if (data.groupId === undefined || data.groupId === null || data.groupId === "") {
        errors.groupId = 'This field is required';
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
        if (data.groupId === ASSOCIATE_GROUP_ID) {
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


export function validateDeactivationInput(data) {
    let errors = {};

    if (data.reason === undefined || data.reason === null || data.reason === "" || isNaN(data.reason) ) {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === 1) {
            if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                errors.reasonOther = 'This field is required.';
            }
        }
    }
    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateActivationInput(data) {
    let errors = {};

    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
