import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


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
        if (data.invoiceServiceFeePaymentDate === undefined || data.invoiceServiceFeePaymentDate === null || data.invoiceServiceFeePaymentDate === "" || isNaN(data.invoiceServiceFeePaymentDate) ) {
            errors.invoiceServiceFeePaymentDate = 'This field is required';
        }
        if (data.invoiceActualServiceFeeAmountPaid === undefined || data.invoiceActualServiceFeeAmountPaid === null || data.invoiceActualServiceFeeAmountPaid === "" || isNaN(data.invoiceActualServiceFeeAmountPaid) ) {
            errors.invoiceActualServiceFeeAmountPaid = 'This field is required';
        }
        if (data.visits === undefined || data.visits === null || data.visits === "" || isNaN(data.visits) ) {
            errors.visits = 'This field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask6Step4Input(data) {
    let errors = {};

    if (data.comment === undefined || data.comment === null || data.comment === "") {
        errors.comment = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
