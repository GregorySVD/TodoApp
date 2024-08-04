import React, { createContext, ReactNode, useContext, useState } from "react";
import { TodoEntity } from "../types/todo.entity";
import { TodoPostgresEntity } from "src/types/postgres.todo.entity";

interface TaskListContextProps {
  tasksList: TodoPostgresEntity[];
  setTaskList: React.Dispatch<React.SetStateAction<TodoPostgresEntity[]>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

export const TaskListContext = createContext<TaskListContextProps | null>(null);

export const useTaskListContext = () => {
  const context = useContext(TaskListContext);
  if (!context) {
    throw new Error(`TaskListContext must be used with TaskListContextProvider`);
  }
  return context;
};

interface TaskListContextProviderProps {
  children: ReactNode;
}

export const TaskListContextProvider: React.FC<TaskListContextProviderProps> = ({ children }) => {
  const [tasksList, setTaskList] = useState<TodoPostgresEntity[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const contextValue: TaskListContextProps = {
    tasksList,
    setTaskList,
    error,
    setError,
  };

  return <TaskListContext.Provider value={contextValue}>{children}</TaskListContext.Provider>;
};
