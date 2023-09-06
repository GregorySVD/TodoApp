import React, { useEffect, useState} from 'react';
import {TodoEntity} from "types"
import {Btn} from "../common/Btn";
import {TaskContext} from "../../context/TaskContext";
import {Loader} from "../common/Loader/Loader";




export const TaskList = () => {
    const [tasks, setTask] = useState<TodoEntity[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/todo`)
            const data = await res.json();
            setTask(data);
        })();
    }, []);
    if(tasks.length === 0) {
        return <Loader/>
    }
    return (

        <div className="Task-List__Container">
            <TaskContext.Provider value={{tasks}}>
                <h1>Recent Tasks</h1>
                <ol>
                    {tasks.map((task) => (
                        <li key={task.id}>{task.title}<Btn text="✅"/><Btn text="🗑️"/></li>
                    ))}
                </ol>
            </TaskContext.Provider>
        </div>

    )
}
