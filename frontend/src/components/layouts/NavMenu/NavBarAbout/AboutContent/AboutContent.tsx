import React from "react";
import './AboutContent.css'
import {useTheme} from "../../../../../context/ThemeContext";

interface Props {
    onClick: () => void;
}

export const AboutContent = (props: Props) => {
    const {darkTheme} = useTheme();

    return (
        <div className="nav_about">
            <div className="overlay"
                 onClick={props.onClick}
            >
            </div>
            <div className={darkTheme ?"about-content dark-theme" : "about-content"}>
                <button className="about-content-close-btn" onClick={props.onClick}>
                    <i className="fa fa-close"></i>
                </button>
                <h2 className="about-content-header"><i className="fa fa-check"></i> TodoApp - MegaK Final Project</h2>
                <p className="about-content-description">
                    TodoApp is a simple task manager written as a final project for the MegaK course. The application allows users to add, delete, edit, and mark tasks as completed.
                </p>
                <h3 className="about-content-features"><i className="fa fa-gears"></i> Features </h3>
                <ul className="about-content-features_list">
                    <li>Adding Tasks: Users can add new tasks by specifying their titles.</li>
                    <li>Removing Tasks: Tasks can be deleted, allowing for cleaning up the task list.</li>
                    <li>Editing Tasks: Existing tasks can be edited by changing their titles.</li>
                    <li>Marking Tasks as Completed: Users can mark tasks as completed, facilitating progress tracking.</li>
                </ul>
            </div>
        </div>
    )
}
