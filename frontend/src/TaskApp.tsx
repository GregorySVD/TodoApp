import { useEffect, useState } from "react";
import "./TaskApp.css";
import { Spinner } from "./components/common/Spinner/Spinner";
import { NoTaskLayout } from "./components/layouts/NoTaskLayout/NoTaskLayout";
import { TaskProgress } from "./components/TasksList/TaskPogress/TaskProgress";
import { Header } from "./components/layouts/Header/Header";
import { ErrorPage } from "./components/layouts/ErrorPage/ErrorPage";
import { useErrorContext } from "./context/ErrorContext";
import { AddTaskForm } from "./components/AddTaskForm/AddTaskForm";
import { useTaskListRerenderContext } from "./context/TaskListRerenderContext";
import { TaskList } from "./components/TasksList/TaskList";
import { useTaskListContext } from "./context/TaskListContext";
import { FormValidationContextProvider } from "./context/FormValidationContext";
import { NavBar } from "./components/layouts/NavMenu/NavBar";
import { useTheme } from "./context/ThemeContext";

import { BACKEND_URL } from "./utils/backend_URL";

export const TaskApp = () => {
  const { shouldRerender, setShouldRerender } = useTaskListRerenderContext();
  const { error, setError, clearError } = useErrorContext();
  const { tasksList, setTaskList } = useTaskListContext();
  const [loading, setLoading] = useState<boolean>(true);

  const { darkTheme } = useTheme();

  useEffect(() => {
    if (!shouldRerender) {
      (async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/postgres`);

          if (!res.ok) {
            setError(new Error(`Failed to load tasks from server. Please try again later.`));
          }
          const result = await res.json();
          setTaskList(result);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      })();
    }
    setShouldRerender(false);
    clearError();
  }, [shouldRerender, setShouldRerender, setTaskList]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <NavBar />
      <div className={`TaskAppContainer ${darkTheme ? `dark-theme` : ""}`}>
        <Header />
        <FormValidationContextProvider>
          {tasksList.length === 0 ? (
            <NoTaskLayout />
          ) : (
            <div className="TaskList_loaded_content">
              <TaskProgress />
              <TaskList />
              <AddTaskForm />
            </div>
          )}
        </FormValidationContextProvider>
      </div>
    </>
  );
};
