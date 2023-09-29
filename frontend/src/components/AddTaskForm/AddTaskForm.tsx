import React, {useContext, useState} from 'react';

import './AddTaskForm.css'
import {OpenAddFormContext} from "../../context/OpenAddFormContext";
import {AddTaskFormOpener} from "./AddTaskFormOpener/AddTaskFormOpener";
import {AddTaskFormCloser} from "./AddTaskFormCloser/AddTaskFormCloser";
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
        <AddTaskFormOpener onClick={handleOpenPopup}/>
        :
        (
            <FormValidationContext.Provider value={{FormValidation, setFormValidation}}>
                <div className="AddForm">
                    <div>
                        <TaskForm/>
                        <AddTaskFormCloser onClick={handleClosePopup}/>
                    </div>
                </div>
            </FormValidationContext.Provider>
        )
}
