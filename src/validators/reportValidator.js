import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


export function validateReport1Input(data) {
    let errors = {};

    if (data.fromDate === undefined || data.fromDate === null || data.fromDate === "" || isNaN(data.fromDate) ) {
        errors.fromDate = 'This field is required';
    }
    if (data.toDate === undefined || data.toDate === null || data.toDate === "" || isNaN(data.toDate) ) {
        errors.toDate = 'This field is required';
    }
    if (data.jobState === undefined || data.jobState === null || data.jobState === "" ) {
        errors.jobState = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
