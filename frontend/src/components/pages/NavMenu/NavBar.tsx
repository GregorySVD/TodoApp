import "./NavBar.css";
import { NavBarAboutOpenBtn } from "./NavBarAbout/NavBarAboutOpenBtn/NavBarAboutOpenBtn";
import { NavBarContactOpener } from "./NavBarContact/NavBarContactOpener/NavBarContactOpener";
import { Link } from "react-router-dom";
import { ThemeChanger } from "src/components/ThemeChanger/ThemeChanger";

export const NavBar = () => {
  return (
    <nav className="nav">
      <div className="nav_logo">
        <Link to="/" className="link-no-decoration">
          <span className="nav_logo_text full">✅ TodoApp</span>
          <span className="nav_logo_text short">TodoApp</span>
        </Link>
      </div>
      <div className="nav_btns">
        <ThemeChanger />
        <NavBarContactOpener />
        <NavBarAboutOpenBtn />
      </div>
    </nav>
  );
};
