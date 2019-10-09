import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    ASSOCIATE_GROUP_ID,
    WORK_ORDER_COMPLETED_AND_PAID_STATE
} from '../constants/api';


export function validateLiteUpdateInput(data) {
    let errors = {};

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateFinancialUpdateInput(data) {
    let errors = {};

    if (data.invoicePaidTo === undefined || data.invoicePaidTo === null || data.invoicePaidTo === "" || isNaN(data.invoicePaidTo) ) {
        errors.invoicePaidTo = 'This field is required';
    }
    if (data.paymentStatus === undefined || data.paymentStatus === null || data.paymentStatus === "" || isEmpty(data.paymentStatus)) {
        errors.paymentStatus = 'This field is required';
    } else {
        if (data.paymentStatus === WORK_ORDER_COMPLETED_AND_PAID_STATE) {
            if (data.completionDate === undefined || data.completionDate === null || data.completionDate === "" || isNaN(data.completionDate) ) {
                errors.completionDate = 'This field is required';
            }
        }
    }
    if (data.invoiceDate === undefined || data.invoiceDate === null || data.invoiceDate === "" || isNaN(data.invoiceDate) ) {
        errors.invoiceDate = 'This field is required';
    }
    if (data.invoiceIds === undefined || data.invoiceIds === null || data.invoiceIds === "" || isEmpty(data.invoiceIds) ) {
        errors.invoiceIds = 'This field is required';
    }
    if (data.invoiceQuotedLabourAmount === undefined || data.invoiceQuotedLabourAmount === null || data.invoiceQuotedLabourAmount === "" || isNaN(data.invoiceQuotedLabourAmount) ) {
        errors.invoiceQuotedLabourAmount = 'This field is required';
    }
    if (data.invoiceQuotedMaterialAmount === undefined || data.invoiceQuotedMaterialAmount === null || data.invoiceQuotedMaterialAmount === "" || isNaN(data.invoiceQuotedMaterialAmount) ) {
        errors.invoiceQuotedMaterialAmount = 'This field is required';
    }
    if (data.invoiceLabourAmount === undefined || data.invoiceLabourAmount === null || data.invoiceLabourAmount === "" || isNaN(data.invoiceLabourAmount) ) {
        errors.invoiceLabourAmount = 'This field is required';
    }
    if (data.invoiceMaterialAmount === undefined || data.invoiceMaterialAmount === null || data.invoiceMaterialAmount === "" || isNaN(data.invoiceMaterialAmount) ) {
        errors.invoiceMaterialAmount = 'This field is required';
    }
    if (data.invoiceTaxAmount === undefined || data.invoiceTaxAmount === null || data.invoiceTaxAmount === "" || isNaN(data.invoiceTaxAmount) ) {
        errors.invoiceTaxAmount = 'This field is required';
    }
    if (data.invoiceServiceFee === undefined || data.invoiceServiceFee === null || data.invoiceServiceFee === "" || isNaN(data.invoiceServiceFee) ) {
        errors.invoiceServiceFee = 'This field is required';
    }
    if (data.invoiceServiceFeeAmount === undefined || data.invoiceServiceFeeAmount === null || data.invoiceServiceFeeAmount === "" || isNaN(data.invoiceServiceFeeAmount) ) {
        errors.invoiceServiceFeeAmount = 'This field is required';
    }
    if (data.invoiceServiceFeePaymentDate === undefined || data.invoiceServiceFeePaymentDate === null || data.invoiceServiceFeePaymentDate === "" || isNaN(data.invoiceServiceFeePaymentDate) ) {
        errors.invoiceServiceFeePaymentDate = 'This field is required';
    }
    if (data.invoiceActualServiceFeeAmountPaid === undefined || data.invoiceActualServiceFeeAmountPaid === null || data.invoiceActualServiceFeeAmountPaid === "" || isNaN(data.invoiceActualServiceFeeAmountPaid) ) {
        errors.invoiceActualServiceFeeAmountPaid = 'This field is required';
    }
    if (data.visits === undefined || data.visits === null || data.visits === "" || isNaN(data.visits) ) {
        errors.visits = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateStep1CreateInput(data) {
    let errors = {};

    var missingCount = 0;

    if (data.firstName === undefined || data.firstName === null || data.firstName === "") {
        missingCount++;
    }
    if (data.lastName === undefined || data.skillSets === null || data.lastName === "" || isEmpty(data.lastName) ) {
        missingCount++;
    }
    if (data.email === undefined || data.email === null || data.email === "" || isEmpty(data.email) ) {
        missingCount++;
    }
    if (data.phone === undefined || data.phone === null || data.phone === "" || isEmpty(data.phone) ) {
        missingCount++;
    }

    if (missingCount === 4) {
        errors.RequiresField = "Please fill at least a single field before proceeding with your search";
    }
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

    if (data.jobType === undefined || data.jobType === null || data.jobType === "") {
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

export function validateReopenInput(data) {
    let errors = {};

    if (data.reason === undefined || data.reason === null || data.reason === "" ) {
        errors.reason = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validatePostponeInput(data) {
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
    if (data.startDate === undefined || data.startDate === null || data.startDate === "" || isNaN(data.startDate) ) {
        errors.startDate = 'This field is required';
    }
    if (data.comment === undefined || data.comment === null || data.comment === "" ) {
        errors.comment = 'This field is required';
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
        if (data.firstName === undefined || data.firstName === null || data.firstName === "") {
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
            // errors.firstName = '';
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


export function validateInvoiceSectionOneInput(data) {
    let errors = {};

    if (data.invoiceId === undefined || data.invoiceId === null || data.invoiceId === "" || isNaN(data.invoiceId)) {
        errors.invoiceId = 'This field is required';
    }
    if (data.invoiceDate === undefined || data.invoiceDate === null || data.invoiceDate === "" || isNaN(data.invoiceDate)) {
        errors.invoiceDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateInvoiceSectionTwoInput(data) {
    let errors = {};

    if (data.line01Quantity === undefined || data.line01Quantity === null || data.line01Quantity === "" || isNaN(data.line01Quantity)) {
        errors.line01Quantity = 'This field is required';
    }
    if (data.line01Description === undefined || data.line01Description === null || data.line01Description === "") {
        errors.line01Description = 'This field is required';
    }
    if (data.line01UnitPrice === undefined || data.line01UnitPrice === null || data.line01UnitPrice === "") {
        errors.line01UnitPrice = 'This field is required';
    }
    if (data.line01Amount === undefined || data.line01Amount === null || data.line01Amount === "") {
        errors.line01Amount = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateInvoiceSectionThirdInput(data) {
    let errors = {};

    if (data.invoiceQuoteDays === undefined || data.invoiceQuoteDays === null || data.invoiceQuoteDays === "" || isNaN(data.invoiceQuoteDays)) {
        errors.invoiceQuoteDays = 'This field is required';
    }
    if (data.invoiceQuoteDate === undefined || data.invoiceQuoteDate === null || data.invoiceQuoteDate === "" || isNaN(data.invoiceQuoteDate)) {
        errors.invoiceQuoteDate = 'This field is required';
    }
    if (data.invoiceCustomersApproval === undefined || data.invoiceCustomersApproval === null || data.invoiceCustomersApproval === "") {
        errors.invoiceCustomersApproval = 'This field is required';
    }
    if (data.line01Notes === undefined || data.line01Notes === null || data.line01Notes === "") {
        errors.line01Notes = 'This field is required';
    }
    if (data.paymentAmount === undefined || data.paymentAmount === null || data.paymentAmount === "" || isNaN(data.paymentAmount)) {
        errors.paymentAmount = 'This field is required';
    }
    if (data.paymentDate === undefined || data.paymentDate === null || data.paymentDate === "" || isNaN(data.paymentDate)) {
        errors.paymentDate = 'This field is required';
    }
    if (data.clientSignature === undefined || data.clientSignature === null || data.clientSignature === "") {
        errors.clientSignature = 'This field is required';
    }
    if (data.associateSignDate === undefined || data.associateSignDate === null || data.associateSignDate === "" || isNaN(data.associateSignDate)) {
        errors.associateSignDate = 'This field is required';
    }
    if (data.associateSignDate === undefined || data.associateSignDate === null || data.associateSignDate === "") {
        errors.associateSignDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
