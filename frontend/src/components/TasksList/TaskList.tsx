import React from "react";
import {useTaskListContext} from "../../context/TaskListContext";
import './TaskList.css';
import {SingleTaskRow} from "./SingleTaskRow/SingleTaskRow";

export const TaskList = () => {
    const {tasksList} = useTaskListContext();

    return (
        <div className="TaskList__container">
            <ol className="TaskList__list">
                {tasksList.map((task) => (
                    <SingleTaskRow key={task.id} task={task}/>
                ))}
            </ol>
        </div>
    );
}
