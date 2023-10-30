import React from 'react';
import './NavMenu.css'

export const NavMenu = () => {



    return <nav className="nav">
        <div className="nav_logo">
            <div className="fa fa-check">
            </div>
            <span className="nav_logo_text">TodoApp</span>
        </div>
        <div className="nav_btns">
            <button className="nav_btn-theme-changed">
                <span>DARK MODE</span>
                <div className="fa fa-sun"></div>

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
