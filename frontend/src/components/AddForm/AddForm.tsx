import React, {SyntheticEvent, useContext, useState} from 'react';
import {TodoEntity} from 'types'
import {FetchDataContext} from "../../context/FetchDataContext.tsx";
import {Loader} from "../common/Loader/Loader";
import './AddForm.css'
import {OpenAddFormContext} from "../../context/OpenAddFormContext";

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const contextFetch = useContext(FetchDataContext);
    const contextAddForm = useContext(OpenAddFormContext);
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    if (!contextFetch) {
        throw new Error('FetchDataContext is not provided!');
    }
    const {setAddFormIsOpen, AddFormIsOpen} = contextAddForm
    const {setFetchData} = contextFetch;
    const [form, setForm] = useState<TodoEntity>({
        title: '',
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
            await console.log(id);
            setForm({
                title: '',
            })
        }
    }

    const updateForm = (key: string, value: string) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };
    const handleOpenPopup = () => {
        setAddFormIsOpen(true);

    }

    const handleClosePopup = () => {
        setAddFormIsOpen(false);
    }
    if (loading) {
        return <Loader/>
    }

    return (<div className="AddForm">

            <div className="AddForm_container">
                {!AddFormIsOpen && (<button className="AddForm__add_BTN" onClick={handleOpenPopup}
                    ><i className="fa fa-plus"></i>
                    </button>
                )}
            </div>
            <div>
                {AddFormIsOpen && (
                    <div className="AddForm__PopUpForm">
                        <button className="AddForm__close_BTN" onClick={handleClosePopup}><i className="fa fa-arrow-up"></i></button>
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
                )}
            </div>
        </div>
    )
}
