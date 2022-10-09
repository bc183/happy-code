import React, { ChangeEvent } from "react";
import { InputState } from "../pages/Register";
import "../styles/formInput.css";

export type FormInputProps = {
    value: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    onChange: (value: InputState<any>) => void;
    errorMessage: string;
    validators?: Validator[];
};

export type Validator = { func: (value: string) => boolean; message: string };

// validators
export const isRequired = (value: string) => value !== "";
export const isEmail = (value: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
export const isPhoneNumber = (value: string) => /^[0-9]{10}$/.test(value);

export default function FormInput(props: FormInputProps) {
    // validate onChange
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (props.validators) {
            for (const validator of props.validators) {
                const isValid = validator.func(value);

                if (!isValid) {
                    props.onChange({
                        value: value,
                        errorMessage: validator.message,
                        isValid: false,
                    });
                    return;
                }
            }
        }

        props.onChange({
            value: value,
            errorMessage: "",
            isValid: true,
        });
    };

    return (
        <div className="form-input-container col-12">
            <div className="row">
                <label className="form-label col-12">
                    {props.label} {props.required && <span className="required">*</span>}
                </label>
                <div className="col-12">
                    <input
                        type={props.type}
                        className="form-input"
                        placeholder={props.placeholder}
                        onChange={(value) => onChange(value)}
                    />
                    {<p className="error-message">{props.errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}
