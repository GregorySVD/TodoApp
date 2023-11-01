import React from 'react';
import './NavBar.css'
import {NavBarAboutProject} from "./NavBarAbout/NavBarAboutProject";
import {NavBarThemChanger} from "./NavBarThemeChanger/NavBarThemChanger";

export const NavBar = () => {

    return <nav className="nav">
        <div className="nav_logo">
            <div className="fa fa-check">
            </div>
            <span className="nav_logo_text">Logo</span>
        </div>
        <div className="nav_btns">
            <NavBarThemChanger/>
            <button className="nav_btn-contact">
                <span>CONTACT</span>
                <div className="fa fa-arrow-right"></div>
            </button>
            <NavBarAboutProject/>
        </div>
    </nav>
}
