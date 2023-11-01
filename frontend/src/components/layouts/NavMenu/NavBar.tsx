import React from 'react';
import './NavBar.css'
import {NavBarAboutOpenBtn} from "./NavBarAbout/NavBarAboutOpenBtn/NavBarAboutOpenBtn";
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
            <NavBarAboutOpenBtn/>
        </div>
    </nav>
}
