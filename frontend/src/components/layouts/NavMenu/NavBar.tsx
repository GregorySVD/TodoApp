import React from 'react';
import './NavBar.css'
import {NavBarAboutOpenBtn} from "./NavBarAbout/NavBarAboutOpenBtn/NavBarAboutOpenBtn";
import {NavBarThemChanger} from "./NavBarThemeChanger/NavBarThemChanger";
import {NavBarContactOpener} from "./NavBarContact/NavBarContactOpener/NavBarContactOpener";

export const NavBar = () => {

    return <nav className="nav">
        <div className="nav_logo">
            <div className="fa fa-check">
            </div>
            <span className="nav_logo_text">Logo</span>
        </div>
        <div className="nav_btns">
            <NavBarThemChanger/>
            <NavBarContactOpener/>
            <NavBarAboutOpenBtn/>
        </div>
    </nav>
}
