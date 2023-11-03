import React from 'react';
import './NavBar.css'
import {NavBarAboutOpenBtn} from "./NavBarAbout/NavBarAboutOpenBtn/NavBarAboutOpenBtn";
import {NavBarThemChanger} from "./NavBarThemeChanger/NavBarThemChanger";
import {NavBarContactOpener} from "./NavBarContact/NavBarContactOpener/NavBarContactOpener";
import {Link} from "react-router-dom";

export const NavBar = () => {

    return <nav className="nav">
        <div className="nav_logo">
            <Link to="/" className="link-no-decoration" >

            <span className="nav_logo_text">✅ TodoApp</span>
            </Link>
        </div>
        <div className="nav_btns">
            <NavBarThemChanger/>
            <NavBarContactOpener/>
            <NavBarAboutOpenBtn/>
        </div>
    </nav>
}
