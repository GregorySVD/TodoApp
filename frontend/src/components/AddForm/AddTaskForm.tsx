import React, {useContext} from 'react';

import './AddTaskForm.css'
import {OpenAddFormContext} from "../../context/OpenAddFormContext";
import {AddFormOpenBtn} from "./AddFormOpenBtn/AddFormOpenBtn";
import {AddFormCloseBtn} from "./AddFormCloseBtn/AddFormCloseBtn";
import {TaskForm} from "./TaskForm/TaskForm";

export const AddTaskForm = () => {

    const contextAddForm = useContext(OpenAddFormContext);


    const {setAddFormIsOpen, AddFormIsOpen} = contextAddForm


    const handleClosePopup = () => {
        setAddFormIsOpen(false);
    }
    const handleOpenPopup = () => {
        setAddFormIsOpen(true);

    }

    return (<div className="AddForm">
            <div>
                {!AddFormIsOpen && <AddFormOpenBtn action={handleOpenPopup}/>}
                {AddFormIsOpen && (
                    <div>
                        <TaskForm/>
                        <AddFormCloseBtn action={handleClosePopup}/>
                    </div>
                )}
            </div>
        </div>
    )
}
