import React from "react";
import {useTaskListContext} from "../../../context/TaskListContext";
import './TaskList.css';
import {SingleTask} from "./TaskTableSingleRow/SingleTask";

export const TaskList = () => {
    const {tasksList} = useTaskListContext();

    return (
        <div className="TaskList_container">
            <ol className="TaskList_list">
                {tasksList.map((task) => (
                    <SingleTask key={task.id} task={task}/>
                ))}
            </ol>
        </div>
    );

}
