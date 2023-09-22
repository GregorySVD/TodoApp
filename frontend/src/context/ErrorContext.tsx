import React, {createContext, ReactNode, useContext, useState} from 'react';

//interface for context
interface ErrorContextType {
    error: Error | null;
    setError: (error: Error | null) => void;
    clearError: () => void;
}

//context
export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

//check if context exists

export const useErrorContext = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useErrorContext must be used within an ErrorContextProvider");
    }
    return context;
}

interface ErrorContextProviderProps {
    children: ReactNode;
}

//context provider component

export const ErrorContextProvider: React.FC<ErrorContextProviderProps> = ({children}) => {
    const [error, setError] = useState<Error|null >(null);

    const clearError = () => {
        setError(null);
    }

    const contextValue:ErrorContextType = {
        error,
        setError,
        clearError

    }
    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );

}
