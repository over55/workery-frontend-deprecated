import React from "react";

function FormInputField({ label, name, placeholder, value, type="text", errorText, helpText, onChange, isRequired, maxWidth }) {
    let classNameText = "input is-success";
    if (errorText) {
        classNameText = "input is-danger";
    } else {
        if (isRequired) {
            classNameText = "input is-primary";
        }
        if (value !== "") {
            classNameText = "input is-success";
        }
    }
    return (
        <div class="field">
            <label class="label">{label}</label>
            <div class="control">
                <input className={classNameText}
                            name={name}
                            type={type}
                     placeholder={placeholder}
                           value={value}
                        onChange={onChange}
                           style={{maxWidth:maxWidth}}
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
