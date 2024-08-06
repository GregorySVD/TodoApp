import { Link } from "react-router-dom";
import "./Socials.css";

export const Socials = () => {
  return (
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
  );
};
