import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_ROLE_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    if (data.title === undefined || data.title === null || data.title === "") {
        errors.title = 'This field is required';
    }
    // if (data.description === undefined || data.description === null || data.description === "") {
    //     errors.description = 'This field is required';
    // }
    if (data.file === undefined || data.file === null || data.file === "") {
        errors.file = 'This field is required';
    }
    if (data.is_archived === undefined || data.is_archived === null || data.is_archived === "") {
        errors.is_archived = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateImageInput(data) {
    let errors = {};

    if (data.file === undefined || data.file === null || data.file === "") {
        errors.file = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
