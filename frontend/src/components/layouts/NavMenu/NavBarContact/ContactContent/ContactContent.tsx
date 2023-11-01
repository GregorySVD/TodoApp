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
            <div className={darkTheme ? "contact-content dark-theme" : "about-content"}>
                <button className="contact-content-close-btn" onClick={props.onClick}>
                    <i className="fa fa-close"></i>
                </button>
                <div>
                    <h3 className="contact-content-header">Hi, I am</h3>
                    <h1 className="contact-content-name">Grzegorz Terenda</h1>
                </div>
                <span>
                    As a full-stack web developer, I am deeply passionate about crafting innovative and engaging web experiences. My journey into the world of technology began at a young age, and over the past year, I've dedicated myself to learning programming. The allure of this dynamic field has inspired me to pursue formal education in computer science. With a keen eye for continuous learning, I am excited to contribute my skills and enthusiasm to a forward-thinking team.
                </span>
                <span>Email: example@email.com</span>
                <div className="contact-socials">
                    <div className="contact-socials-links">
                        <a href="https://www.facebook.com/grzegorz.terenda/" target="_blank"><i
                            className="fa-brands fa-facebook" ></i></a>
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
