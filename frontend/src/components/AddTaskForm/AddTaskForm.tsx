import React, { SyntheticEvent, useState } from "react";
import { TodoEntity } from "../../types/todo.entity";
import { Spinner } from "../common/Spinner/Spinner";
import { AddTaskFormTitleInput } from "./AddTaskFormTitleInput/AddTaskFormTitleInput";
import { useFormValidationContext } from "../../context/FormValidationContext";
import { useErrorContext } from "../../context/ErrorContext";
import { ErrorPage } from "../layouts/ErrorPage/ErrorPage";
import { SubmitTaskButton } from "./SubmitTaskButton/SubmitTaskButton";
import "./AddTaskForm.css";
import { AddTaskFormCloser } from "./AddTaskFormCloser/AddTaskFormCloser";
import { useOpenAddTaskFormContext } from "../../context/OpenAddTaskFormContext";
import { AddTaskFormOpener } from "./AddTaskFormOpener/AddTaskFormOpener";
import { useTaskListRerenderContext } from "../../context/TaskListRerenderContext";
import { toast } from "sonner";

export const AddTaskForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<TodoEntity>({
    title: "",
  });

  const { addTaskFormIsOpen, setAddTaskFormIsOpen } = useOpenAddTaskFormContext();
  const { setFormIsValid } = useFormValidationContext();
  const { setShouldRerender } = useTaskListRerenderContext();
  const { error, setError } = useErrorContext();

  const updateForm = (key: string, value: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const saveTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
        }),
      });
      if (!res.ok) {
        await setError(new Error(`Sorry there was an error while adding new task, try again later.`));
        await toast.error(`Sorry there was an error while adding new task, try again later.`);
      } else {
        await toast.success(`Task added successfully`);
        await res.json();
        await setShouldRerender(true);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setFormIsValid(false);
      setLoading(false);
      setForm({
        title: "",
      });
    }
  };
  const handleCloseForm = () => {
    setAddTaskFormIsOpen(false);
  };
  const handleOpenForm = () => {
    setAddTaskFormIsOpen(true);
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorPage error={error} />;
  }

  return !addTaskFormIsOpen ? (
    <AddTaskFormOpener onClick={handleOpenForm} />
  ) : (
    <div className="AddTaskForm__container">
      <form className="AddTaskForm__form" onSubmit={saveTodo}>
        <AddTaskFormTitleInput placeholder={"Title"} setMaxLength={150} setMinLength={3} updateFormEvent={updateForm} />
        <SubmitTaskButton onClick={saveTodo} />
      </form>
      <AddTaskFormCloser onClick={handleCloseForm} />
    </div>
  );
};
