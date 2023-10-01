import React, {useEffect, useState} from "react";
import './ProgressBar.css'
import {calcPercent} from "../../utils/calcPercent";

interface Props {
    doneTask: number | null;
    allTasks: number | null;
}

export const ProgressBar = (props: Props) => {
    const [progressPercent, setProgressPercent] = useState<string>("0%");

    useEffect((): void => {
        if (!props.doneTask || !props.allTasks) {
            setProgressPercent("0%");
        } else if (props.doneTask === 0 || props.doneTask === null) {
            setProgressPercent("0%");
        } else {
            const percentValue = calcPercent(props.doneTask, props.allTasks);
            setProgressPercent(percentValue);
        }
    },[props.doneTask, props.allTasks]);

    return (
        <div className="ProgressBar__container">
            <div className="ProgressBar__progress_container">
                <div className="ProgressBar__progress" style={{width: progressPercent}}></div>
            </div>
        </div>
    );
};
