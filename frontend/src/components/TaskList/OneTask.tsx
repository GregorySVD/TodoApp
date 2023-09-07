import {Btn} from "../common/Btn";
import React from "react";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";
import {FetchDataContext} from "../../context/FetchDataContext.tsx";


export const OneTask = () => {
    const contextTask = React.useContext(TaskContext);
    const contextFetch = React.useContext(FetchDataContext);

    if (!contextTask || !contextFetch)
        return <Loader/>;

    const {setFetchData} = contextFetch;
    const {tasks} = contextTask;

    const deleteTask = async (taskId: string| undefined) => {
        const res = await fetch(`http://localhost:3001/todo/${taskId}`, {
            method: 'DELETE',
        });
        console.log(`Deleting ${taskId}`)
        setFetchData(true);
    }

    if (!tasks) {
        return <Loader/>
    }
    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title}
                        <Btn text="✅"/>
                        <Btn text="🗑️" onClick={() => deleteTask(task.id)}/>
                    </li>
                ))}
            </ul>
        </div>
    );

}
