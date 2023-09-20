import React, {SyntheticEvent, useContext, useState} from 'react';
import { TodoEntity } from 'types';
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";
import {Loader} from "../../common/Loader/Loader";


export const TaskForm = () => {

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const contextFetch = useContext(FetchDataContext);

    const [form, setForm] = useState<TodoEntity>({
        title: '',
    });

    if (!contextFetch) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setFetchData} = contextFetch;

    if (loading) {
        return <Loader/>
    }

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const saveTodo = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
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
            setId(data.id);
            setFetchData(true);
        } finally {
            setLoading(false);
            await console.log(id);
            setForm({
                title: '',
            })
        }
    }

    return (
        <div>
            <form className="AddForm__form" onSubmit={saveTodo}>
                <label>
                    <div className="AddForm__input_group">
                        <input
                            type="text" className="AddForm_input_title"
                            name="title"
                            required
                            maxLength={150}
                            value={form.title}
                            onChange={e => updateForm('title', e.target.value)}
                        />
                        <label htmlFor="Title">Title</label>
                    </div>
                </label>
                <div className="AddForm__add_task_BTN_container">
                    <button className="AddForm__add_task_BTN"
                            onClick={() => updateForm}><span>Add New Task</span></button>
                </div>
            </form>
        </div>
    )
}
