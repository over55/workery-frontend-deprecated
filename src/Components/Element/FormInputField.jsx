import React from "react";
import { startCase } from 'lodash';

function FormInputField({ label, name, placeholder, value, type="text", errorText, validationText, helpText, onChange }) {
    return (
        <div class="field">
            <label class="label is-small has-text-grey-light">{label}</label>
            <div class="control">
                <input class={`input ${errorText && 'is-danger'} ${validationText && 'is-success'}`}
                        name={name}
                        type={type}
                 placeholder={placeholder}
                       value={value}
                    onChange={onChange}
                autoComplete="off" />
            </div>
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
            {helpText &&
                <p class="help">{helpText}</p>
            }
        </div>
    );
}

export default FormInputField;
