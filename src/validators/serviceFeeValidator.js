import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || validator.isEmpty(data.title) || data.title === "") {
        errors.title = 'This field is required';
    }
    if (data.percentage === undefined || data.percentage === null || validator.isEmpty(data.percentage) || data.percentage === "") {
        errors.percentage = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
