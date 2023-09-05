import React from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";
import {Btn} from "./components/common/Btn";
import {AddForm} from "./components/AddForm/AddForm";
import './App.css'

function App() {

    return (
        <div className="App">
            <AddForm/>
            <TaskList/>
            <Btn text="+Add Task"/>
        </div>
    );
}

export default App;
