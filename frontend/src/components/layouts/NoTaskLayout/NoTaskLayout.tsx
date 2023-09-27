import React, {useContext, useEffect} from 'react';
import {AddTaskForm} from "../../AddForm/AddTaskForm";
import './NoTaskLayout.css'
import {OpenAddFormContext} from "../../../context/OpenAddFormContext";


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
