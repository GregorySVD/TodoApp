import React from 'react';
import {TodoEntity} from 'types'
import {RemoveBtn} from "../../../common/RemoveBtn";
import {Loader} from "../../../common/Loader/Loader";
import './SingleTask.css'
import {FetchDataContext} from "../../../../context/FetchDataContext.tsx";
import {CheckBox} from "../../../common/CheckBox/CheckBox";

interface Props {
    task: TodoEntity;
}


export const SingleTask = (props: Props) => {

    const contextFetch = React.useContext(FetchDataContext);
    if (!contextFetch)
        return <Loader/>;
    const {setFetchData} = contextFetch;


    const deleteTask = async (taskId: string | undefined) => {
        if (!window.confirm(`Are you sure you want to remove ${props.task.title} task?`)) {
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
        <li className="SingleTask_container" key={props.task.id}>
            <div className="SingleTask_title overflow-hidden">
                {props.task.title}
            </div>
            <div className="SingleTask_task_operation_Btn">
                <div className="SingleTask_task_status">
                    <CheckBox
                        status={Boolean(props.task.isDone)}
                        onChange={() => switchIsDoneState(props.task.id)}
                    />
                </div>
                <div className="SingleTask_Btn_delete_task">
                    <RemoveBtn
                        onClick={() => deleteTask(props.task.id)}/>
                </div>
            </div>
        </li>
    )
}
