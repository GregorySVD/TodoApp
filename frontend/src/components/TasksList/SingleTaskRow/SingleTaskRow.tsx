import React from 'react';
import {TodoEntity} from 'types'
import {TaskRemoval} from "../../TaskRemoval/TaskRemoval";
import './SingleTaskRow.css'
import {TaskDoneStatusCheckbox} from "../../TaskDoneStatusCheckbox/TaskDoneStatusCheckbox";
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";
import {ErrorPage} from "../../layouts/ErrorPage/ErrorPage";

interface Props {
    task: TodoEntity;
}

export const SingleTaskRow = (props: Props) => {
    const {setShouldRerender} = useTaskListRerenderContext();
    const {error, setError} = useErrorContext();

    const deleteTask = async (taskId: string | undefined) => {
        if (!window.confirm(`Are you sure you want to remove ${props.task.title} task?`)) {
            return;
        }
        try {
            const res = await fetch(`http://localhost:3001/todo/${taskId}`, {
                method: 'DELETE',
            });
            await res.json();
        } catch (error) {
            setError(new Error(`There was an error deleting ${taskId} task. Try again later.`));
        } finally {
            setShouldRerender(true);
        }
    }

    const switchDoneStatus = async (taskId: string | undefined) => {
        try {
            const res = await fetch(`http://localhost:3001/todo/switch/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            await res.json();
        } catch (err) {
            setError(new Error(`An error occurred while updating task status. Try again later.`))
        } finally {
            setShouldRerender(true);
        }
    }
    if (error) return <ErrorPage error={error}/>

    return (
        <li className="SingleTaskRow_container" key={props.task.id}>
            <div className="SingleTaskRow_title overflow-hidden">
                {props.task.title}
            </div>
            <div className="SingleTaskRow__actions">
                    <TaskDoneStatusCheckbox
                        status={Boolean(props.task.isDone)}
                        onChange={() => switchDoneStatus(props.task.id)}
                    />
                    <TaskRemoval
                        onClick={() => deleteTask(props.task.id)}
                    />
            </div>
        </li>
    )
}
