import React from 'react';
import {Btn} from "../common/Btn";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";


export const TaskList = () => {
    const context = React.useContext(TaskContext);
    if (!context) return <Loader/>;

    const {tasks} = context;
    return (

        <div className="Task-List__Container">
            <h1>Recent Tasks</h1>
            <ol className="Task-List__Container">
                {tasks.map((task) => (
                    <li key={task.id}>{task.title}<Btn text="✅"/><Btn text="🗑️"/></li>
                ))}
            </ol>
        </div>

    )
}
