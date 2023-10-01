import React, {createContext, ReactNode, useContext, useState} from "react";

interface FormValidationContextProps {
    formIsValid: boolean;
    setFormIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormValidationContext = createContext<FormValidationContextProps | null>(null);

export const useFormValidationContext = () => {
    const context = useContext(FormValidationContext);
    if (!context) {
        throw new Error("FormValidationContext must be used within an FormValidationContextProvider");
    }
    return context;
}

interface FormValidationContextProviderProps {
    children: ReactNode;
}

export const FormValidationContextProvider: React.FC <FormValidationContextProviderProps> = ({children}) => {
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    const contextValue: FormValidationContextProps = {
        formIsValid,
        setFormIsValid,
    }

    return (
        <FormValidationContext.Provider value={contextValue}>
            {children}
        </FormValidationContext.Provider>
    )
}
