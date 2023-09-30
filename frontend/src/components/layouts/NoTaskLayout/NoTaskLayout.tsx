import React, {useContext, useEffect} from 'react';
import './NoTaskLayout.css'
import {OpenAddFormContext} from "../../../context/OpenAddFormContext";
import {AddTaskForm} from "../../AddTaskForm/AddTaskForm";


export const NoTaskLayout = () => {

    const contextAddForm = useContext(OpenAddFormContext);
    const {setAddFormIsOpen} = contextAddForm;

    useEffect(() => {
        setAddFormIsOpen(false);
    },[]);

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
