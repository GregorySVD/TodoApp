import React from 'react';
import './ClearTasksDone.css'
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";
import {useErrorContext} from "../../../context/ErrorContext";
import {ErrorPage} from "../../layouts/ErrorPage/ErrorPage";
import {toast} from "sonner";


export const ClearTasksDone = () => {

    const {setShouldRerender} = useTaskListRerenderContext();
    const {error, setError} = useErrorContext()

    const handleClearTasksDone = async (): Promise<void> => {
        try {
            const res = await fetch(`http://localhost:3001/todo/done`, {
                method: "DELETE",
            });
            if (!res.ok) {
                await setError(new Error(`There was an error during clearing tasks done. Try again later.`));
                await toast.error(`There was an error during clearing tasks done.`);
            } else {
                toast.success(`Clearing tasks done successfully! Keep it up!`);
                setShouldRerender(true);
            }
        } catch (err) {
            await setError(new Error(`There was an error during clearing tasks done. Try again later.`));
            await toast.error(`There was an error during clearing tasks done.`)
        }
    }
    if (error) return <ErrorPage error={error}/>;

    return <div className="ClearTaskDone__container">
        <button className="ClearTaskDone__btn" onClick={handleClearTasksDone}>Clear Tasks Done</button>
    </div>
}
