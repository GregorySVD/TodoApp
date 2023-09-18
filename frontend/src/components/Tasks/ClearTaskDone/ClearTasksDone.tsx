import React from 'react';
import {Btn} from "../../common/Btn";
import {Loader} from "../../common/Loader/Loader";
import './ClearTasksDone.css'
import {FetchDataContext} from "../../../context/FetchDataContext.tsx";

export const ClearTasksDone = () => {
    const contextFetch = React.useContext(FetchDataContext);

    if (!contextFetch)
        return <Loader/>;
    const {setFetchData} = contextFetch;

    const handleClearTasksDone = async (): Promise<void> => {
        try {
            await fetch(`http://localhost:3001/todo/done`, {
                method: "DELETE",
            });
            await setFetchData(true);
        } catch (err) {
            console.error(err);
        }
    }

    return <div>
        <Btn text="Clear Done Todos" className="ClearTaskDone__btn" onClick={handleClearTasksDone}/>
    </div>
}
