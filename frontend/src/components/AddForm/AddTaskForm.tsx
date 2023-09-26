import React, {useContext, useState} from 'react';

import './AddTaskForm.css'
import {OpenAddFormContext} from "../../context/OpenAddFormContext";
import {AddTaskFormOpener} from "./AddFormOpenBtn/AddTaskFormOpener";
import {AddFormCloseBtn} from "./AddFormCloseBtn/AddFormCloseBtn";
import {TaskForm} from "./TaskForm/TaskForm";
import {FormValidationContext} from "../../context/FormValidationContext"

export const AddTaskForm = () => {

    const [FormValidation, setFormValidation] = useState(false);

    const contextAddForm = useContext(OpenAddFormContext);


    const {setAddFormIsOpen, AddFormIsOpen} = contextAddForm


    const handleClosePopup = () => {
        setAddFormIsOpen(false);
    }
    const handleOpenPopup = () => {
        setAddFormIsOpen(true);

    }
    return (!AddFormIsOpen)
        ?
        <AddTaskFormOpener action={handleOpenPopup}/>
        :
        (
            <FormValidationContext.Provider value={{FormValidation, setFormValidation}}>
                <div className="AddForm">
                    <div>
                        <TaskForm/>
                        <AddFormCloseBtn action={handleClosePopup}/>
                    </div>
                </div>
            </FormValidationContext.Provider>
        )
}
