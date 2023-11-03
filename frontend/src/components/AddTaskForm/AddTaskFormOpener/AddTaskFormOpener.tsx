import React, {useEffect} from 'react';
import './AddTaskFormOpener.css'
import {useTaskListContext} from "../../../context/TaskListContext";


interface Props {
    onClick: () => void;
}

export const AddTaskFormOpener = (props: Props) => {
    const {tasksList} = useTaskListContext();
    const button = document.querySelector('.AddTaskFormOpener__btn');

    useEffect(() => {
        const button = document.querySelector('.AddTaskFormOpener__btn');

        if (tasksList.length === 0 && button) {
            button.classList.add('active');
        } else if (tasksList.length > 0 && button) {
            button.classList.remove('active');
        }

        return () => {
            if (button) {
                button.classList.remove('active');
            }
        };
    }, [tasksList]);

    if (tasksList.length === 0) {
        if (button) button.classList.add("active");
    }

    return (
        <button className="AddTaskFormOpener__btn" onClick={props.onClick}>
            <i className="fa fa-plus"></i>
            <span> Add Task</span>
        </button>
    )
}
