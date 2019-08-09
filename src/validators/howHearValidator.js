import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.text === undefined || data.text === null || validator.isEmpty(data.text) || data.text === "") {
        errors.text = 'This field is required';
    }
    if (data.sortNumber === undefined || data.sortNumber === null || validator.isEmpty(data.sortNumber) || data.sortNumber === "") {
        errors.sortNumber = 'This field is required';
    }
    if (data.isForAssociate === undefined || data.isForAssociate === null || isNaN(data.isForAssociate) || data.isForAssociate === "") {
        errors.isForAssociate = 'This field is required';
    }
    if (data.isForCustomer === undefined || data.isForCustomer === null || isNaN(data.isForCustomer) || data.isForCustomer === "") {
        errors.isForCustomer = 'This field is required';
    }
    if (data.isForPartner === undefined || data.isForPartner === null || isNaN(data.isForPartner) || data.isForPartner === "") {
        errors.isForPartner = 'This field is required';
    }
    if (data.isForStaff === undefined || data.isForStaff === null || isNaN(data.isForStaff) || data.isForStaff === "") {
        errors.isForStaff = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
