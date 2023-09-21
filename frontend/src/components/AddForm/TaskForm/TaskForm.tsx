import React, {SyntheticEvent, useContext, useState} from 'react';
import {TodoEntity} from 'types';
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";
import {Loader} from "../../common/Loader/Loader";
import {FormInput} from "../FormInput";


export const TaskForm = () => {

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState<TodoEntity>({
        title: '',
        description: '',
    });


    const contextFetch = useContext(FetchDataContext);
    if (!contextFetch) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setFetchData} = contextFetch;
    if (loading) {
        return <Loader/>
    }


    const updateForm = (key: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
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
            setForm({
                title: '',
            })
        }
    }

    return (
        <div className="TaskForm__container">
            <form className="AddForm__form" onSubmit={saveTodo}>
                <FormInput
                    name={"title"}
                    type={'text'}
                    placeholder={"Title"}
                    setMaxLength={150}
                    setMinLength={3}
                    updateFormEvent={updateForm}
                />
                <div className="AddForm__add_task_BTN_container">
                    <button className="AddForm__add_task_BTN"
                            onClick={saveTodo}><span>Add New Task</span></button>
                </div>
            </form>
        </div>
    )
}
