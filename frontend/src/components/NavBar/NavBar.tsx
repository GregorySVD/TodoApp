import "./NavBar.css";
import { Link } from "react-router-dom";
import { ThemeChanger } from "src/components/ThemeChanger/ThemeChanger";
import { NavBarMenu } from "./NavBarMenu/NavBarMenu";

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
        <NavBarMenu />
      </div>
    </nav>
  );
};
