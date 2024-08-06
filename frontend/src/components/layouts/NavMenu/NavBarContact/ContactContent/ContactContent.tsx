import React, { useState, useRef } from "react";
import "./ContactContent.css";
import { useTheme } from "../../../../../context/ThemeContext";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Socials } from "src/components/common/Socials/Socials";

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
        <div className="constact-hero">
          <div className="constact-hero-flex-container">
            <div className="constact-hero-text-container">
              <span>Hi, I'm Grzegorz 👋</span>
              <span>Javascript lover. I love building things and helping people. Learning tech since 2022</span>
            </div>
            <div className="constact-hero-avatar">
              <span>
                <img
                  alt="Grzegorz Terenda"
                  src="https://raw.githubusercontent.com/GregorySVD/TodoApp/dev/frontend/public/GT_avatar.png"
                ></img>
              </span>
            </div>
          </div>
        </div>
        <span>
          I am a passionate software engineer with a deep-seated interest in computer science. My fascination with
          computers began in childhood, and I have been learning to code since 2022. Currently, I am pursuing a degree
          in computer science at WSB University of Applied Sciences. I’ve completed the MegaK course, where I mastered
          the skills needed to build dynamic web applications using technologies like Node.js, Express.js, TypeScript,
          MySQL, ReactJS, and MongoDB. Each new project fuels my excitement for technology and drives me to continuously
          expand my expertise.
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
            <p className="CAPTCHA-info">
              <i>Please complete the CAPTCHA to see the email address.</i>
            </p>
          </div>
        )}
        <Socials />
      </div>
    </div>
  );
};
