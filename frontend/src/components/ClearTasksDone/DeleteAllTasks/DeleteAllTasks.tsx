import React from 'react';
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";

// @Todo: Create popup to confirm cancellation of all tasks. Read about react-modal.
export const DeleteAllTasks = () => {

    const {setShouldRerender} = useTaskListRerenderContext();
    const {setError} = useErrorContext();

    const handleDeleteAllTasks = async () => {
        try {
            await fetch(`http://localhost:3001/todo/`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setShouldRerender(true);
        } catch (err) {
            setError(err as Error);
        }
    }

    return (
        <button onClick={handleDeleteAllTasks}>Delete All Tasks</button>
    )
}
