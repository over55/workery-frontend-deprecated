import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import {
    WORK_ORDER_COMPLETED_AND_PAID_STATE
} from '../constants/api';


/**
 *  Validator will validate step 2 of `Assign Watch Associate` (#1) task.
 */
export function validateTask1Step2Input(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || validator.isEmpty(data.associate) || data.associate === "") {
        errors.associate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask1Step3Input(data) {
    let errors = {};

    if (data.status === undefined || data.status === null || data.status === "") {
        errors.status = 'This field is required';
    }
    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask2Step2Input(data) {
    let errors = {};

    if (data.status === undefined || data.status === null || data.status === "") {
        errors.status = 'This field is required';
    }
    if (data.status === true || data.status === "true") {
        if (data.meetingDate === undefined || data.meetingDate === null || data.meetingDate === "" || isNaN(data.meetingDate) ) {
            errors.meetingDate = 'This field is required';
        }
    }
    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask4Step2Input(data) {
    let errors = {};

    if (data.status === undefined || data.status === null || data.status === "") {
        errors.status = 'This field is required';
    }
    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask6Step2Input(data) {
    let errors = {};

    if (data.wasCompleted === undefined || data.wasCompleted === null || data.wasCompleted === "") {
        errors.wasCompleted = 'This field is required';
    }

    const isCancelled = data.wasCompleted === false || data.wasCompleted === "false";
    if (isCancelled) {
        if (data.reason === undefined || data.reason === null || data.reason === "") {
            errors.reason = 'This field is required';
        }
    }

    const isCompleted = data.wasCompleted === true || data.wasCompleted === "true";
    if (isCompleted) {
        if (data.completionDate === undefined || data.completionDate === null || data.completionDate === "" || isNaN(data.completionDate) ) {
            errors.completionDate = 'This field is required';
        }
    }

    const isOtherHowDidYouHearSelected = data.reason === 'other';
    if (isOtherHowDidYouHearSelected) {
        if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
            errors.reasonOther = 'This field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask6Step3Input(data) {
    let errors = {};

    if (data.hasInputtedFinancials === undefined || data.hasInputtedFinancials === null || data.hasInputtedFinancials === "") {
        errors.hasInputtedFinancials = 'This field is required';
    }

    const isCompleted = data.hasInputtedFinancials === true || data.hasInputtedFinancials === "true";
    if (isCompleted) {
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
        if (data.invoiceOtherCostsAmount === undefined || data.invoiceOtherCostsAmount === null || data.invoiceOtherCostsAmount === "" || isNaN(data.invoiceOtherCostsAmount) ) {
            errors.invoiceOtherCostsAmount = 'This field is required';
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
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask6Step4Input(data) {
    let errors = {};



    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask7Step2Input(data) {
    let errors = {};

    if (data.wasSurveyConducted === undefined || data.wasSurveyConducted === null || data.wasSurveyConducted === "") {
        errors.wasSurveyConducted = 'This field is required';
    } else {
        const isCancelled = data.wasSurveyConducted === false || data.wasSurveyConducted === "false";
        const isCompleted = data.wasSurveyConducted === true || data.wasSurveyConducted === "true";
        // const isOtherSelected = data.noSurveyConductedReason === 1;

        if (isCancelled) {
            if (data.noSurveyConductedReason === undefined || data.noSurveyConductedReason === null || data.noSurveyConductedReason === "" || isNaN(data.noSurveyConductedReason)) {
                errors.noSurveyConductedReason = 'This field is required';
            } else {
                if (data.noSurveyConductedReason === 1) {
                    if (data.noSurveyConductedReasonOther === undefined || data.noSurveyConductedReasonOther === null || data.noSurveyConductedReasonOther === "") {
                        errors.noSurveyConductedReasonOther = 'This field is required';
                    }
                }
            }
        }


        if (isCompleted) {
            if (data.wasJobSatisfactory === undefined || data.wasJobSatisfactory === null || data.wasJobSatisfactory === "") {
                errors.wasJobSatisfactory = 'This field is required';
            }
            if (data.wasJobFinishedOnTimeAndOnBudget === undefined || data.wasJobFinishedOnTimeAndOnBudget === null || data.wasJobFinishedOnTimeAndOnBudget === "") {
                errors.wasJobFinishedOnTimeAndOnBudget = 'This field is required';
            }
            if (data.wasAssociatePunctual === undefined || data.wasAssociatePunctual === null || data.wasAssociatePunctual === "") {
                errors.wasAssociatePunctual = 'This field is required';
            }
            if (data.wasAssociateProfessional === undefined || data.wasAssociateProfessional === null || data.wasAssociateProfessional === "") {
                errors.wasAssociateProfessional = 'This field is required';
            }
            if (data.wouldCustomerReferOurOrganization === undefined || data.wouldCustomerReferOurOrganization === null || data.wouldCustomerReferOurOrganization === "") {
                errors.wouldCustomerReferOurOrganization = 'This field is required';
            }
        }

    }

    if (data.comment === undefined || data.comment === null || data.comment === "") {
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
