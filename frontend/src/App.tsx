import React from 'react';
import './App.css';
import {TaskList} from "./components/TaskList/TaskList";
import {AddForm} from "./components/AddForm/AddForm";
import './App.css'

function App() {

    return (
        <div className="App">
            <AddForm/>
            <TaskList/>
        </div>
    );
}

export default App;
