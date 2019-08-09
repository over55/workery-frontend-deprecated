import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.category === undefined || data.category === null || validator.isEmpty(data.category) || data.category === "") {
        errors.category = 'This field is required';
    }
    if (data.subCategory === undefined || data.subCategory === null || validator.isEmpty(data.subCategory) || data.subCategory === "") {
        errors.subCategory = 'This field is required';
    }
    if (data.insuranceRequirements === undefined || data.insuranceRequirements === null || isEmpty(data.insuranceRequirements) || data.insuranceRequirements === "") {
        errors.insuranceRequirements = 'This field is required';
    }
    if (data.description === undefined || data.description === null || validator.isEmpty(data.description) || data.description === "") {
        errors.description = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
