import React from 'react';
import {TodoEntity} from 'types'
import {Btn} from "../common/Btn";
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import {Loader} from "../common/Loader/Loader";

interface Props {
    task: TodoEntity;

}


export const TaskTableRow = (props: Props) => {

    const contextFetch = React.useContext(FetchDataContext);
    if (!contextFetch)
        return <Loader/>;
    const {setFetchData} = contextFetch;


    const deleteTask = async (taskId: string | undefined) => {
        await fetch(`http://localhost:3001/todo/${taskId}`, {
            method: 'DELETE',
        });
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
            <td>
                {props.task.title}
            </td>
            <td>{props.task.isDone == false ? <Btn text="✅ Done" onClick={() => switchIsDoneState(props.task.id)}/> :
                <Btn text="⛔ Undone" onClick={() => switchIsDoneState(props.task.id)}/>}</td>
            <td><Btn text="🗑️" onClick={() => deleteTask(props.task.id)}/></td>
        </tr>
    )
}
