import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useFormValidationContext} from "../../../context/FormValidationContext";
import './SubmitTaskButton.css'

interface SendFormButtonProps {
    onClick: (e: SyntheticEvent) => Promise<void>
}

export const SubmitTaskButton: React.FC<SendFormButtonProps> = ({onClick}) => {
    const {formIsValid} = useFormValidationContext();
    const [isFormValid, setIsFormValid] = useState(formIsValid);


    useEffect(() => {
        setIsFormValid(formIsValid)
    }, [formIsValid]);

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
