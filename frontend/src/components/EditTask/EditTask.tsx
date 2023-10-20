import React from 'react';

interface Props {
    onClick: () => Promise<void>;
}
export const EditTask = (props: Props) => {

    return  (<>
    <button className="EditTask__btn" onClick={() => props.onClick()}>
        <i className="fa fa-edit"></i>
    </button>

    </>);
}
