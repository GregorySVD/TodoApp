import React, {ChangeEvent}from 'react';
import './CheckBox.css'

interface Props {
    status: boolean;
    onChange: (checked: boolean) => void;
}
export const CheckBox = (props: Props) => {

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        props.onChange(isChecked);
    };

    return (<div>
        <label className="container">
            <input
                checked={props.status}
                type="checkbox"
                onChange={handleCheckboxChange}/>
                <div className="checkmark"></div>
        </label>
    </div>
)
}
