import React, {useEffect, useState} from 'react';
import './TaskProgress.css'

import {TaskContext} from "../../context/TaskContext";
import {FetchDataContext} from "../../context/FetchDataContext.tsx";


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
        <div className="TaskProgressBar__container">
            <p>Your Progress{taskDoneCounter}/{taskToDoCounter}</p>
        </div>
    )
}
