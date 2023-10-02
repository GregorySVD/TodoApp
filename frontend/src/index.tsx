import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {TaskApp} from './TaskApp';
import {TaskListRerenderContextProvider} from "./context/TaskListRerenderContext";
import {TaskListContextProvider} from "./context/TaskListContext";
import {ErrorContextProvider} from "./context/ErrorContext";
import {OpenAddTaskFormContextProvider} from "./context/OpenAddTaskFormContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
        <React.StrictMode>
            <ErrorContextProvider>
                <OpenAddTaskFormContextProvider>
                    <TaskListRerenderContextProvider>
                        <TaskListContextProvider>
                                <TaskApp/>
                        </TaskListContextProvider>
                    </TaskListRerenderContextProvider>
                </OpenAddTaskFormContextProvider>
            </ErrorContextProvider>
        </React.StrictMode>
);
reportWebVitals();
