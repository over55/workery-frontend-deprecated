import React from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import classnames from 'classnames';


export const BootstrapDatePicker = ({
    label, name, datePickerClassName, divClassName, borderClassname="border-primary", onTimeChange, dateObj, error, helpText, maxDate=null, minDate=null
}) => {
    return (
        <div className={divClassName}>
            <label htmlFor={name}>{label}</label>
            <div className="input-group input-group-lg date-picker-group">
                <DatePicker
                    name={name}
                    selected={dateObj}
                    onChange={onTimeChange}
                    className={classnames(datePickerClassName, { 'border-danger has-error': error }, { 'border-success': !error && borderClassname === 'border-success' }, { 'border-primary': !error && borderClassname === 'border-primary' } )}
                    maxDate={maxDate}
                    minDate={minDate}
                />
                <div className="input-group-append">
                    <span className={classnames('input-group-text dob-icon', { 'bg-danger border-danger': error }, { 'bg-success border-success': !error && borderClassname === 'border-success' }, { 'bg-primary border-primary': !error && borderClassname === 'border-primary' } )}>
                        <i className="far fa-calendar"></i>
                    </span>
                </div>
            </div>
            <small className="form-text text-muted">{helpText}</small>
        </div>
    );
}
