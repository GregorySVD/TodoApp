import React from 'react';
import './ClearTasksDone.css'
import {useTaskListRerenderContext} from "../../../context/TaskListRerenderContext";


export const ClearTasksDone = () => {

    const useTaskListRenderContext = useTaskListRerenderContext();
    const {setShouldRerender} = useTaskListRenderContext;

    const handleClearTasksDone = async (): Promise<void> => {
        try {
            await fetch(`http://localhost:3001/todo/done`, {
                method: "DELETE",
            });
            await setShouldRerender(true);
        } catch (err) {
            console.error(err);
        }
    }

    return <div>
        <button className="ClearTaskDone__btn" onClick={handleClearTasksDone}>Clear Tasks Done</button>
    </div>
}
