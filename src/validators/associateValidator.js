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
 *  Validator will validate step 4 in the associate creation form.
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
 *  Validator will validate step 4 in the associate creation form.
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
 *  Validator will validate step 5 in the associate creation form.
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
 *  Validator will validate step 6 in the associate creation form.
 */
export function validateStep6CreateInput(data) {
    let errors = {};

    if (data.skillSet === undefined || data.skillSet === null || data.skillSet === "" || isEmpty(data.skillSet) ) {
        errors.skillSet = 'This field is required';
    }
    if (data.insuranceRequirements === undefined || data.insuranceRequirements === null || data.insuranceRequirements === "" || isEmpty(data.insuranceRequirements) ) {
        errors.insuranceRequirements = 'This field is required';
    }
    if (data.hourlySalaryDesired === undefined || data.hourlySalaryDesired === null || data.hourlySalaryDesired === "" || isNaN(data.hourlySalaryDesired) ) {
        errors.hourlySalaryDesired = 'This field is required';
    }
    if (data.duesDate === undefined || data.duesDate === null || data.duesDate === "" || isNaN(data.duesDate) ) {
        errors.duesDate = 'This field is required';
    }
    if (data.commercialInsuranceExpiryDate === undefined || data.commercialInsuranceExpiryDate === null || data.commercialInsuranceExpiryDate === "" || isNaN(data.commercialInsuranceExpiryDate) ) {
        errors.commercialInsuranceExpiryDate = 'This field is required';
    }
    // if (data.autoInsuranceExpiryDate === undefined || data.autoInsuranceExpiryDate === null || data.autoInsuranceExpiryDate === "" || isNaN(data.autoInsuranceExpiryDate) ) {
    //     errors.autoInsuranceExpiryDate = 'This field is required';
    // }
    // if (data.wsibInsuranceDate === undefined || data.wsibInsuranceDate === null || data.wsibInsuranceDate === "" || isNaN(data.wsibInsuranceDate) ) {
    //     errors.wsibInsuranceDate = 'This field is required';
    // }
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

/**
 *  Validator will validate step 7 in the associate creation form.
 */
export function validateStep7CreateInput(data) {
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
 *  Validator will validate step 7 in the associate creation form.
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
