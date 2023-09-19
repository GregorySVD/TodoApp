import React, {useEffect, useState} from 'react';
import './TaskProgress.css'

import {TaskContext} from "../../../context/TaskContext";
import {ProgressBar} from "./ProgressBar/ProgressBar";
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";
import {ClearTasksDone} from "../ClearTaskDone/ClearTasksDone";


export const TaskProgress = () => {
    const [taskToDoCounter, setTaskToDoCounter] = useState<number | null>(null);
    const [taskDoneCounter, setTaskDoneCounter] = useState<number | null>(null);

    const contextTask = React.useContext(TaskContext);
    const contextFetch = React.useContext(FetchDataContext);

    useEffect(() => {
        if (!contextTask || !contextFetch)
            return;
        const {tasks} = contextTask;
        if (tasks.length === 0) {
            return;
        }
        setTaskToDoCounter(tasks.length);
        const taskDone = tasks.filter((task) => task.isDone === 1);
        setTaskDoneCounter(taskDone.length);
    }, [contextFetch, contextTask]);
    if (!contextTask || !contextFetch) return null;


    return (
        <div
            className="TaskProgressBar__container">
            <ProgressBar doneTask={taskDoneCounter} allTasks={taskToDoCounter}/>
            {(taskDoneCounter !== 0) ? <ClearTasksDone/> : null}
        </div>
    )
}
