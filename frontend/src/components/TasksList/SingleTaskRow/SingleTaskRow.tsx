import React, {useState} from 'react';
import {TodoEntity} from 'types'
import {OneTaskRemoval} from "../../DeleteTasks/OneTaskRemoval/OneTaskRemoval";
import './SingleTaskRow.css'
import {TaskDoneStatusCheckbox} from "../../TaskDoneStatusCheckbox/TaskDoneStatusCheckbox";
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";
import {ErrorPage} from "../../layouts/ErrorPage/ErrorPage";
import {toast} from "sonner";
import {EditTask} from "../../EditTask/EditTask";

interface Props {
    task: TodoEntity;
}

export const SingleTaskRow = (props: Props) => {
    const {setShouldRerender} = useTaskListRerenderContext();
    const {error, setError} = useErrorContext();
    const [modal, setModal] = useState<boolean>(false);
    const [modalTaskEditor, setModalTaskEditor] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(props.task.title);
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const updateTaskTitle = async (taskId: string | undefined) => {
        if (editedTitle.length < 3) {
            await toast.error('An error occurred while updating task title: Title needs to be at least 3 characters' +
                ' long ❌');
            setEditedTitle(props.task.title);
            setModalTaskEditor(!modalTaskEditor);
            return;
        } else {
            try {
                const newTitle = editedTitle;
                const res = await fetch(
                    `http://localhost:3001/todo/updateTitle/${taskId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: newTitle,
                        })
                    }
                )
                if (!res.ok) {
                    await setError(new Error(`An error occurred while updating task title. Try again later.`))
                    await toast.error('An error occurred while updating task title. Try again later.');
                } else {
                    await setShouldRerender(true);
                    await toast.success('Task title updated! ✅');
                    setEditedTitle(props.task.title);
                    setModalTaskEditor(!modalTaskEditor);
                }
            } catch
                (err) {
                await setError(new Error(`An error occurred while searching for this task. Try again later.`))
                await toast.error('Error while searching for this tasks');
            }
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
            if (!res.ok) {
                await setError(new Error(`An error occurred while updating task status. Try again later.`))
                await toast.error('An error occurred while updating task status.');
            } else {
                await setShouldRerender(true);
                await toast.success('Task status updated');
            }
        } catch (err) {
            await setError(new Error(`An error occurred while updating task status. Try again later.`))
            await toast.error('An error occurred while updating task status.');
        }
    }

    const toggleModal = async () => {
        await setModal(!modal);
    }
    const toggleModalTaskEditor = async () => {
        await setModalTaskEditor(!modalTaskEditor);
    }

    const handleDeleteTask = async (taskId: string | undefined) => {
        try {
            const res = await fetch(`http://localhost:3001/todo/${taskId}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                await setError(new Error(`There was an error deleting ${taskId} task. Try again later.`));
                await toast.error('Error while deleting task :(');
            } else {
                setShouldRerender(true);
                await toast.success('Task deleted successfully!');
            }

        } catch (error) {
            await setError(new Error(`There was an error deleting ${taskId} task. Try again later.`));
            await toast.error('Error while deleting task :(');
        }
        if (error) return <ErrorPage error={error}/>
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
                        <OneTaskRemoval onClick={() => toggleModal()}/>
                        <EditTask onClick={() => toggleModalTaskEditor()} task={props.task}/>
                    </div>
                </div>
            </li>
            {/*TaskEditorModal*/}
            {modalTaskEditor && (<div className="modal__confirmTaskEditor">
                <div className="overlay"
                     onClick={toggleModalTaskEditor}
                >
                </div>
                <div className="modal-content">
                    <button className="modal-close-btn" onClick={toggleModalTaskEditor}>
                        <i className="fa fa-close"></i>
                    </button>
                    <h2>Edit Task : <i>"{props.task.title}"</i>
                    </h2>
                    <div className="modal-action-buttons">
                        <label>Title:</label>
                        <input className="modal_task_title_update"
                               type="text"
                               value={editedTitle}
                               onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <button className="modal-accept-action--btn"
                                onClick={async () => updateTaskTitle(props.task.id)}
                        >Save
                        </button>
                        <button className="modal-cancel-action-btn"
                                onClick={toggleModalTaskEditor}
                        >Cancel
                        </button>
                    </div>
                </div>
            </div>)}
            {modal && (<div className="modal__confirmTaskRemove">
                <div className="overlay"
                     onClick={toggleModal}
                >
                </div>
                <div className="modal-content">
                    <button className="modal-close-btn" onClick={toggleModal}>
                        <i className="fa fa-close"></i>
                    </button>
                    <h2>Are you sure you want to remove:
                        <i>"{props.task.title}"</i> task ?
                    </h2>
                    <p>This action cannot be undone. 🗑️</p>
                    <div className="modal-action-buttons">
                        <button className="modal-accept-action--btn"
                                onClick={async () => handleDeleteTask(props.task.id)}
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
