import React, {SyntheticEvent, useState} from 'react';
import {TodoEntity} from 'types';
import {Loader} from "../common/Loader/Loader";
import {AddTaskFormTitleInput} from "./AddTaskFormTitleInput/AddTaskFormTitleInput";
import {useFormValidationContext} from "../../context/FormValidationContext";
import {useErrorContext} from "../../context/ErrorContext";
import {ErrorPage} from "../layouts/ErrorPage/ErrorPage";
import {SubmitTaskButton} from "./SubmitTaskButton/SubmitTaskButton";
import './AddTaskForm.css'
import {AddTaskFormCloser} from "./AddTaskFormCloser/AddTaskFormCloser";
import {useOpenAddTaskFormContext} from "../../context/OpenAddTaskFormContext";
import {AddTaskFormOpener} from "./AddTaskFormOpener/AddTaskFormOpener";
import {useTaskListRerenderContext} from "../../context/TaskListRerenderContext";

export const AddTaskForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState<TodoEntity>({
        title: '',
    });

    const {addTaskFormIsOpen, setAddTaskFormIsOpen} = useOpenAddTaskFormContext();
    const {setFormIsValid} = useFormValidationContext();
    const {setShouldRerender} = useTaskListRerenderContext();
    const {error, setError} = useErrorContext();

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
            if (!res.ok) {
                new Error(`Sorry there was an error while adding new task, try again later.`);
            }
            const data = await res.json();
            setId(data.id);
            setShouldRerender(true);
            console.log(`${id} Task added successfully `)
        } catch (err) {
            setError(err as Error);
        } finally {
            setFormIsValid(false)
            setLoading(false);
            setForm({
                title: '',
            })
        }
    }
    const handleCloseForm = () => {
        setAddTaskFormIsOpen(false);
    }
    const handleOpenForm = () => {
        setAddTaskFormIsOpen(true);
    }

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <ErrorPage error={error}/>
    }

    return (!addTaskFormIsOpen)
        ?
        <AddTaskFormOpener onClick={handleOpenForm}/>
        :
        (

            <div className="AddTaskForm__container">
                <form className="AddTaskForm__form" onSubmit={saveTodo}>
                    <AddTaskFormTitleInput
                        placeholder={"Title"}
                        setMaxLength={150}
                        setMinLength={3}
                        updateFormEvent={updateForm}
                    />
                    <SubmitTaskButton onClick={saveTodo}/>
                </form>
                <AddTaskFormCloser onClick={handleCloseForm}/>
            </div>
        )
}
