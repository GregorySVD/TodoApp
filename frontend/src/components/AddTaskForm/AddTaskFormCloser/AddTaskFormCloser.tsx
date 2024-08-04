import React from "react";
import "./AddTaskFormCloser.css";

interface Props {
  onClick: () => void;
}

export const AddTaskFormCloser = (props: Props) => {
  return (
    <button className="AddTaskFormCloser__close_Btn" onClick={props.onClick}>
      <i className="fa fa-arrow-up"></i>
    </button>
  );
};
