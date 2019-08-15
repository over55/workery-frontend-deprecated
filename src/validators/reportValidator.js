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

export function validateReport2Input(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || data.associate === "" || isNaN(data.associate) ) {
        errors.associate = 'This field is required';
    }
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


export function validateReport3Input(data) {
    let errors = {};

    if (data.fromDate === undefined || data.fromDate === null || data.fromDate === "" || isNaN(data.fromDate) ) {
        errors.fromDate = 'This field is required';
    }
    if (data.toDate === undefined || data.toDate === null || data.toDate === "" || isNaN(data.toDate) ) {
        errors.toDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateReport4Input(data) {
    let errors = {};

    if (data.fromDate === undefined || data.fromDate === null || data.fromDate === "" || isNaN(data.fromDate) ) {
        errors.fromDate = 'This field is required';
    }
    if (data.toDate === undefined || data.toDate === null || data.toDate === "" || isNaN(data.toDate) ) {
        errors.toDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateReport7Input(data) {
    let errors = {};

    if (data.associateType === undefined || data.associateType === null || data.associateType === "" ) {
        errors.associateType = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateReport8Input(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || data.associate === "" || isNaN(data.associate) ) {
        errors.associate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateReport10Input(data) {
    let errors = {};

    if (data.fromDate === undefined || data.fromDate === null || data.fromDate === "" || isNaN(data.fromDate) ) {
        errors.fromDate = 'This field is required';
    }
    if (data.toDate === undefined || data.toDate === null || data.toDate === "" || isNaN(data.toDate) ) {
        errors.toDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


export function validateReport11Input(data) {
    let errors = {};

    if (data.fromDate === undefined || data.fromDate === null || data.fromDate === "" || isNaN(data.fromDate) ) {
        errors.fromDate = 'This field is required';
    }
    if (data.toDate === undefined || data.toDate === null || data.toDate === "" || isNaN(data.toDate) ) {
        errors.toDate = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export function validateReport13Input(data) {
    let errors = {};

    if (data.skillSets === undefined || data.skillSets === null || data.skillSets === "" || isEmpty(data.skillSets) ) {
        errors.skillSets = 'This field is required';
    }
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
