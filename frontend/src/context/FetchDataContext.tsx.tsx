import React, {createContext} from 'react';

interface FetchDataContextProps {
    fetchData: boolean;
    setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FetchDataContext = createContext<FetchDataContextProps | null>(null);
