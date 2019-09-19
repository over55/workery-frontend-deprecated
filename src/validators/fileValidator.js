import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    ASSOCIATE_GROUP_ID
} from '../constants/api';


export function validateInput(data) {
    let errors = {};

    if (data.file === undefined || data.file === null || data.file === "") {
        errors.file = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
