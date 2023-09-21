import React, {useState} from 'react';
import './FormInput.css'

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

    const validateLength = inputValue.length < props.setMinLength || inputValue.length > (props.setMaxLength - 1);

    const handleUpdateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        props.updateFormEvent(props.name, newValue);

    };

    return (
        <label className="TaskForm__label">
            {(validateLength) ?
                <span
                    className="TaskForm__instruction_text">{`${props.placeholder} needs to be between ${props.setMinLength}-${props.setMaxLength} character long`}</span> : null}
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
