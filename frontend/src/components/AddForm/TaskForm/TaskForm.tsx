import React, {SyntheticEvent, useContext, useState} from 'react';
import {TodoEntity} from 'types';
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";
import {Loader} from "../../common/Loader/Loader";
import {FormInput} from "../FormInput/FormInput";
import {FormValidationContext} from "../../../context/FormValidationContext";
import {useErrorContext} from "../../../context/ErrorContext";
import {ErrorPage} from "../../layouts/ErrorPage/ErrorPage";


export const TaskForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const contextError = useErrorContext();
    const {error, setError} = contextError;

    const [form, setForm] = useState<TodoEntity>({
        title: '',
    });

    const inputValidation = useContext(FormValidationContext);
    const contextFetch = useContext(FetchDataContext);
    if (!contextFetch) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setFetchData} = contextFetch;
    if (loading) {
        return <Loader/>
    }


    const {FormValidation, setFormValidation} = inputValidation;


    const updateForm = (key: string, value: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            [key]: value,
        }));
        console.log(id);
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
            if (!res.ok) {
                new Error(`Sorry there was an error while adding new task, try again later.`);
            }

            const data = await res.json();
            setId(data.id);
            setFetchData(true);
        } catch (e) {
            setError(e as Error);

        } finally {
            setFormValidation(false)
            setLoading(false);
            setForm({
                title: '',
            })
        }
    }
    if (error) {
        return <ErrorPage error={error}/>
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
                            disabled={!FormValidation}
                            onClick={saveTodo}>
                        <span>Add New Task</span>
                    </button>
                </div>
            </form>
        </div>

    )
}
