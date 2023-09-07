import {Btn} from "../common/Btn";
import React from "react";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";


export const OneTask = () => {
    const context = React.useContext(TaskContext);
    if (!context) return <Loader/>;
    const {tasks} = context;

    return <>
        {tasks.map((task) => (
            <li key={task.id}>{task.title}<Btn text="✅"/><Btn text="🗑️"/></li>
        ))}
    </>
}
