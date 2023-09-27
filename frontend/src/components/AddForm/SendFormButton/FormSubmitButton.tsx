import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {FormValidationContext} from "../../../context/FormValidationContext";
import './FormSubmitButton.css'

interface SendFormButtonProps {
    onClick: (e: SyntheticEvent) => Promise<void>
}

export const FormSubmitButton: React.FC<SendFormButtonProps> = ({onClick}) => {
    const inputValidation = useContext(FormValidationContext);
    const {FormValidation} = inputValidation;
    const [isFormValid, setIsFormValid] = useState(FormValidation);

    useEffect(() => {
        setIsFormValid(FormValidation)
    }, [FormValidation]);

    return (
        <div className="AddForm__Form_Submit_BTN_container">
            <button className="AddForm__Form_Submit_BTN"
                    disabled={!isFormValid}
                    onClick={onClick}>
                <span>Add New Task</span>
            </button>
        </div>
    )
}
