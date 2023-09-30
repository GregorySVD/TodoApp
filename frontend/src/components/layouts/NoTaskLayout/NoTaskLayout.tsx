import React, {useEffect} from 'react';
import './NoTaskLayout.css'
import {useOpenAddTaskFormContext} from "../../../context/OpenAddTaskFormContext";
import {AddTaskForm} from "../../AddTaskForm/AddTaskForm";

export const NoTaskLayout = () => {

    const {addTaskFormIsOpen, setAddTaskFormIsOpen} = useOpenAddTaskFormContext();

    useEffect(() => {
        setAddTaskFormIsOpen(false);
    },[addTaskFormIsOpen, setAddTaskFormIsOpen]);

    return (
        <div className="NoTaskLayout__quote_container">
            <blockquote>“Setting goals is the first step in turning the invisible into the visible.”
                <footer>
                    — Tony Robbins
                </footer>
            </blockquote>
            <AddTaskForm/>
        </div>
    )
}
