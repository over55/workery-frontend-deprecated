import React from "react";
function FormInputField({ label, name, placeholder, value, errorText, helpText, onChange, isRequired, maxWidth }) {
    let classNameText = "textarea is-success";
    if (errorText) {
        classNameText = "textarea is-danger";
    } else {
        if (isRequired) {
            classNameText = "textarea is-primary";
        }
        if (value !== "") {
            classNameText = "textarea is-success";
        }
    }
    return (
        <div class="field">
            <label class="label">{label}</label>
            <div class="control">
                <textarea className={classNameText}
                               name={name}
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
