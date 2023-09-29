import React from 'react';
import './AddTaskFormOpener.css'


interface Props {
    onClick: () => void;
}

export const AddTaskFormOpener = (props: Props) => {
    return (
        <button className="AddTaskFormOpener__btn" onClick={props.onClick}>
            <i className="fa fa-plus"></i>
            <span> Add Task</span>
        </button>
    )
}
