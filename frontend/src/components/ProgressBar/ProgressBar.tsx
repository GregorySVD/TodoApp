import React, {useEffect} from "react";
import './ProgressBar.css'

interface Props {
    doneTask: number | null;
    allTasks: number | null;
}

export const ProgressBar = (props: Props) => {
    useEffect(() => {

    }, [props.doneTask, props.allTasks])

    return <div>
        <p>{props.doneTask}/{props.allTasks}</p>
        <div className="progress-container"></div>
        <div className="progress">
        </div>
    </div>
}
