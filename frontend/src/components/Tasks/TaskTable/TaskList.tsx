import React from "react";
import {TaskContext} from "../../../context/TaskContext";
import {Loader} from "../../common/Loader/Loader";
import './TaskList.css';
import {SingleTask} from "./TaskTableSingleRow/SingleTask";
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";


export const TaskList = () => {
    const contextTask = React.useContext(TaskContext);
    const contextFetch = React.useContext(FetchDataContext);

    if (!contextTask || !contextFetch)
        return <Loader/>;

    const {tasks} = contextTask;


    if (!tasks) {
        return <Loader/>
    }

    return (
        <div className="TaskList_container">
            <ol className="TaskList_list">
                {tasks.map((task) => (
                    <SingleTask key={task.id} task={task}/>
                ))}
            </ol>
        </div>
    );

}
