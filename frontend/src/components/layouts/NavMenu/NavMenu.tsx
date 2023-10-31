import React from 'react';
import './NavMenu.css'
import {useTheme} from "../../../context/ThemeContext";

export const NavMenu = () => {

    const {darkTheme, setDarkTheme} = useTheme();

    const handleDarkThemeUse = () => {
        setDarkTheme(!darkTheme);
    }

    const btnThemeChangedClass = darkTheme ? 'nav_btn-theme-changed dark-theme' : 'nav_btn-theme-changed';

    return <nav className="nav">
        <div className="nav_logo">
            <div className="fa fa-check">
            </div>
            <span className="nav_logo_text">TodoApp</span>
        </div>
        <div className="nav_btns">
            <button className={btnThemeChangedClass}
                    onClick={handleDarkThemeUse}
            >
                <span>{darkTheme ? 'LIGHT MODE' : 'DARK MODE'}</span>
                <div className={`fa ${darkTheme ? 'fa-sun' : 'fa-moon'}`}></div>
            </button>
            <button className="nav_btn-contact">
                <span>LET'S TALK</span>
                <div className="fa fa-arrow-right"></div>
            </button>
            <button className="nav_btn-menu">
                <span>MENU</span>
                <div className="fa fa-plus"></div>
            </button>
        </div>
    </nav>
}
