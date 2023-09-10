import {Btn} from "../common/Btn";
import React from "react";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import './OneTask.css';


export const OneTask = () => {
    const contextTask = React.useContext(TaskContext);
    const contextFetch = React.useContext(FetchDataContext);

    if (!contextTask || !contextFetch)
        return <Loader/>;

    const {setFetchData} = contextFetch;
    const {tasks} = contextTask;

    const switchIsDoneState = async (taskId: string | undefined) => {
        try {
            const res = await fetch(`http://localhost:3001/todo/switch/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            setFetchData(true);
            await res.json();
        } catch (err) {
            console.error('An error occurred while updating isDone status:', err);
        }
    }

    const deleteTask = async (taskId: string | undefined) => {
        await fetch(`http://localhost:3001/todo/${taskId}`, {
            method: 'DELETE',
        });
        setFetchData(true);
    }

    if (!tasks) {
        return <Loader/>
    }

    return (
        <div>
            <ul className="OneTask__List">
                {tasks.map((task) => (
                    <li key={task.id} className={task.isDone ? 'done' : 'undone'}>
                        {task.title}
                        {task.isDone == false ? <Btn text="✅ Done" onClick={() => switchIsDoneState(task.id)}/> :
                            <Btn text="⛔ Undone" onClick={() => switchIsDoneState(task.id)}/>}
                        <Btn text="🗑️" onClick={() => deleteTask(task.id)}/>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                    </li>
                ))}
            </ul>
        </div>
    );

}
