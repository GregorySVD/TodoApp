import React from 'react';
import {TodoEntity} from 'types'
import {Btn} from "../../../common/Btn";
import {Loader} from "../../../common/Loader/Loader";
import './TaskTableSingleRow.css'
import {FetchDataContext} from "../../../../context/FetchDataContext.tsx";

interface Props {
    task: TodoEntity;
}


export const TaskTableSingleRow = (props: Props) => {

    const contextFetch = React.useContext(FetchDataContext);
    if (!contextFetch)
        return <Loader/>;
    const {setFetchData} = contextFetch;


    const deleteTask = async (taskId: string | undefined) => {
        if(!window.confirm(`Are you sure you want to remove ${props.task.title} task?`)) {
            return;
        }
        const res = await fetch(`http://localhost:3001/todo/${taskId}`, {
            method: 'DELETE',
        });

        if (res.status === 400 || res.status === 500) {
            const error = await res.json();
            alert(`Error occurred: ${error.message}`)
            return;
        }
        setFetchData(true);
    }

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

    return (
        <tr>
            <td className="Td_title">
                {props.task.title}
            </td>
            <td className="Td_task_status">
                {props.task.isDone === 1
                ? <Btn
                    className="btn-task-done"
                    text="✅ Done"
                    onClick={() => switchIsDoneState(props.task.id)}/>
                : <Btn
                    className="btn-task-undone"
                    text="⛔ Undone"
                     onClick={() => switchIsDoneState(props.task.id)}/>}
            </td>
            <td>
                <Btn
                    text="🗑️" onClick={() => deleteTask(props.task.id)}/>
            </td>
        </tr>
    )
}
