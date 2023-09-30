import React from "react";
import {useTaskListContext} from "../../../context/TaskListContext";
import {Loader} from "../../common/Loader/Loader";
import './TaskList.css';
import {SingleTask} from "./TaskTableSingleRow/SingleTask";

export const TaskList = () => {

    const TaskListContext = useTaskListContext();
    const {tasksList} = TaskListContext;

    if (!tasksList)
        return <Loader/>;

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
