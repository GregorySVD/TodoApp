import React from 'react';
import './AddTaskFormOpener.css'


interface Props {
    action: () => void;
}

export const AddTaskFormOpener = (props: Props) => {
    return (
        <div className="AddTaskFormOpener__container">
            <button className="AddTaskFormOpener__button" onClick={props.action}>
                <i className="fa fa-plus"></i>
                <span> Add Task</span>
            </button>
        </div>
)
}
