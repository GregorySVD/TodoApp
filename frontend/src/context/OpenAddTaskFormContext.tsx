import React, {createContext, ReactNode, useContext, useState} from 'react';

interface OpenAddTaskFormContextProps {
    addTaskFormIsOpen: boolean;
    setAddTaskFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpenAddTaskFormContext = createContext<OpenAddTaskFormContextProps | null>(null);

export const useOpenAddTaskFormContext = () => {
    const context = useContext(OpenAddTaskFormContext);
    if (!context) {
        throw new Error(`OpenAddTaskFormContext must be used with OpenAddTaskFormContextProvider`);
    }
    return context;
}

interface OpenAddTaskFormContextProviderProps {
    children: ReactNode;
}

export const OpenAddTaskFormContextProvider: React.FC<OpenAddTaskFormContextProviderProps> = ({children}) => {
    const [addTaskFormIsOpen, setAddTaskFormIsOpen] = useState<boolean>(false);

    const contextValue: OpenAddTaskFormContextProps = {
        addTaskFormIsOpen,
        setAddTaskFormIsOpen
    }

    return (
        <OpenAddTaskFormContext.Provider value={contextValue}>
            {children}
        </OpenAddTaskFormContext.Provider>
    )
}
