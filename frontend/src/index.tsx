import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {TaskApp} from './TaskApp';
import {TaskListRerenderContextProvider} from "./context/TaskListRerenderContext";
import {TaskListContextProvider} from "./context/TaskListContext";
import {ErrorContextProvider} from "./context/ErrorContext";
import {OpenAddTaskFormContextProvider} from "./context/OpenAddTaskFormContext";
import {Toaster} from "sonner";
import {ThemeContextProvider} from "./context/ThemeContext";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeContextProvider>
                <ErrorContextProvider>
                    <OpenAddTaskFormContextProvider>
                        <TaskListRerenderContextProvider>
                            <TaskListContextProvider>
                                <Toaster richColors/>
                                <TaskApp/>
                            </TaskListContextProvider>
                        </TaskListRerenderContextProvider>
                    </OpenAddTaskFormContextProvider>
                </ErrorContextProvider>
            </ThemeContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();
