import React from 'react';
import './AddFormOpenBtn.css'



interface Props {
    action: () => void;
}

export const AddFormOpenBtn = (props: Props) => {
    return (
        <div className="AddForm_container_close">
            <button className="AddForm__Open_BTN" onClick={props.action}
                ><i className="fa fa-plus"></i>
                </button>
        </div>
    )
}
