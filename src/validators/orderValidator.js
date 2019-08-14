import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    ASSOCIATE_GROUP_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors)
    }
}




/**
 *  Validator will validate step 3 in the order creation form.
 */
export function validateStep3CreateInput(data) {
    let errors = {};

    if (data.startDate === undefined || data.startDate === null || data.startDate === "" || isNaN(data.startDate) ) {
        errors.startDate = 'This field is required';
    }
    if (data.jobType === undefined || data.jobType === null || data.jobType === "" || isNaN(data.jobType) ) {
        errors.jobType = 'This field is required';
    }
    if (data.homeSupport === undefined || data.homeSupport === null || data.homeSupport === "" || isNaN(data.homeSupport) ) {
        errors.homeSupport = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateStep4CreateInput(data) {
    let errors = {};

    if (data.description === undefined || data.description === null || data.description === "") {
        errors.description = 'This field is required';
    }
    if (data.skillSets === undefined || data.skillSets === null || data.skillSets === "" || isEmpty(data.skillSets) ) {
        errors.skillSets = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateStep5CreateInput(data) {
    let errors = {};

    // if (data.comment === undefined || data.comment === null || data.comment === "") {
    //     errors.comment = 'This field is required';
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateStep6CreateInput(data) {
    let errors = {};

    // if (data.comment === undefined || data.comment === null || data.comment === "") {
    //     errors.comment = 'This field is required';
    // }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}



/**
 *  Validator will validate step 7 in the order creation form.
 */
export function validateStep7CreateInput(data) {
    let errors = {};

    if (data.birthYear === undefined || data.birthYear === null || data.birthYear === "") {
        errors.birthYear = 'This field is required';
    } else {
        try {
            if (parseInt(data.birthYear) < 1900) {
                errors.birthYear = 'Needs to be greater then 1900.';
            }
        } catch(err) {
            errors.birthYear = 'This field needs to be a number';
        }
    }
    if (data.gender === undefined || data.gender === null || data.gender === "" || isNaN(data.gender) ) {
        errors.gender = 'This field is required';
    }
    if (data.howDidYouHear === undefined || data.howDidYouHear === null || validator.isEmpty(data.howDidYouHear) || data.howDidYouHear === "") {
        errors.howDidYouHear = 'This field is required';
    } else {
        if (data.howDidYouHear === "Other") {
            if (data.howDidYouHearOther === undefined || data.howDidYouHearOther === null || validator.isEmpty(data.howDidYouHearOther) || data.howDidYouHearOther === "") {
                errors.howDidYouHearOther = 'This field is required';
            }
        }
    }
    if (data.meaning === undefined || data.meaning === null || data.meaning === "") {
        errors.meaning = 'This field is required';
    }
    if (data.expectations === undefined || data.expectations === null || data.expectations === "") {
        errors.expectations = 'This field is required';
    }
    if (data.willingToVolunteer === undefined || data.willingToVolunteer === null || data.willingToVolunteer === "" || isNaN(data.willingToVolunteer) ) {
        errors.willingToVolunteer = 'This field is required';
    }
    if (data.anotherHouseholdOrderRegistered === undefined || data.anotherHouseholdOrderRegistered === null || data.anotherHouseholdOrderRegistered === "" || isNaN(data.anotherHouseholdOrderRegistered) ) {
        errors.anotherHouseholdOrderRegistered = 'This field is required';
    } else {
        if (data.anotherHouseholdOrderRegistered === 0 || data.anotherHouseholdOrderRegistered === "0") {
            if (data.totalHouseholdCount === undefined || data.totalHouseholdCount === null || data.totalHouseholdCount === "" || isNaN(data.totalHouseholdCount) ) {
                errors.totalHouseholdCount = 'This field is required';
            }
            if (data.under18YearsHouseholdCount === undefined || data.under18YearsHouseholdCount === null || data.under18YearsHouseholdCount === "" || isNaN(data.under18YearsHouseholdCount) ) {
                errors.under18YearsHouseholdCount = 'This field is required';
            }
        }
    }
    if (data.typeOf === BUSINESS_TYPE_OF) {
        if (data.companyEmployeeCount === undefined || data.companyEmployeeCount === null || data.companyEmployeeCount === "" || isNaN(data.companyEmployeeCount) ) {
            errors.companyEmployeeCount = 'This field is required';
        }
        if (data.companyYearsInOperation === undefined || data.companyYearsInOperation === null || data.companyYearsInOperation === "" || isNaN(data.companyYearsInOperation) ) {
            errors.companyYearsInOperation = 'This field is required';
        }
        if (data.companyType === undefined || data.companyType === null || data.companyType === "") {
            errors.companyType = 'This field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
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


export function validateTransferInput(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || data.associate === "" || isNaN(data.associate)) {
        errors.associate = 'This field is required';
    }
    if (data.client === undefined || data.client === null || data.client === "" || isNaN(data.client)) {
        errors.client = 'This field is required';
    }
    if (data.reason === undefined || data.reason === null || data.reason === "") {
        errors.reason = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateUnassignAssociateInput(data) {
    let errors = {};

    if (data.reason === undefined || data.reason === null || data.reason === "") {
        errors.reason = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateCloseInput(data) {
    let errors = {};

    if (data.reason === undefined || data.reason === null || data.reason === "" || isNaN(data.reason) ) {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === 1) {
            if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "" ) {
                errors.reasonOther = 'This field is required';
            }
        }
    }
    if (data.comment === undefined || data.comment === null || data.comment === "" ) {
        errors.comment = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
