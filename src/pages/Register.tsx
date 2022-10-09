import React, { useEffect, useState } from "react";
import FormInput, {
    FormInputProps,
    isEmail,
    isPhoneNumber,
    isRequired,
} from "../components/FormInput";
import "../styles/register.css";

export type InputState<T> = {
    value: T;
    errorMessage: string;
    isValid: boolean;
};

export default function Register() {
    // state variables
    const [name, setName] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [email, setEmail] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [mobile, setMobile] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [state, setState] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [country, setCountry] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [city, setCity] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [message, setMessage] = useState<InputState<string>>({
        value: "",
        errorMessage: "",
        isValid: false,
    });
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);

    // formFields
    const formFields: FormInputProps[] = [
        {
            value: name.value,
            errorMessage: name.errorMessage,
            label: "Name",
            placeholder: "Enter your Name",
            onChange: (value) => {
                setName(value);
            },
            required: true,
            type: "text",
            validators: [{ func: isRequired, message: "Name is required" }],
        },
        {
            value: email.value,
            errorMessage: email.errorMessage,
            label: "Email",
            placeholder: "Enter your Email",
            onChange: (value) => {
                setEmail(value);
            },
            required: true,
            type: "text",
            validators: [
                { func: isRequired, message: "Email is required" },
                { func: isEmail, message: "Email is not valid" },
            ],
        },
        {
            value: mobile.value,
            errorMessage: mobile.errorMessage,
            label: "Mobile",
            placeholder: "Enter your Mobile",
            onChange: (value) => {
                setMobile(value);
            },
            required: false,
            type: "text",
            validators: [{ func: isPhoneNumber, message: "Phone Number is not valid" }],
        },
        {
            value: country.value,
            errorMessage: country.errorMessage,
            label: "Country",
            placeholder: "Enter your Country",
            onChange: (value) => {
                setCountry(value);
            },
            required: false,
            type: "text",
        },
        {
            value: state.value,
            errorMessage: state.errorMessage,
            label: "State",
            placeholder: "Enter your State",
            onChange: (value) => {
                setState(value);
            },
            required: false,
            type: "text",
        },
        {
            value: city.value,
            errorMessage: city.errorMessage,
            label: "City",
            placeholder: "Enter your City",
            onChange: (value) => {
                setCity(value);
            },
            required: false,
            type: "text",
        },
        {
            value: message.value,
            errorMessage: message.errorMessage,
            label: "Message",
            placeholder: "Enter your Message",
            onChange: (value) => {
                setMessage(value);
            },
            required: false,
            type: "textarea",
        },
    ];

    // useEffect for submit button disable
    useEffect(() => {
        setIsSubmitButtonDisabled(!(name.isValid && email.isValid && mobile.isValid));
    }, [name.isValid, email.isValid, mobile.isValid]);

    const onSubmit = () => {
        const formValues = {
            name: name.value,
            email: email.value,
            mobile: mobile.value,
            country: country.value,
            city: city.value,
            state: state.value,
            message: message.value,
        };

        console.log(formValues);
    };

    return (
        <div className="row d-flex align-items-center vh-100">
            <div className="col-12 col-md-6 offset-md-3">
                <div className="form-container">
                    <h1 className="text-center text-white">Register</h1>
                    <form className="row w-100">
                        {formFields.map((formField, index) => (
                            <FormInput key={index} {...formField} />
                        ))}
                        <div className="col-12">
                            <button
                                type="button"
                                disabled={isSubmitButtonDisabled}
                                className="submit-btn"
                                onClick={onSubmit}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
