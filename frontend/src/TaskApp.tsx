import { useEffect, useState } from "react";
import "./TaskApp.css";
import { Spinner } from "./components/common/Spinner/Spinner";
import { NoTaskLayout } from "./components/pages/NoTaskPage/NoTaskLayout";
import { Header } from "./components/Header/Header";
import { ErrorPage } from "./components/pages/ErrorPage/ErrorPage";
import { useErrorContext } from "./context/ErrorContext";
import { useTaskListRerenderContext } from "./context/TaskListRerenderContext";
import { useTaskListContext } from "./context/TaskListContext";
import { FormValidationContextProvider } from "./context/FormValidationContext";
import { NavBar } from "./components/pages/NavMenu/NavBar";
import { useTheme } from "./context/ThemeContext";

import { BACKEND_URL } from "./utils/backend_URL";
import { TaskListPage } from "./components/pages/TaskListPage/TaskListPage";

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
          {tasksList.length === 0 ? <NoTaskLayout /> : <TaskListPage />}
        </FormValidationContextProvider>
      </div>
    </>
  );
};
