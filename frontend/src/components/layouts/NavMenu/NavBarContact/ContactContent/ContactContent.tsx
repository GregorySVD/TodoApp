import React from "react";
import './ContactContent.css'
import {useTheme} from "../../../../../context/ThemeContext";

interface Props {
    onClick: () => void;
}

export const ContactContent = (props: Props) => {
    const {darkTheme} = useTheme();

    return (
        <div className="nav_about">
            <div className="overlay"
                 onClick={props.onClick}
            >
            </div>
            <div className={darkTheme ? "contact-content dark-theme" : "contact-content"}>
                <button className="contact-content-close-btn" onClick={props.onClick}>
                    <i className="fa fa-close"></i>
                </button>
                <div>
                    <h3 className="contact-content-header">Hi, I am</h3>
                    <h1 className="contact-content-name">Grzegorz Terenda</h1>
                </div>
                <span>
                    I am a passionate software engineer with a strong interest in computer science. I have been fascinated by computers since I was a child, and I started learning to code a year ago. I am currently a student at MegaK, where I am learning to build web applications using Node.js, Express.js, TypeScript, MySQL, ReactJS and MongoDB. I am also a student at WSB University of Applied Sciences, where I am studying computer science.
                      </span>
                <span>
I am always looking for new ways to improve my skills and knowledge. I am excited to see what the future holds for me in the field of software engineering.
                    </span>

                <span>Email: example@email.com</span>
                <div className="contact-socials">
                    <div className="contact-socials-links">
                        <a href="https://www.facebook.com/grzegorz.terenda/" target="_blank"><i
                            className="fa-brands fa-facebook"></i></a>
                        <a href="https://www.linkedin.com/in/grzegorz-terenda/" target="_blank"> <i
                            className="fa-brands fa-linkedin"></i></a>
                        <a href="https://github.com/GregorySVD" target="_blank"> <i
                            className="fa-brands fa-github"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
