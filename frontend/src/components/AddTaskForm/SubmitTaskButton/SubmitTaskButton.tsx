import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {FormValidationContext} from "../../../context/FormValidationContext";
import './SubmitTaskButton.css'

interface SendFormButtonProps {
    onClick: (e: SyntheticEvent) => Promise<void>
}

export const SubmitTaskButton: React.FC<SendFormButtonProps> = ({onClick}) => {
    const inputValidation = useContext(FormValidationContext);
    const {FormValidation} = inputValidation;
    const [isFormValid, setIsFormValid] = useState(FormValidation);

    useEffect(() => {
        setIsFormValid(FormValidation)
    }, [FormValidation]);

    return (
        <div className="SubmitTaskButton__container">
            <button className="SubmitTaskButton__btn"
                    disabled={!isFormValid}
                    onClick={onClick}>
                <i className="fa fa-plus"></i>
                <span>Add New Task</span>
            </button>
        </div>
    )
}
