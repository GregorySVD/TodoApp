import React, {createContext, ReactNode, useContext, useState} from 'react';

//interface for context
interface TaskListRerenderContextType {
    shouldRerender: boolean;
    setShouldRerender: React.Dispatch<React.SetStateAction<boolean>>;
}
//context

export const TaskListRerenderContext = createContext<TaskListRerenderContextType | null>(null);

export const useTaskListRerenderContext = () => {
    const context = useContext(TaskListRerenderContext);
    if (!context) {
        throw new Error(`TaskListRerenderContext must be used within an TaskListRerenderContextProvider`)
    }
    return context;
}

interface TaskListRerenderContextProviderProps {
    children: ReactNode;
}


export const TaskListRerenderContextProvider: React.FC<TaskListRerenderContextProviderProps> = ({children}) => {
    const [shouldRerender, setShouldRerender] = useState(false);
    const contextValue: TaskListRerenderContextType = {
        shouldRerender,
        setShouldRerender,
    }

    return (
        <TaskListRerenderContext.Provider value={contextValue}>
            {children}
        </TaskListRerenderContext.Provider>
    )
}
