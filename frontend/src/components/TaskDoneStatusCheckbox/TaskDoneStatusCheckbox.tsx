import React, {ChangeEvent} from 'react';
import './TaskDoneStatusCheckbox.css'

interface Props {
    status: boolean;
    onChange: (checked: boolean) => void;
}

export const TaskDoneStatusCheckbox = (props: Props) => {

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.target.checked;
        props.onChange(isDone);
    };

    return (
        <label className="TaskDoneStatusCheckbox__label">
            <input
                checked={props.status}
                type="checkbox"
                onChange={handleCheckboxChange}/>
            <div className="checkmark"></div>
        </label>
    )
}
