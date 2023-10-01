import React, {useEffect, useState} from 'react';
import './AddTaskFormTitleInput.css'
import {useFormValidationContext} from "../../../context/FormValidationContext";

interface Props {
    className?: string
    setMaxLength: number;
    setMinLength: number;
    placeholder: string;
    updateFormEvent: (key: string, value: string) => void;
}

export const AddTaskFormTitleInput = (props: Props) => {
    const [titleInputValue, setTitleInputValue] = useState<string>('');
    const {formIsValid, setFormIsValid} = useFormValidationContext();

    useEffect(() => {
        if (titleInputValue.length < props.setMinLength || titleInputValue.length > props.setMaxLength) {
            setFormIsValid(false);
        } else {
            setFormIsValid(true);
        }
    }, [titleInputValue, props.setMinLength, props.setMaxLength, setFormIsValid]);

    const handleUpdateTitleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitleInputValue(newTitle);
        props.updateFormEvent('title', newTitle);
    };

    return (
        <label className="AddTaskFormTitleInput__label">
            {(!formIsValid)
                ?
                <span className="AddTaskFormTitleInput__validation_info">{`${props.placeholder} needs to be between ${props.setMinLength}-${props.setMaxLength} character long`}</span>
                : null
            }
            <div className="AddTaskFormTitleInput__input_group"
            >
                <input
                    required
                    type='text'
                    name='title'
                    className={props.className}
                    maxLength={props.setMaxLength}
                    minLength={props.setMinLength}
                    value={titleInputValue}
                    onChange={handleUpdateTitleInputValue}
                />
                <label htmlFor={props.placeholder}>{props.placeholder}</label>
            </div>
        </label>
    )
}
