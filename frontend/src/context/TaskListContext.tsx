import React, {createContext, ReactNode, useContext, useState} from "react";
import { TodoEntity } from "types";

interface TaskListContextProps {
    tasksList: TodoEntity[];
    setTaskList: React.Dispatch<React.SetStateAction<TodoEntity[]>>
}

export const TaskListContext = createContext<TaskListContextProps | null>(null);

export const useTaskListContext = () => {
    const context = useContext(TaskListContext);
    if(!context) {
        throw new Error (`TaskListContext must be used with TaskListContextProvider`);
    }
    return context;
}
interface TaskListContextProviderProps {
    children: ReactNode;
}
export const TaskListContextProvider: React.FC<TaskListContextProviderProps> =({children}) => {

    const [tasksList, setTaskList] = useState<TodoEntity[]>([])

    const contextValue:TaskListContextProps = {
        tasksList,
        setTaskList
    }

    return (
        <TaskListContext.Provider value={contextValue}>
            {children}
        </TaskListContext.Provider>
    )
}
