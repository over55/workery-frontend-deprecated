import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateDepositInput(data) {
    let errors = {};

    if (data.paidAt === undefined || data.paidAt === null || data.paidAt === "" || isNaN(data.paidAt)) {
        errors.paidAt = 'This field is required';
    }
    if (data.depositMethod === undefined || data.depositMethod === null || data.depositMethod === "" || isNaN(data.depositMethod)) {
        errors.depositMethod = 'This field is required';
    }
    if (data.paidTo === undefined || data.paidTo === null || data.paidTo === "" || isNaN(data.paidTo)) {
        errors.paidTo = 'This field is required';
    }
    if (data.paidFor === undefined || data.paidFor === null || data.paidFor === "" || isNaN(data.paidFor)) {
        errors.paidFor = 'This field is required';
    }
    if (data.amount === undefined || data.amount === null || data.amount === "" || isNaN(data.amount)) {
        errors.amount = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
