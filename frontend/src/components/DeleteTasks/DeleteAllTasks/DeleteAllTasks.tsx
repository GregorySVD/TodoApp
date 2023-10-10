import React, {useState} from 'react';
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";
import './DeleteAllTasks.css';
import {toast} from "sonner";
import {ErrorPage} from "../../layouts/ErrorPage/ErrorPage";


export const DeleteAllTasks = () => {
    const [modal, setModal] = useState<boolean>(false);
    const {setShouldRerender} = useTaskListRerenderContext();
    const {setError, error} = useErrorContext();

    //delete scroll when modal open
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const handleDeleteAllTasks = async () => {
        try {
            const res = await fetch(`http://localhost:3001/todo`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!res.ok) {
                await setError(new Error(`Couldn't delete all tasks. Try again later.`));
                await toast.error(`Couldn't delete all tasks`);
            } else {
                setShouldRerender(true);
                await toast.success(`Successfully deleted all tasks`);
            }
        } catch (err) {
            await setError(new Error(`Couldn't delete all tasks. Try again later.`));
            await toast.error(`Couldn't delete all tasks`);
        }
    }
    const toggleModal = () => {
        setModal(!modal);
    }

    if (error) {
        return <ErrorPage error={error}/>;
    }

    return (
        <>
            <button onClick={toggleModal} className="DeleteAllTasks_btn">
                Delete All Tasks
            </button>
            {modal && (<div className="modal__confirmTaskRemove">
                <div className="overlay"
                     onClick={toggleModal}
                >
                </div>
                <div className="modal-content">
                    <button className="modal-close-btn" onClick={toggleModal}>
                        <i className="fa fa-close"></i>
                    </button>
                    <h2>Are you sure you want to remove all tasks? </h2>
                    <p>This action cannot be undone. 🗑️</p>
                    <div className="modal-action-buttons">
                        <button className="modal-accept-action--btn"
                                onClick={handleDeleteAllTasks}
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
