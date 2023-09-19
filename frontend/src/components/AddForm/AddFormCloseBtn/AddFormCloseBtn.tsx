import React from 'react';
import './AddFormCloseBtn.css'

interface Props {
    action: () => void;
}

export const AddFormCloseBtn = (props: Props) => {

    return (
        <div className="AddForm_container">
        <button className="AddForm__close_BTN" onClick={props.action}>
            <i
                className="fa fa-arrow-up"></i>
        </button>
    </div>
    )
}
