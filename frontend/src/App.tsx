import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";
import {AddForm} from "./components/AddForm/AddForm";
import {TaskContext} from "./context/TaskContext";
import {TodoEntity} from 'types'
import {Loader} from "./components/common/Loader/Loader";
import {FetchDataContext} from "./context/FetchDataContext.tsx";
import {NoTaskLayout} from "./components/layouts/NoTaskLayout/NoTaskLayout";
import {TaskProgress} from "./components/TaskPogress/TaskProgress";
import {Header} from "./components/layouts/Header/Header";

function App() {

    const [tasks, setTask] = useState<TodoEntity[] | null>(null);
    const [fetchData, setFetchData] = useState(true);

    useEffect(() => {
        if (fetchData) {
            (async () => {
                const res = await fetch(`http://localhost:3001/todo`)
                const data = await res.json();
                setTask(data);
            })();
        }
        setFetchData(false)
    }, [fetchData]);

    if (tasks === null) {
        return <Loader/>
    }


    return (
        <div className="App">
            <Header></Header>
            <FetchDataContext.Provider value={{fetchData, setFetchData}}>
                <TaskContext.Provider value={{tasks}}>
                    {(tasks.length === 0) ? <NoTaskLayout/> :
                        <div>
                            <TaskProgress/>
                            <TaskList/>
                            <AddForm/>
                        </div>
                    }
                </TaskContext.Provider>
            </FetchDataContext.Provider>
        </div>

    );
}

export default App;
