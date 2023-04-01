import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_ASSOCIATE_TYPE_OF_ID,
    COMMERCIAL_ASSOCIATE_TYPE_OF_ID,
    ASSOCIATE_ROLE_ID,
    OTHER_DEMOTION_REASON
} from '../constants/api';


export function validateMetricsInput(data) {
    let errors = {};

    if (data.typeOf === RESIDENTIAL_ASSOCIATE_TYPE_OF_ID) {
        if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
            errors.dateOfBirth = 'This field is required';
        }
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null ||data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearId === "Other") {
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


export function validateContactInput(data) {
    let errors = {};

    // --- CONTACT --- //

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

    if (data.typeOf === COMMERCIAL_ASSOCIATE_TYPE_OF_ID) {

        if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
            errors.organizationName = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "" || isNaN(data.organizationTypeOf === "")) {
            errors.organizationTypeOf = 'This field is required';
        }

    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateAccountInput(data) {
    let errors = {};

    if (data.skillSets === undefined || data.skillSets === null || data.skillSets === "" || isEmpty(data.skillSets) ) {
        errors.skillSets = 'This field is required';
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
    // if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
    //     errors.isActive = 'This field is required';
    // }
    if (data.serviceFeeId === undefined || data.serviceFeeId === null ||data.serviceFeeId === "" || isNaN(data.serviceFeeId) ) {
        errors.serviceFeeId = 'This field is required';
    }
    if (data.emergencyContactName === undefined || data.emergencyContactName === null || data.emergencyContactName === "") {
        errors.emergencyContactName = 'This field is required';
    }
    if (data.emergencyContactRelationship === undefined || data.emergencyContactRelationship === null || data.emergencyContactRelationship === "") {
        errors.emergencyContactRelationship = 'This field is required';
    }
    if (data.emergencyContactTelephone === undefined || data.emergencyContactTelephone === null || data.emergencyContactTelephone === "") {
        errors.emergencyContactTelephone = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateInput(data) {
    let errors = {};

    // --- CONTACT --- //

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

    if (data.typeOf === COMMERCIAL_ASSOCIATE_TYPE_OF_ID) {

        if (data.organizationName === undefined || data.organizationName === null || validator.isEmpty(data.organizationName) || data.organizationName === "") {
            errors.organizationName = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "" || isNaN(data.organizationTypeOf === "")) {
            errors.organizationTypeOf = 'This field is required';
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

    // --- ACCOUNT --- //

    if (data.skillSets === undefined || data.skillSets === null || data.skillSets === "" || isEmpty(data.skillSets) ) {
        errors.skillSets = 'This field is required';
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
    // if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
    //     errors.isActive = 'This field is required';
    // }

    if (data.serviceFeeId === undefined || data.serviceFeeId === null ||data.serviceFeeId === "" || isNaN(data.serviceFeeId) ) {
        errors.serviceFeeId = 'This field is required';
    }

    // --- METRICS --- //

    if (data.typeOf === RESIDENTIAL_ASSOCIATE_TYPE_OF_ID) {
        if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
            errors.dateOfBirth = 'This field is required';
        }
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" ) {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null ||data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearIdLabel === "Other") {
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
export function validateStep4CreateInput(data) {
    let errors = {};

    if (data.typeOf === 3) {
        if (data.organizationName === undefined || data.organizationName === null || data.organizationName === "") {
            errors.organizationName = 'This field is required';
        }
        if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "" || isNaN(data.organizationTypeOf)) {
            errors.organizationTypeOf = 'This field is required';
        }
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


/**
 *  Validator will validate step 4 in the associate creation form.
 */
export function validateStep4BizCreateInput(data) {
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

    if (data.skillSets === undefined || data.skillSets === null || data.skillSets === "" || isEmpty(data.skillSets) ) {
        errors.skillSets = 'This field is required';
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
    if (data.serviceFeeId === undefined || data.serviceFeeId === null ||data.serviceFeeId === "" || isNaN(data.serviceFeeId) ) {
        errors.serviceFeeId = 'This field is required';
    }
    if (data.isActive === undefined || data.isActive === null || data.isActive === "" || isNaN(data.isActive) ) {
        errors.isActive = 'This field is required';
    }
    if (data.emergencyContactName === undefined || data.emergencyContactName === null || data.emergencyContactName === "") {
        errors.emergencyContactName = 'This field is required';
    }
    if (data.emergencyContactRelationship === undefined || data.emergencyContactRelationship === null || data.emergencyContactRelationship === "") {
        errors.emergencyContactRelationship = 'This field is required';
    }
    if (data.emergencyContactTelephone === undefined || data.emergencyContactTelephone === null || data.emergencyContactTelephone === "") {
        errors.emergencyContactTelephone = 'This field is required';
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

    if (data.typeOf === RESIDENTIAL_ASSOCIATE_TYPE_OF_ID) {
        if (data.dateOfBirth === undefined || data.dateOfBirth === null || data.dateOfBirth === "") {
            errors.dateOfBirth = 'This field is required';
        }
    }
    if (data.gender === undefined || data.gender === null || data.gender === "") {
        errors.gender = 'This field is required';
    }
    if (data.howHearId === undefined || data.howHearId === null ||data.howHearId === "" || isNaN(data.howHearId) ) {
        errors.howHearId = 'This field is required';
    } else {
        if (data.howHearIdLabel === "Other") {
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


export function validateChangePasswordOperationInput(data) {
    let errors = {};

    if (data.password === undefined || data.password === null || data.password === "") {
        errors.password = 'This field is required';
    }
    if (data.repeatPassword === undefined || data.repeatPassword === null || data.repeatPassword === "") {
        errors.repeatPassword = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateResidentialUpgradeInput(data) {
    let errors = {};

    // --- Company --- //

    if (data.organizationName === undefined || data.organizationName === null || data.organizationName === "") {
        errors.organizationName = 'This field is required.';
    }
    if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "") {
        errors.organizationTypeOf = 'This field is required.';
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


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateDowngradeOperationInput(data) {
    let errors = {};

    // if (data.organizationName === undefined || data.organizationName === null || data.organizationName === "") {
    //     errors.organizationName = 'This field is required';
    // }
    // if (data.organizationTypeOf === undefined || data.organizationTypeOf === null || data.organizationTypeOf === "") {
    //     errors.organizationTypeOf = 'This field is required';
    // }

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

export function validateDeleteInput(data) {
    let errors = {};

    if (data.associateId === undefined || data.associateId === null || data.associateId === "") {
        errors.associateId = 'This field is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
