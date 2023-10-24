import React from 'react';
import { TodoEntity } from 'types';

interface Props {
    onClick: () => Promise<void>;
    task: TodoEntity;
}
export const EditTask = (props: Props) => {

    return  (<>
    <button className="EditTask__btn" onClick={() => props.onClick()}>
        <i className="fa fa-edit"></i>
    </button>

    </>);
}
