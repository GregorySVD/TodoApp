import React, {useEffect, useState} from "react";
import './ProgressBar.css'

interface Props {
    doneTask: number | null;
    allTasks: number | null;
}

export const ProgressBar = (props: Props) => {
    const [progressPercent, setProgressPercent] = useState<string>("0%");

    useEffect(() => {
        if(!props.doneTask || !props.allTasks) {
            return;
        }
        if(props.doneTask===0) {
            setProgressPercent("0");
        }
        setProgressPercent(calcPercent(props.doneTask, props.allTasks))
    }, [props.doneTask, props.allTasks])
//@TODO there is and error in return progressPercent to 0 fix it
    const calcPercent = (TaskDone: number, AllTasks: number): string => {
        return (TaskDone/AllTasks)*100 + '%'
    }
    return (
        <div className="ProgressBar__container">
            <h4>{props.doneTask}/{props.allTasks}</h4>
            <div className="progress-container">
                <div className="progress" style={{width: progressPercent}}></div>
            </div>
        </div>
    )
}
