import React, {useEffect} from 'react';
import './App.css';
import {Loader} from "./components/common/Loader/Loader";
import {NoTaskLayout} from "./components/layouts/NoTaskLayout/NoTaskLayout";
import {TaskProgress} from "./components/Tasks/TaskPogress/TaskProgress";
import {Header} from "./components/layouts/Header/Header";
import {ErrorPage} from "./components/layouts/ErrorPage/ErrorPage";
import {useErrorContext} from './context/ErrorContext';
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";
import {useTaskListRerenderContext} from "./context/TaskListRerenderContext";
import {TaskList} from "./components/Tasks/TaskTable/TaskList";
import {useTaskListContext} from "./context/TaskListContext";
import {FormValidationContextProvider} from "./context/FormValidationContext";

export const App = () => {

    const {shouldRerender, setShouldRerender} = useTaskListRerenderContext()
    const {error, setError, clearError} = useErrorContext()
    const {tasksList, setTaskList} = useTaskListContext();

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
        clearError();
    }, [shouldRerender, setShouldRerender, setTaskList, setError, clearError]);

    if (error) {
        return <ErrorPage error={error}/>
    }
    if (tasksList === null) {
        return <Loader/>
    }
    /*@TODO implement ErrorContext in other Components*/
    return (
        <div className="App">
            <Header/>
            <FormValidationContextProvider>
                {(tasksList.length === 0) ? <NoTaskLayout/> :
                    <div>
                        <TaskProgress/>
                        <TaskList/>
                        <AddTaskForm/>
                    </div>
                }
            </FormValidationContextProvider>
        </div>
    );
};
