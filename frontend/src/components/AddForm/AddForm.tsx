import React, {SyntheticEvent, useContext, useState} from 'react';
import {Btn} from "../common/Btn";
import {TodoEntity} from 'types'
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import {Loader} from "../common/Loader/Loader";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const context = useContext(FetchDataContext);

    if (!context) {
        throw new Error('FetchDataContext is not provided!');
    }

    const {fetchData, setFetchData} = context;

    const [form, setForm] = useState<TodoEntity>({
        title: '',
        description: null,
    });
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
            <form className="AddForm" onSubmit={saveTodo}>
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
                <label>
                    <input
                        type="text"
                        className="AddForm_input_description" placeholder="Add description to task..."/>
                </label>
                <Btn text="+Add Task"/>
            </form>
        </div>
    )
}
