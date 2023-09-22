import React, {useEffect, useState} from 'react';
import './App.css';
import {AddTaskForm} from "./components/AddForm/AddTaskForm";
import {TaskContext} from "./context/TaskContext";
import {TodoEntity} from 'types'
import {Loader} from "./components/common/Loader/Loader";
import {FetchDataContext} from "./context/FetchDataContext.tsx";
import {NoTaskLayout} from "./components/layouts/NoTaskLayout/NoTaskLayout";
import {TaskProgress} from "./components/Tasks/TaskPogress/TaskProgress";
import {Header} from "./components/layouts/Header/Header";
import {TaskList} from "./components/Tasks/TaskTable/TaskList";
import {OpenAddFormContext} from "./context/OpenAddFormContext";
import {ErrorPage} from "./components/layouts/ErrorPage/ErrorPage";
import {ErrorContextProvider} from './context/ErrorContext';

export const App = () => {

    const [tasks, setTask] = useState<TodoEntity[] | null>(null);
    const [fetchData, setFetchData] = useState(true);
    const [AddFormIsOpen, setAddFormIsOpen] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (fetchData) {
            (async () => {
                try {
                    const res = await fetch(`http://localhost:3001/todo`);
                    if (!res.ok) {
                        new Error('Failed to fetch data, try again later');
                    }
                    const data = await res.json();
                    setTask(data);
                } catch (err) {
                    setError(err as Error);
                }
            })();
        }
        setFetchData(false);
    }, [fetchData]);

    if (error) {
        return <ErrorPage error={error}/>
    }
    if (tasks === null) {
        return <Loader/>
    }

    /*@TODO implement ErrorContext in other Components*/
    /*@TODO change other context to work better*/
    return (
        <ErrorContextProvider>
            <div className="App">
                <Header/>
                <FetchDataContext.Provider value={{fetchData, setFetchData}}>
                    <TaskContext.Provider value={{tasks}}>
                        <OpenAddFormContext.Provider value={{AddFormIsOpen, setAddFormIsOpen}}>
                            {(tasks.length === 0) ? <NoTaskLayout/> :
                                <div>
                                    <TaskProgress/>
                                    <TaskList/>
                                    <AddTaskForm/>
                                </div>
                            }
                        </OpenAddFormContext.Provider>
                    </TaskContext.Provider>
                </FetchDataContext.Provider>
            </div>
        </ErrorContextProvider>
    );
};
