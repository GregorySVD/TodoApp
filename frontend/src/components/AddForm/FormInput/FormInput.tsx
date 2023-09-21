import React, {useState} from 'react';
import './FormInput.css'
import {FormValidationContext} from "../../../context/FormValidationContext";

interface Props {
    name: string
    setMaxLength: number;
    placeholder: string;
    type: string;
    className?: string
    updateFormEvent: (key: string, value: string) => void;
    setMinLength: number;
}


export const FormInput = (props: Props) => {
    const [inputValue, setInputValue] = useState<string>('');
    const inputValidation = React.useContext(FormValidationContext);

    const {setFormValidation} = inputValidation

    const validateLength = inputValue.length < props.setMinLength || inputValue.length > (props.setMaxLength - 1);

    const handleUpdateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (inputValue.length < props.setMinLength || inputValue.length > (props.setMaxLength - 1)) {
            setFormValidation(false);
        } else {
            setFormValidation(true);
        }
        props.updateFormEvent(props.name, newValue);

    };

    return (
        <label className="TaskForm__label">
            {(validateLength) ?
                <span
                    className="TaskForm__instruction_text">{`${props.placeholder} needs to be between ${props.setMinLength}-${props.setMaxLength} character long`}</span>
                : null}
            <div className="FormInput__input_group">
                <input
                    type={props.type}
                    className={props.className}
                    name={props.name}
                    maxLength={props.setMaxLength}
                    minLength={props.setMinLength}
                    required
                    value={inputValue}
                    onChange={handleUpdateInputValue}
                />
                <label htmlFor={props.placeholder}>{props.placeholder}</label>
            </div>
        </label>

    )
}
