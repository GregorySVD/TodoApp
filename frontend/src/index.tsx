import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from './App';
import {TaskListRerenderContextProvider} from "./context/TaskListRerenderContext";
import {TaskListContextProvider} from "./context/TaskListContext";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>

        <TaskListRerenderContextProvider>
            <TaskListContextProvider>
                <App/>
            </TaskListContextProvider>
        </TaskListRerenderContextProvider>

    </React.StrictMode>
);
reportWebVitals();
