import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


/**
 *  Validator will validate the register form.
 */
export default function validateInput(data) {
    let errors = {};

    if (data.associate === undefined || data.associate === null || isNaN(data.associate) || data.associate === "") {
        errors.associate = 'This field is required';
    }
    if (data.startDate === undefined || data.startDate === null || isNaN(data.startDate) || data.startDate === "") {
        errors.startDate = 'This field is required';
    }
    if (data.reason === undefined || data.reason === null || isNaN(data.reason) || data.reason === "") {
        errors.reason = 'This field is required';
    } else {
        if (data.reason === 1) {
            if (data.reasonOther === undefined || data.reasonOther === null || data.reasonOther === "") {
                errors.reasonOther = 'This field is required';
            }
        }
    }
    if (data.untilFurtherNotice === undefined || data.untilFurtherNotice === null || isNaN(data.untilFurtherNotice) || data.untilFurtherNotice === "") {
        errors.untilFurtherNotice = 'This field is required';
    } else {
        if (parseInt(data.untilFurtherNotice) === 0) {
            if (data.untilDate === undefined || data.untilDate === null || isNaN(data.untilDate) || data.untilDate === "") {
                errors.untilDate = 'This field is required';
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
