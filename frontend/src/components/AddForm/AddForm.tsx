import React, {SyntheticEvent, useState} from 'react';
import {Btn} from "../common/Btn";
import {TodoEntity} from 'types'

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');


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
        return <h1>Loading...</h1>
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
