import React from "react";
import { TodoPostgresEntity } from "../../types/postgres.todo.entity";
import "./EditTask.css";

interface Props {
  onClick: () => Promise<void>;
  task: TodoPostgresEntity;
}
export const EditTask = (props: Props) => {
  return (
    <>
      <button className="EditTask__btn" onClick={() => props.onClick()}>
        <i className="fa fa-edit" title="Edit"></i>
      </button>
    </>
  );
};
