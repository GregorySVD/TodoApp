import React, {useState} from 'react';
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";
import './DeleteAllTasks.css';


export const DeleteAllTasks = () => {
    const [modal, setModal] = useState<boolean>(false);
    const {setShouldRerender} = useTaskListRerenderContext();
    const {setError} = useErrorContext();

    //delete scroll when modal open
    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const handleDeleteAllTasks = async () => {
        try {
            await fetch(`http://localhost:3001/todo/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setShouldRerender(true);
        } catch (err) {
            setError(err as Error);
            setModal(!modal);
        }
    }
    const toggleModal = () => {
        setModal(!modal);
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
