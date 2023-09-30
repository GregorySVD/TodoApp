import React, {SyntheticEvent, useContext, useState} from 'react';
import {TodoEntity} from 'types';
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import {Loader} from "../common/Loader/Loader";
import {AddTaskFormTitleInput} from "./AddTaskFormTitleInput/AddTaskFormTitleInput";
import {FormValidationContext} from "../../context/FormValidationContext";
import {useErrorContext} from "../../context/ErrorContext";
import {ErrorPage} from "../layouts/ErrorPage/ErrorPage";
import {SubmitTaskButton} from "./SubmitTaskButton/SubmitTaskButton";
import './AddTaskForm.css'
import {AddTaskFormCloser} from "./AddTaskFormCloser/AddTaskFormCloser";
import {OpenAddFormContext} from "../../context/OpenAddFormContext";
import {AddTaskFormOpener} from "./AddTaskFormOpener/AddTaskFormOpener";
// @TODO FINISH THis CODE

export const AddTaskForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const contextError = useErrorContext();
    const {error, setError} = contextError;
    const [form, setForm] = useState<TodoEntity>({
        title: '',
    });
    const [FormValidation, setFormValidation] = useState(false);

    const contextAddForm = useContext(OpenAddFormContext);
    const {AddFormIsOpen, setAddFormIsOpen} = contextAddForm

    const contextFetch = useContext(FetchDataContext);
    if (!contextFetch) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setFetchData} = contextFetch;


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
            setFetchData(true);
            console.log(`${id} Task added successfully `)
        } catch (err) {
            setError(err as Error);

        } finally {
            setFormValidation(false)
            setLoading(false);
            setForm({
                title: '',
            })
        }
    }
    const handleCloseForm = () => {
        setAddFormIsOpen(false);
    }
    const handleOpenPopup = () => {
        setAddFormIsOpen(true);
    }

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <ErrorPage error={error}/>
    }

    return (!AddFormIsOpen)
        ?
        <AddTaskFormOpener onClick={handleOpenPopup}/>
        :
        (
            <FormValidationContext.Provider value={{FormValidation, setFormValidation}}>
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
            </FormValidationContext.Provider>
        )
}
