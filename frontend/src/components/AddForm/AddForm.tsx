import React, {SyntheticEvent, useContext, useState} from 'react';
import {Btn} from "../common/Btn";
import {TodoEntity} from 'types'
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import {Loader} from "../common/Loader/Loader";
import './AddForm.css'
import {ClearTasksDone} from "../TaskList/ClearTasksDone";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const context = useContext(FetchDataContext);

    if (!context) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setFetchData} = context;
    const [form, setForm] = useState<TodoEntity>({
        title: '',
    });
    const saveTodo = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await console.log(form)
            const res = await fetch(`http://localhost:3001/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                })
            })

            const data = await res.json();
            await console.log(data);
            setId(data.id);
            setFetchData(true);
        } finally {
            setLoading(false);
            await console.log(id);
        }

    }

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="AddForm_container">
            <form className="AddForm__container" onSubmit={saveTodo}>
                <label>
                    <input
                        type="text"
                        className="AddForm_input_title"
                        placeholder="Add a new task..."
                        name="title"
                        required
                        maxLength={150}
                        value={form.title}
                        onChange={e => updateForm('title', e.target.value)}
                    />
                </label>
                <Btn text="+Add Task"/>
            </form>
        </div>
    )
}
