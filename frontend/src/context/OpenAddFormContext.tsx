import React, {createContext} from 'react';

interface OpenAddFormContextProps {
    AddFormIsOpen: boolean;
    setAddFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const OpenAddFormContext = createContext<OpenAddFormContextProps>({
    AddFormIsOpen: false,
    setAddFormIsOpen: () => {}
});
