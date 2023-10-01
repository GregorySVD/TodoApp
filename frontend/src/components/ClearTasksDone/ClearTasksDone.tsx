import React from 'react';
import './ClearTasksDone.css'
import {useTaskListRerenderContext} from "../../context/TaskListRerenderContext";
import {useErrorContext} from "../../context/ErrorContext";
import {ErrorPage} from "../layouts/ErrorPage/ErrorPage";


export const ClearTasksDone = () => {

    const {setShouldRerender} = useTaskListRerenderContext();
    const {error, setError} = useErrorContext()

    const handleClearTasksDone = async (): Promise<void> => {
        try {
            await fetch(`http://localhost:3001/todo/done`, {
                method: "DELETE",
            });

        } catch (err) {
            setError(new Error(`There was an error during clearing tasks done. Try again later.`));
        } finally {
            setShouldRerender(true);
        }
    }
    if (error) return <ErrorPage error={error}/>;

    return <div className="ClearTaskDone__container">
        <button className="ClearTaskDone__btn" onClick={handleClearTasksDone}>Clear Tasks Done</button>
    </div>
}
