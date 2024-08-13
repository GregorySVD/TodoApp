import { ChangeEvent } from "react";
import "./TaskDoneStatusCheckbox.css";

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
    <label className="TaskDoneStatusCheckbox__label" title={!props.status ? "Mark it done" : "Make it undone"}>
      <input checked={props.status} type="checkbox" onChange={handleCheckboxChange} />
      <div className="checkmark"></div>
      <span className="hover-icon">
        <i className="fa fa-check "></i>
      </span>
    </label>
  );
};
