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

    if (data.status === undefined || data.status === null || data.status === "") {
        errors.status = 'This field is required';
    }

    const isCancelled = data.status === false || data.status === "false";
    if (isCancelled) {
        if (data.reason === undefined || data.reason === null || data.reason === "") {
            errors.reason = 'This field is required';
        } else {
            if (data.reason === 1) {
                if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                    errors.reasonOther = 'This field is required';
                }
            }
        }
    }

    const isCompleted = data.status === true || data.status === "true";
    const isOtherHowDidYouHearSelected = data.reason === 'Other';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateTask6Step3Input(data) {
    let errors = {};

    if (data.status === undefined || data.status === null || data.status === "") {
        errors.status = 'This field is required';
    }

    const isCancelled = data.status === false || data.status === "false";
    if (isCancelled) {
        if (data.reason === undefined || data.reason === null || data.reason === "") {
            errors.reason = 'This field is required';
        } else {
            if (data.reason === 1) {
                if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                    errors.reasonOther = 'This field is required';
                }
            }
        }
    }

    const isCompleted = data.status === true || data.status === "true";
    const isOtherHowDidYouHearSelected = data.reason === 'Other';

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
