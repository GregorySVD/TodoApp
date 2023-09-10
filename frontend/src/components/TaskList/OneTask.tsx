import {Btn} from "../common/Btn";
import React from "react";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import './OneTask.css';
import {TaskTableRow} from "./TaskTableRow";


export const OneTask = () => {
    const contextTask = React.useContext(TaskContext);
    const contextFetch = React.useContext(FetchDataContext);

    if (!contextTask || !contextFetch)
        return <Loader/>;

    const {tasks} = contextTask;


    if (!tasks) {
        return <Loader/>
    }

    return (
        <div>
            <table className="TaskList_table">
                <thead>
                <tr>
                    <th>Task title</th>
                    <th>Task status</th>
                    <th>Remove task</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <TaskTableRow key={task.id} task={task}/>
                ))}
                </tbody>
            </table>

        </div>
    );

}
