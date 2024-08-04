import React, { useState } from "react";
import "./NavBarAboutOpenBtn.css";
import { AboutContent } from "../AboutContent/AboutContent";

export const NavBarAboutOpenBtn = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModalAboutContent = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button className="nav_btn-about" onClick={toggleModalAboutContent}>
        <span>ABOUT</span>
        <div className="fa fa-plus"></div>
      </button>
      {modal && <AboutContent onClick={toggleModalAboutContent} />}
    </>
  );
};
