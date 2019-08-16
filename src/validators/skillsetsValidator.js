import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export function validateInput(data) {
    let errors = {};
    if (data.skillSets === undefined || data.skillSets === null || isEmpty(data.skillSets) || data.skillSets === "") {
        errors.skillSets = 'This field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
