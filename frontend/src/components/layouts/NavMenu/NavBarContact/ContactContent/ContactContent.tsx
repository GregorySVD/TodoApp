import React, { useState, useRef } from "react";
import "./ContactContent.css";
import { useTheme } from "../../../../../context/ThemeContext";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  onClick: () => void;
}

export const ContactContent = (props: Props) => {
  const { darkTheme } = useTheme();
  const [isHuman, setIsHuman] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaVerify = (token: string | null) => {
    if (token) {
      setTimeout(() => {
        setIsHuman(true);
      }, 1500);
    } else {
      setIsHuman(false);
    }
  };

  return (
    <div className="nav_about">
      <div className="overlay" onClick={props.onClick}></div>
      <div className={darkTheme ? "contact-content dark-theme" : "contact-content"}>
        <button className="contact-content-close-btn" onClick={props.onClick}>
          <i className="fa fa-close"></i>
        </button>
        <div>
          <h3 className="contact-content-header">Hi, my name is</h3>
          <h1 className="contact-content-name">Grzegorz Terenda</h1>
        </div>
        <span>
          I am a passionate software engineer with a strong interest in computer science. I have been fascinated by
          computers since I was a child, and I have been learning to code since 2022. I am currently a student at WSB
          University of Applied Sciences, where I am studying computer science. I have completed the MegaK course, where
          I learned to build web applications using Node.js, Express.js, TypeScript, MySQL, ReactJS, and MongoDB.
        </span>
        <span>
          I am always looking for new ways to improve my skills and knowledge. I am excited to see what the future holds
          for me in the field of software engineering.
        </span>

        {isHuman ? (
          <a href="mailto:grzegorzterenda@gmail.com" className="email-link">
            <i className="fa-solid fa-envelope"></i>
            grzegorzterenda@gmail.com
          </a>
        ) : (
          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={"6LdeJSAqAAAAACVuTFZ49iKFZSVPcxQbyZ95j5GT"}
              onChange={handleCaptchaVerify}
            />
            <p>Please complete the CAPTCHA to see the email address.</p>
          </div>
        )}

        <div className="contact-socials">
          <div className="contact-socials-links">
            <Link to="https://www.facebook.com/grzegorz.terenda/" target="_blank">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link to="https://www.linkedin.com/in/grzegorz-terenda/" target="_blank">
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link to="https://github.com/GregorySVD" target="_blank">
              <i className="fa-brands fa-github"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
