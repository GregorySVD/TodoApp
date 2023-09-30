import React, {useEffect, useState} from 'react';
import './TaskProgress.css'
import {useTaskListContext} from "../../../context/TaskListContext";
import {ProgressBar} from "./ProgressBar/ProgressBar";
import {ClearTasksDone} from "../ClearTaskDone/ClearTasksDone";


export const TaskProgress = () => {
    const [taskToDoCounter, setTaskToDoCounter] = useState<number | null>(null);
    const [taskDoneCounter, setTaskDoneCounter] = useState<number | null>(null);

    const {tasksList} = useTaskListContext();

    useEffect(() => {
        if (tasksList.length === 0) {
            return;
        }

        setTaskToDoCounter(tasksList.length);
        const taskDone = tasksList.filter((task) => task.isDone === 1);
        setTaskDoneCounter(taskDone.length);
    }, [tasksList]);
    if (!tasksList) return null;

    return (
        <div
            className="TaskProgressBar__container">
            <ProgressBar doneTask={taskDoneCounter} allTasks={taskToDoCounter}/>
            {(taskDoneCounter !== 0) ? <ClearTasksDone/> : null}
        </div>
    )
}
