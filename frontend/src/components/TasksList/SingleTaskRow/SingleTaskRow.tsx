import React, {useState} from 'react';
import {TodoEntity} from 'types'
import {OneTaskRemoval} from "../../DeleteTasks/OneTaskRemoval/OneTaskRemoval";
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
    const [modal, setModal] = useState<boolean>(false);


    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
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

    const toggleModal = async () => {
        await setModal(!modal);
    }
    const handleDeleteTask = async (taskId: string | undefined) => {
        try {
            const res = await fetch(`http://localhost:3001/todo/${taskId}`, {
                method: 'DELETE',
            });
            await res.json();
        } catch (error) {
            setError(new Error(`There was an error deleting ${taskId} task. Try again later.`));
            setModal(!modal);
        } finally {
            setShouldRerender(true);
        }
    }

    return (
        <>
        <li className="SingleTaskRow" key={props.task.id}>
            <div className="SingleTaskRow__container">
                <div className="SingleTaskRow_title overflow-hidden">
                    {props.task.title}
                </div>
                <div className="SingleTaskRow__actions">
                    <TaskDoneStatusCheckbox
                        status={Boolean(props.task.isDone)}
                        onChange={() => switchDoneStatus(props.task.id)}
                    />
                    <OneTaskRemoval
                        onClick={() =>
                            toggleModal()}
                    />
                </div>
            </div>
        </li>
    {modal && (<div className="modal__confirmTaskRemove">
        <div className="overlay"
             onClick={toggleModal}
        >
        </div>
        <div className="modal-content">
            <button className="modal-close-btn" onClick={toggleModal}>
                <i className="fa fa-close"></i>
            </button>
            <h2>Are you sure you want to remove <i> {props.task.title} </i>task?</h2>
            <p>This action cannot be undone. 🗑️</p>
            <div className="modal-action-buttons">
                <button className="modal-accept-action--btn"
                        onClick={()=>handleDeleteTask(props.task.id)}
                >Yes
                </button>
                <button className="modal-cancel-action-btn"
                        onClick={toggleModal}
                >No
                </button>
            </div>
        </div>
    </div>)}
        </>
    )
}
