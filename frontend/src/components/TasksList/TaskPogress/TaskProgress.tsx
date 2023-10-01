import React, {useEffect, useState} from 'react';
import './TaskProgress.css'
import {useTaskListContext} from "../../../context/TaskListContext";
import {ProgressBar} from "../../ProgressBar/ProgressBar";
import {ClearTasksDone} from "../../ClearTasksDone/ClearTasksDone";


export const TaskProgress = () => {
    const [allTasksCounter, setAllTasksCounter] = useState<number | null>(null);
    const [taskDoneCounter, setTaskDoneCounter] = useState<number | null>(null);
    const {tasksList} = useTaskListContext();

    useEffect(() => {
        setAllTasksCounter(tasksList.length);
        const countTasksDone = tasksList.filter((task) => task.isDone === 1);
        setTaskDoneCounter(countTasksDone.length);
    }, [tasksList]);

    return (
        <div
            className="TaskProgress__container">
            <h4 className="TaskProgress__task_counter">{taskDoneCounter}/{allTasksCounter}</h4>
            <ProgressBar doneTask={taskDoneCounter} allTasks={allTasksCounter}/>
            {(taskDoneCounter !== 0) ? <ClearTasksDone/> : null}
        </div>
    )
}
