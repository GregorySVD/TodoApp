import React, {createContext} from "react";

interface FormValidationContextProps {
    FormValidation: boolean;
    setFormValidation: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormValidationContext = createContext<FormValidationContextProps>({
    FormValidation: false,
    setFormValidation: () => {
    }
});
