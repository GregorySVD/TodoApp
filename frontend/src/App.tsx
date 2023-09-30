import React, {useEffect, useState} from 'react';
import './App.css';
import {Loader} from "./components/common/Loader/Loader";
import {NoTaskLayout} from "./components/layouts/NoTaskLayout/NoTaskLayout";
import {TaskProgress} from "./components/Tasks/TaskPogress/TaskProgress";
import {Header} from "./components/layouts/Header/Header";
import {OpenAddFormContext} from "./context/OpenAddFormContext";
import {ErrorPage} from "./components/layouts/ErrorPage/ErrorPage";
import {ErrorContextProvider} from './context/ErrorContext';
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";
import {useTaskListRerenderContext} from "./context/TaskListRerenderContext";
import {TaskList} from "./components/Tasks/TaskTable/TaskList";
import {useTaskListContext} from "./context/TaskListContext";

export const App = () => {
    const useTaskListRenderContext = useTaskListRerenderContext();
    const {shouldRerender, setShouldRerender} = useTaskListRenderContext;
    const [AddFormIsOpen, setAddFormIsOpen] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const TaskListContext = useTaskListContext();
    const {tasksList, setTaskList} = TaskListContext;

    useEffect(() => {
        if (!shouldRerender) {
            (async () => {
                try {
                    const res = await fetch(`http://localhost:3001/todo`);
                    if (!res.ok) {
                        new Error('Failed to fetch data, try again later');
                    }
                    const result = await res.json();
                    setTaskList(result);
                } catch (err) {
                    setError(err as Error);
                }
            })();
        }
        setShouldRerender(false);
        setError(null);
    }, [shouldRerender, setShouldRerender, setTaskList]);

    if (error) {
        return <ErrorPage error={error}/>
    }
    if (tasksList === null) {
        return <Loader/>
    }

    /*@TODO implement ErrorContext in other Components*/
    /*@TODO change other context to work better*/
    return (
        <ErrorContextProvider>
            <div className="App">
                <Header/>
                    <OpenAddFormContext.Provider value={{AddFormIsOpen, setAddFormIsOpen}}>
                        {(tasksList.length === 0) ? <NoTaskLayout/> :
                            <div>
                                <TaskProgress/>
                                <TaskList/>
                                <AddTaskForm/>
                            </div>
                        }
                    </OpenAddFormContext.Provider>
            </div>
        </ErrorContextProvider>
    );
};
